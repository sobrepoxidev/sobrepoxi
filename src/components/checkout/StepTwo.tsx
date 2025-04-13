import { Database } from "@/types-db";
import Image from "next/image";
import PaymentForm from "./PaymentForm";

type PaymentMethod = "sinpe" | "paypal" | "transfer" | "card";
type ProductType = Database['products'];
type CartItem = {
    product: ProductType;
    quantity: number;
  };
  type Banco = {
    nombre: string;
    sms?: string;
    permiteSMS: boolean;
  };

export default function StepTwo({
    paymentMethod,
    setPaymentMethod,
    onContinue,
    cart,
    removeFromCart,
    bancoSeleccionado,
    setBancoSeleccionado,
    ultimos4,
    setUltimos4,
    total,
    onFinalize,
    createdOrderId,
    createOrder,
  }: {
    paymentMethod: PaymentMethod | null;
    setPaymentMethod: (m: PaymentMethod) => void;
    onContinue: () => void;
    cart: CartItem[];
    removeFromCart: (id: number) => void;
    bancoSeleccionado: Banco | null;
    setBancoSeleccionado: (b: Banco | null) => void;
    ultimos4: string;
    setUltimos4: (s: string) => void;
    total: number;
    onFinalize: () => void;
    createdOrderId: number | null;
    createOrder: (paymentMethod?: string) => Promise<void>;
  }) {    
    return (
      <section className="text-gray-900 w-full">
        <h2 className="text-xl font-semibold mb-4 ">Seleccione un método de pago</h2>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PaymentOption
            label="SINPE Móvil"
            selected={paymentMethod === "sinpe"}
            onClick={() => setPaymentMethod("sinpe")}
            img={["/sinpe.webp"]}
          />
          <PaymentOption
            label="PayPal / Tarjeta sin registro"
            selected={paymentMethod === "paypal"}
            onClick={async () => { 
              setPaymentMethod("paypal");
              await createOrder("paypal");
            }}
            img={["/paypal.webp", "/tarjeta.webp"]}
          />
          <PaymentOption
            label="Transferencia bancaria"
            selected={paymentMethod === "transfer"}
            onClick={() => setPaymentMethod("transfer")}
            img={["/transfer.webp"]}
          />
        </div>

        <PaymentForm
          paymentMethod={paymentMethod}
          bancoSeleccionado={bancoSeleccionado}
          setBancoSeleccionado={setBancoSeleccionado}
          ultimos4={ultimos4}
          setUltimos4={setUltimos4}
          total={total}
          onFinalize={onFinalize}
          createdOrderId={createdOrderId}
        
        />
  
        {/* <button
          onClick={onContinue}
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
        >
          Continuar &rarr;
        </button> */}
      </section>
    );
  }
  /** Botón estilo */
function PaymentOption({
    label,
    selected,
    onClick,
    img,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
    img: string[];
  }) {
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer flex flex-col p-1 border-2 rounded-lg text-center justify-end transition ${selected ? "border-teal-300 bg-teal-50 "  : "border-gray-300 hover:border-gray-400 "}`}
      >
        <div className="flex items-center justify-center gap-2 ">
          <Image
            src={img[0]}
            alt={label}
            width={56}
            height={56}
            layout="fixed"
            className="object-contain"
          />
          {img.length > 1 && (
            <Image
              src={img[1]}
              alt={label}
              width={56}
              height={56}
              layout="fixed"
              className="object-contain"
            />
          )}
        </div>
        <div className="flex flex-col-reverse mb-2 font-semibold ">{label}</div>
      </div>
    );
  }
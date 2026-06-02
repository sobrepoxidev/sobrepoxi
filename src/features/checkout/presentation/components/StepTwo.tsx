'use client';

import Image from 'next/image';
import PaymentForm from './PaymentForm';
import type { CartItem, PaymentMethod, Banco } from '../../application/distribute';

interface StepTwoProps {
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (m: PaymentMethod) => void;
  removeFromCart?: (id: number) => void;
  bancoSeleccionado: Banco | null;
  setBancoSeleccionado: (b: Banco | null) => void;
  ultimos4: string;
  setUltimos4: (s: string) => void;
  total: number;
  onFinalize: () => void;
  createdOrderId: number | null;
  createOrder: (paymentMethod?: string) => Promise<void>;
  cart: CartItem[];
  locale: string;
}

export default function StepTwo({
  paymentMethod,
  setPaymentMethod,
  bancoSeleccionado,
  setBancoSeleccionado,
  ultimos4,
  setUltimos4,
  total,
  onFinalize,
  createdOrderId,
  createOrder,
  cart,
  locale,
}: StepTwoProps) {
  return (
    <section className="text-gray-200 w-full">
      <h2 className="text-xl font-semibold mb-4 text-white">{locale === 'es' ? 'Seleccione un método de pago' : 'Select a payment method'}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PaymentOption
          label="SINPE Móvil"
          selected={paymentMethod === 'sinpe'}
          onClick={() => setPaymentMethod('sinpe')}
          img={['/sinpe.webp']}
        />
        <PaymentOption
          label="PayPal / Tarjeta sin registro"
          selected={paymentMethod === 'paypal'}
          onClick={async () => {
            setPaymentMethod('paypal');
            await createOrder('paypal');
          }}
          img={['/paypal.webp', '/tarjeta.webp']}
        />
        <PaymentOption
          label="Transferencia bancaria"
          selected={paymentMethod === 'transfer'}
          onClick={() => setPaymentMethod('transfer')}
          img={['/transfer.webp']}
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
        locale={locale}
      />

      <div className="mt-6 p-4 bg-[#1a1a1a] border border-white/10 rounded-xl">
        <h3 className="text-lg font-medium mb-3 text-white">{locale === 'es' ? 'Resumen del pedido' : 'Order summary'}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>{locale === 'es' ? 'Subtotal' : 'Subtotal'}</span>
            <span>${cart.reduce((sum, item) => sum + ((item.product.dolar_price || 0) * item.quantity), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
            <span>$7(₡3.200)</span>
          </div>
          <hr className="border-white/10 my-2" />
          <div className="flex justify-between font-semibold text-base text-white">
            <span>{locale === 'es' ? 'Total del pedido' : 'Order total'}</span>
            <span className="gold-gradient-bright">$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PaymentOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  img: string[];
}

function PaymentOption({ label, selected, onClick, img }: PaymentOptionProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-col p-2 border-2 rounded-lg text-center justify-end transition ${selected ? 'border-amber-500 bg-amber-400/10' : 'border-white/10 bg-[#1a1a1a] hover:border-white/30'}`}
    >
      <div className="flex items-center justify-center gap-2 bg-white rounded-md p-1">
        <Image src={img[0]} alt={label} width={56} height={56} layout="fixed" className="object-contain" />
        {img.length > 1 && (
          <Image src={img[1]} alt={label} width={56} height={56} layout="fixed" className="object-contain" />
        )}
      </div>
      <div className="flex flex-col-reverse mt-2 font-semibold text-sm text-gray-200">{label}</div>
    </div>
  );
}

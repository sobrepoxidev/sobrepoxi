'use client';

import Image from 'next/image';
import PaymentForm from './PaymentForm';
import type { CartItem, PaymentMethod, Banco } from '@/features/checkout';

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
    <section className="text-gray-900 w-full">
      <h2 className="text-xl font-semibold mb-4">{locale === 'es' ? 'Seleccione un método de pago' : 'Select a payment method'}</h2>

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

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-3">{locale === 'es' ? 'Resumen del pedido' : 'Order summary'}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-700">
            <span>{locale === 'es' ? 'Subtotal' : 'Subtotal'}</span>
            <span>${cart.reduce((sum, item) => sum + ((item.product.dolar_price || 0) * item.quantity), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
            <span>$7(₡3.200)</span>
          </div>
          <hr className="border-slate-300 my-2" />
          <div className="flex justify-between font-semibold text-base text-slate-800">
            <span>{locale === 'es' ? 'Total del pedido' : 'Order total'}</span>
            <span>$ {total.toFixed(2)}</span>
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
      className={`cursor-pointer flex flex-col p-1 border-2 rounded-lg text-center justify-end transition ${selected ? 'border-teal-300 bg-teal-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <div className="flex items-center justify-center gap-2">
        <Image src={img[0]} alt={label} width={56} height={56} layout="fixed" className="object-contain" />
        {img.length > 1 && (
          <Image src={img[1]} alt={label} width={56} height={56} layout="fixed" className="object-contain" />
        )}
      </div>
      <div className="flex flex-col-reverse mb-2 font-semibold">{label}</div>
    </div>
  );
}

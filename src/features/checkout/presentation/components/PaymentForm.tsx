'use client';

import PayPalCardMethod from './PayPalCardMethod';
import toast from 'react-hot-toast';
import { BANCOS, type PaymentMethod, type Banco } from '../../application/distribute';

interface PaymentFormProps {
  paymentMethod: PaymentMethod | null;
  bancoSeleccionado: Banco | null;
  setBancoSeleccionado: (v: Banco | null) => void;
  ultimos4: string;
  setUltimos4: (v: string) => void;
  total: number;
  onFinalize: () => void;
  createdOrderId: number | null;
  locale: string;
}

export default function PaymentForm({
  paymentMethod,
  bancoSeleccionado,
  setBancoSeleccionado,
  ultimos4,
  setUltimos4,
  total,
  onFinalize,
  createdOrderId,
  locale,
}: PaymentFormProps) {
  const copiarMensaje = () => {
    if (bancoSeleccionado?.permiteSMS) {
      navigator.clipboard.writeText(`PASE 1000 8888-9999`);
      toast.success('Mensaje copiado al portapapeles', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#10b981', color: 'white', fontWeight: '500' },
        icon: '📋',
      });
    }
  };

  const handleBancoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const banco = BANCOS.find((b) => b.nombre === e.target.value);
    setBancoSeleccionado(banco || null);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'sinpe':
        return (
          <div className="mt-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-gray-200">
            <p className="text-sm mb-2">
              {locale === 'es' ? 'Monto total' : 'Total amount'}: <b className="gold-gradient-bright">₡{total}</b>.
              {locale === 'es' ? ' Envia tu pago vía SINPE con la siguiente info:' : ' Send your payment via SINPE with the following info:'}
            </p>
            <label className="block mb-1 text-sm font-medium text-gray-300">{locale === 'es' ? 'Selecciona Banco:' : 'Select Bank:'}</label>
            <select value={bancoSeleccionado?.nombre || ''} onChange={handleBancoChange} className="w-full p-2.5 bg-[#121212] border border-white/10 rounded-md text-white mb-2 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
              <option value="">-- Selecciona Banco --</option>
              {BANCOS.map((b, idx) => <option key={idx} value={b.nombre}>{b.nombre}</option>)}
            </select>

            {bancoSeleccionado && (
              <div className="mt-3 p-3 border border-white/10 bg-[#121212] rounded-md text-sm">
                {bancoSeleccionado.permiteSMS ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-gray-300">
                        {locale === 'es' ? 'Enviar SMS a:' : 'Send SMS to:'} <b>{bancoSeleccionado.sms}</b>
                      </p>
                      <p className="text-gray-300">
                        {locale === 'es' ? 'Mensaje:' : 'Message:'}: <b>PASE {total} 85850000 HM-ART</b>
                      </p>
                    </div>
                    <button onClick={copiarMensaje} className="mt-2 sm:mt-0 sm:w-auto text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                      {locale === 'es' ? 'Copiar Mensaje' : 'Copy Message'}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300">
                    📱 {locale === 'es' ? 'Realiza la transferencia desde la app o banca en línea de' : 'Make the transfer from the app or online bank of'} <b>{bancoSeleccionado.nombre}</b>.
                  </p>
                )}
              </div>
            )}

            <label className="block mb-1 text-sm font-medium text-gray-300">{locale === 'es' ? 'Últimos 4 dígitos del recibo:' : 'Last 4 digits of the receipt:'}</label>
            <input
              type="text"
              maxLength={4}
              placeholder="1234"
              value={ultimos4}
              onChange={(e) => setUltimos4(e.target.value)}
              className="w-full p-2.5 bg-[#121212] border border-white/10 rounded-md text-white placeholder-gray-500 mb-2 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
            />
            <button onClick={onFinalize} className="w-full mt-6 bg-gold-gradient text-black hover:shadow-lg hover:shadow-amber-500/20 font-bold py-2.5 rounded-md transition-all">
              {locale === 'es' ? 'Confirmar y Finalizar' : 'Confirm and Finalize'}
            </button>
          </div>
        );

      case 'paypal':
        return (
          <div className="p-4 bg-[#1a1a1a] border border-white/10 text-gray-300 rounded-xl text-center mb-2">
            {createdOrderId && (
              <PayPalCardMethod
                createdOrderId={createdOrderId}
                onPaymentSuccess={() => onFinalize()}
                onPaymentError={(msg) => console.error(msg)}
              />
            )}
          </div>
        );

      case 'transfer':
        return (
          <div className="p-4 bg-[#1a1a1a] border border-white/10 text-gray-300 rounded-xl text-center mb-2">
            <p className="text-sm md:text-base">{locale === 'es' ? 'Instrucciones para transferencia bancaria.' : 'Instructions for bank transfer.'}</p>
          </div>
        );

      case 'card':
        return (
          <div className="p-4 bg-[#1a1a1a] border border-white/10 text-gray-300 rounded-xl text-center mb-2">
            <p className="text-sm md:text-base">{locale === 'es' ? 'Formulario de tarjeta de crédito/débito (Stripe, etc.).' : 'Credit/debit card form (Stripe, etc.).'}</p>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-[#1a1a1a] border border-white/10 text-gray-300 rounded-xl text-center mb-2">
            <p className="text-sm md:text-base">{locale === 'es' ? 'Aquí se mostrará el formulario de pago' : 'Here the payment form will be displayed'}</p>
          </div>
        );
    }
  };

  return <section className="text-gray-200 w-full mt-4">{renderPaymentForm()}</section>;
}

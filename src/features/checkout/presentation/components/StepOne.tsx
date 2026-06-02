'use client';

import { useSupabase } from '@/app/supabase-provider/provider';
import { formatUSD } from '@/shared/utils/formatCurrency';
import { useCheckoutForm } from '../../application/hooks/useCheckoutForm';
import type { CartItem, ShippingAddress } from '../../application/distribute';

const PROVINCIAS = [
  'San José', 'Alajuela', 'Cartago', 'Heredia',
  'Guanacaste', 'Puntarenas', 'Limón'
];

interface StepOneProps {
  cart: CartItem[];
  onContinue: (address: ShippingAddress) => void;
  initialData?: ShippingAddress | null;
  locale: string;
}

const labelCls = 'block text-sm font-medium text-gray-300 mb-1';
const inputCls = (hasError?: boolean) =>
  `w-full p-2.5 bg-[#121212] border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40 transition-colors ${hasError ? 'border-red-500' : 'border-white/10'}`;

export default function StepOne({ cart, onContinue, initialData, locale }: StepOneProps) {
  const { supabase } = useSupabase();

  const {
    session,
    userProfile,
    showAddressOptions,
    formData,
    errors,
    discountInfo,
    handleChange,
    validateForm,
    handleAddressSelection,
  } = useCheckoutForm({ locale, initialData });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const shippingAddress: ShippingAddress = {
      name: `${formData.nombre} ${formData.apellidos}`.trim(),
      address: formData.direccion1 + (formData.direccion2 ? `, ${formData.direccion2}` : ''),
      city: formData.canton,
      state: formData.provincia,
      country: 'Costa Rica',
      postal_code: formData.codigoPostal,
      phone: formData.telefono,
    };

    if (session && !userProfile?.shipping_address && !showAddressOptions) {
      const confirmed = window.confirm('¿Deseas guardar esta dirección en tu perfil para futuros pedidos?');
      if (confirmed) {
        const addressToSave = { ...shippingAddress };
        try {
          const { error } = await supabase.from('user_profiles').update({ shipping_address: addressToSave }).eq('id', session.user.id);
          if (error) throw error;
        } catch (err) {
          console.error('[StepOne] failed to save address to profile:', err);
        }
      }
    }

    onContinue(shippingAddress);
  };

  return (
    <section className="w-full text-gray-200">
      {showAddressOptions && userProfile?.shipping_address && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">
              {locale === 'es' ? 'Selección de dirección de envío' : 'Shipping Address Selection'}
            </h3>
            <p className="mb-4 text-gray-400">
              {locale === 'es' ? 'Detectamos que ya tienes una dirección de envío guardada en tu perfil. ¿Cómo deseas proceder?' : 'We detected that you already have a saved shipping address in your profile. How do you want to proceed?'}
            </p>
            <div className="space-y-3">
              <button onClick={() => handleAddressSelection(true)} className="w-full bg-gold-gradient text-black font-bold py-2.5 px-4 rounded-md hover:opacity-90 transition">
                {locale === 'es' ? 'Usar mi dirección guardada' : 'Use my saved address'}
              </button>
              <button onClick={() => handleAddressSelection(false)} className="w-full bg-white/5 text-gray-200 py-2.5 px-4 rounded-md border border-white/10 hover:bg-white/10 transition">
                {locale === 'es' ? 'Continuar con la dirección actual' : 'Continue with the current address'}
              </button>
              <button onClick={() => handleAddressSelection(false, true)} className="w-full bg-white/5 text-amber-400 py-2.5 px-4 rounded-md border border-white/10 hover:bg-white/10 transition">
                {locale === 'es' ? 'Usar la dirección actual y actualizarla en mi perfil' : 'Use the current address and update it in my profile'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 sm:p-6">
            <div>
              <p className="text-sm text-gray-400">{locale === 'es' ? '¿Tiene una cuenta con nosotros? Inicie sesión para acelerar su compra.' : 'Do you have an account with us? Login to speed up your purchase.'}
                <a href="#" className="text-amber-400 font-medium ml-1 hover:underline">{locale === 'es' ? 'Entrar' : 'Login'}</a>
              </p>
            </div>

            <div className="bg-gold-gradient p-3 text-black font-bold rounded-md">
              {locale === 'es' ? 'Información de envío' : 'Shipping Information'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className={labelCls}>
                  {locale === 'es' ? 'Nombre' : 'Name'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange}
                  className={inputCls(!!errors.nombre)}
                  data-error={errors.nombre ? 'true' : 'false'} />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="apellidos" className={labelCls}>
                  {locale === 'es' ? 'Apellidos' : 'Last name'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange}
                  className={inputCls(!!errors.apellidos)}
                  data-error={errors.apellidos ? 'true' : 'false'} />
                {errors.apellidos && <p className="text-red-400 text-xs mt-1">{errors.apellidos}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelCls}>
                  {locale === 'es' ? 'Email' : 'Email'} <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className={inputCls(!!errors.email)}
                  data-error={errors.email ? 'true' : 'false'} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className={labelCls}>
                  {locale === 'es' ? 'Teléfono' : 'Phone'} <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange}
                  placeholder="8888-8888"
                  className={inputCls(!!errors.telefono)}
                  data-error={errors.telefono ? 'true' : 'false'} />
                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="direccion1" className={labelCls}>
                  {locale === 'es' ? 'Dirección' : 'Address'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="direccion1" name="direccion1" value={formData.direccion1} onChange={handleChange}
                  className={inputCls(!!errors.direccion1)}
                  data-error={errors.direccion1 ? 'true' : 'false'} />
                {errors.direccion1 && <p className="text-red-400 text-xs mt-1">{errors.direccion1}</p>}
              </div>

              <div>
                <label htmlFor="provincia" className={labelCls}>
                  {locale === 'es' ? 'Provincia' : 'Province'} <span className="text-red-500">*</span>
                </label>
                <select id="provincia" name="provincia" value={formData.provincia} onChange={handleChange}
                  className={inputCls(!!errors.provincia)}
                  data-error={errors.provincia ? 'true' : 'false'}>
                  <option value="">{locale === 'es' ? 'Seleccionar provincia' : 'Select province'}</option>
                  {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.provincia && <p className="text-red-400 text-xs mt-1">{errors.provincia}</p>}
              </div>

              <div>
                <label htmlFor="canton" className={labelCls}>
                  {locale === 'es' ? 'Cantón' : 'Canton'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="canton" name="canton" value={formData.canton} onChange={handleChange}
                  className={inputCls(!!errors.canton)}
                  data-error={errors.canton ? 'true' : 'false'} />
                {errors.canton && <p className="text-red-400 text-xs mt-1">{errors.canton}</p>}
              </div>

              <div>
                <label htmlFor="distrito" className={labelCls}>
                  {locale === 'es' ? 'Distrito' : 'District'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="distrito" name="distrito" value={formData.distrito} onChange={handleChange}
                  className={inputCls(!!errors.distrito)}
                  data-error={errors.distrito ? 'true' : 'false'} />
                {errors.distrito && <p className="text-red-400 text-xs mt-1">{errors.distrito}</p>}
              </div>

              <div>
                <label htmlFor="codigoPostal" className={labelCls}>
                  {locale === 'es' ? 'Código Postal' : 'Postal code'}
                </label>
                <input type="text" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange}
                  className={inputCls(false)} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-gold-gradient text-black font-bold px-6 py-2.5 rounded-md hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                {locale === 'es' ? 'CONTINUAR' : 'CONTINUE'}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 sticky top-4">
            <h2 className="text-lg font-semibold text-white mb-4">{locale === 'es' ? 'Resumen del pedido' : 'Order summary'}</h2>
            <div className="space-y-4 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-start border-b border-white/10 pb-3">
                  <div className="flex-grow">
                    <p className="font-medium text-gray-200">{item.product.name || 'Producto'}</p>
                    <p className="text-sm text-gray-400">{locale === 'es' ? 'Cantidad' : 'Quantity'}: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-200">
                      {item.product?.dolar_price != null
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 }).format(item.product.dolar_price * item.quantity)
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 text-gray-300">
              <div className="flex justify-between text-sm">
                <span>{locale === 'es' ? 'Total parcial' : 'Partial total'}</span>
                <span className="font-bold text-gray-200">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 }).format(
                    cart.reduce((sum, item) => sum + (item.product.dolar_price ?? 0) * item.quantity, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
                <span>$6.99</span>
              </div>
              {discountInfo && (
                <div className="flex justify-between text-emerald-400 font-medium text-sm">
                  <span>{locale === 'es' ? 'Descuento' : 'Discount'} ({discountInfo.code})</span>
                  <span>- {formatUSD(discountInfo.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold border-t border-white/10 pt-2 text-white">
                <span>{locale === 'es' ? 'Total del pedido:' : 'Total of the order:'}</span>
                <span className="gold-gradient-bright">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 }).format(
                    discountInfo
                      ? discountInfo.finalTotal
                      : cart.reduce((sum, item) => sum + (item.product.dolar_price ?? 0) * item.quantity, 0) + 7
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-4">
        <span className="text-red-500">*</span> {locale === 'es' ? 'Campos requeridos' : 'Required fields'}
      </div>
    </section>
  );
}

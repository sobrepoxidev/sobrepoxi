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
    <section className="w-full text-gray-950">
      {showAddressOptions && userProfile?.shipping_address && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {locale === 'es' ? 'Selección de dirección de envío' : 'Shipping Address Selection'}
            </h3>
            <p className="mb-4 text-gray-600">
              {locale === 'es' ? 'Detectamos que ya tienes una dirección de envío guardada en tu perfil. ¿Cómo deseas proceder?' : 'We detected that you already have a saved shipping address in your profile. How do you want to proceed?'}
            </p>
            <div className="space-y-3">
              <button onClick={() => handleAddressSelection(true)} className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition">
                {locale === 'es' ? 'Usar mi dirección guardada' : 'Use my saved address'}
              </button>
              <button onClick={() => handleAddressSelection(false)} className="w-full bg-white text-gray-800 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition">
                {locale === 'es' ? 'Continuar con la dirección actual' : 'Continue with the current address'}
              </button>
              <button onClick={() => handleAddressSelection(false, true)} className="w-full bg-white text-teal-600 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition">
                {locale === 'es' ? 'Usar la dirección actual y actualizarla en mi perfil' : 'Use the current address and update it in my profile'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-md p-4">
            <div className="p-2">
              <p>{locale === 'es' ? '¿Tiene una cuenta con nosotros? Inicie sesión para acelerar su compra.' : 'Do you have an account with us? Login to speed up your purchase.'}
                <a href="#" className="text-[#4A9DAB] font-medium ml-1 hover:underline">{locale === 'es' ? 'Entrar' : 'Login'}</a>
              </p>
            </div>

            <div className="bg-teal-600 p-4 text-white font-medium rounded-md">
              {locale === 'es' ? 'Información de envío' : 'Shipping Information'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Nombre' : 'Name'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.nombre ? 'true' : 'false'} />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Apellidos' : 'Last name'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.apellidos ? 'true' : 'false'} />
                {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Email' : 'Email'} <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.email ? 'true' : 'false'} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Teléfono' : 'Phone'} <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange}
                  placeholder="8888-8888"
                  className={`w-full p-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.telefono ? 'true' : 'false'} />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="direccion1" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Dirección' : 'Address'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="direccion1" name="direccion1" value={formData.direccion1} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.direccion1 ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.direccion1 ? 'true' : 'false'} />
                {errors.direccion1 && <p className="text-red-500 text-xs mt-1">{errors.direccion1}</p>}
              </div>

              <div>
                <label htmlFor="provincia" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Provincia' : 'Province'} <span className="text-red-500">*</span>
                </label>
                <select id="provincia" name="provincia" value={formData.provincia} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.provincia ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.provincia ? 'true' : 'false'}>
                  <option value="">{locale === 'es' ? 'Seleccionar provincia' : 'Select province'}</option>
                  {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.provincia && <p className="text-red-500 text-xs mt-1">{errors.provincia}</p>}
              </div>

              <div>
                <label htmlFor="canton" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Cantón' : 'Canton'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="canton" name="canton" value={formData.canton} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.canton ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.canton ? 'true' : 'false'} />
                {errors.canton && <p className="text-red-500 text-xs mt-1">{errors.canton}</p>}
              </div>

              <div>
                <label htmlFor="distrito" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Distrito' : 'District'} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="distrito" name="distrito" value={formData.distrito} onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.distrito ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={errors.distrito ? 'true' : 'false'} />
                {errors.distrito && <p className="text-red-500 text-xs mt-1">{errors.distrito}</p>}
              </div>

              <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium mb-1">
                  {locale === 'es' ? 'Código Postal' : 'Postal code'}
                </label>
                <input type="text" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition">
                {locale === 'es' ? 'CONTINUAR' : 'CONTINUE'}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-md p-4 sticky top-4">
            <h2 className="text-lg font-medium mb-4">{locale === 'es' ? 'Resumen del pedido' : 'Order summary'}</h2>
            <div className="space-y-4 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-start border-b pb-3">
                  <div className="flex-grow">
                    <p className="font-medium">{item.product.name || 'Producto'}</p>
                    <p className="text-sm text-gray-600">{locale === 'es' ? 'Cantidad' : 'Quantity'}: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {item.product?.dolar_price != null
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 }).format(item.product.dolar_price * item.quantity)
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>{locale === 'es' ? 'Total parcial' : 'Partial total'}</span>
                <span className="text-xs font-bold text-teal-700">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2 }).format(
                    cart.reduce((sum, item) => sum + (item.product.dolar_price ?? 0) * item.quantity, 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
                <span>$6.99</span>
              </div>
              {discountInfo && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>{locale === 'es' ? 'Descuento' : 'Discount'} ({discountInfo.code})</span>
                  <span>- {formatUSD(discountInfo.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold border-t pt-2">
                <span>{locale === 'es' ? 'Total del pedido:' : 'Total of the order:'}</span>
                <span className="text-xs font-bold text-teal-700">
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

      <div className="text-xs text-gray-600 mt-4">
        <span className="text-red-500">*</span> {locale === 'es' ? 'Campos requeridos' : 'Required fields'}
      </div>
    </section>
  );
}

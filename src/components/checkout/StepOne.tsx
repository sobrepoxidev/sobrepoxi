import { Database } from "@/types-db";
import { useState } from "react";

type ProductType = Database['products'];

type CartItem = {
    product: ProductType;
    quantity: number;
  };
  
export default function StepOne({
    cart,
    onContinue,
  }: {
    cart: CartItem[];
    onContinue: () => void;
  }) {
    const [formData, setFormData] = useState({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      direccion1: '',
      direccion2: '',
      provincia: '',
      canton: '',
      distrito: '',
      codigoPostal: '',
    });
  
    const [errors, setErrors] = useState<Record<string, string>>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Clear error when user types
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    };
  
    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      // Required fields validation
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
      if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
      if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo electrónico inválido';
      if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
      if (!formData.direccion1.trim()) newErrors.direccion1 = 'La dirección es requerida';
      if (!formData.provincia.trim()) newErrors.provincia = 'La provincia es requerida';
      if (!formData.canton.trim()) newErrors.canton = 'El cantón es requerido';
      if (!formData.distrito.trim()) newErrors.distrito = 'El distrito es requerido';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        onContinue();
      } else {
        // Scroll to first error
        const firstError = document.querySelector('[data-error="true"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
  
    // Costa Rica provinces
    const provincias = [
      'San José',
      'Alajuela',
      'Cartago',
      'Heredia',
      'Guanacaste',
      'Puntarenas',
      'Limón'
    ];
  
    return (
      <section className="w-full text-gray-950">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-md p-4">
              
              {/* Account section */}
              <div className="p-2">
                <p>¿Tiene una cuenta con nosotros? Inicie sesión para acelerar su compra. 
                  <a href="#" className="text-[#4A9DAB] font-medium ml-1 hover:underline">Entrar</a>
                </p>
              </div>
              
              {/* Shipping Address header */}
              <div className="bg-teal-600 p-4 text-white font-medium rounded-md">
                Información de envío
              </div>
              
              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.nombre ? "true" : "false"}
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                
                {/* Apellidos */}
                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium mb-1">
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.apellidos ? "true" : "false"}
                  />
                  {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium mb-1">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="8888-8888"
                    className={`w-full p-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.telefono ? "true" : "false"}
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                </div>
                
                {/* Dirección 1 */}
                <div className="md:col-span-2">
                  <label htmlFor="direccion1" className="block text-sm font-medium mb-1">
                    Dirección <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="direccion1"
                    name="direccion1"
                    value={formData.direccion1}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.direccion1 ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.direccion1 ? "true" : "false"}
                  />
                  {errors.direccion1 && <p className="text-red-500 text-xs mt-1">{errors.direccion1}</p>}
                </div>
                
                {/* Provincia */}
                <div>
                  <label htmlFor="provincia" className="block text-sm font-medium mb-1">
                    Provincia <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.provincia ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.provincia ? "true" : "false"}
                  >
                    <option value="">Seleccionar provincia</option>
                    {provincias.map((provincia) => (
                      <option key={provincia} value={provincia}>
                        {provincia}
                      </option>
                    ))}
                  </select>
                  {errors.provincia && <p className="text-red-500 text-xs mt-1">{errors.provincia}</p>}
                </div>
                
                {/* Cantón */}
                <div>
                  <label htmlFor="canton" className="block text-sm font-medium mb-1">
                    Cantón <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="canton"
                    name="canton"
                    value={formData.canton}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.canton ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.canton ? "true" : "false"}
                  />
                  {errors.canton && <p className="text-red-500 text-xs mt-1">{errors.canton}</p>}
                </div>
                
                {/* Distrito */}
                <div>
                  <label htmlFor="distrito" className="block text-sm font-medium mb-1">
                    Distrito <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="distrito"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.distrito ? 'border-red-500' : 'border-gray-300'}`}
                    data-error={errors.distrito ? "true" : "false"}
                  />
                  {errors.distrito && <p className="text-red-500 text-xs mt-1">{errors.distrito}</p>}
                </div>
                
                {/* Código Postal */}
                <div>
                  <label htmlFor="codigoPostal" className="block text-sm font-medium mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  type="submit" 
                  className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
                >
                  CONTINUAR
                </button>
              </div>
            </form>
          </div>
          
          {/* Right column - Order summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-md p-4 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>
              
              {/* Cart items */}
              <div className="space-y-4 mb-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-start border-b pb-3">
                    <div className="flex-grow">
                      <p className="font-medium">{item.product.name || 'Producto'}</p>
                      <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.product.price ? `₡${(item.product.price * item.quantity).toFixed(2)}` : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Total parcial</span>
                  <span>
                    ₡{cart.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>₡3,200.00</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total del pedido:</span>
                  <span>
                    ₡{(cart.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0) + 3200).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 mt-4">
          <span className="text-red-500">*</span> Campos requeridos
        </div>
      </section>
    );
  }
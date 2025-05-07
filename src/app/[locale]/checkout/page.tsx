'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useSupabase } from '@/app/supabase-provider/provider'
import StepOne from "@/components/checkout/StepOne";
import StepTwo from "@/components/checkout/StepTwo";  
import { supabase } from "@/lib/supabaseClient";

type PaymentMethod = "sinpe" | "paypal" | "transfer" | "card";
type Banco = {
    nombre: string;
    sms?: string;
    permiteSMS: boolean;
};

interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
}

// Removed unused Product and CartItem types

export default function CheckoutWizardPage() {
    const router = useRouter();
    const {
      cart,
      removeFromCart,
      clearCart
      // Removed unused cartSubtotal
    } = useCart();
    

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  
    // SINPE
    const [bancoSeleccionado, setBancoSeleccionado] = useState<Banco | null>(null);
    const [ultimos4, setUltimos4] = useState("");
  
    const { session } = useSupabase();
    const userId = session?.user?.id || null;


    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
    // Using _ prefix to indicate these state setters are needed but the values aren't directly used
    const [, setIsProcessing] = useState(false);
    const [, setOrderComplete] = useState(false);
  
    // -------------- Steps --------------
    const goNext = () => setCurrentStep((s) => s + 1);
    const goBack = () => setCurrentStep((s) => s - 1);
  
    const validateStep1 = (address: ShippingAddress) => {
      setShippingAddress(address);
      goNext();
    };
  


    // -------------- createOrder() y resto --------------
    const createOrder = async (paymentMethodAux?: string) => {
      setIsProcessing(true);
      try {
        // Check if we have shipping address
        if (!shippingAddress) {
          alert('Se requiere dirección de envío');
          return;
        }
        
        
        // Calculate total with discounts
        const subtotal = cart.reduce((acc, item) => {
          if (!item.product.price) return acc;
          
          const price = item.product.price;
          const discount = item.product.discount_percentage || 0;
          const finalPrice = price * (1 - (discount / 100));
          
          return acc + finalPrice * item.quantity;
        }, 0);
        
        // Shipping cost
        const shipping = cart.length ? 3200 : 0;
        const totalAmount = subtotal + shipping;
  
        // Create order with shipping address and pending status
        const { data: orderInsert, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: userId,
            payment_method: paymentMethodAux ? paymentMethodAux : paymentMethod,
            payment_status: "pendiente",
            shipping_status: "pendiente",
            total_amount: totalAmount,
            shipping_address: shippingAddress,
          })
          .select()
          .single();
    
        if (orderError || !orderInsert) {
          alert(`Error creando la orden en la BD: ${orderError?.message}`);
          setIsProcessing(false);
          return;
        }
    
        // Save orderId in state
        setCreatedOrderId(orderInsert.id);
        
        // Add order items
        for (const item of cart) {
          const { error: itemError } = await supabase
            .from("order_items")
            .insert({
              order_id: orderInsert.id,
              product_id: item.product.id,
              quantity: item.quantity,
              price: item.product.price || 0
            });
            
          if (itemError) {
            console.error("Error al crear elementos de orden:", itemError);
          }
        }
        
        // Clear cart items from cart_items table if logged in
        if (userId) {
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", userId);
        }
        
        // Set order as complete
        setOrderComplete(true);
        
        // Clear local cart
        clearCart();
        
        return orderInsert.id;
      } catch (error) {
        console.error("Error al procesar la orden:", error);
        alert("Error al procesar la orden. Inténtalo de nuevo.");
      } finally {
        setIsProcessing(false);
      }
    };
  
    const validateStep2 = async () => {
      if (!paymentMethod) {
        alert("Debes seleccionar un método de pago");
        return;
      }
      
      // Additional validations
      if (paymentMethod === "sinpe") {
        if (!bancoSeleccionado) {
          alert("Selecciona un banco para SINPE");
          return;
        }
        if (ultimos4.length !== 4) {
          alert("Faltan los últimos 4 dígitos del recibo");
          return;
        }
      }
      
      // Create the order
      const orderId = await createOrder();
      
      if (orderId) {
        // If the payment is SINPE, update the reference
        if (paymentMethod === "sinpe" && bancoSeleccionado) {
          const paymentReference = `4 ultimos digitos: ${ultimos4} - Banco: ${bancoSeleccionado.nombre}`;
          
          await supabase
            .from("orders")
            .update({ payment_reference: paymentReference })
            .eq("id", orderId);
        }
        
        // Redirect to confirmation page
        router.push(`/order-confirmation/${orderId}`);
      }
    };
  
    // -------------- Render principal --------------
    if (cart.length === 0) {
      return (
        <main className="w-full mx-auto px-6 py-14 flex flex-row gap-4">
          <button onClick={() => router.back()} className="bg-teal-600 p-2 rounded-md text-gray-800 hover:bg-teal-700 transition">
            &larr; Regresar
          </button>
          <h1 className="text-2xl font-bold mt-4 text-gray-900">Carrito vacío</h1>
        </main>
      );
    }
  
    return (
      <main className="w-full flex flex-col min-h-[67vh] py-2 px-4 md:px-12 lg:px-24">
        {/* Encabezado */}
        <header className="flex items-center gap-4 mb-6">
          {currentStep > 1 && currentStep <= 3 && (
            <button
              onClick={goBack}
              className="bg-teal-600 text-gray-800 p-1 rounded-md hover:bg-teal-700 transition "
            >
              &larr; Paso anterior
            </button>
          )}
          {currentStep === 1 && (
            <button
              onClick={() => router.back()}
              className="bg-teal-600 text-gray-800 p-1 rounded-md hover:bg-teal-700 transition "
            >
              &larr; Regresar
            </button>
          )}
          {currentStep >= 1 && currentStep <= 3 ? (
            <h1 className="text-base sm:text-2xl font-bold text-gray-900">{currentStep==1?"Información de entrega":currentStep==2?"Pago":currentStep==3?"Pago":"Confirmación"} (Paso {currentStep} de 3)</h1>
          ) : (
            <h1 className="text-base sm:text-2xl font-bold">¡Compra realizada con éxito!</h1>
          )}
        </header>
  
        {/* Steps */}
         {currentStep === 1 && (
          <StepOne
            cart={cart}
            onContinue={validateStep1}
            initialData={shippingAddress}
          />
        )}
        {
          currentStep === 2 && (
            <StepTwo
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cart={cart}
              removeFromCart={removeFromCart}
              bancoSeleccionado={bancoSeleccionado}
              setBancoSeleccionado={setBancoSeleccionado}
              ultimos4={ultimos4}
              setUltimos4={setUltimos4}
              total={(cart.reduce((acc, item) => acc + (item.product.price ?? 0) * item.quantity, 0) + 3200)}
              onFinalize={validateStep2}
              createdOrderId={createdOrderId}
              createOrder={createOrder}
            />
          ) 
        }
        
      </main>
    );
  }


  
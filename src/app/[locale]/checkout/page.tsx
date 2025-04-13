'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useSupabase } from '@/app/supabase-provider/provider'
import StepOne from "@/components/checkout/StepOne";
import StepTwo from "@/components/checkout/StepTwo";  

import { supabase } from "@/lib/supabaseClient";
//import { sendCartEmail } from "@/app/actions/sendCartEmail";

type PaymentMethod = "sinpe" | "paypal" | "transfer" | "card";
type PaymentStatus = "pending" | "paid";
type Banco = {
    nombre: string;
    sms?: string;
    permiteSMS: boolean;
  };

export default function CheckoutWizardPage() {
    const router = useRouter();
    const {
      cart,
      clearCart,
      removeFromCart, 
    } = useCart();
  
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  
    // SINPE
    const [bancoSeleccionado, setBancoSeleccionado] = useState<Banco | null>(null);
    const [ultimos4, setUltimos4] = useState("");
  
  
    const { session } = useSupabase();
    const userId = session?.user?.id || null;
    const correo = session?.user?.email;
    const nombreUsuario = session?.user?.user_metadata?.name;
    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  
  
    // -------------- Steps --------------
    const goNext = () => setCurrentStep((s) => s + 1);
    const goBack = () => setCurrentStep((s) => s - 1);
  
    const validateStep1 = () => {
      goNext();
    };
  
    // -------------- createOrder() y resto --------------
    const createOrder = async (paymentMethodAux?: string) => {
      // 1) Crear la orden en BD
      const totalAmount = cart.reduce((acc, t) => acc + (t.product.price ?? 0), 0) + 3200;

  
      // Creamos la orden con estado "pending"
      const { data: orderInsert, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          payment_method: paymentMethodAux? paymentMethodAux : paymentMethod,
          payment_status: "pending",
          total_amount: totalAmount
        })
        .select()
        .single();
  
      if (orderError || !orderInsert) {
        alert(`Error creando la orden en la BD: ${orderError?.cause} - ${orderError?.message}`);
        return;
      }
  
      // 3) Guardamos orderId en el state
      setCreatedOrderId(orderInsert.id);
  
      // 4) (Opcional) No vaciamos el carrito todavía, porque no está pagado
      // Esperamos a la confirmación final en PayPal
    };
  
    const validateStep2 = () => {
      if (!paymentMethod) {
        alert("Debes seleccionar un método de pago");
        return;
      }
      
      goNext();
    };
  
    const validateStep3 = () => {
      goNext();
    };
  
    const handlePayment = async () => {
      // ... Mismo que tu ejemplo, pero a la hora de insertar en user_tickets,
      // usas "number" Y "serie" del selectedCombos para cada item
      // Ejemplo:
      //
      //   const chosen = selectedCombos[item.id]; // {number, serie}
      //   await supabase.from("user_tickets").insert({
      //     ticket_type_id: item.id,
      //     number: chosen.number,
      //     serie: chosen.serie,
      //     ...
      //   })
      // ...
      
      let paymentStatus: "pending" | "paid" = "paid";
    
      // Validaciones para SINPE
      if (paymentMethod === "sinpe") {
        if (!bancoSeleccionado) {
          alert("Selecciona un banco para SINPE");
          return;
        }
        if (ultimos4.length !== 4) {
          alert("Faltan los últimos 4 dígitos del recibo");
          return;
        }
  
        let paymentReference: string | null = null;
  
        paymentStatus = "pending";
        paymentReference = `4 ultimos digitos: ${ultimos4} - Banco: ${bancoSeleccionado.nombre}`;
  
        // actualizar payment reference
        const { data: order, error: errorUpdate } = await supabase
          .from("orders")
          .update({ payment_reference: paymentReference })
          .eq("id", createdOrderId)
          .select()
          .single();
  
  
  
        if (errorUpdate || !order) {
          console.error("Error al actualizar la orden:", errorUpdate);
          alert("Hubo un error al procesar la orden. Intenta de nuevo.");
          return;
        }
  
        // 2) Insertar cada ticket en `user_tickets`, asociándolo a `order_id`
        for (const item of cart) {         
  
          const { error: ticketError } = await supabase.from("order_items").insert({
            order_id: createdOrderId,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          });
  
          if (ticketError) {
            console.error("Error insertando user_ticket:", ticketError);
            // Podrías plantearte rollback, o manejar de otra forma
          }
        }
      }
      else if (paymentMethod === "paypal") {
        // 2) Insertar tickets is_locked=false
        for (const item of cart) {
            
          const { error: ticketError } = await supabase.from("order_items").insert({
            order_id: createdOrderId,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          });
          if (ticketError) {
            console.error("Error insertando user_tickets:", ticketError);
          }
        }
      }
      // else if (paymentMethod === "sinpe") {
      //   ...
      // } ...
  
      // 4) Navegar o mostrar mensaje
      if (paymentMethod === "sinpe") {
        // Si es SINPE => compra pendiente
        setPaymentStatus("pending");
        //addManyToCartBuyed(cart);
  
        //cart copy
        
  
        if (correo) {
        const cartCopy = [...cart];
          //await sendCartEmail(cartCopy, correo, nombreUsuario, createdOrderId? createdOrderId : 0, paymentMethod);
        }
        clearCart();
      } else if (paymentStatus === "paid") {
        // Pagos inmediatos
        setPaymentStatus("paid");
        //addManyToCartBuyed(cart);
  
        if (correo) {
          const cartCopy = [...cart];
          //await sendCartEmail(cartCopy, correo, nombreUsuario, createdOrderId? createdOrderId : 0, paymentMethod? paymentMethod : "");
        }
        clearCart();
        //router.push(`/personalizar-tickets?order=${createdOrder.id}`);
      }
      validateStep3();
    };
  
    // -------------- Render principal --------------
    if (cart.length === 0 && paymentStatus === null) {
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
          />
        )} 
        {
          currentStep === 2 && (
            <StepTwo
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onContinue={validateStep2}
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


  
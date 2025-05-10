
import PayPalCardMethod from "./PayPalCardMethod";
import toast from "react-hot-toast";

type PaymentMethod = "sinpe" | "paypal" | "transfer" | "card";
type Banco = {
    nombre: string;
    sms?: string;
    permiteSMS: boolean;
};
const bancos = [
    { nombre: "Banco Nacional de Costa Rica (BNCR)", sms: "+2627", permiteSMS: true },
    { nombre: "Banco de Costa Rica (BCR)", sms: "+2276 (Solo Kolbi)", permiteSMS: true },
    { nombre: "BAC Credomatic", sms: "+7070-1222", permiteSMS: true },
    { nombre: "Banco Popular", permiteSMS: false },
    { nombre: "Davivienda", sms: "+7070 o +7474", permiteSMS: true },
    { nombre: "Scotiabank", permiteSMS: false },
    { nombre: "Banco Promerica", sms: "+6223 o +2450", permiteSMS: true },
    { nombre: "Banco Lafise", sms: "+9091", permiteSMS: true },
];

export default function PaymentForm({
    paymentMethod,
    bancoSeleccionado,
    setBancoSeleccionado,
    ultimos4,
    setUltimos4,
    total,
    onFinalize,
    createdOrderId,

  }: {
    paymentMethod: PaymentMethod | null;
  
    bancoSeleccionado: Banco | null;
    setBancoSeleccionado: (v: Banco | null) => void;
    ultimos4: string;
    setUltimos4: (v: string) => void;
    total: number;
    onFinalize: () => void;
    createdOrderId: number | null;
 

}) {
    const copiarMensaje = () => {
        if (bancoSeleccionado?.permiteSMS) {
            const mensaje = `PASE 1000 8888-9999`;
            navigator.clipboard.writeText(mensaje);
            toast.success("Mensaje copiado al portapapeles", {
                duration: 3000,
                position: "top-center",
                style: {
                    background: "#10b981",
                    color: "white",
                    fontWeight: "500"
                },
                icon: "📋"
            });
        }
    };
    const handleBancoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const banco = bancos.find((b) => b.nombre === e.target.value);
        setBancoSeleccionado(banco || null);
    };
    // Render condicional según método
    const renderPaymentForm = () => {
        switch (paymentMethod) {
            case "sinpe":
                return (
                    <div className="mt-4 bg-teal-50 border border-teal-300 rounded-md p-4 ">
                        <p className="text-sm mb-2">
                            Monto total: <b>₡{total}</b>.
                            Envia tu pago vía Sinpe con la siguiente info:
                        </p>
                        <label className="block mb-1 text-sm font-medium">Selecciona Banco:</label>
                        <select
                            value={bancoSeleccionado?.nombre || ""}
                            onChange={handleBancoChange}
                            className="w-full p-2 border rounded-md mb-2"
                        >
                            <option value="">-- Selecciona Banco --</option>
                            {bancos.map((b, idx) => (
                                <option key={idx} value={b.nombre} >
                                    {b.nombre}
                                </option>
                            ))}
                        </select>
                        {/* Instrucciones dinámicas */}
                        {bancoSeleccionado && (
                            <div className="mt-3 p-3 border border-teal-300 rounded-md text-sm">
                                {bancoSeleccionado.permiteSMS ? (
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-gray-700 ">
                                                📲 Enviar SMS a: <b>{bancoSeleccionado.sms}</b>
                                            </p>
                                            <p className="text-gray-700 ">
                                                💬 Mensaje: <b>PASE {total} 85850000 HM-ART</b>
                                            </p>
                                        </div>
                                        <button
                                            onClick={copiarMensaje}
                                            className="mt-2 sm:mt-0 sm:w-auto text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                                        >
                                            📋 Copiar Mensaje
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-700 ">
                                        📱 Realiza la transferencia desde la app o banca en línea de <b>{bancoSeleccionado.nombre}</b>.
                                    </p>
                                )}
                            </div>
                        )}


                        <label className="block mb-1 text-sm font-medium">Últimos 4 dígitos del recibo:</label>
                        <input
                            type="text"
                            maxLength={4}
                            placeholder="1234"
                            value={ultimos4}
                            onChange={(e) => setUltimos4(e.target.value)}
                            className="w-full p-2 border rounded-md mb-2"
                        />
                        {/* Podrías mostrar un botón para "Copiar mensaje" si el banco lo permite, etc. */}
                        <button
                            onClick={onFinalize}
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md"
                        >
                            Confirmar y Finalizar
                        </button>
                    </div>
                );
            case "paypal":
                return (
                    <div className="p-4 bg-teal-50 border border-teal-300 text-teal-800 rounded-md text-center mb-2">
                        {/* <p className="text-sm md:text-base">Paypal.</p> */}
                        {createdOrderId && (
                            <PayPalCardMethod
                                createdOrderId={createdOrderId}
                                total={total}
                                onPaymentSuccess={() => {
                                    onFinalize();
                                }}
                                onPaymentError={(msg) => {
                                    console.error(msg);
                                }}
                            />
                        )}
                    </div>
                );
            case "transfer":
                return (
                    <div className="p-4 bg-blue-50 border border-blue-300 text-blue-800 rounded-md text-center mb-2">
                        <p className="text-sm md:text-base">Instrucciones para transferencia bancaria.</p>
                    </div>
                );
            case "card":
                return (
                    <div className="p-4 bg-blue-50 border border-blue-300 text-blue-800 rounded-md text-center mb-2">
                        <p className="text-sm md:text-base">Formulario de tarjeta de crédito/débito (Stripe, etc.).</p>
                    </div>
                );
            default:
                return (
                    <div className="p-4 bg-teal-50 border border-teal-300 text-teal-800 rounded-md text-center mb-2">
                        <p className="text-sm md:text-base">Aquí se mostrará el formulario de pago</p>
                    </div>
                );
        }
    };

    return (
        <section className="text-gray-900 w-full mt-4">
            {renderPaymentForm()}

        </section>
    );
}
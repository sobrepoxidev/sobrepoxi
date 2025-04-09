"use client";
import { useActionState} from 'react';
import { handleVacationForm } from "../../actions";
import { motion } from 'framer-motion';
import { FaSpinner, FaCheck } from 'react-icons/fa';

export default function FormMail() {
  const [state, formAction, isPending] = useActionState(handleVacationForm, null);

  return (
    <div>
      <motion.form
        action={formAction}
        className="space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4 text-start">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full p-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all text-sm md:text-base"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all text-sm md:text-base"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+52 XXX XXX XXXX"
              className="w-full p-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all text-sm md:text-base"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Mensaje
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="¿Cómo podemos ayudarte?"
              className="w-full p-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all resize-y min-h-24 text-sm md:text-base"
              disabled={isPending }
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center
                      text-sm md:text-base font-medium
                      ${state?.success 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'rounded-md bg-teal-600 px-6 py-3 text-white shadow transition hover:bg-teal-700 flex items-center justify-center gap-1'} 
                      disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isPending ? (
              <>
                <FaSpinner className="inline-block animate-spin mr-2" />
                <span>Enviando...</span>
              </>
            ) : state?.success ? (
              <>
                <FaCheck className="inline-block mr-2" />
                <span>¡Enviado con éxito!</span>
              </>
            ) : (
              <span>Enviar mensaje</span>
            )}
          </button>
          {state && !state?.success && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center text-sm md:text-base font-medium p-2 rounded
                ${state?.success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}
            >
              {state?.message}
            </motion.p>
          )}
        </div>
      </motion.form>
    </div>
  );
}
import React from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Client components with no SSR (contain interactivity)
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: true });
const FormMail = dynamic(() => import('@/components/general/FormMail'), { ssr: true });

import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Contáctanos" : "Contact us"),
    ...getCommonMetadata(locale),
  };
}

export default function ContactPage() {
  return (
    <div className="w-full transition-colors flex flex-col justify-start items-center">
      <section className="w-full max-w-7xl flex flex-col items-center text-center py-1 px-1 md:py-3 sm:px-5 md:px-14 lg:px-5 relative">
        <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="w-full text-xl sm:text-5xl font-extrabold text-start text-teal-800 mt-1">
            Contáctanos
          </h1>
          <p className="w-full text-sm sm:text-lg text-gray-600 mt-2 text-start">
            Estamos aquí para ayudarte. ¡No dudes en ponerte en contacto!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
          {/* Contact Information */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-5 md:p-6 rounded-xl shadow-md text-gray-900 h-full"
          >
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-teal-800">Información de Contacto</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mt-1">
                <FaPhone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Teléfono</h3>
                <p className="text-gray-600 text-sm md:text-base">+506 8585-0000</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Disponible de Lunes a Viernes, 7AM - 5:30PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600 mt-1">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-gray-600 text-sm md:text-base">+506 8585-0000</p>
                <a 
                  href="https://wa.me/50685850000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-2 text-sm md:text-base text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Chatear en WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600 mt-1">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 text-sm md:text-base">info@handmadeart.com</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Te responderemos en 24-48 horas</p>
              </div>
            </div>
          </div>
          </MotionDiv>

          {/* Contact Form */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-5 md:p-6 rounded-xl shadow-md text-gray-900 h-full"
          >
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-teal-800">Formulario de Contacto</h2>
          <FormMail />
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
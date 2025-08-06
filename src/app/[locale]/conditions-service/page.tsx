import React from 'react';
import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Términos y Condiciones de Servicio" : "Terms and Conditions"),
    ...getCommonMetadata(locale),
  };
}

export default async function TerminosCondicionesPage({ params }: { params: tParams }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-[#121212] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#303030] shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-500 bg-gradient-to-br from-[#363636] via-[#121212] to-[#363636]">
          <h1 className="text-4xl font-extrabold gold-gradient-bright text-center mb-2">
            {locale === "es" ? "Términos y Condiciones de Servicio" : "Terms and Conditions"}
          </h1>
          <p className="text-gray-200 text-center">
            {locale === "es" ? "Última actualización: 06 de agosto de 2025" : "Last updated:  august 06, 2025"}
          </p>
        </div>

        <div className="px-6 py-8 prose prose-gray max-w-none text-gray-200 leading-relaxed">
          <div className="mb-12">
            <p className="text-lg font-medium">
              {locale === "es" ? `Bienvenido a SobrePoxi. Estos Términos y Condiciones ("Términos") constituyen un acuerdo legal entre usted y SobrePoxi para la prestación de nuestros servicios de diseño, fabricación e instalación de muebles con resina epóxica y pisos epóxicos. Lea detenidamente estos Términos antes de contratar nuestros servicios.` : "Welcome to SobrePoxi. These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legal agreement between you and SobrePoxi for the provision of our design, manufacturing and installation services for epoxy resin furniture and epoxy floors. Read these Terms carefully before hiring our services."}
            </p>
            <p>
              {locale === "es" ? "Al solicitar una cotización, contratar nuestros servicios o utilizar nuestro sitio web, usted acepta estar legalmente vinculado por estos Términos. Si no está de acuerdo con alguna parte de estos Términos, le pedimos que no utilice nuestros servicios." : "By requesting a quote, hiring our services or using our website, you accept being legally bound by these Terms. If you do not agree with any part of these Terms, we ask you not to use our services."}
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">1. {locale === "es" ? "Descripción del Servicio" : "Service Description"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "SobrePoxi ofrece servicios especializados en el diseño, fabricación e instalación de muebles con resina epóxica y pisos epóxicos personalizados. Nuestro proceso incluye consultoría inicial, diseño personalizado, selección de materiales, fabricación artesanal e instalación profesional."
                : "SobrePoxi offers specialized services in the design, manufacturing and installation of custom epoxy resin furniture and epoxy floors. Our process includes initial consultation, custom design, material selection, artisanal manufacturing and professional installation."
              }
            </p>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Trabajamos con resinas epóxicas de alta calidad, maderas selectas y materiales premium para crear piezas únicas que combinan funcionalidad, durabilidad y estética excepcional."
                : "We work with high-quality epoxy resins, select woods and premium materials to create unique pieces that combine functionality, durability and exceptional aesthetics."
              }
            </p>
            <p className="text-gray-300">
              {locale === "es" 
                ? "Nuestros servicios incluyen mesas de río, encimeras, pisos decorativos, muebles personalizados y soluciones epóxicas para espacios comerciales y residenciales, con garantía de calidad y servicio postventa."
                : "Our services include river tables, countertops, decorative floors, custom furniture and epoxy solutions for commercial and residential spaces, with quality guarantee and after-sales service."
              }
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">2. {locale === "es" ? "Definiciones" : "Definitions"}</h2>
            <ul className="space-y-4 pl-5 list-disc">
              <li>
                <span className="font-medium">{locale === "es" ? "SobrePoxi:" : "SobrePoxi:"}</span> {locale === "es" ? "Empresa especializada en el diseño, fabricación e instalación de muebles con resina epóxica y pisos epóxicos personalizados." : "Company specialized in the design, manufacturing and installation of custom epoxy resin furniture and epoxy floors."}
              </li>
              <li>
                <span className="font-medium">{locale === "es" ? "Cliente:" : "Client:"}</span> {locale === "es" ? "Cualquier persona física o jurídica que solicite cotizaciones, contrate o utilice nuestros servicios de fabricación e instalación." : "Any individual or legal entity that requests quotes, hires or uses our manufacturing and installation services."}
              </li>
              <li>
                <span className="font-medium">{locale === "es" ? "Servicios:" : "Services:"}</span> {locale === "es" ? "Diseño personalizado, fabricación, instalación y mantenimiento de muebles con resina epóxica y pisos epóxicos, incluyendo asesoría técnica y garantías." : "Custom design, manufacturing, installation and maintenance of epoxy resin furniture and epoxy floors, including technical advice and warranties."}
              </li>
              <li>
                <span className="font-medium">{locale === "es" ? "Proyecto:" : "Project:"}</span> {locale === "es" ? "Trabajo específico contratado que incluye diseño, materiales, fabricación e instalación de productos epóxicos según especificaciones acordadas." : "Specific contracted work that includes design, materials, manufacturing and installation of epoxy products according to agreed specifications."}
              </li>
              <li>
                <span className="font-medium">{locale === "es" ? "Cotización:" : "Quote:"}</span> {locale === "es" ? "Propuesta comercial detallada que incluye especificaciones técnicas, materiales, plazos de entrega y costos del proyecto solicitado." : "Detailed commercial proposal that includes technical specifications, materials, delivery times and costs of the requested project."}
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">2. {locale === "es" ? "Registro y Cuenta de Usuario" : "Registration and User Account"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">2.1 {locale === "es" ? "Proceso de Registro" : "Registration Process"}</h3>
            <p>
              {locale === "es" ? "Para acceder a nuestros servicios, deberá crear una cuenta proporcionando un correo electrónico válido. El proceso de registro está diseñado para ser simple y requerir únicamente información esencial:" : "To access our services, you must create an account by providing a valid email address. The registration process is designed to be simple and require only essential information:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Un correo electrónico válido que será su identificador principal." : "A valid email address that will be your primary identifier."}</li>
              <li>{locale === "es" ? "Una contraseña que cumpla con nuestros requisitos mínimos de seguridad." : "A password that meets our minimum security requirements."}</li>
              <li>{locale === "es" ? "Opcionalmente, una imagen de perfil que podrá agregar o modificar posteriormente." : "Optionally, a profile picture that you can add or modify later."}</li>
            </ul>
            <p className="mt-4">
              {locale === "es" ? "Al registrarse, usted declara y garantiza que:" : "By registering, you declare and guarantee that:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Tiene al menos 18 años de edad o cuenta con el consentimiento de sus padres o tutores legales." : "You are at least 18 years old or have the consent of your parents or legal guardians."}</li>
              <li>{locale === "es" ? "La información proporcionada es precisa, veraz, actual y completa." : "The information provided is accurate, true, current, and complete."}</li>
              <li>{locale === "es" ? "El correo electrónico proporcionado le pertenece legítimamente." : "The email address provided belongs to you legitimately."}</li>
              <li>{locale === "es" ? "No está suplantando la identidad de otra persona o entidad." : "You are not impersonating another person or entity."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">2.2 {locale === "es" ? "Seguridad de la Cuenta" : "Account Security"}</h3>
            <p>
              {locale === "es" ? "La seguridad de su cuenta es fundamental para nosotros, pero también depende en gran medida de sus acciones. Para mantener su cuenta segura:" : "The security of your account is fundamental for us, but it also depends to a great extent on your actions. To keep your account secure:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Utilice una contraseña única y robusta que no emplee en otros servicios." : "Use a unique and strong password that you do not use in other services."}</li>
              <li>{locale === "es" ? "Mantenga la confidencialidad de sus credenciales de acceso en todo momento." : "Maintain the confidentiality of your access credentials at all times."}</li>
              <li>{locale === "es" ? "No comparta su contraseña o información de inicio de sesión con terceros." : "Do not share your password or login information with third parties."}</li>
              <li>{locale === "es" ? "Cierre sesión después de utilizar nuestros servicios, especialmente en dispositivos compartidos." : "Log out after using our services, especially on shared devices."}</li>
              <li>{locale === "es" ? "Notifíquenos inmediatamente si detecta actividad sospechosa o accesos no autorizados a su cuenta." : "Notify us immediately if you detect suspicious activity or unauthorized access to your account."}</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">2.3 {locale === "es" ? "Responsabilidades del Cliente" : "Client Responsibilities"}</h3>
            <p>
              {locale === "es" ? "Al contratar nuestros servicios, el cliente se compromete a cumplir con las siguientes responsabilidades para garantizar el éxito del proyecto y la calidad del resultado final." : "By hiring our services, the client commits to fulfill the following responsibilities to ensure project success and the quality of the final result."}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Proporcionar información precisa sobre el espacio, medidas y especificaciones del proyecto" : "Provide accurate information about the space, measurements and project specifications"}</li>
              <li>{locale === "es" ? "Facilitar el acceso al lugar de instalación en las fechas acordadas" : "Facilitate access to the installation site on agreed dates"}</li>
              <li>{locale === "es" ? "Realizar los pagos según el cronograma establecido en la cotización" : "Make payments according to the schedule established in the quote"}</li>
              <li>{locale === "es" ? "Preparar el espacio según las indicaciones técnicas proporcionadas" : "Prepare the space according to the technical instructions provided"}</li>
              <li>{locale === "es" ? "Comunicar cualquier cambio o modificación antes del inicio de la fabricación" : "Communicate any changes or modifications before manufacturing begins"}</li>
              <li>{locale === "es" ? "Mantener las condiciones ambientales adecuadas durante el proceso de curado" : "Maintain adequate environmental conditions during the curing process"}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">3. {locale === "es" ? "Proceso de Proyecto" : "Project Process"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">3.1 {locale === "es" ? "Consulta Inicial y Cotización" : "Initial Consultation and Quote"}</h3>
            <p>
              {locale === "es" ? "Nuestro proceso inicia con una consulta detallada para entender sus necesidades y proporcionar una cotización precisa:" : "Our process begins with a detailed consultation to understand your needs and provide an accurate quote:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Evaluación del espacio y mediciones precisas" : "Space evaluation and precise measurements"}</li>
              <li>{locale === "es" ? "Análisis de requerimientos técnicos y estéticos" : "Analysis of technical and aesthetic requirements"}</li>
              <li>{locale === "es" ? "Selección de materiales y acabados" : "Material and finish selection"}</li>
              <li>{locale === "es" ? "Cotización detallada con cronograma de trabajo" : "Detailed quote with work schedule"}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">3.2 {locale === "es" ? "Diseño y Aprobación" : "Design and Approval"}</h3>
            <p>
              {locale === "es" ? "Una vez aceptada la cotización, procedemos con el diseño personalizado:" : "Once the quote is accepted, we proceed with the custom design:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Creación de diseños 3D y renders fotorrealistas" : "Creation of 3D designs and photorealistic renders"}</li>
              <li>{locale === "es" ? "Revisiones y ajustes según feedback del cliente" : "Reviews and adjustments based on client feedback"}</li>
              <li>{locale === "es" ? "Aprobación final del diseño antes de fabricación" : "Final design approval before manufacturing"}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">3.3 {locale === "es" ? "Fabricación e Instalación" : "Manufacturing and Installation"}</h3>
            <p>
              {locale === "es" ? "La fabricación e instalación se realizan con los más altos estándares de calidad:" : "Manufacturing and installation are carried out with the highest quality standards:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Fabricación artesanal con materiales premium" : "Artisanal manufacturing with premium materials"}</li>
              <li>{locale === "es" ? "Control de calidad en cada etapa del proceso" : "Quality control at each stage of the process"}</li>
              <li>{locale === "es" ? "Instalación profesional por técnicos especializados" : "Professional installation by specialized technicians"}</li>
              <li>{locale === "es" ? "Entrega con garantía y manual de cuidados" : "Delivery with warranty and care manual"}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">4. {locale === "es" ? "Datos del Cliente y Privacidad" : "Client Data and Privacy"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">4.1 {locale === "es" ? "Información Recopilada" : "Information Collected"}</h3>
            <p>
              {locale === "es" ? "Para proporcionar nuestros servicios de diseño y fabricación, recopilamos la información necesaria para el proyecto:" : "To provide our design and manufacturing services, we collect the information necessary for the project:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Datos de contacto (nombre, teléfono, correo electrónico, dirección)" : "Contact information (name, phone, email, address)"}</li>
              <li>{locale === "es" ? "Especificaciones del proyecto (medidas, materiales, diseño)" : "Project specifications (measurements, materials, design)"}</li>
              <li>{locale === "es" ? "Fotografías del espacio y referencias de diseño" : "Space photographs and design references"}</li>
              <li>{locale === "es" ? "Información de facturación y pagos" : "Billing and payment information"}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">4.2 {locale === "es" ? "Uso de la Información" : "Information Usage"}</h3>
            <p>
              {locale === "es" ? "Su información se utiliza exclusivamente para:" : "Your information is used exclusively for:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Diseñar y fabricar productos según sus especificaciones" : "Design and manufacture products according to your specifications"}</li>
              <li>{locale === "es" ? "Coordinar la instalación y entrega del proyecto" : "Coordinate project installation and delivery"}</li>
              <li>{locale === "es" ? "Procesar pagos y generar facturas" : "Process payments and generate invoices"}</li>
              <li>{locale === "es" ? "Proporcionar garantía y servicio postventa" : "Provide warranty and after-sales service"}</li>
              <li>{locale === "es" ? "Crear portfolio con su consentimiento expreso" : "Create portfolio with your express consent"}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">4.3 {locale === "es" ? "Protección de Datos" : "Data Protection"}</h3>
            <p>
              {locale === "es" ? "Implementamos medidas estrictas de seguridad para proteger su información:" : "We implement strict security measures to protect your information:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Almacenamiento seguro de archivos de proyecto y fotografías" : "Secure storage of project files and photographs"}</li>
              <li>{locale === "es" ? "Acceso restringido solo a personal autorizado" : "Restricted access only to authorized personnel"}</li>
              <li>{locale === "es" ? "Encriptación de datos sensibles y financieros" : "Encryption of sensitive and financial data"}</li>
              <li>{locale === "es" ? "Políticas de confidencialidad para todo el equipo" : "Confidentiality policies for the entire team"}</li>
              <li>{locale === "es" ? "Eliminación segura de datos temporales" : "Secure deletion of temporary data"}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">5. {locale === "es" ? "Uso Aceptable" : "Acceptable Use"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Al utilizar nuestros servicios y sitio web, usted se compromete a:"
                : "By using our services and website, you agree to:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Proporcionar información veraz y precisa sobre su proyecto" : "Provide truthful and accurate information about your project"}</li>
              <li>{locale === "es" ? "Respetar los derechos de propiedad intelectual de nuestros diseños" : "Respect the intellectual property rights of our designs"}</li>
              <li>{locale === "es" ? "Utilizar nuestros servicios únicamente para fines legítimos" : "Use our services only for legitimate purposes"}</li>
              <li>{locale === "es" ? "Mantener comunicación respetuosa con nuestro equipo" : "Maintain respectful communication with our team"}</li>
              <li>{locale === "es" ? "Cumplir con los pagos según los términos acordados" : "Comply with payments according to agreed terms"}</li>
            </ul>

            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Está prohibido:"
                : "It is prohibited to:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300">
              <li>{locale === "es" ? "Reproducir o copiar nuestros diseños sin autorización" : "Reproduce or copy our designs without authorization"}</li>
              <li>{locale === "es" ? "Utilizar nuestras fotografías o contenido sin permiso" : "Use our photographs or content without permission"}</li>
              <li>{locale === "es" ? "Realizar modificaciones no autorizadas durante la instalación" : "Make unauthorized modifications during installation"}</li>
              <li>{locale === "es" ? "Interferir con el proceso de trabajo de nuestro equipo" : "Interfere with our team's work process"}</li>
              <li>{locale === "es" ? "Solicitar trabajos que violen regulaciones locales" : "Request work that violates local regulations"}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">6. {locale === "es" ? "Modificaciones y Comunicaciones" : "Modifications and Communications"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">6.1 {locale === "es" ? "Modificaciones a los Términos" : "Modifications to the Terms"}</h3>
            <p>
              {locale === "es" ? "SobrePoxi se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento:" : "SobrePoxi reserves the right to modify these Terms and Conditions at any time:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web." : "Modifications will take effect immediately after publication on our website."}</li>
              <li>{locale === "es" ? "Para cambios sustanciales, notificaremos a los clientes mediante el correo electrónico proporcionado." : "For significant changes, we will notify clients via the provided email address."}</li>
              <li>{locale === "es" ? "La contratación continuada de nuestros servicios después de dichos cambios constituye su aceptación de los mismos." : "Continued hiring of our services after such changes constitutes your acceptance of them."}</li>
              <li>{locale === "es" ? "Le recomendamos revisar estos Términos periódicamente." : "We recommend periodically reviewing these Terms."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">6.2 {locale === "es" ? "Comunicaciones" : "Communications"}</h3>
            <p>
              {locale === "es" ? "Para comunicaciones importantes relacionadas con su proyecto:" : "For important communications related to your project:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Utilizaremos el correo electrónico proporcionado en su cotización." : "We will use the email address provided in your quote."}</li>
              <li>{locale === "es" ? "Comunicación directa durante el proceso del proyecto." : "Direct communication during the project process."}</li>
              <li>{locale === "es" ? "Avisos prominentes en nuestro sitio web." : "Prominent notices on our website."}</li>
              <li>{locale === "es" ? "Notificaciones en nuestras redes sociales oficiales." : "Notifications on our official social media."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">7. {locale === "es" ? "Cancelación y Terminación" : "Cancellation and Termination"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Las condiciones de cancelación varían según la etapa del proyecto:"
                : "Cancellation conditions vary depending on the project stage:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Antes del inicio de fabricación: cancelación sin penalización" : "Before manufacturing begins: cancellation without penalty"}</li>
              <li>{locale === "es" ? "Durante fabricación: se cobrará el trabajo realizado más materiales" : "During manufacturing: work completed plus materials will be charged"}</li>
              <li>{locale === "es" ? "Después de instalación: no se aceptan cancelaciones, aplican garantías" : "After installation: cancellations not accepted, warranties apply"}</li>
            </ul>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "SobrePoxi puede terminar el servicio en casos de:"
                : "SobrePoxi may terminate service in cases of:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Incumplimiento de pagos según cronograma acordado" : "Non-compliance with payments according to agreed schedule"}</li>
              <li>{locale === "es" ? "Violación de estos términos y condiciones" : "Violation of these terms and conditions"}</li>
              <li>{locale === "es" ? "Imposibilidad técnica de realizar el proyecto" : "Technical impossibility to carry out the project"}</li>
            </ul>
            <p className="text-gray-300">
              {locale === "es" 
                ? "En caso de terminación, los datos del proyecto serán manejados conforme a nuestra Política de Privacidad y se proporcionará un informe final del trabajo realizado."
                : "In case of termination, project data will be handled according to our Privacy Policy and a final report of work completed will be provided."
              }
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">8. {locale === "es" ? "Limitación de Responsabilidad" : "Limitation of Liability"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "SobrePoxi se compromete a proporcionar servicios de alta calidad, sin embargo, nuestra responsabilidad está limitada a:"
                : "SobrePoxi is committed to providing high-quality services, however, our liability is limited to:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Defectos de fabricación cubiertos por la garantía del producto" : "Manufacturing defects covered by product warranty"}</li>
              <li>{locale === "es" ? "Errores de instalación realizados por nuestro equipo técnico" : "Installation errors made by our technical team"}</li>
              <li>{locale === "es" ? "Daños causados por materiales defectuosos bajo nuestro control" : "Damage caused by defective materials under our control"}</li>
            </ul>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "No seremos responsables por:"
                : "We will not be liable for:"
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Daños causados por uso inadecuado o falta de mantenimiento" : "Damage caused by improper use or lack of maintenance"}</li>
              <li>{locale === "es" ? "Modificaciones realizadas por terceros sin autorización" : "Modifications made by third parties without authorization"}</li>
              <li>{locale === "es" ? "Daños por condiciones ambientales extremas no previstas" : "Damage from extreme environmental conditions not foreseen"}</li>
              <li>{locale === "es" ? "Pérdidas indirectas o consecuenciales" : "Indirect or consequential losses"}</li>
            </ul>
            <p className="text-gray-300">
              {locale === "es" 
                ? "Nuestra responsabilidad total no excederá el valor del proyecto contratado. Esta limitación no aplica en casos de negligencia grave o dolo."
                : "Our total liability will not exceed the value of the contracted project. This limitation does not apply in cases of gross negligence or willful misconduct."
              }
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">9. {locale === "es" ? "Disposiciones Generales" : "General Provisions"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Estos Términos y Condiciones constituyen el acuerdo completo entre el cliente y SobrePoxi respecto a la prestación de servicios de diseño, fabricación e instalación de productos epóxicos."
                : "These Terms and Conditions constitute the complete agreement between the client and SobrePoxi regarding the provision of design, manufacturing and installation services for epoxy products."
              }
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-300 mb-6">
              <li>{locale === "es" ? "Si alguna disposición es inválida, el resto permanece en vigor" : "If any provision is invalid, the rest remains in force"}</li>
              <li>{locale === "es" ? "Estos términos se rigen por las leyes de Colombia" : "These terms are governed by the laws of Colombia"}</li>
              <li>{locale === "es" ? "Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia" : "Any dispute will be resolved in the competent courts of Bogotá, Colombia"}</li>
              <li>{locale === "es" ? "Los contratos específicos de proyecto complementan estos términos generales" : "Specific project contracts complement these general terms"}</li>
            </ul>
            <p className="text-gray-300">
              {locale === "es" 
                ? "La falta de ejercicio de cualquier derecho por parte de SobrePoxi no constituye una renuncia al mismo. Estos términos prevalecen sobre cualquier condición contradictoria del cliente."
                : "SobrePoxi's failure to exercise any right does not constitute a waiver thereof. These terms prevail over any contradictory conditions from the client."
              }
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">10. {locale === "es" ? "Información de Contacto" : "Contact Information"}</h2>
            <p className="text-gray-300 mb-4">
              {locale === "es" 
                ? "Si tiene preguntas sobre estos Términos y Condiciones o desea solicitar nuestros servicios, puede contactarnos:"
                : "If you have questions about these Terms and Conditions or wish to request our services, you can contact us:"
              }
            </p>
            <div className="bg-gray-800 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-300">
                <li><span className="font-medium">{locale === "es" ? "Empresa:" : "Company:"}</span> SobrePoxi</li>
                <li><span className="font-medium">{locale === "es" ? "Correo electrónico:" : "Email:"}</span> info@sobrepoxi.com</li>
                <li><span className="font-medium">{locale === "es" ? "Teléfono:" : "Phone:"}</span> +57 301 234 5678</li>
                <li><span className="font-medium">{locale === "es" ? "Sitio web:" : "Website:"}</span> www.sobrepoxi.com</li>
                <li><span className="font-medium">{locale === "es" ? "Dirección:" : "Address:"}</span> Calle 123 #45-67, Bogotá, Colombia</li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                {locale === "es" 
                  ? "Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM, Sábados de 9:00 AM a 2:00 PM"
                  : "Business hours: Monday to Friday 8:00 AM to 6:00 PM, Saturdays 9:00 AM to 2:00 PM"
                }
              </p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-[#121212] rounded-lg border border-gray-200 text-center">
            <p className="text-gray-200 font-medium">
              {locale === "es" ? "Al registrarse, acceder o utilizar nuestro sistema de autenticación, usted acepta estos Términos de Servicio en su totalidad." : "By registering, accessing or using our authentication system, you accept these Terms of Service in their entirety."}
            </p>
            <p className="text-gray-200 mt-2">
              {locale === "es" ? "Estos Términos están diseñados específicamente para un sistema de autenticación minimalista que recopila solo información esencial como correo electrónico e imagen de perfil." : "These Terms are specifically designed for a minimal authentication system that collects only essential information such as email and profile picture."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
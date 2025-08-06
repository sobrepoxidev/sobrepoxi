import React from 'react';
import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Política de Privacidad" : "Privacy policy"),
    ...getCommonMetadata(locale),
  };
}

export default async function PoliticaPrivacidadPage({ params }: { params: tParams }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-[#121212] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#303030] shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-500 bg-gradient-to-br from-[#363636] via-[#121212] to-[#363636]">
          <h1 className="text-4xl font-extrabold gold-gradient-bright text-center mb-2">
            {locale === "es" ? "Política de Privacidad" : "Privacy policy"}
          </h1>
          <p className="text-gray-200 text-center">
            {locale === "es" ? "Última actualización: 06 de agosto de 2025" : "Last updated: august 06, 2025"}
          </p>
        </div>

        <div className="px-6 py-8 prose prose-gray max-w-none text-gray-200 leading-relaxed">
          <div className="mb-12">
            <p className="text-lg font-medium">
              {locale === "es" ? "En SobrePoxi, respetamos su privacidad y nos comprometemos a proteger los datos personales que nos proporciona. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestro sitio web, solicita cotizaciones, realiza compras o contrata nuestros servicios de muebles con resina epóxica y pisos epóxicos." : "At SobrePoxi, we respect your privacy and we commit to protecting the personal data you provide. This Privacy Policy describes how we collect, use and protect your information when you use our website, request quotes, make purchases or hire our epoxy resin furniture and epoxy flooring services."}
            </p>
            <p>
              {locale === "es" ? "Por favor, lea detenidamente esta política para entender nuestras prácticas con respecto a sus datos personales y cómo los trataremos. Al utilizar nuestros servicios o sitio web, usted acepta las prácticas descritas en esta Política de Privacidad." : "Please read this policy carefully to understand our practices regarding your personal data and how we will handle it. By using our services or website, you accept the practices described in this Privacy Policy."}
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">1. {locale === "es" ? "Información que recopilamos" : "Information we collect"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">1.1 {locale === "es" ? "Datos proporcionados directamente" : "Directly provided data"}</h3>
            <p>
              {locale === "es" ? "Recopilamos la siguiente información necesaria para brindarle nuestros servicios de muebles con resina epóxica y pisos epóxicos:" : "We collect the following information necessary to provide our epoxy resin furniture and epoxy flooring services:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Información de contacto:" : "Contact information:"}</span> {locale === "es" ? "Nombre, apellidos, correo electrónico, número de teléfono y dirección para comunicarnos con usted y entregar nuestros productos." : "Name, surname, email address, phone number and address to communicate with you and deliver our products."}</li>
              <li><span className="font-medium">{locale === "es" ? "Información del proyecto:" : "Project information:"}</span> {locale === "es" ? "Detalles sobre el tipo de mueble o piso epóxico que desea, dimensiones, ubicación del proyecto y preferencias de diseño." : "Details about the type of furniture or epoxy floor you want, dimensions, project location and design preferences."}</li>
              <li><span className="font-medium">{locale === "es" ? "Información de facturación:" : "Billing information:"}</span> {locale === "es" ? "Datos necesarios para la facturación y procesamiento de pagos de nuestros servicios." : "Data necessary for billing and payment processing of our services."}</li>
              <li><span className="font-medium">{locale === "es" ? "Fotografías del espacio:" : "Space photographs:"}</span> {locale === "es" ? "Imágenes del área donde se realizará el proyecto para evaluar y planificar el trabajo." : "Images of the area where the project will be carried out to evaluate and plan the work."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">1.2 {locale === "es" ? "Datos asociados a su actividad" : "Data associated with your activity"}</h3>
            <p>
              {locale === "es" ? "Para brindar un mejor servicio y seguimiento de proyectos, también recopilamos:" : "To provide better service and project tracking, we also collect:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Historial de cotizaciones:" : "Quote history:"}</span> {locale === "es" ? "Registro de las cotizaciones solicitadas y proyectos consultados para brindar un mejor seguimiento." : "Record of requested quotes and consulted projects to provide better follow-up."}</li>
              <li><span className="font-medium">{locale === "es" ? "Datos de proyectos:" : "Project data:"}</span> {locale === "es" ? "Información sobre proyectos realizados, fechas de instalación, materiales utilizados y garantías aplicables." : "Information about completed projects, installation dates, materials used and applicable warranties."}</li>
              <li><span className="font-medium">{locale === "es" ? "Comunicaciones:" : "Communications:"}</span> {locale === "es" ? "Registro de consultas, llamadas y mensajes para mejorar nuestro servicio al cliente." : "Record of inquiries, calls and messages to improve our customer service."}</li>
              <li><span className="font-medium">{locale === "es" ? "Preferencias de diseño:" : "Design preferences:"}</span> {locale === "es" ? "Estilos, colores y acabados preferidos para personalizar futuras propuestas." : "Preferred styles, colors and finishes to customize future proposals."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">1.3 {locale === "es" ? "Datos recopilados automáticamente" : "Automatically collected data"}</h3>
            <p>
              {locale === "es" ? "Recopilamos cierta información técnica cuando visita nuestro sitio web:" : "We collect certain technical information when you visit our website:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Dirección IP:" : "IP address:"}</span> {locale === "es" ? "Para seguridad del sitio web y análisis geográfico de nuestros visitantes." : "For website security and geographic analysis of our visitors."}</li>
              <li><span className="font-medium">{locale === "es" ? "Información del dispositivo:" : "Device information:"}</span> {locale === "es" ? "Tipo de dispositivo, sistema operativo y navegador para optimizar la experiencia de navegación." : "Device type, operating system and browser to optimize the browsing experience."}</li>
              <li><span className="font-medium">{locale === "es" ? "Cookies y tecnologías similares:" : "Cookies and similar technologies:"}</span> {locale === "es" ? "Para recordar sus preferencias y mejorar la funcionalidad del sitio web." : "To remember your preferences and improve website functionality."}</li>
              <li><span className="font-medium">{locale === "es" ? "Datos de navegación:" : "Browsing data:"}</span> {locale === "es" ? "Páginas visitadas, tiempo de permanencia y productos consultados para mejorar nuestro contenido." : "Pages visited, time spent and products viewed to improve our content."}</li>
              <li><span className="font-medium">{locale === "es" ? "Información de referencia:" : "Referral information:"}</span> {locale === "es" ? "Cómo llegó a nuestro sitio web para entender mejor nuestros canales de marketing." : "How you arrived at our website to better understand our marketing channels."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">2. {locale === "es" ? "Cómo utilizamos su información" : "How we use your information"}</h2>
            <p>
              {locale === "es" ? "Utilizamos su información personal exclusivamente para los siguientes propósitos:" : "We use your personal information exclusively for the following purposes:"}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">2.1 {locale === "es" ? "Propósitos esenciales" : "Essential purposes"}</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Prestación de servicios:" : "Service provision:"}</span> {locale === "es" ? "Diseñar, fabricar e instalar muebles con resina epóxica y pisos epóxicos según sus especificaciones." : "Design, manufacture and install epoxy resin furniture and epoxy floors according to your specifications."}</li>
              <li><span className="font-medium">{locale === "es" ? "Comunicación del proyecto:" : "Project communication:"}</span> {locale === "es" ? "Mantenerle informado sobre el progreso de su proyecto, fechas de entrega y cualquier cambio necesario." : "Keep you informed about your project progress, delivery dates and any necessary changes."}</li>
              <li><span className="font-medium">{locale === "es" ? "Cotizaciones y presupuestos:" : "Quotes and budgets:"}</span> {locale === "es" ? "Preparar cotizaciones detalladas y presupuestos personalizados para sus proyectos." : "Prepare detailed quotes and personalized budgets for your projects."}</li>
              <li><span className="font-medium">{locale === "es" ? "Facturación y pagos:" : "Billing and payments:"}</span> {locale === "es" ? "Procesar pagos, emitir facturas y gestionar aspectos financieros de nuestros servicios." : "Process payments, issue invoices and manage financial aspects of our services."}</li>
              <li><span className="font-medium">{locale === "es" ? "Garantías y soporte:" : "Warranties and support:"}</span> {locale === "es" ? "Brindar soporte post-venta y gestionar garantías de nuestros productos y servicios." : "Provide after-sales support and manage warranties for our products and services."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">2.2 {locale === "es" ? "Propósitos secundarios" : "Secondary purposes"}</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Mejora de servicios:" : "Service improvement:"}</span> {locale === "es" ? "Analizar proyectos completados para mejorar nuestros procesos de diseño, fabricación e instalación." : "Analyze completed projects to improve our design, manufacturing and installation processes."}</li>
              <li><span className="font-medium">{locale === "es" ? "Marketing y promociones:" : "Marketing and promotions:"}</span> {locale === "es" ? "Enviarle información sobre nuevos diseños, técnicas de resina epóxica y ofertas especiales en nuestros servicios." : "Send you information about new designs, epoxy resin techniques and special offers on our services."}</li>
              <li><span className="font-medium">{locale === "es" ? "Desarrollo de productos:" : "Product development:"}</span> {locale === "es" ? "Crear nuevos diseños y técnicas basados en las preferencias y necesidades de nuestros clientes." : "Create new designs and techniques based on our customers' preferences and needs."}</li>
              <li><span className="font-medium">{locale === "es" ? "Testimonios y portafolio:" : "Testimonials and portfolio:"}</span> {locale === "es" ? "Con su consentimiento, utilizar fotografías de proyectos completados para mostrar nuestro trabajo en nuestro sitio web y redes sociales." : "With your consent, use photographs of completed projects to showcase our work on our website and social media."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">2.3 {locale === "es" ? "Cumplimiento legal" : "Legal compliance"}</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Obligaciones legales:" : "Legal obligations:"}</span> {locale === "es" ? "Cumplir con nuestras obligaciones legales y normativas." : "Comply with our legal obligations and regulations."}</li>
              <li><span className="font-medium">{locale === "es" ? "Resolución de disputas:" : "Dispute resolution:"}</span> {locale === "es" ? "Resolver disputas y hacer cumplir nuestros acuerdos legales." : "Resolve disputes and enforce our legal agreements."}</li>
              <li><span className="font-medium">{locale === "es" ? "Prevención de fraudes:" : "Fraud prevention:"}</span> {locale === "es" ? "Proteger contra actividades fraudulentas o abusivas." : "Protect against fraudulent or abusive activities."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">3. {locale === "es" ? "Base legal para el procesamiento" : "Legal basis for processing"}</h2>
            <p>
              {locale === "es" ? "Procesamos sus datos personales en base a las siguientes bases legales:" : "We process your personal data based on the following legal bases:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Ejecución del contrato:" : "Contract execution:"}</span> {locale === "es" ? "Cuando solicita una cotización o contrata nuestros servicios, procesamos sus datos para cumplir con nuestras obligaciones contractuales de diseño, fabricación e instalación." : "When you request a quote or hire our services, we process your data to fulfill our contractual obligations for design, manufacturing and installation."}</li>
              <li><span className="font-medium">{locale === "es" ? "Consentimiento:" : "Consent:"}</span> {locale === "es" ? "Para actividades de marketing, uso de fotografías de proyectos en nuestro portafolio y comunicaciones promocionales sobre nuevos servicios." : "For marketing activities, use of project photographs in our portfolio and promotional communications about new services."}</li>
              <li><span className="font-medium">{locale === "es" ? "Intereses legítimos:" : "Legitimate interests:"}</span> {locale === "es" ? "Para mejorar nuestros procesos de fabricación, desarrollar nuevos diseños, mantener la calidad de nuestros servicios y proteger nuestro negocio." : "To improve our manufacturing processes, develop new designs, maintain the quality of our services and protect our business."}</li>
              <li><span className="font-medium">{locale === "es" ? "Obligación legal:" : "Legal obligation:"}</span> {locale === "es" ? "Para cumplir con obligaciones fiscales, contables y regulatorias relacionadas con nuestros servicios de construcción y fabricación." : "To comply with tax, accounting and regulatory obligations related to our construction and manufacturing services."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">4. {locale === "es" ? "Compartición de información" : "Information sharing"}</h2>
            <p>
              {locale === "es" ? "Nos comprometemos a no vender, alquilar o comercializar sus datos personales. Compartimos su información únicamente en las siguientes circunstancias:" : "We commit to not sell, rent, or commercialize your personal data. We share your information only in the following circumstances:"}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">4.1 {locale === "es" ? "Proveedores de materiales" : "Material suppliers"}</h3>
            <p>
              {locale === "es" ? "Compartimos especificaciones técnicas con nuestros proveedores de resina epóxica y materiales para garantizar la calidad y disponibilidad de los productos necesarios para su proyecto:" : "We share technical specifications with our epoxy resin and material suppliers to ensure quality and availability of products needed for your project:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Proveedores de resina epóxica y materiales especializados." : "Epoxy resin and specialized material suppliers."}</li>
              <li>{locale === "es" ? "Servicios de transporte y logística para entrega de materiales." : "Transportation and logistics services for material delivery."}</li>
              <li>{locale === "es" ? "Procesadores de pagos para transacciones seguras." : "Payment processors for secure transactions."}</li>
              <li>{locale === "es" ? "Servicios de instalación subcontratados cuando sea necesario." : "Subcontracted installation services when necessary."}</li>
            </ul>
            <p className="mt-4">
              {locale === "es" ? "Todos estos proveedores están obligados contractualmente a proteger su información y utilizarla únicamente para los fines específicos del proyecto acordado." : "All these providers are contractually obligated to protect your information and use it exclusively for the specific purposes of the agreed project."}
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">4.2 {locale === "es" ? "Requisitos legales" : "Legal requirements"}</h3>
            <p>
              {locale === "es" ? "Podemos divulgar su información cuando sea requerido por ley:" : "We may disclose your information when required by law:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "En respuesta a solicitudes legales de autoridades públicas." : "In response to legal requests from public authorities."}</li>
              <li>{locale === "es" ? "Para proteger nuestros derechos legales o defender contra reclamaciones legales." : "To protect our legal rights or defend against legal claims."}</li>
              <li>{locale === "es" ? "Para investigar, prevenir o tomar medidas respecto a actividades ilegales." : "To investigate, prevent, or take measures regarding illegal activities."}</li>
              <li>{locale === "es" ? "En circunstancias excepcionales para proteger la seguridad personal de usuarios o del público." : "In exceptional circumstances to protect the personal security of users or the public."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">5. {locale === "es" ? "Seguridad de los datos" : "Data security"}</h2>
            <p>
              {locale === "es" ? "Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales y los datos de sus proyectos:" : "We implement appropriate technical and organizational measures to protect your personal data and project data:"}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">{locale === "es" ? "Protección de datos del proyecto" : "Project data protection"}</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Almacenamiento seguro:" : "Secure storage:"}</span> {locale === "es" ? "Protegemos fotografías, especificaciones técnicas y detalles de diseño con cifrado avanzado." : "We protect photographs, technical specifications and design details with advanced encryption."}</li>
              <li><span className="font-medium">{locale === "es" ? "Acceso restringido:" : "Restricted access:"}</span> {locale === "es" ? "Solo el personal autorizado involucrado en su proyecto tiene acceso a su información." : "Only authorized personnel involved in your project have access to your information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Confidencialidad:" : "Confidentiality:"}</span> {locale === "es" ? "Mantenemos estricta confidencialidad sobre sus proyectos y no compartimos fotografías sin consentimiento." : "We maintain strict confidentiality about your projects and do not share photographs without consent."}</li>
              <li><span className="font-medium">{locale === "es" ? "Respaldos seguros:" : "Secure backups:"}</span> {locale === "es" ? "Realizamos copias de seguridad cifradas de los datos del proyecto para prevenir pérdidas." : "We perform encrypted backups of project data to prevent losses."}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-4">{locale === "es" ? "Seguridad operacional" : "Operational security"}</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Capacitación del equipo:" : "Team training:"}</span> {locale === "es" ? "Nuestro personal está capacitado en el manejo seguro y confidencial de información del cliente." : "Our staff is trained in the secure and confidential handling of client information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Protocolos de instalación:" : "Installation protocols:"}</span> {locale === "es" ? "Implementamos medidas de seguridad durante las visitas e instalaciones en su propiedad." : "We implement security measures during visits and installations at your property."}</li>
              <li><span className="font-medium">{locale === "es" ? "Eliminación segura:" : "Secure deletion:"}</span> {locale === "es" ? "Los datos temporales y archivos de trabajo se eliminan de forma segura al completar el proyecto." : "Temporary data and work files are securely deleted upon project completion."}</li>
              <li><span className="font-medium">{locale === "es" ? "Auditorías regulares:" : "Regular audits:"}</span> {locale === "es" ? "Realizamos evaluaciones periódicas de nuestras prácticas de seguridad y manejo de datos." : "We conduct periodic evaluations of our security practices and data handling."}</li>
            </ul>
            
            <p className="mt-4">
              {locale === "es" ? "Aunque implementamos salvaguardias razonables y mantenemos la confidencialidad de sus proyectos, ningún sistema de seguridad es completamente impenetrable. No podemos garantizar la seguridad absoluta de su información." : "Although we implement reasonable safeguards and maintain the confidentiality of your projects, no security system is completely impenetrable. We cannot guarantee absolute security of your information."}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">6. {locale === "es" ? "Retención de datos" : "Data retention"}</h2>
            <p>
              {locale === "es" ? "Conservamos su información personal durante diferentes períodos según el tipo de datos y su propósito en nuestros servicios de fabricación e instalación:" : "We retain your personal information for different periods depending on the type of data and its purpose in our manufacturing and installation services:"}
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">{locale === "es" ? "Datos del proyecto" : "Project data"}</h3>
                <p>{locale === "es" ? "Conservamos fotografías, especificaciones técnicas y detalles del proyecto durante 5 años para brindar soporte de garantía y mantenimiento. Con su consentimiento, podemos conservar fotografías para nuestro portafolio indefinidamente." : "We retain photographs, technical specifications and project details for 5 years to provide warranty and maintenance support. With your consent, we may retain photographs for our portfolio indefinitely."}</p>
              </div>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">{locale === "es" ? "Datos financieros" : "Financial data"}</h3>
                <p>{locale === "es" ? "Los registros de cotizaciones, facturas y pagos se conservan durante 7 años para cumplir con los requisitos legales, fiscales y de garantía de nuestros servicios." : "Quote records, invoices and payments are kept for 7 years to comply with legal, tax and warranty requirements for our services."}</p>
              </div>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">{locale === "es" ? "Datos de contacto" : "Contact data"}</h3>
                <p>{locale === "es" ? "Mantenemos su información de contacto mientras mantenga una relación comercial con nosotros. Para marketing, conservamos los datos hasta que retire su consentimiento o durante 3 años de inactividad." : "We maintain your contact information while you maintain a business relationship with us. For marketing, we retain data until you withdraw your consent or for 3 years of inactivity."}</p>
              </div>

              <div className="bg-[#121212] p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">{locale === "es" ? "Datos de garantía" : "Warranty data"}</h3>
                <p>{locale === "es" ? "Los datos relacionados con garantías de nuestros productos y servicios se conservan durante toda la vigencia de la garantía más 2 años adicionales para resolver cualquier disputa." : "Data related to warranties for our products and services is retained for the entire warranty period plus an additional 2 years to resolve any disputes."}</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">7. {locale === "es" ? "Sus derechos" : "Your rights"}</h2>
            <p>
              {locale === "es" ? "Dependiendo de su ubicación, puede tener diversos derechos con respecto a sus datos personales:" : "Depending on your location, you may have various rights regarding your personal data:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Acceso:" : "Access:"}</span> {locale === "es" ? "Derecho a solicitar una copia de su información personal." : "Right to request a copy of your personal information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Rectificación:" : "Rectification:"}</span> {locale === "es" ? "Derecho a solicitar la corrección de información inexacta o incompleta." : "Right to request the correction of inaccurate or incomplete information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Eliminación:" : "Elimination:"}</span> {locale === "es" ? "Derecho a solicitar la eliminación de su información personal en determinadas circunstancias." : "Right to request the deletion of your personal information in certain circumstances."}</li>
              <li><span className="font-medium">{locale === "es" ? "Restricción:" : "Restriction:"}</span> {locale === "es" ? "Derecho a solicitar la limitación del procesamiento de su información." : "Right to request the limitation of the processing of your information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Portabilidad:" : "Portability:"}</span> {locale === "es" ? "Derecho a recibir su información personal en un formato estructurado y transferible." : "Right to receive your personal information in a structured and transferable format."}</li>
              <li><span className="font-medium">{locale === "es" ? "Objeción:" : "Objection:"}</span> {locale === "es" ? "Derecho a oponerse al procesamiento de su información personal." : "Right to object to the processing of your personal information."}</li>
              <li><span className="font-medium">{locale === "es" ? "Revocación del consentimiento:" : "Revocation of consent:"}</span> {locale === "es" ? "Derecho a retirar su consentimiento en cualquier momento." : "Right to withdraw your consent at any time."}</li>
            </ul>
            <p className="mt-4">
              {locale === "es" ? "Para ejercer cualquiera de estos derechos, contacte con nosotros utilizando la información proporcionada al final de esta política." : "To exercise any of these rights, contact us using the information provided at the end of this policy."}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">8. {locale === "es" ? "Cookies y tecnologías similares" : "Cookies and similar technologies"}</h2>
            <p>
              {locale === "es" ? "Utilizamos cookies y tecnologías similares para varios propósitos relacionados con la funcionalidad de nuestra plataforma:" : "We use cookies and similar technologies for various purposes related to the functionality of our platform:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">{locale === "es" ? "Cookies esenciales:" : "Essential cookies:"}</span> {locale === "es" ? "Necesarias para el funcionamiento básico del sitio y el sistema de inicio de sesión." : "Necessary for the basic operation of the site and the login system."}</li>
              <li><span className="font-medium">{locale === "es" ? "Cookies de sesión:" : "Session cookies:"}</span> {locale === "es" ? "Mantienen su sesión activa mientras utiliza nuestros servicios." : "Maintain your active session while using our services."}</li>
              <li><span className="font-medium">{locale === "es" ? "Cookies de seguridad:" : "Security cookies:"}</span> {locale === "es" ? "Ayudan a detectar actividades fraudulentas y proteger su cuenta." : "Help detect fraudulent activities and protect your account."}</li>
              <li><span className="font-medium">{locale === "es" ? "Cookies analíticas:" : "Analytics cookies:"}</span> {locale === "es" ? "Nos permiten comprender cómo los usuarios interactúan con nuestra plataforma." : "Allow us to understand how users interact with our platform."}</li>
            </ul>
            <p className="mt-4">
              {locale === "es" ? "Puede gestionar sus preferencias de cookies a través de la configuración de su navegador, aunque deshabilitar ciertas cookies puede afectar a la funcionalidad de nuestros servicios." : "You can manage your cookie preferences through your browser settings, although disabling certain cookies may affect the functionality of our services."}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">9. {locale === "es" ? "Privacidad de menores" : "Children's privacy"}</h2>
            <p>
              {locale === "es" ? "Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos conscientemente información personal de menores. Si descubrimos que hemos recopilado información personal de un menor sin verificación del consentimiento parental, tomaremos medidas para eliminar esa información lo antes posible." : "Our services are not directed to persons under the age of 18. We do not knowingly collect personal information from minors. If we discover that we have collected personal information from a minor without parental consent, we will take measures to delete that information as soon as possible."}
            </p>
            <p className="mt-4">
              {locale === "es" ? "Si es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos para que podamos tomar las medidas apropiadas." : "If you are a parent or guardian and believe that your child has provided personal information to us, please contact us so that we can take the appropriate measures."}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">10. {locale === "es" ? "Transferencias internacionales de datos" : "International data transfers"}</h2>
            <p>
              {locale === "es" ? "Sus datos personales pueden ser transferidos y procesados en países distintos a aquel en el que reside. Estos países pueden tener leyes de protección de datos diferentes a las de su país." : "Your personal data may be transferred and processed in countries different from the one in which you reside. These countries may have different data protection laws than those of your country."}
            </p>
            <p className="mt-4">
              {locale === "es" ? "Cuando transferimos sus datos a otros países, implementamos salvaguardias apropiadas para garantizar que su información siga protegida de acuerdo con esta Política de Privacidad, como:" : "When we transfer your data to other countries, we implement appropriate safeguards to ensure that your information remains protected in accordance with this Privacy Policy, such as:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Transferencias a países con decisiones de adecuación." : "Transfers to countries with adequacy decisions."}</li>
              <li>{locale === "es" ? "Utilización de cláusulas contractuales estándar aprobadas." : "Use of approved standard contractual clauses."}</li>
              <li>{locale === "es" ? "Implementación de medidas adicionales técnicas y organizativas cuando sea necesario." : "Implementation of additional technical and organizational measures when necessary."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">11. {locale === "es" ? "Cambios a esta política" : "Changes to this policy"}</h2>
            <p>
              {locale === "es" ? "Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios." : "We may periodically update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons."}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Las modificaciones entrarán en vigor una vez publicada la Política de Privacidad actualizada." : "Modifications will take effect once the updated Privacy Policy is published."}</li>
              <li>{locale === "es" ? "Para cambios significativos, le notificaremos mediante un aviso visible en nuestra plataforma o enviando un correo electrónico." : "For significant changes, we will notify you through a visible notice on our platform or by sending an email."}</li>
              <li>{locale === "es" ? "Le recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos su información." : "We recommend reviewing this policy periodically to stay informed about how we protect your information."}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 border-b-2 border-gray-200 pb-2 mb-6">12. {locale === "es" ? "Contacto" : "Contact"}</h2>
            <p>
              {locale === "es" ? "Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el procesamiento de sus datos personales, puede contactarnos a través de:" : "If you have questions, concerns, or requests related to this Privacy Policy or the processing of your personal data, you can contact us through:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>{locale === "es" ? "Correo electrónico: info@handsmadeart.com" : "Email: info@handsmadeart.com"}</li>
              <li>{locale === "es" ? "Formulario de contacto en nuestra plataforma" : "Contact form on our platform"}</li>
              <li>{locale === "es" ? "Dirección postal: [Dirección física de la empresa]" : "Postal address: [Physical address of the company]"}</li>
            </ul>
            <p className="mt-4">
              {locale === "es" ? "Nos comprometemos a responder a cualquier consulta o solicitud dentro de un plazo razonable y, en cualquier caso, dentro de los plazos establecidos por la ley aplicable." : "We commit to responding to any inquiries or requests within a reasonable time frame and, in any case, within the time limits established by applicable law."}
            </p>
          </section>

          <div className="mt-12 p-6 bg-[#121212] rounded-lg border border-gray-200 text-center">
            <p className="text-gray-200 font-medium">
              {locale === "es" ? "Al utilizar nuestros servicios, usted reconoce que ha leído y comprendido esta Política de Privacidad." : "By using our services, you acknowledge that you have read and understood this Privacy Policy."}
            </p>
            <p className="text-gray-200 mt-2">
              {locale === "es" ? "Esta política está específicamente diseñada para un sistema minimalista de inicio de sesión que asocia su perfil únicamente con información básica como pedidos y preferencias." : "This policy is specifically designed for a minimal login system that associates your profile uniquely with basic information such as orders and preferences."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
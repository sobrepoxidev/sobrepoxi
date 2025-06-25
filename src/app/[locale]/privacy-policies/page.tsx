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

export default function PoliticaPrivacidadPage({locale}: {locale: string}) {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
            {locale === "es" ? "Política de Privacidad" : "Privacy policy"}
          </h1>
          <p className="text-gray-600 text-center">
            {locale === "es" ? "Última actualización: 9 de abril de 2025" : "Last updated: April 9, 2025"}
          </p>
        </div>

        <div className="px-6 py-8 prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <div className="mb-12">
            <p className="text-lg font-medium">
              {locale === "es" ? "En nuestra plataforma, respetamos su privacidad y nos comprometemos a proteger los datos personales que nos proporciona. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestro sistema de inicio de sesión y servicios relacionados." : "In our platform, we respect your privacy and we commit to protecting the personal data you provide. This Privacy Policy describes how we collect, use and protect your information when you use our login system and related services."}
            </p>
            <p>
              {locale === "es" ? "Por favor, lea detenidamente esta política para entender nuestras prácticas con respecto a sus datos personales y cómo los trataremos. Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta Política de Privacidad." : "Please read this policy carefully to understand our practices regarding your personal data and how we will handle it. By using our services, you accept the practices described in this Privacy Policy."}
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">1. {locale === "es" ? "Información que recopilamos" : "Information we collect"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">1.1 {locale === "es" ? "Datos proporcionados directamente" : "Directly provided data"}</h3>
            <p>
              {locale === "es" ? "Recopilamos la siguiente información mínima necesaria para gestionar su cuenta y proporcionar nuestros servicios:" : "We collect the following minimum information necessary to manage your account and provide our services:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Email:</span> Utilizado como identificador principal de su cuenta y para comunicaciones esenciales.</li>
              <li><span className="font-medium">Contraseña:</span> Almacenada de forma segura mediante técnicas avanzadas de encriptación y hash.</li>
              <li><span className="font-medium">Imagen de perfil (opcional):</span> Si decide cargar una imagen para personalizar su cuenta.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1.2 {locale === "es" ? "Datos asociados a su actividad" : "Data associated with your activity"}</h3>
            <p>
              {locale === "es" ? "Para proporcionar funcionalidad y mejorar la seguridad, también recopilamos:" : "To provide functionality and improve security, we also collect:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Registros de inicio de sesión:</span> Fecha, hora y dispositivo utilizado para acceder a su cuenta.</li>
              <li><span className="font-medium">Datos de pedidos:</span> Información relacionada con sus pedidos y transacciones para asociarlos a su perfil.</li>
              <li><span className="font-medium">Información sobre preferencias:</span> Configuraciones y ajustes que usted establece en su cuenta.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1.3 {locale === "es" ? "Datos recopilados automáticamente" : "Automatically collected data"}</h3>
            <p>
              {locale === "es" ? "Recopilamos cierta información técnica cuando utiliza nuestros servicios:" : "We collect certain technical information when you use our services:"}
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Dirección IP:</span> Para seguridad y prevención de fraudes.</li>
              <li><span className="font-medium">Información del dispositivo:</span> Tipo de dispositivo, sistema operativo y navegador.</li>
              <li><span className="font-medium">Cookies y tecnologías similares:</span> Para mantener su sesión activa y mejorar la experiencia de usuario.</li>
              <li><span className="font-medium">Datos de uso:</span> Patrones de interacción con nuestra plataforma para mejorar la funcionalidad.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">2. Cómo utilizamos su información</h2>
            <p>
              Utilizamos su información personal exclusivamente para los siguientes propósitos:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">2.1 Propósitos esenciales</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Gestión de su cuenta:</span> Crear y mantener su cuenta, permitir el inicio de sesión y verificar su identidad.</li>
              <li><span className="font-medium">Procesamiento de pedidos:</span> Asociar sus pedidos a su perfil y facilitar su seguimiento.</li>
              <li><span className="font-medium">Comunicaciones de servicio:</span> Enviarle notificaciones importantes sobre su cuenta, pedidos o cambios en nuestros servicios.</li>
              <li><span className="font-medium">Seguridad:</span> Proteger su cuenta contra accesos no autorizados y detectar actividades sospechosas.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2.2 Mejora del servicio</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Personalización:</span> Adaptar y personalizar aspectos de nuestro servicio según sus preferencias.</li>
              <li><span className="font-medium">Análisis y estadísticas:</span> Realizar análisis internos para mejorar la funcionalidad y usabilidad de nuestra plataforma.</li>
              <li><span className="font-medium">Soporte técnico:</span> Ayudarle a resolver problemas técnicos o dudas sobre su cuenta.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2.3 Cumplimiento legal</h3>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Obligaciones legales:</span> Cumplir con nuestras obligaciones legales y normativas.</li>
              <li><span className="font-medium">Resolución de disputas:</span> Resolver disputas y hacer cumplir nuestros acuerdos legales.</li>
              <li><span className="font-medium">Prevención de fraudes:</span> Proteger contra actividades fraudulentas o abusivas.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">3. Base legal para el procesamiento</h2>
            <p>
              Procesamos sus datos personales en base a las siguientes bases legales:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Ejecución del contrato:</span> El procesamiento es necesario para la gestión de su cuenta y la prestación de nuestros servicios.</li>
              <li><span className="font-medium">Consentimiento:</span> Cuando nos ha proporcionado su consentimiento explícito para procesamiento específico.</li>
              <li><span className="font-medium">Intereses legítimos:</span> Cuando el procesamiento es necesario para nuestros intereses legítimos, como mejorar nuestros servicios o garantizar la seguridad.</li>
              <li><span className="font-medium">Obligación legal:</span> Cuando estamos obligados por ley a procesar su información.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">4. Compartición de información</h2>
            <p>
              Nos comprometemos a no vender, alquilar o comercializar sus datos personales. Compartimos su información únicamente en las siguientes circunstancias:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.1 Proveedores de servicios</h3>
            <p>
              Podemos compartir su información con proveedores de servicios que nos ayudan a operar nuestra plataforma:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Proveedores de servicios de alojamiento y servidores.</li>
              <li>Servicios de autenticación y seguridad.</li>
              <li>Procesadores de pagos (sin compartir credenciales de inicio de sesión).</li>
              <li>Servicios de análisis para mejorar nuestro rendimiento.</li>
            </ul>
            <p className="mt-4">
              Todos estos proveedores están obligados contractualmente a proteger su información y utilizarla únicamente para los fines específicos acordados.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4.2 Requisitos legales</h3>
            <p>
              Podemos divulgar su información cuando sea requerido por ley:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>En respuesta a solicitudes legales de autoridades públicas.</li>
              <li>Para proteger nuestros derechos legales o defender contra reclamaciones legales.</li>
              <li>Para investigar, prevenir o tomar medidas respecto a actividades ilegales.</li>
              <li>En circunstancias excepcionales para proteger la seguridad personal de usuarios o del público.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">5. Seguridad de los datos</h2>
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Encriptación:</span> Utilizamos tecnología de encriptación para proteger sus datos sensibles, especialmente las contraseñas.</li>
              <li><span className="font-medium">Acceso restringido:</span> Limitamos el acceso a su información personal a empleados que necesitan conocerla.</li>
              <li><span className="font-medium">Monitoreo de seguridad:</span> Supervisamos nuestros sistemas para detectar vulnerabilidades y posibles brechas.</li>
              <li><span className="font-medium">Actualizaciones regulares:</span> Mantenemos nuestros sistemas actualizados con los parches de seguridad más recientes.</li>
              <li><span className="font-medium">Auditorías:</span> Realizamos evaluaciones periódicas de nuestras prácticas de seguridad.</li>
            </ul>
            <p className="mt-4">
              Aunque implementamos salvaguardias razonables, ningún sistema de seguridad es completamente impenetrable. No podemos garantizar la seguridad absoluta de su información.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">6. Retención de datos</h2>
            <p>
              Conservamos su información personal únicamente durante el tiempo necesario para los fines establecidos en esta Política de Privacidad:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Mantenemos su información de cuenta mientras su cuenta permanezca activa.</li>
              <li>Los datos de pedidos se conservan durante el período requerido por las leyes fiscales y comerciales aplicables.</li>
              <li>Los registros de inicio de sesión se conservan por un período limitado para fines de seguridad.</li>
              <li>Tras la eliminación de su cuenta, algunos datos pueden mantenerse en forma anonimizada para análisis estadísticos.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">7. Sus derechos</h2>
            <p>
              Dependiendo de su ubicación, puede tener diversos derechos con respecto a sus datos personales:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Acceso:</span> Derecho a solicitar una copia de su información personal.</li>
              <li><span className="font-medium">Rectificación:</span> Derecho a solicitar la corrección de información inexacta o incompleta.</li>
              <li><span className="font-medium">Eliminación:</span> Derecho a solicitar la eliminación de su información personal en determinadas circunstancias.</li>
              <li><span className="font-medium">Restricción:</span> Derecho a solicitar la limitación del procesamiento de su información.</li>
              <li><span className="font-medium">Portabilidad:</span> Derecho a recibir su información personal en un formato estructurado y transferible.</li>
              <li><span className="font-medium">Objeción:</span> Derecho a oponerse al procesamiento de su información personal.</li>
              <li><span className="font-medium">Revocación del consentimiento:</span> Derecho a retirar su consentimiento en cualquier momento.</li>
            </ul>
            <p className="mt-4">
              Para ejercer cualquiera de estos derechos, contacte con nosotros utilizando la información proporcionada al final de esta política.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">8. Cookies y tecnologías similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para varios propósitos relacionados con la funcionalidad de nuestra plataforma:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li><span className="font-medium">Cookies esenciales:</span> Necesarias para el funcionamiento básico del sitio y el sistema de inicio de sesión.</li>
              <li><span className="font-medium">Cookies de sesión:</span> Mantienen su sesión activa mientras utiliza nuestros servicios.</li>
              <li><span className="font-medium">Cookies de seguridad:</span> Ayudan a detectar actividades fraudulentas y proteger su cuenta.</li>
              <li><span className="font-medium">Cookies analíticas:</span> Nos permiten comprender cómo los usuarios interactúan con nuestra plataforma.</li>
            </ul>
            <p className="mt-4">
              Puede gestionar sus preferencias de cookies a través de la configuración de su navegador, aunque deshabilitar ciertas cookies puede afectar a la funcionalidad de nuestros servicios.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">9. Privacidad de menores</h2>
            <p>
              Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos conscientemente información personal de menores. Si descubrimos que hemos recopilado información personal de un menor sin verificación del consentimiento parental, tomaremos medidas para eliminar esa información lo antes posible.
            </p>
            <p className="mt-4">
              Si es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos para que podamos tomar las medidas apropiadas.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">10. Transferencias internacionales de datos</h2>
            <p>
              Sus datos personales pueden ser transferidos y procesados en países distintos a aquel en el que reside. Estos países pueden tener leyes de protección de datos diferentes a las de su país.
            </p>
            <p className="mt-4">
              Cuando transferimos sus datos a otros países, implementamos salvaguardias apropiadas para garantizar que su información siga protegida de acuerdo con esta Política de Privacidad, como:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Transferencias a países con decisiones de adecuación.</li>
              <li>Utilización de cláusulas contractuales estándar aprobadas.</li>
              <li>Implementación de medidas adicionales técnicas y organizativas cuando sea necesario.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">11. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios.
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Las modificaciones entrarán en vigor una vez publicada la Política de Privacidad actualizada.</li>
              <li>Para cambios significativos, le notificaremos mediante un aviso visible en nuestra plataforma o enviando un correo electrónico.</li>
              <li>Le recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos su información.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">12. Contacto</h2>
            <p>
              Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el procesamiento de sus datos personales, puede contactarnos a través de:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Correo electrónico: privacidad@nuestrodominio.com</li>
              <li>Formulario de contacto en nuestra plataforma</li>
              <li>Dirección postal: [Dirección física de la empresa]</li>
            </ul>
            <p className="mt-4">
              Nos comprometemos a responder a cualquier consulta o solicitud dentro de un plazo razonable y, en cualquier caso, dentro de los plazos establecidos por la ley aplicable.
            </p>
          </section>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-700 font-medium">
              Al utilizar nuestros servicios, usted reconoce que ha leído y comprendido esta Política de Privacidad.
            </p>
            <p className="text-gray-600 mt-2">
              Esta política está específicamente diseñada para un sistema minimalista de inicio de sesión que asocia su perfil únicamente con información básica como pedidos y preferencias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
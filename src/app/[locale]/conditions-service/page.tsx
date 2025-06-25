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

export default function TerminosCondicionesPage( {params}: {params: tParams}) {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
            Términos y Condiciones de Servicio
          </h1>
          <p className="text-gray-600 text-center">
            Última actualización: 9 de abril de 2025
          </p>
        </div>

        <div className="px-6 py-8 prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <div className="mb-12">
            <p className="text-lg font-medium">
              Bienvenido a nuestro servicio. Estos Términos y Condiciones (&ldquo;Términos&rdquo;) constituyen un acuerdo legal entre usted y nuestra plataforma de autenticación. Lea detenidamente estos Términos antes de utilizar nuestro sistema de inicio de sesión.
            </p>
            <p>
              Al registrarse, acceder o utilizar nuestros servicios de autenticación, usted acepta estar legalmente vinculado por estos Términos. Si no está de acuerdo con alguna parte de estos Términos, le pedimos que no utilice nuestros servicios.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">1. Definiciones</h2>
            <ul className="space-y-4 pl-5 list-disc">
              <li>
                <span className="font-medium">Servicio:</span> Sistema de autenticación e inicio de sesión que facilita el acceso a nuestra plataforma mediante credenciales de usuario.
              </li>
              <li>
                <span className="font-medium">Usuario:</span> Cualquier persona que acceda, se registre o utilice nuestro sistema de autenticación.
              </li>
              <li>
                <span className="font-medium">Credenciales:</span> Información que permite identificar y verificar la identidad del usuario, principalmente correo electrónico y contraseña.
              </li>
              <li>
                <span className="font-medium">Datos de perfil:</span> Información mínima asociada a su cuenta, como correo electrónico e imagen de perfil.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">2. Registro y Cuenta de Usuario</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">2.1 Proceso de Registro</h3>
            <p>
              Para acceder a nuestros servicios, deberá crear una cuenta proporcionando un correo electrónico válido. El proceso de registro está diseñado para ser simple y requerir únicamente información esencial:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Un correo electrónico válido que será su identificador principal.</li>
              <li>Una contraseña que cumpla con nuestros requisitos mínimos de seguridad.</li>
              <li>Opcionalmente, una imagen de perfil que podrá agregar o modificar posteriormente.</li>
            </ul>
            <p className="mt-4">
              Al registrarse, usted declara y garantiza que:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Tiene al menos 18 años de edad o cuenta con el consentimiento de sus padres o tutores legales.</li>
              <li>La información proporcionada es precisa, veraz, actual y completa.</li>
              <li>El correo electrónico proporcionado le pertenece legítimamente.</li>
              <li>No está suplantando la identidad de otra persona o entidad.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2.2 Seguridad de la Cuenta</h3>
            <p>
              La seguridad de su cuenta es fundamental para nosotros, pero también depende en gran medida de sus acciones. Para mantener su cuenta segura:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Utilice una contraseña única y robusta que no emplee en otros servicios.</li>
              <li>Mantenga la confidencialidad de sus credenciales de acceso en todo momento.</li>
              <li>No comparta su contraseña o información de inicio de sesión con terceros.</li>
              <li>Cierre sesión después de utilizar nuestros servicios, especialmente en dispositivos compartidos.</li>
              <li>Notifíquenos inmediatamente si detecta actividad sospechosa o accesos no autorizados a su cuenta.</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2.3 Responsabilidad de la Cuenta</h3>
            <p>
              Usted es plenamente responsable de todas las actividades realizadas bajo su cuenta. Nos reservamos el derecho de:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Suspender o cancelar cuentas con actividades sospechosas o que violen estos Términos.</li>
              <li>Solicitar información adicional para verificar su identidad en caso de actividades inusuales.</li>
              <li>Implementar medidas de seguridad adicionales como autenticación de dos factores en el futuro.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">3. Sistema de Inicio de Sesión</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">3.1 Proceso de Autenticación</h3>
            <p>
              Nuestro sistema de inicio de sesión está diseñado para ser seguro y sencillo:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>El inicio de sesión requiere únicamente su correo electrónico y contraseña.</li>
              <li>Podremos implementar métodos adicionales de verificación para proteger su cuenta.</li>
              <li>Utilizamos conexiones seguras (HTTPS) para transmitir sus credenciales.</li>
              <li>Sus datos de inicio de sesión son procesados mediante técnicas de cifrado modernas.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3.2 Sesiones Activas</h3>
            <p>
              Para su comodidad y seguridad:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Las sesiones tienen un tiempo de expiración por inactividad.</li>
              <li>Podrá ver y gestionar sus sesiones activas en su perfil de usuario.</li>
              <li>Tiene la capacidad de cerrar remotamente sesiones en otros dispositivos.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3.3 Recuperación de Acceso</h3>
            <p>
              Si olvida su contraseña o tiene dificultades para acceder:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Puede solicitar el restablecimiento de su contraseña en cualquier momento.</li>
              <li>El proceso de recuperación se realiza a través de un enlace seguro enviado a su correo electrónico.</li>
              <li>Los enlaces de restablecimiento tienen una validez limitada por seguridad.</li>
              <li>En caso de no tener acceso a su correo electrónico, contáctenos para asistencia especializada.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">4. Datos de Usuario y Privacidad</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.1 Datos Recopilados</h3>
            <p>
              Nuestro sistema de autenticación recopila únicamente la información esencial para su funcionamiento:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Correo electrónico como identificador principal de la cuenta.</li>
              <li>Contraseña (almacenada de forma segura mediante técnicas de hash).</li>
              <li>Imagen de perfil (opcional).</li>
              <li>Datos técnicos básicos como dirección IP, tipo de dispositivo y navegador para seguridad y estadísticas.</li>
              <li>Registros de inicio de sesión para protección de su cuenta.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4.2 Uso de los Datos</h3>
            <p>
              Los datos recopilados se utilizan exclusivamente para:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Facilitar el proceso de autenticación y acceso seguro.</li>
              <li>Identificarle dentro de nuestro sistema.</li>
              <li>Proteger su cuenta de accesos no autorizados.</li>
              <li>Comunicarnos con usted sobre asuntos de seguridad o cambios importantes.</li>
              <li>Cumplir con obligaciones legales cuando sea necesario.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4.3 Protección de Datos</h3>
            <p>
              Su privacidad es importante para nosotros:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Implementamos medidas técnicas y organizativas para proteger sus datos.</li>
              <li>No compartimos su información con terceros sin su consentimiento explícito.</li>
              <li>Aplicamos los principios de minimización de datos, recopilando solo lo estrictamente necesario.</li>
              <li>Puede solicitar acceso, corrección o eliminación de sus datos personales en cualquier momento.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">5. Uso Aceptable</h2>
            <p>
              Al utilizar nuestro sistema de autenticación, usted se compromete a:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>No intentar acceder a cuentas que no le pertenecen.</li>
              <li>No realizar intentos de fuerza bruta u otros ataques contra nuestro sistema.</li>
              <li>No utilizar herramientas automatizadas para crear cuentas falsas o iniciar sesión.</li>
              <li>No utilizar nuestros servicios para actividades ilegales o fraudulentas.</li>
              <li>No intentar eludir, desactivar o interferir con las medidas de seguridad.</li>
              <li>No realizar acciones que puedan comprometer la estabilidad o seguridad de nuestro sistema.</li>
              <li>No compartir públicamente sus credenciales de acceso.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">6. Modificaciones y Comunicaciones</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">6.1 Modificaciones a los Términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Las modificaciones entrarán en vigor al publicarse en esta página.</li>
              <li>Para cambios sustanciales, notificaremos a los usuarios mediante el correo electrónico registrado.</li>
              <li>El uso continuado de nuestros servicios después de dichos cambios constituye su aceptación de los mismos.</li>
              <li>Le recomendamos revisar estos Términos periódicamente.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6.2 Comunicaciones</h3>
            <p>
              Para comunicaciones importantes:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Utilizaremos principalmente su correo electrónico registrado.</li>
              <li>Es su responsabilidad mantener actualizada su dirección de correo electrónico.</li>
              <li>Las notificaciones importantes incluyen alertas de seguridad, cambios en los Términos o confirmaciones de acceso.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">7. Terminación</h2>
            <p>
              Nos reservamos el derecho de:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Suspender o cancelar su cuenta si viola estos Términos.</li>
              <li>Restringir el acceso a usuarios que representen un riesgo para la plataforma.</li>
              <li>Eliminar cuentas inactivas después de un período prolongado de inactividad.</li>
            </ul>
            <p className="mt-4">
              Usted puede solicitar la eliminación de su cuenta en cualquier momento, lo que resultará en la eliminación permanente de sus datos de perfil conforme a nuestra política de retención.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">8. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley aplicable:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>No garantizamos que el servicio sea ininterrumpido o libre de errores.</li>
              <li>No somos responsables de pérdidas o daños resultantes del uso o imposibilidad de uso del servicio.</li>
              <li>No asumimos responsabilidad por accesos no autorizados cuando se deban a negligencia en la protección de credenciales.</li>
              <li>Implementamos medidas de seguridad razonables, pero ningún sistema de seguridad es infalible.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">9. Disposiciones Generales</h2>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Estos Términos constituyen el acuerdo completo entre usted y nosotros respecto al uso del sistema de autenticación.</li>
              <li>Si alguna disposición de estos Términos se considera inválida, las demás disposiciones seguirán siendo válidas y aplicables.</li>
              <li>Nuestro sistema de autenticación está diseñado para ser simple y recopilar solo la información esencial.</li>
              <li>La falta de ejercicio de un derecho no constituye una renuncia a dicho derecho.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">10. Contacto</h2>
            <p>
              Si tiene preguntas, inquietudes o necesita asistencia relacionada con estos Términos o nuestro sistema de autenticación, puede contactarnos a través de:
            </p>
            <ul className="space-y-3 pl-5 list-disc mt-4">
              <li>Nuestro formulario de contacto en la página principal.</li>
              <li>Correo electrónico de soporte: soporte@nuestrodominio.com</li>
              <li>Sección de ayuda dentro de nuestra plataforma.</li>
            </ul>
            <p className="mt-4">
              Nos esforzamos por responder a todas las consultas en un plazo máximo de 48 horas hábiles.
            </p>
          </section>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-700 font-medium">
              Al registrarse, acceder o utilizar nuestro sistema de autenticación, usted acepta estos Términos de Servicio en su totalidad.
            </p>
            <p className="text-gray-600 mt-2">
              Estos Términos están diseñados específicamente para un sistema de autenticación minimalista que recopila solo información esencial como correo electrónico e imagen de perfil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
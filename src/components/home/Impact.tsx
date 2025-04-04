import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Heart, ShoppingBag } from 'lucide-react';

export default function Impact() {
    return (
        <section className="relative overflow-hidden  h-full  bg-gradient-to-b from-white to-amber-50 ">
            {/* Elemento decorativo */}
            {/* <div className="absolute inset-0 bg-teal-50/60 skew-y-3 transform -translate-y-12 z-0"></div> */}

            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8  ">
                <div className="flex flex-col ">
                <span className="inline-block mb-4 max-md:text-center md:w-2/6 max-md:items-center max-md:justify-center rounded-full bg-teal-100 px-4 py-1   text-sm font-medium text-teal-700">
                            Nuestro Propósito
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Arte con significado y transformación social
                        </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
                    {/* Columna izquierda - Stats e imagen */}
                    <div className="relative ">
                        {/* Stats cards - colocados encima de la imagen */}
                        

                        {/* Imagen principal con borde y diseño distintivo */}
                        <div className=" relative bottom-1 top-auto md:top-2 md:bottom-auto lg:right-2 w-full shadow-lg items-center justify-center">
                            <div className="flex items-center justify-center h-full rounded-lg overflow-hidden shadow-xl bg-[#E0D5BF] border border-gray-400">
                                
                                <Image
                                    src="/product2.jpeg"
                                    alt="Artesanos trabajando"
                                    width={400}
                                    height={0}
                                    className="object-cover items-center justify-center rounded-lg p-2"
                                />

                                {/* Testimonial flotante */}
                                <div className="absolute bottom-4 right-4 bg-[#EFE9DB] backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs z-20 text-gray-900">
                                    <p className="text-sm italic">"Arte como propósito y expresión."</p>
                                    <p className="text-xs font-bold mt-1 text-teal-700">— MCB, Artesano desde 2020</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Contenido de texto */}
                    <div className="flex flex-col">
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 mt-2 max-md:mt-0">
                            <div className="bg-white rounded-lg p-4 shadow-md border border-teal-100 text-teal-500">
                                <Users className="h-8 w-8  mb-2" />
                                <h3 className="font-bold text-lg">+100</h3>
                                <p className="text-gray-600 text-sm">Artesanos apoyados</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-md border border-teal-100 text-teal-500">
                                <Heart className="h-8 w-8 mb-2" />
                                <h3 className="font-bold text-lg">5 años</h3>
                                <p className="text-gray-600 text-sm">Transformando vidas</p>
                            </div>
                        </div>

                        <div className="prose prose-lg text-gray-600 mb-8">
                            <p className="mb-4">
                                En <span className="font-semibold">Hand Made Art</span>, nos enorgullece ofrecerte una amplia selección de artesanías únicas y auténticas. Cada pieza ha sido cuidadosamente creada a mano por personas privadas de libertad de Costa Rica.
                            </p>
                            <p>
                                Explora nuestra tienda en línea y encuentra el regalo perfecto o el complemento ideal para tu hogar, mientras apoyas la reinserción social y el desarrollo de nuevas habilidades.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            <Link href="/products" className="rounded-lg bg-teal-600 px-5 py-3 text-white font-medium shadow hover:bg-teal-700 transition flex items-center justify-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Explorar productos
                            </Link>
                            <Link href="/impacto" className="rounded-lg bg-white px-5 py-3 text-teal-700 font-medium border border-teal-200 hover:bg-teal-50 transition flex items-center justify-center">
                                Conocer más sobre nuestro impacto
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
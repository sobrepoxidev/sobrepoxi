'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Las artesanías que compré son hermosas y tienen un impacto social real. Saber que estoy apoyando a personas que buscan una segunda oportunidad me hace sentir parte de algo importante.",
      author: "María Fernández",
      location: "San José",
      avatar: "/home/face-f.webp"
    },
    {
      id: 2,
      quote: "El chorreador de café que compré no solo es funcional sino una verdadera obra de arte. La calidad es excepcional y cada vez que lo uso recuerdo la historia detrás de quién lo hizo.",
      author: "Carlos Jiménez",
      location: "Heredia",
      avatar: "/home/face-m.webp"
    },
    {
      id: 3,
      quote: "Regalé un espejo artesanal a mi madre y quedó encantada. Los detalles tallados a mano son increíbles y se nota la dedicación. Definitivamente volveré a comprar más productos.",
      author: "Laura Mora",
      location: "Cartago",
      avatar: "/home/face-f.webp"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las experiencias de quienes ya han adquirido nuestras artesanías y se han unido a nuestra causa
          </p>
        </div>

        <div className="max-w-5xl mx-auto h-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              bulletClass: 'inline-block w-2 h-2 rounded-full bg-gray-300 mx-1 transition-all cursor-pointer',
              bulletActiveClass: 'w-3 h-3 bg-teal-600'
            }}
            className="h-full"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-full">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full flex flex-col">
                  <div className="mb-4 text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center mt-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
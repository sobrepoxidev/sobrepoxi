//src\app\[locale]\page.tsx
//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";

import HomeContainer from "./HomeContainer";
import React from "react"; // Import React

type tParams = Promise<{ locale: string }>;
/**
 * P gina de inicio para la ruta ra z
 * Utiliza suspense para mejorar la carga progresiva
 * @param {{ params: tParams }} props 
 * @returns {JSX.Element}
 */
export default async function Home({ params }: { params: tParams }) {
  const { locale } = await params;
  return <HomeContainer locale={locale.toString()} />;
}
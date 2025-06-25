//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
import HomeContainer from "./HomeContainer";
import React from "react"; // Import React

type tParams = {
  params: {
    locale: Promise<string>;
  };
};
export default async function Home({ params }: tParams) {
  const { locale } = await params;
  return <HomeContainer locale={locale.toString()} />;
}

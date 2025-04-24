//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
//import PopularCategories from "@/components/home/PopularCategories";
import CallToAction from "@/components/home/CallToAction";
import NewHome from "./new/page";

export default function Home() {
  return (
    <div>
      <main>

        <NewHome />
        <FeaturedProducts />
        {/* <ValueProposition /> */}
        {/* <Testimonials /> */}
        {/* <PopularCategories /> */}
        <CallToAction />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}

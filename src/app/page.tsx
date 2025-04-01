//1import Image from "next/image";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <main>
        {/* <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to Hand Made Art
        </h1>
        <p className="text-lg text-center sm:text-left">
          Discover our unique handmade products crafted with love and care.
        </p>
        <div className="flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/productos"
          >
            <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">

              <rect x="1" y="1" width="218" height="58" rx="10" fill="#C0C0C0" stroke="#444" strokeWidth="2" />


              <g transform="translate(20, 12)">

                <rect x="0" y="10" width="30" height="30" rx="4" fill="#C0C0C0" stroke="#444" strokeWidth="2" />


                <path d="M6 10 C6 3, 24 3, 24 10" fill="none" stroke="#444" strokeWidth="2" />


                <circle cx="6" cy="10" r="1.8" fill="#444" />
                <circle cx="24" cy="10" r="1.8" fill="#444" />
              </g>


              <text x="70" y="38" fontFamily="Arial, sans-serif" fontSize="20" fill="#444">Shop Now</text>
            </svg>

          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/contacto"
          >
            <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">

              <rect x="1" y="1" width="218" height="58" rx="10" fill="#C0C0C0" stroke="#444" strokeWidth="2" />


              <text x="20" y="37" fontFamily="Arial, sans-serif" fontSize="20" fill="#444">Contact Us</text>


              <path d="M170 30 L180 22 L180 27 L195 27 L195 33 L180 33 L180 38 Z" fill="#444" />
            </svg>

          </a>
        </div> */}
        <Hero />
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

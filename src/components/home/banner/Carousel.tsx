import { ReactNode, memo } from "react";
import CarouselClient from "./CarouselClient";

/**
 * Server‑side wrapper for the `Carousel` component.
 * Only contains static markup that can be safely rendered on the server.
 * All interactive behaviour (autoplay, touch/keyboard navigation, arrows, indicators, pause / resume)
 * is delegated to the client component (`CarouselClient`).
 *
 * @param children – The slides to be shown inside the carousel.
 */
interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => (
  <CarouselClient>{children}</CarouselClient>
);

export default memo(Carousel);

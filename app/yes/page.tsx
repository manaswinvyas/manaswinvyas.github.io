"use client";

import { useAnimate } from "framer-motion";
import Image from "next/image";
import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const YesPage = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "/images/IMG_1.JPEG",
        "/images/IMG_2.JPEG",
        "/images/IMG_3.JPEG",
        "/images/IMG_4.jpeg",
        "/images/IMG_5.JPEG",
        "/images/IMG_6.JPEG",
        "/images/IMG_7.JPEG",
        "/images/IMG_8.JPEG",
        "/images/IMG_9.JPEG",
        "/images/IMG_10.JPEG",
        "/images/IMG_11.JPEG",
        "/images/IMG_12.JPEG",
        "/images/IMG_14.JPEG",
        "/images/IMG_15.JPEG",
        "/images/IMG_16.jpg",
        "/images/IMG_17.jpg",
        "/images/IMG_18.jpg",
        "/images/IMG_19.jpg",
        "/images/IMG_20.jpg",
      ]}
    >
      <div className="flex flex-col min-h-screen items-center justify-center h-[100vh] bg-[#A2E5E8] p-24">
        <div className="">
          <h1 className="text-5xl font-bold text-white text-center mt-[20px] mb-0">
            Yeeeyyyy!!
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={"/images/elly-belly2.gif"}
            alt="Cute animated illustrations"
            height={120}
            width={500}
            className=""
          />
        </div>
      </div>
    </MouseImageTrail>
  );
};

export default YesPage;

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}: {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector) as HTMLElement;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <Image
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
          width={120}
          height={100}
        />
      ))}
    </div>
  );
};

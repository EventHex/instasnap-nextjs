/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Post1, Post2, Post3 } from "../../../assets";
import { useRef, useState, useEffect } from "react";

// Simple className merge utility function to replace cn from clsx/tailwind-merge
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom Marquee implementation
const Marquee = ({ children, className = "", pauseOnHover = false, reverse = false, vertical = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "flex overflow-hidden";
  const marqueeStyles = {
    "--duration": "20s",
    "--gap": "1rem",
    "--direction": reverse ? "-1" : "1",
  };

  const containerClasses = cn(
    baseClasses,
    vertical ? "flex-col" : "flex-row",
    className
  );

  const innerClasses = cn(
    "flex",
    vertical ? "flex-col" : "flex-row",
    "gap-[--gap]"
  );

  // Dynamic animation styles based on vertical or horizontal
  const animationStyle = {
    animationDuration: "var(--duration)",
    animationDirection: reverse ? "reverse" : "normal",
    animationPlayState: pauseOnHover && isHovered ? "paused" : "running",
    animationName: "marquee",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  };

  // Add CSS animation
  useEffect(() => {
    const style = document.createElement('style');
    if (vertical) {
      style.textContent = `
        @keyframes marquee {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap))); }
        }
      `;
    } else {
      style.textContent = `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
      `;
    }
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [vertical]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      className={containerClasses}
      style={marqueeStyles}
      onMouseEnter={pauseOnHover ? handleMouseEnter : undefined}
      onMouseLeave={pauseOnHover ? handleMouseLeave : undefined}
    >
      <div className={innerClasses} style={animationStyle}>
        {children}
      </div>
      <div className={innerClasses} style={animationStyle}>
        {children}
      </div>
    </div>
  );
};

const reviews = [
  {
  
    img: Post3,
  },
  {

    img: Post3,
  },
  {

    img: Post3,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const thirdRow = reviews.slice(0, reviews.length / 2);
const fourthRow = reviews.slice(reviews.length / 2);
const fifthRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[150px]  justify-center items-center flex   sm:w-36 cursor-pointer overflow-hidden rounded-xl border ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex   flex-row items-center gap-1">
        <Image src={img} alt="Post" className="w-full h-auto" />
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex     h-96  w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex   flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-20px)   translateY(10px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="  [--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard   key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" vertical>
            {fourthRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
            ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" vertical>
            {fifthRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
            ))}
            </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
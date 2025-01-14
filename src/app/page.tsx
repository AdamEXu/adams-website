"use client";

import { ReactLenis, useLenis } from "lenis/react";
import {
  motion,
  useTransform,
  useScroll,
  easeOut,
  easeIn,
  AnimatePresence,
  useAnimation,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const [showFront, setShowFront] = useState(true);
  const [showNav, setShowNav] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "100vh start"],
  });

  const frontScale = useTransform(scrollYProgress, [0, 0.7], [1, 8], {
    ease: easeIn,
  });
  const frontOpacity = useTransform(scrollYProgress, [0.65, 0.7], [1, 0]);
  const backOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1], {
    ease: easeOut,
  });
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setShowFront(latest < 0.7);
      setShowNav(latest < 0.15); // Hide nav when scroll progress is 15% or more
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    // Force show front on initial load
    setShowFront(true);

    // Hide front if page is loaded scrolled down
    const timer = setTimeout(() => {
      setShowFront(scrollYProgress.get() < 0.7);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useLenis(() => {});

  return (
    <ReactLenis root>
      <AnimatePresence>
        {showNav && (
          <motion.div
            className="fixed z-20 top-[60vh] w-screen flex flex-row justify-center gap-8 text-lg"
            style={{ opacity: navOpacity }}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="cursor-pointer underline underline-offset-2 font-bold">
              About Me
            </span>
            <Link
              href="/blog"
              className="opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              Blog
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={containerRef} className="h-[100vh]">
        <AnimatePresence>
          {showFront && (
            <motion.div
              id="front"
              className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-10 bg-gray-900"
              style={{ scale: frontScale, opacity: frontOpacity }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                style={{ scale: frontScale }}
              >
                <motion.text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Hi, I&apos;m Adam.
                </motion.text>
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        id="back"
        className="w-screen min-h-screen px-8 relative z-0"
        style={{ opacity: backOpacity }}
      >
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <div className="mx\-8">
            <p className="text-4xl md:text-6xl font-bold py-6">
              My name is Adam Xu.
            </p>
            <p className="text-xl md:text-3xl font-medium py-2">
              Welcome to my website on the world wide web.
            </p>
            <p className="text-xl md:text-3xl font-light py-2">
              I&apos;m a high schooler based in the Bay Area.
            </p>
          </div>
          <span className="block py-4" />
          <div className="bg-gray-900 p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-medium">My Interests</h2>
            <div>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Interest
                  title="Programming"
                  desc="I have been coding for over five years, and I work on a lot of random projects in my free time. "
                  img="/terminal.svg"
                  bg="#228833"
                  fg="#99ffaa"
                />
                <Interest
                  title="Video Production"
                  desc="My skills mostly fall into video editing, but I also have experience all around the production process."
                  img="/camera.svg"
                  bg="#2233aa"
                  fg="#99bbff"
                />
                {/* <Interest
                  title="Title"
                  desc="Description text, blah blah blah."
                  img="/terminal.svg"
                  bg="#aa2222"
                  fg="#ffaa99"
                /> */}
              </div>
            </div>
          </div>
          <ExperienceSection />
          <span className="block py-4" />
          <div className="bg-gray-900 p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-medium pb-4">
              Contact me!
            </h2>
            <p>
              My email is{" "}
              <a className="font-bold opacity-70">click to reveal</a>
            </p>
          </div>
          <span className="block py-4" />
        </div>
      </motion.div>
    </ReactLenis>
  );
}

interface InterestProps {
  title: string;
  desc: string;
  img: string;
  bg: string;
  fg: string;
}

function Interest(props: InterestProps) {
  return (
    <div
      className="w-full md:w-1/2 px-4 py-8 mt-4 rounded-xl h-70 md:h-80"
      style={{ backgroundColor: props.bg }}
    >
      <div
        className="w-1/2"
        style={{
          maskImage: `url(${props.img})`,
          WebkitMaskImage: `url(${props.img})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          backgroundColor: props.fg,
          height: "100px",
        }}
      />
      <h2 className="text-2xl font-bold mt-4" style={{ color: props.fg }}>
        {props.title}
      </h2>
      <p className="mt-4 text-white opacity-90">{props.desc}</p>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="bg-gray-900 p-10 rounded-3xl mt-10">
      <h2 className="text-2xl md:text-3xl font-medium">My Experience</h2>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <div className="pb-4 w-full md:w-1/2">
          <Experience
            title="Web Dev"
            desc="I know plain HTML, CSS, and Javascript, as well as Flask to build backends and NextJS + React + Tailwind to build frontends."
            img="/safari.svg"
            bg="#2233aa"
            fg="#99bbff"
          />
          <Experience
            title="AI"
            desc="I have worked on creating AI chatbots for different purposes using a variety of techniques such as prompting and RAG."
            img="/cpu.svg"
            bg="#aa2222"
            fg="#ffaa99"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Experience
            title="Video Editing"
            desc="I use Final Cut Pro for most of my editing. I occasionally use Premiere Pro along with After Effects for more complex projects."
            img="/selection.pin.in.out.svg"
            bg="#228833"
            fg="#99ffaa"
          />
          <Experience
            title="Award Winning"
            desc="In the Student Television Network Spring Nationals 2024 competition, I represented my school and won first place in the Commercial category."
            img="/trophy.svg"
            bg="#bb8800"
            fg="#ffee77"
          />
        </div>
      </div>
    </div>
  );
}

function Experience({ title, desc, img, bg, fg }) {
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsExpanded(!isOpen);
    if (!isOpen && contentRef.current) {
      controls.start({
        height: contentRef.current.scrollHeight + 60,
        backgroundColor: adjustBrightness(bg, 20),
      });
    } else {
      controls.start({
        height: 100,
        backgroundColor: bg,
      });
    }
  };

  const handleHoverStart = () => {
    if (!isOpen && contentRef.current) {
      setIsExpanded(true);
      controls.start({
        height: contentRef.current.scrollHeight + 55,
        // backgroundColor: adjustBrightness(bg, 20),
      });
    }
  };

  const handleHoverEnd = () => {
    if (!isOpen) {
      setIsExpanded(false);
      controls.start({
        height: 100,
        backgroundColor: bg,
      });
    }
  };

  // Utility function to adjust color brightness
  const adjustBrightness = (color: string, amount: number) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const adjustedR = Math.min(255, Math.max(0, r + amount));
    const adjustedG = Math.min(255, Math.max(0, g + amount));
    const adjustedB = Math.min(255, Math.max(0, b + amount));

    return `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG
      .toString(16)
      .padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="w-full px-4 py-8 mt-4 rounded-xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: bg }}
      animate={controls}
      initial={{ height: 100 }}
      onClick={handleClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div ref={contentRef}>
        <div className="flex items-center gap-4 mb-8">
          <div
            className="flex-shrink-0"
            style={{
              maskImage: `url(${img})`,
              WebkitMaskImage: `url(${img})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              backgroundColor: fg,
              width: "40px",
              aspectRatio: "1 / 1",
            }}
          />
          <h2 className="text-xl md:text-3xl font-bold" style={{ color: fg }}>
            {title}
          </h2>
        </div>
        <motion.p
          className="text-lg md:text-xl mt-4"
          style={{ color: "#fff" }}
          animate={{
            opacity: isOpen || isExpanded ? 1 : 0.5,
          }}
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

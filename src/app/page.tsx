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
import { useRef, useState, useEffect, createContext } from "react";
import Link from "next/link";
import { LenisContext } from "@/context/LenisContext";
import { easeInOut } from "motion";

export default function Home() {
  const [lenisInstance, setLenisInstance] = useState(null);
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

  useLenis((lenis) => {
    setLenisInstance(lenis);
  });

  return (
    <LenisContext.Provider value={lenisInstance}>
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
              <Link
                className="cursor-pointer underline underline-offset-2 font-bold"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  lenisInstance?.scrollTo("#about", {
                    offset: -50,
                    duration: 1.5,
                    easing: easeOut,
                  });
                }}
              >
                About Me
              </Link>
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
          <div className="max-w-4xl mx-auto pt-24 px-4" id="about">
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
            <div className="bg-gray-900 p-10 mt-2 rounded-3xl">
              <h2 className="text-2xl md:text-3xl font-medium pb-4">
                Contact me!
              </h2>
              <p>
                I prefer communication through email. You can email me at{" "}
                <EmailReveal /> or DM me on Discord at{" "}
                <span className="font-bold">@thetnter</span>. If none of those
                work for you, you can try one of my socials below, but I&apos;m
                not very active on them.
              </p>
              <div className="flex flex-row gap-8 mt-8 flex-wrap">
                <SocialButton
                  href="https://github.com/AdamEXu"
                  img="/social-icons/github-mark-white.svg"
                  title="GitHub"
                  color="#fff"
                />
                <SocialButton
                  href="https://youtube.com/@thetnter"
                  img="/social-icons/youtube.svg"
                  title="YouTube"
                  color="#ff0000"
                />
                <SocialButton
                  href="https://bsky.app/profile/thetnter.bsky.social"
                  img="/social-icons/bluesky.svg"
                  title="Bluesky"
                  color="#3c84f6"
                />
                <SocialButton
                  href="https://instagram.com/thetnter"
                  img="/social-icons/instagram.svg"
                  title="Instagram"
                  color="#e4405f"
                />
                <SocialButton
                  href="https://www.facebook.com/adam.xu.7587/"
                  img="/social-icons/facebook.svg"
                  title="Facebook"
                  color="#1877f2"
                />
                <SocialButton
                  href="https://reddit.com/user/AdamTheGreat-"
                  img="/social-icons/reddit.svg"
                  title="Reddit"
                  color="#ff4500"
                />
                <SocialButton
                  href="https://linkedin.com/in/adam-xu/"
                  img="/social-icons/linkedin.svg"
                  title="LinkedIn"
                  color="#0077b5"
                />
                <SocialButton
                  href="https://twitter.com/thetnter"
                  img="/social-icons/X_logo.svg"
                  title="X (Formerly Twitter)"
                  color="#1da1f2"
                />
              </div>
            </div>
            <span className="block py-4" />
          </div>
        </motion.div>
      </ReactLenis>
    </LenisContext.Provider>
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

interface ExperienceProps {
  title: string;
  desc: string;
  img: string;
  bg: string;
  fg: string;
}

function Experience({ title, desc, img, bg, fg }: ExperienceProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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

function EmailReveal() {
  const [email, setEmail] = useState("ocmfaui@abomvr.cwi");
  const [isBlurred, setIsBlurred] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!isBlurred) return; // Don't fetch again if already revealed

    setIsLoading(true);
    try {
      const response = await fetch("/api/email");
      const data = await response.json();
      setEmail(data.email);
      if (!data.email) {
        setEmail("youre@rate.limited");
      }
      setIsBlurred(false);
    } catch (error) {
      setEmail("Failed to load email");
      setIsBlurred(false);
      // console.error("Failed to fetch email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <a
      onClick={handleClick}
      href={isBlurred ? "#" : `mailto:${email}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={`font-bold cursor-pointer
        ${isBlurred ? "opacity-70 blur-[4px]" : "opacity-100 blur-none"}
        ${isLoading ? "animate-pulse" : ""}
        transition-all duration-300`}
    >
      {email}
    </a>
  );
}

function SocialButton(props: { href: string; img: string; color: string }) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-8 h-8 hover:scale-110 transition-transform duration-300 ease-in-out"
    >
      <div
        className="flex-shrink-0 transition-colors duration-300 hover:cursor-pointer"
        style={{
          maskImage: `url(${props.img})`,
          WebkitMaskImage: `url(${props.img})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          backgroundColor: "#fff",
          width: "40px",
          aspectRatio: "1 / 1",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = props.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#fff";
        }}
      />
    </a>
  );
}

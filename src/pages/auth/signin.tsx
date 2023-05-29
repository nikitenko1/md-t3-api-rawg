import { useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const AnimatedText = () => {
  const text = "Start your gaming journey today!";
  //   Creates AnimationControls, which can be used to manually start,
  //   stop and sequence animations on one or more components
  const ctrls = useAnimation();
  //   React Hooks make it easy to monitor the inView state of your components.
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  return (
    <h1 className="text-center text-3xl font-bold text-white lg:text-5xl">
      {text.split(" ").map((word, index) => {
        return (
          <motion.span
            ref={ref}
            className="mr-[0.25em] inline-block whitespace-nowrap"
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <motion.span
                  className="mr-[-0.05em] inline-block"
                  aria-hidden="true"
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </h1>
  );
};

const SignInPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-x-8">
      <div className="  absolute left-0 top-0 hidden h-screen w-1/2 lg:block">
        <Image
          src="/images/auth-bg.jpg"
          alt="gta-5"
          layout="fill"
          className="object-cover"
        />
        <div
          className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center
       bg-[#0000009c] text-white"
        >
          <AnimatedText />
        </div>
      </div>
      <div className="hidden flex-[0.5] lg:block"></div>
      <div className="mx-auto flex max-w-xl  flex-1 flex-col justify-center  space-y-6 lg:flex-[0.5] lg:justify-start">
        <Link
          href="/"
          className="text-center text-xl font-bold text-white lg:text-start"
        >
          UAGAME
        </Link>
        <div className="block lg:hidden">
          <AnimatedText />
        </div>
        <p className="text-center text-gray-400">Sign in with</p>
        <button
          onClick={() =>
            signIn("github", {
              callbackUrl: `http://localhost:3000/`,
            })
          }
          className="rounded-md bg-purple-700 px-3 py-2 text-xl font-bold text-white 
          transition-all duration-200  ease-in-out md:px-6 md:py-4 "
        >
          Twitter
        </button>
        <button
          onClick={() =>
            signIn("github", {
              callbackUrl: `http://localhost:3000/`,
            })
          }
          className="rounded-md bg-purple-700 px-3 py-2 text-xl font-bold text-white
           transition-all duration-200  ease-in-out md:px-6 md:py-4 "
        >
          Github
        </button>
      </div>
    </div>
  );
};

export default SignInPage;

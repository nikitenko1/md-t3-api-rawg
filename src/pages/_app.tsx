import "../styles/globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import AuthWrapper from "../components/AuthWrapper";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { motion, AnimatePresence } from "framer-motion";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: 1000 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 1000 },
  };

  return (
    <>
      <SessionProvider session={session}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1D9BF0",
              color: "#fff",
            },
          }}
        />
        <AuthWrapper>
          <Layout>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                transition={{
                  type: "spring",
                }}
                key={router.route}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </AuthWrapper>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);

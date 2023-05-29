import React from "react";
import { useCartMenu, useSearchModal } from "../../lib/zustand";
import { AnimatePresence, useScroll } from "framer-motion";
import CartItems from "./CartItems";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import AnimatedModal from "./AnimatedModal";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { isOpen } = useCartMenu();
  const { isOpen: searchOpen } = useSearchModal();
  // useScroll is used to create scroll-linked animations, like progress indicators and parallax effects.
  const { scrollYProgress } = useScroll();

  return (
    <main className="scrollbar-thin overflow-x-hidden">
      <AnimatePresence
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        mode="wait"
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        <ProgressBar progress={scrollYProgress} />
        <div className="bg-primary p-4">
          <Sidebar />
          <div className="px-2 pt-2">
            <Header />
            {isOpen && <CartItems />}

            {searchOpen ? <AnimatedModal /> : null}
          </div>
          {children}
        </div>
      </AnimatePresence>
    </main>
  );
};

export default Layout;

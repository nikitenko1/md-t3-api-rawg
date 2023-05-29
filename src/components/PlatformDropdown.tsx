import React, { useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import convertToPlatform from "../../helper/convertToPlatform";
import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";
import { v4 } from "uuid";
import { motion } from "framer-motion";

interface IProps {
  platform: number;
  setPlatform: (id: number) => void;
}

const platforms = [
  {
    id: 1,
    name: "Xbox One",
  },
  {
    id: 3,
    name: "IOS",
  },
  {
    id: 4,
    name: "PC",
  },
  {
    id: 7,
    name: "Nintendo Switch",
  },
  {
    id: 18,
    name: "Playstation 4",
  },
  {
    id: 21,
    name: "Android",
  },
  {
    id: 187,
    name: "Playstation 5",
  },
];

const PlatformDropdown = ({ platform, setPlatform }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const router: any = useRouter();
  // React hook for listening for clicks outside of a specified element (see useRef).
  useOnClickOutside(dropdown, () => {
    setOpen(false);
  });
  return (
    <div
      ref={dropdown}
      onClick={() => setOpen(true)}
      className="bg-secondary relative flex w-56 cursor-pointer items-center justify-between 
      gap-x-1 rounded-lg px-4 py-2 text-white"
    >
      <span className="capitalize">{convertToPlatform(platform)}</span>
      <span>
        <BiDownArrow />
      </span>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary absolute left-0 right-0 top-full z-50 flex flex-col  
        space-y-1 px-4 py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1"
        >
          {platforms.map((platform) => (
            <span
              key={v4()}
              className="hover:bg-gray-400"
              onClick={() => {
                setPlatform(platform.id);
                router.query.platform = platform.id;
                router.push(router);
              }}
            >
              {platform.name}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PlatformDropdown;

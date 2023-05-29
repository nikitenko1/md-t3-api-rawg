import React, { useState, useRef } from "react";
import { BiDownArrow } from "react-icons/bi";
import { useOnClickOutside } from "usehooks-ts";
import { v4 } from "uuid";
import { motion } from "framer-motion";

// ordering: Available fields: name, released, added, created, updated, rating, metacritic
const ordering = [
  {
    name: "Date added",
    slug: "added",
  },
  {
    name: "Name",
    slug: "name",
  },
  {
    name: "Release Date",
    slug: "released",
  },
  {
    name: "Metacritic",
    slug: "metacritic",
  },
  {
    name: "Average rating",
    slug: "rating",
  },
];

interface IProps {
  orderby: string;
  setOrderBy: (ordering: string) => void;
}

const OrderbyDropdown = ({ orderby, setOrderBy }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const slugToName = (slug: string) => {
    switch (slug) {
      case "name":
        return "Name";
      case "released":
        return "Release Date";
      case "rating":
        return "Average rating";
      case "metacritic":
        return "Metacritic";
      case "added":
        return "Date added";
      default:
        break;
    }
  };

  const dropdown = useRef<HTMLDivElement>(null);
  // React hook for listening for clicks outside of a specified element (see useRef).
  useOnClickOutside(dropdown, () => {
    setOpen(false);
  });

  return (
    <div
      ref={dropdown}
      onClick={() => setOpen(true)}
      className="bg-secondary relative flex w-56 cursor-pointer items-center
      justify-between gap-x-1 rounded-lg px-4 py-2 text-white"
    >
      <span className="capitalize">Order: {slugToName(orderby)}</span>
      <span>
        <BiDownArrow />
      </span>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary absolute left-0 right-0 top-full z-50 flex flex-col space-y-1 px-4 py-2
           text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1"
        >
          {ordering.map((order) => (
            <span
              key={v4()}
              className="hover:bg-gray-400"
              onClick={() => setOrderBy(order.slug)}
            >
              {order.name}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default OrderbyDropdown;

import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-11-15",
});

const SuccessPage = ({ order }: any) => {
  return (
    <div className="grid min-h-screen place-items-center">
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: "-100%", opacity: 0 }}
        className="bg-secondary flex flex-col items-center space-y-4 rounded-lg p-4 text-white"
      >
        <h1 className="text-center text-lg font-bold md:text-2xl">
          Thank you for your order
        </h1>
        <p className="font-semibold">Email confirmation has been sent to: </p>
        <p className="font-semibold">{order.customer_details.email}</p>
        <div className="flex gap-x-4">
          <div>
            <p className="font-semibold">Address</p>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <>
                  <p key={uuidv4()}>
                    <>
                      {key}: {val}
                    </>
                  </p>
                </>
              )
            )}
          </div>
          <div>
            <p className="font-semibold">Products</p>
            <div className="space-y-2">
              {order.line_items.data.map((item: any) => (
                <div key={uuidv4()}>
                  <p>Product: {item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.unit_amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="rounded-sm bg-[#bc13fe] px-4 py-2 font-bold">
          <Link href="/">Continue shopping</Link>
        </button>
      </motion.div>
    </div>
  );
};

export const getServerSideProps = async (params: any) => {
  const order = await stripe.checkout.sessions.retrieve(
    // http://localhost:3000/payment/success?&session_id=cs_test_KdjLtDPfAjT1gq374DMZ3rHmZ9OoSlG
    params.query.session_id,
    // One example is the Checkout Session’s line_items property,
    // which is only included in responses if requested using the expand parameter
    {
      expand: ["line_items"],
    }
  );

  return {
    props: {
      order,
    },
  };
};

export default SuccessPage;

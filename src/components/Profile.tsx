import { signOut, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";

const Profile = () => {
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  // Easily retrieve media dimensions with this Hook React which also works onResize
  const desktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="ml-auto">
      {status === "unauthenticated" ? (
        <Link href={"/auth/signin"}>
          {desktop ? (
            <p className="cursor-pointer border-[#bc13fe] font-bold uppercase text-white hover:border-b-2 ">
              Sign in
            </p>
          ) : (
            <IoMdLogIn className="cursor-pointer text-xl text-white hover:text-[#bc13fe]" />
          )}
        </Link>
      ) : (
        <div className=" flex items-center gap-x-4">
          <Image
            src={session?.user?.image ?? ""}
            width={40}
            height={40}
            className="rounded-full"
            alt="cart"
          />
          <p className="text-sm text-gray-400">{session?.user?.name}</p>

          <button
            className="cursor-pointer border-[#bc13fe] font-bold uppercase text-white hover:border-b-2 "
            onClick={handleSignOut}
          >
            {desktop ? (
              <span>Sign out</span>
            ) : (
              <BiLogOut className="cursor-pointer text-xl text-white hover:text-[#bc13fe]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

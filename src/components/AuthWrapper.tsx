import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProtectedRoute from "./ProtectedRoute";

const authRoutes = ["/wishlist"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;

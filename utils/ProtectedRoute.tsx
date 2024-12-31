import { Spinner } from "@nextui-org/react";
import { useAuth } from "./CentralAuth";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  // if no current user exists at this current moment (meaning that they signed out)
  // then we just redirect back to login...
  if (!user) {
    return router.push("/login");
  }

  return children;
};
export default ProtectedRoute;

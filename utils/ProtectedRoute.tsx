import { Spinner } from "@nextui-org/react";
import { useAuth } from "./CentralAuth";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { ReactNode } from "react";
// children --> represents the actual htmx code that's used
// React.ReactNode --> set's the type of the component to a react element
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
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

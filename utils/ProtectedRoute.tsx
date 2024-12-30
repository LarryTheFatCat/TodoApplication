import { Spinner } from "@nextui-org/react";
import { useAuth } from "./CentralAuth"
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    if(loading) {
        return <div><Spinner /></div>;
    }
    if(!user) {
        router.push("/login")
    }
    return children;
}
export default ProtectedRoute;
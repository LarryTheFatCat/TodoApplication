import { useRouter } from "next/router"
import { useEffect } from "react";
export default function TaskPage() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            {id}
        </>
    )
}
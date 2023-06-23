import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    return (<div className="d-flex justify-content-end px-4 py-2">
        <Link href="/">
            <Button className={"buttonNavBar " + `${router.pathname == '/' ? "textColorFocus" : ""}`}>Home</Button>
        </Link>
        <Link href="/consent">
            <Button className={"buttonNavBar " + `${router.pathname == '/consent' ? "textColorFocus" : ""}`}>Consent</Button>
        </Link>
    </div>)
}
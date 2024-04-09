import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import Sidebar from "./sidebar/sidebar";

export default function Guest(){
    const {token}= useStateContext()

    return (
    <div>
        <Outlet/>
    </div>
    )
}

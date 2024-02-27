import {createBrowserRouter} from "react-router-dom"
import Register from "./Views/Register.jsx";
import Users from "./Views/Users.jsx";
import Guest from "./Components/Guest.jsx";
import Login from "./Views/Login.jsx";
const router = createBrowserRouter([
   {
    path: '/',
    element: <Guest />,
    children:[
        {
            path: '/register',
            element: <Register/>
           },

           {
            path: '/login',
            element: <Login/>
           }

    ]
   } 
   ,
   {
    path: '/users',
    element: <Users/>
   },


])
export default router;
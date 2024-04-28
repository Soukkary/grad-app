import {createBrowserRouter} from "react-router-dom"
import Register from "./Views/Register.jsx";
import Users from "./Views/Users.jsx";
import Guest from "./Components/Guest.jsx";
import Login from "./Views/Login.jsx";
import Dash from "./Views/Userdashboard/Dash.jsx";
import Jobs from "./Views/Userdashboard/Jobs.jsx";
import JobSearch from "./Views/JobSearch/JobSearch.jsx";
import "./index.css";
import Notifications from "./Views/Userdashboard/Notifications.jsx";
import ProfilePage from "./Views/Profile.jsx";

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
           },
           {
            path: '/dashboard',
            element: <Dash/>,
            },
           {
            path:'/jobs',
            element:<Jobs/>
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

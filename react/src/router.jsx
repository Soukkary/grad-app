import {createBrowserRouter} from "react-router-dom"
import Register from "./Views/Register.jsx";
import Users from "./Views/Users.jsx";
import Guest from "./Components/Guest.jsx";
import Login from "./Views/Login.jsx";
import Dash from "./Views/Userdashboard/Dash.jsx";
import Jobs from "./Views/Userdashboard/Jobs.jsx";
import JobSearch from "./Views/JobSearch/JobSearch.jsx";
import GigInfo from "./Views/JobSearch/GigInfo.jsx";
import GoogleLoginButton from "./Components/GoogleLoginButton.jsx";
import "./index.css";

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
            },
            {
            path: '/job-search',
            element: <JobSearch/>
            },
            {
            path: 'gig-info',
            element: <GigInfo />
            },
            {
            path: "/auth/google",
            element: <GoogleLoginButton />
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

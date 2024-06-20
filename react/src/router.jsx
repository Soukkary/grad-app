import {createBrowserRouter} from "react-router-dom"
import Register from "./Views/Register.jsx";
import Users from "./Views/Users.jsx";
import Guest from "./Components/Guest.jsx";
import Login from "./Views/Login.jsx";
import Dash from "./Views/Userdashboard/Dash.jsx";
import Jobs from "./Views/Userdashboard/Jobs.jsx";
import JobSearch from "./Views/JobSearch/JobSearch.jsx";
import GigInfo from "./Views/JobSearch/GigInfo.jsx";
import "./index.css";
import Notifications from "./Views/Userdashboard/Notifications.jsx";
import ProfilePage from "./Views/Profile.jsx";
import ProjectCollaborationHub from "./Views/PCH.jsx";
import HomePage from "./Views/Homepage/Homepage.jsx";
import ProfileForm from "./Views/ProfileForm.jsx";
import { useStateContext } from './Contexts/ContextProvider';
const ProtectedRoute = ({ element }) => {
    const { token } = useStateContext();
    return token ? element : <Navigate to="/login" />;
};
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
            path:'/home',
            element:<HomePage/>
        },
        {
            path:'/profilepage/:userId',
            element:<ProfilePage/>
        },
        {
            path: '/job-search',
            element: <JobSearch/>,
            },
            {
                path: '/PCH',
                element:<ProjectCollaborationHub></ProjectCollaborationHub>
            }
            ,
            {
                path:"/profileform",
                element:<ProfileForm />
            }
            


            {
            path: 'gig-info',
            element: <GigInfo />
            }
    ]
   }
   ,
   {
    path: '/users',
    element: <Users/>
   },


]
)
export default router;

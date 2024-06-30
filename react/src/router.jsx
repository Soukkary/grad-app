import {createBrowserRouter} from "react-router-dom"
import Register from "./Views/Register.jsx";
import Users from "./Views/Users.jsx";
import Guest from "./Components/Guest.jsx";
import Login from "./Views/Login.jsx";
import Dash from "./Views/Userdashboard/Dash.jsx";
import Jobs from "./Views/Userdashboard/Jobs.jsx";
import JobSearch from "./Views/JobSearch/GigSearch.jsx";
import GigInfo from "./Views/JobSearch/GigInfo.jsx";
import GoogleLoginButton from "./Components/GoogleLoginButton.jsx";
import JobPortal from "./Views/JobPortal/JobPortal.jsx";
import ChatBot from "./Views/Chatbot/ChatBot.jsx";
import "./index.css";
import Notifications from "./Views/Userdashboard/Notifications.jsx";
import ProfilePage from "./Views/Profile.jsx";
import ProjectCollaborationHub from "./Views/PCH.jsx";
import HomePage from "./Views/Homepage/Homepage.jsx";
import ProfileForm from "./Views/ProfileForm.jsx";
import { useStateContext } from './Contexts/ContextProvider';
import Projects from "./Views/Userdashboard/projects.jsx";
import App from "./Views/Chatbot/azure.jsx";
import { ChatIcon } from "@chakra-ui/icons";
import ForgotPassword from "./Views/ForgetPassword.jsx";
import ChatbotPage from "./Views/Chatbot/azure.jsx";
import ResetPassword from "./Views/resetpassword.jsx";
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
            element: <JobSearch/>
            },
            {
            path: '/job-portal',
            element: <JobPortal/>
            },
            {
                path: '/PCH',
                element:<ProjectCollaborationHub></ProjectCollaborationHub>
            }
            ,
            {
                path:"/profileform",
                element:<ProfileForm />
            },
            {
                path:"/projects",
                element:<Projects />
            },
            {
                path:"/azure",
                element:<ChatbotPage />
            },
            {
                path:"/forget-password",
                element: <ForgotPassword></ForgotPassword>
            },
                {
                    path:"/reset-password/:token", 
                    element:<ResetPassword/>
            

                },
                {
                    path:'project/PCH/:projectId',
                    element:<ProjectCollaborationHub></ProjectCollaborationHub>
                },
                


            {
            path: 'gig-info',
            element: <GigInfo />
            },
            {
            path: '/chatbot',
            element: <ChatBot/>
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


]
)
export default router;

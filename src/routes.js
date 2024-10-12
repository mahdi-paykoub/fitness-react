import Courses from "./pages/Courses/Courses";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Plans from "./pages/Plans/Plans";
import IndexDashboard from "./pages/UserDashboard/IndexDashboard/IndexDashboard";
import Inquiry from "./pages/UserDashboard/Inquiry/Inquiry";
import MyCourses from "./pages/UserDashboard/MyCourses/MyCourses";
import Tickets from "./pages/UserDashboard/Tickets/Tickets";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UserInfo from "./pages/UserDashboard/UserInfo/UserInfo";
import Faqs from "./pages/UserDashboard/Faqs/Faqs";
import Verify from "./pages/Verify/Verify";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import Checkout from "./pages/Checkout/checkout";
import Section from "./pages/Section/Section";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import PanelIndex from "./pages/AdminPanel/PanelIndex/PanelIndex";
import PanelCourses from "./pages/AdminPanel/PanelCourses/PanelCourses";
import PanelSession from "./pages/AdminPanel/PanelSession/PanelSession";
import SinglePlan from "./pages/SinglePlan/SinglePlan";
import PanelPlans from "./pages/AdminPanel/PanelPlans/PanelPlans";
import Register from "./pages/Register/Register";


const routes = [
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/verify-phone-number', element: <Verify /> },
    { path: '/plans', element: <Plans /> },
    { path: '/plans/:title', element: <SinglePlan /> },
    { path: '/courses', element: <Courses /> },
    { path: '/courses/:title', element: <SingleCourse /> },
    { path: '/courses/:title/:sectionId', element: <Section /> },
    { path: '/checkout', element: <Checkout /> },
    // user panel
    {
        path: '/dashboard/*', element: <UserDashboard />,
        children: [
            { path: '', element: <IndexDashboard /> },
            { path: 'my-courses', element: <MyCourses /> },
            { path: 'tickets', element: <Tickets /> },
            { path: 'my-programs', element: <UserInfo /> },
            { path: 'inqiry', element: <Inquiry /> },
            { path: 'faqs', element: <Faqs /> },
            { path: 'user-info', element: <UserInfo /> },
        ]
    },
    //admin panel
    {
        path: '/admin-panel/*', element: <AdminPanel />,
        children: [
            { path: "", element: <PanelIndex /> },
            { path: "courses", element: <PanelCourses /> },
            { path: 'session', element: <PanelSession /> },
            { path: 'plans', element: <PanelPlans /> },


        ]
    },
]

export default routes
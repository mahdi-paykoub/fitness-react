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
import SendTicket from "./pages/UserDashboard/SendTicket/SendTicket";
import TicketDetail from "./pages/UserDashboard/TicketDetail/TicketDetail";
import PanelTicket from "./pages/AdminPanel/PanelTicket/PanelTicket";
import PanelTicketDetail from "./pages/AdminPanel/PanelTicketDetail/PanelTicketDetail";
import PanelSendTicket from "./pages/AdminPanel/PanelSendTicket/PanelSendTicket";
import PanelSendTicketIndex from "./pages/AdminPanel/PanelSendTicketIndex/PanelSendTicketIndex";
import SuccessPay from "./pages/SuccessPay/SuccessPay";
import FailPay from "./pages/FailPay/FailPay";
import PanelOrders from "./pages/AdminPanel/PanelOrders/PanelOrders";
import PanelOrderDatail from "./pages/AdminPanel/PanelOrderDetal/PanelOrderDetal";
import UserPrograms from "./pages/UserDashboard/UserPrograms/UserPrograms";
import ProgramDetail from "./pages/UserDashboard/ProgramDetail/ProgramDetail";
import UserPanelPrivateRoute from "./pages/UserPanelPrivateRoute/UserPanelPrivateRoute";
import AdminPanelPrivateRoute from "./pages/AdminPanelPrivateRoute/AdminPanelPrivateRoute";
import Page404 from "./pages/Page404/Page404";
import CheckoutPrivateRoute from "./pages/CheckoutPrivateRoute/CheckoutPrivateRoute";
import LoginPrivateRoute from "./pages/LoginPrivateRoute/LoginPrivateRoute";
import AllPeys from "./pages/AdminPanel/AllPeys/AllPeys";
import Setting from "./pages/AdminPanel/Setting/Setting";
import PanelAdminTicekts from "./pages/AdminPanel/PanelAdminTickets/PanelAdminTickets";
import PanelAddPlans from "./pages/AdminPanel/PanelAddPlans/PanelAddPlans";
import PanelAddCourses from "./pages/AdminPanel/PanelAddCourses/PanelAddCourses";
import PanelUpdateCourse from "./pages/AdminPanel/PanelUpdateCourse/PanelUpdateCourse";
import PanelUpdatePlan from "./pages/AdminPanel/PanelUpdatePlan/PanelUpdatePlan";
import PanelAddUser from "./pages/AdminPanel/PanelAddUser/PanelAddUser";
import PanelAddUserPrevInfos from "./pages/AdminPanel/PanelAddUserPrevInfos/PanelAddUserPrevInfos";
import PanelLanding from "./pages/AdminPanel/PanelLanding/PanelLanding";
import PanelFreePlans from "./pages/AdminPanel/PanelFreePlans/PanelFreePlans";


const routes = [
    { path: '/', element: <Landing /> },
    { path: '/plans', element: <Plans /> },
    { path: '/plans/:title', element: <SinglePlan /> },
    { path: '/courses', element: <Courses /> },
    { path: '/courses/:title', element: <SingleCourse /> },
    { path: '/courses/:title/:sectionId', element: <Section /> },
    { path: '/payment/:type/success', element: <SuccessPay /> },
    { path: '/payment/fail', element: <FailPay /> },
    //checkout
    {
        path: '/checkout', element: <CheckoutPrivateRoute />, children: [
            { path: '/checkout', element: <Checkout /> },
        ]
    },

    {
        path: '/login', element: <LoginPrivateRoute />, children: [
            { path: '/login', element: <Login /> },
        ]
    },
    {
        path: '/verify-phone-number', element: <LoginPrivateRoute />, children: [
            { path: '/verify-phone-number', element: <Verify /> },
        ]
    },
    {
        path: '/register', element: <LoginPrivateRoute />, children: [
            { path: '/register', element: <Register /> },
        ]
    },

    // user panel
    {
        path: '/dashboard/*', element: <UserPanelPrivateRoute />, children: [
            {
                path: '/dashboard/*', element: <UserDashboard />,
                children: [
                    { path: '', element: <IndexDashboard /> },
                    { path: 'user-info', element: <UserInfo /> },
                    { path: 'inqiry', element: <Inquiry /> },
                    { path: 'program-detail/:id', element: <ProgramDetail /> },
                    { path: 'my-programs', element: <UserPrograms /> },
                    { path: 'my-courses', element: <MyCourses /> },
                    { path: 'tickets', element: <Tickets /> },
                    { path: 'send-ticket', element: <SendTicket /> },
                    { path: 'ticket-detail/:id', element: <TicketDetail /> },
                    { path: 'faqs', element: <Faqs /> },
                ]
            },
        ]
    },

    //admin panel
    {
        path: '/admin-panel/*', element: <AdminPanelPrivateRoute />, children: [
            {
                path: '/admin-panel/*', element: <AdminPanel />,
                children: [
                    { path: "", element: <PanelLanding /> },
                    { path: "users/:page", element: <PanelIndex /> },
                    { path: "add-free-plans", element: <PanelFreePlans /> },
                    { path: "add-user", element: <PanelAddUser /> },
                    { path: "add-user-prev-infos", element: <PanelAddUserPrevInfos /> },
                    { path: "add-courses", element: <PanelAddCourses /> },
                    { path: "update-course/:slug", element: <PanelUpdateCourse /> },
                    { path: "all-courses", element: <PanelCourses /> },
                    { path: 'session', element: <PanelSession /> },
                    { path: 'orders', element: <PanelOrders /> },
                    { path: 'order-detail/:id/:userId', element: <PanelOrderDatail /> },
                    { path: 'add-plans', element: <PanelAddPlans /> },
                    { path: 'update-plan/:slug', element: <PanelUpdatePlan /> },
                    { path: 'all-plans', element: <PanelPlans /> },
                    { path: 'tickets/:page', element: <PanelTicket /> },
                    { path: 'admin-tickets/:page', element: <PanelAdminTicekts /> },
                    { path: 'ticketable-users/:page', element: <PanelSendTicketIndex /> },
                    { path: 'send-ticket/:id', element: <PanelSendTicket /> },
                    { path: 'ticket-detail/:id/:userId', element: <PanelTicketDetail /> },
                    { path: 'payments/:page', element: <AllPeys /> },
                    { path: 'setting', element: <Setting /> },
                ]
            },
        ]
    },

    { path: '*', element: <Page404 /> },

]

export default routes
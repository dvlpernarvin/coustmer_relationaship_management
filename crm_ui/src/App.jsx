import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import DashboardLayout from "./Components/dashboard/DashboardLayout";
import TicketList from "./Components/dashboard/Tickets/TicketList";
import TicketView from "./Components/dashboard/Tickets/TicketView";
import CreateTicket from "./Components/dashboard/Tickets/CreateTicket";
import MyProfile from "./Components/dashboard/Profile/MyProfile";
import Notification from "./Components/dashboard/Notification/Notification";
import Chat from "./Components/dashboard/Chat/Chat";
import Inbox from "./Components/dashboard/Inbox/Inbox";
import NotFound from "./Components/Pages/NotFound";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import ForgotPassword from "./Components/auth/ForgotPassword";
import ResetPassword from "./Components/auth/ResetPassword";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<TicketList />} />
        <Route path="tickets/:id" element={<TicketView />} />
        <Route path="tickets/create" element={<CreateTicket />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="notification" element={<Notification />} />
        <Route path="chat" element={<Chat />} />
        <Route path="inbox" element={<Inbox />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
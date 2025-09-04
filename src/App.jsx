import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import RequiredAuth from "./Auth/RequiredAuth";
import NotFoundPage from "./ReuseableComponents/NotFoundPage";
import { useContext, useEffect } from "react";
import { Auth } from "./Context/AuthContext";
import { encryptStorage } from "./utils/storage";
import IntroductionPage from "./Pages/IntroductionPage/IntroductionPage";
import VerifyCode from "./Auth/VerifyCode";
import Events from "./Pages/Admin/Events/Events";
import AttendeeInsights from "./Pages/Admin/AttendeeInsights/AttendeeInsights";
import AttendeeInsightsEvent from "./Pages/Admin/Events/components/AttendeeInsightsEvent";
import UserHome from "./Pages/Users/UserHome";
import EventsUser from "./Pages/Users/EventsUser/EventsUser";
import UserTickets from "./Pages/Users/EventsUser/UserTickets";


function App() {
  const { authData } = useContext(Auth);
  const storeAuth = encryptStorage.getItem("auth");
  const storeRole = storeAuth?.data?.role;
  const location = useLocation()
  useEffect(() => {
    scroll(0, 0)
  }, [location])

  return (
    <>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/verifyCode" element={<VerifyCode />} />

        <Route element={<RequiredAuth />}>
          {storeRole === "user" || authData?.data?.role === "user" ? (
            <>
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/events" element={<EventsUser />} />
              <Route path="/events/:id" element={<EventsUser />} />
              <Route path="/tickets" element={<UserTickets />} />

            </>
          ) : storeRole === "admin" || authData?.data?.role === "admin" ? (
            <>
              <Route path="/Admin-home" element={<AdminHome />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<Events />} />
              <Route path="/events/:id/attendee-insights" element={<AttendeeInsightsEvent />} />
              <Route path="/events/add-event" element={<Events />} />
              <Route path="/attendee-insights" element={<AttendeeInsights />} />
            </>
          ) : null}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

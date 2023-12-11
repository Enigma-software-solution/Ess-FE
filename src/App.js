import { ThemeProvider } from "styled-components";
import GlobalStyles from "./globalStyles";
import { Route, Routes } from "react-router-dom";
import { theme } from "./theme";
import DashobardLayout from "./layouts/DashobardLayout";
import Login from "./pages/Auth/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashobard from "./pages/Dashobard";
import { routes } from "./constant/routes";
import DailyApply from "./pages/DailyApply";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refresh } from "./store/slices/authSlice/apis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Agenda from "./pages/Agenda";
import { ConfigProvider } from "antd";
import ClientPage from "./pages/Clients";
import ProfileSettings from "./pages/profileSettings";
import UsersPage from "./pages/Users";
import RoleRoute from "./components/RoleRoute";
import AttendanceDashboard from "./pages/Attendance/AttendanceDashboard";
import AttendanceReports from "./pages/Attendance/AttendanceReports";
import NotFound from "./components/PageNotFound";
import UsersAttendanceCount from "./pages/Attendance/UsersAttendanceCount";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AfterConfirmationEmail from "./pages/Auth/AfterConfirmationEmail";
import Policy from "./pages/Policy";

import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { ROLES } from "./constant/roles";
import MarkAttendance from "./pages/Attendance/MarkAttendance";
import ProjectDailyUpdate from "./pages/ProjectDailyUpdate"
import AttendenceDetails from "./features/AttendanceFeature/SingleUserAttendanceDetails";
import SignUpPage from "./pages/Auth/SignUp";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import NewUpdate from "./features/ProjectDailyUpdate/ProjectDailyUpdateTabs/NewUpdate";
import UpdateProjectTable from "./features/ProjectDailyUpdate/ProjectDailyUpdateTabs/UpdateHistory";


function App() {
  const dispatch = useDispatch();
  const refresh_token = localStorage.getItem("refresh_token");
  useEffect(() => {
    if (refresh_token) {
      dispatch(refresh(refresh_token));
    }
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme} >
        <ConfigProvider theme={theme} locale={enUS}>

          <GlobalStyles />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<DashobardLayout />}>

                <Route path={routes.PROFILE_SETTINGS} element={<ProfileSettings />} />

                <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SALES_EXECUTIVE, ROLES.USER]} />} >
                  <Route index element={<Dashobard />} />
                  <Route path={routes.USERS} element={<UsersPage />} />
                  <Route path={routes.NEW_UPDATE} element={<ProjectDailyUpdate />} />
                </Route>

                {/* ATTENDANCE PROTECTED ROUTES  */}
                <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.HR]} />}>
                  <Route path={routes.ATTENDANCE_DASHBOARD} element={<AttendanceDashboard />} />
                  <Route path={routes.ATTENDANCE_SUBMISSION} element={<MarkAttendance />} />
                  <Route path={routes.ATTENDANCE_REPORTS} element={<AttendanceReports />} />
                  <Route path={routes.USER_ATTENDANCE_COUNT} element={<UsersAttendanceCount />} />
                </Route>
                
                {/* ATTENDANCE FREE ROUTES  */}
                <Route path={`${routes.USER_ATTENDANCE_DETAILS}/:id?`} element={<AttendenceDetails />} />

                <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SALES_EXECUTIVE]} />}>
                  <Route path={routes.USERS} element={<UsersPage />} />
                </Route>

                <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SALES_EXECUTIVE]} />}>
                  <Route path={routes.DAILY_APPLY} element={<DailyApply />} />
                  <Route path={routes.PROFILE} element={<Profile />} />
                  <Route path={routes.AGENDA} element={<Agenda />} />
                  <Route path={routes.CLIENT} element={<ClientPage />} />
                </Route>

                {/* PROJECT UPDATE ROUTES */}
                <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.HR, ROLES.SALES_EXECUTIVE, ROLES.USER]} />}>
                  <Route path={routes.NEW_UPDATE} element={<NewUpdate/>} />
                  <Route path={routes.UPDATE_HISTORY} element={<UpdateProjectTable/>} /> 
                </Route>

              </Route>
            </Route>

            {/* Auth ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUpPage />} />
            <Route path={`${routes.AfterConfirmationEmail}/confirm-email/:token`} element={<AfterConfirmationEmail />} />
            <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={`${routes.RESET_PASSWORD}/:token`} element={<ResetPassword />} />
            <Route path={`${routes.AFTER_CONFIRMATION_EMAIL}`} element={<AfterConfirmationEmail />} />

            {/* POLICIES ROUTES */}
            <Route path={`${routes.POLICIES}`} element={<Policy />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConfigProvider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;



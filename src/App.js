import { ThemeProvider } from "styled-components";
import GlobalStyles from "./globalStyles";
import { Route, Routes } from "react-router-dom";
import { theme } from "./theme";
import DashobardLayout from "./layouts/DashobardLayout";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashobard from "./pages/Dashobard";
import { routes } from "./constant/routes";
import DailyApply from "./pages/DailyApply";
import Attendance from "./pages/Attendance";
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
import SignUpPage from "./pages/SignUp";
import ProfileSettings from "./pages/profileSettings";
import UsersPage from "./pages/Users";

function App() {
  const dispatch = useDispatch();
  const refresh_token = localStorage.getItem("refresh_token");
  useEffect(() => {
    dispatch(refresh(refresh_token));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<DashobardLayout />}>
                <Route index element={<Dashobard />} />
                <Route path={routes.USERS} element={<UsersPage />} />
                <Route path={routes.DAILY_APPLY} element={<DailyApply />} />
                <Route path={routes.PROFILE} element={<Profile />} />
                <Route path={routes.AGENDA} element={<Agenda />} />
                <Route path={routes.CLIENT} element={<ClientPage />} />
                <Route path={routes.ATTENDANCE} element={<Attendance />} />
                <Route path={routes.PROFILE_SETTINGS} element={<ProfileSettings />} />

              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUpPage />} />
          </Routes>
        </ConfigProvider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;

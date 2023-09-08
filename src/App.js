import { ThemeProvider } from 'styled-components';
import GlobalStyles from './globalStyles';
import { Route, Routes } from 'react-router-dom';
import { lightTheme } from './theme';
import DashobardLayout from './layouts/DashobardLayout'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashobard from './pages/Dashobard';
import { routes } from './constant/routes';
import DailyApply from './pages/DailyApply';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<DashobardLayout />}>
              <Route index element={<Dashobard />} />
              <Route path={routes.DAILY_APPLY} element={<DailyApply />} />
              <Route path={routes.PROFILE} element={<Profile />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

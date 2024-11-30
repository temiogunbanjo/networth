import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import { ToastContainer as DefaultToastContainer } from "react-toastify";

// Import Contexts
// import { theme, ThemeProvider } from "./context/ThemeProvider";
import { MenuProvider } from "./contexts";

import SuspenseFallback from "./components/SuspenseFallback";
import ErrorBoundary from "./components/ErrorBoundary";
// import PrivateRoute from "./components/PrivateRoute";

// LAYOUTS
// import DashboardLayout from "./layouts/DashboardLayout";
// import DefaultLayout from "./layouts/DefaultLayout";

// Other assets
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

// PAGES
import UnknownPage from "./pages/UnknownPage";
const Home = React.lazy(() => import("./pages/Home"));

// create a default container so we can override the styles
const ToastContainer = (props: any) => (
  <DefaultToastContainer style={{ zIndex: "1900" }} {...props} />
);

function App() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<SuspenseFallback />}>
        <MenuProvider>
          <Router>
            <Switch>
              <Route path="/" element={<Home />} />

              {/* DASHBOARD */}
              {/* <Route
                path="/student/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
              </Route> */}

              <Route path="*" element={<UnknownPage />} />
            </Switch>
          </Router>
          <ToastContainer />
        </MenuProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;

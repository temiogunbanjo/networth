import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  // Redirect
} from "react-router-dom";

import { ToastContainer as DefaultToastContainer } from "react-toastify";

// Import Contexts
// import { theme, ThemeProvider } from "./context/ThemeProvider";
import { MenuProvider } from "./contexts";

import SuspenseFallback from "./components/SuspenseFallback";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";

// LAYOUTS
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DefaultLayout from "./layouts/DefaultLayout";

// Other assets
import "react-toastify/dist/ReactToastify.min.css";
// import logo from "./logo.svg";
import "./App.css";

// PAGES
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const NoPage = React.lazy(() => import("./pages/UnknownPage"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const Admissions = React.lazy(() => import("./pages/Admissions"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const PaymentComplete = React.lazy(() => import("./pages/PaymentComplete"));
const ContactIndex = React.lazy(() => import("./pages/contact/ContactIndex"));
const ManageStudents = React.lazy(
  () => import("./pages/students/ManageStudents")
);
const AdminDashboard = React.lazy(
  () => import("./pages/dashboard/AdminDashboard")
);
const AddSchedule = React.lazy(
  () => import("./pages/event & schedules/AddSchedule")
);
const ApplicationForm = React.lazy(
  () => import("./pages/admissions/ApplicationForm")
);
const ManageApplicants = React.lazy(
  () => import("./pages/students/ManageApplicants")
);
const ManagePayments = React.lazy(
  () => import("./pages/payment/admin/ManagePayments")
);
const StudentDashboard = React.lazy(
  () => import("./pages/dashboard/StudentDashboard")
);
const CompleteResetPassword = React.lazy(
  () => import("./pages/CompleteResetPassword")
);
const ViewApplication = React.lazy(
  () => import("./pages/students/ViewApplicationForm")
);
const ViewPaymentInfo = React.lazy(
  () => import("./pages/payment/admin/ViewPaymentInfo")
);
const ViewPaymentReceipt = React.lazy(
  () => import("./pages/payment/ViewPaymentReceipt")
);
const ManageSchedules = React.lazy(
  () => import("./pages/event & schedules/ManageSchedules")
);

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

              <Route path="/portal" element={<DefaultLayout />}>
                <Route index element={<Login />} />
                <Route path="password/reset" element={<ResetPassword />} />
                <Route
                  path="password/create-new"
                  element={<CompleteResetPassword />}
                />
                <Route path="admissions" element={<Admissions />} />
                <Route
                  path="admissions/payment-success"
                  element={<PaymentComplete />}
                />
              </Route>

              <Route path="/admin-portal" element={<DefaultLayout />}>
                <Route index element={<AdminLogin />} />
                <Route path="password/reset" element={<ResetPassword />} />
                <Route
                  path="password/create-new"
                  element={<CompleteResetPassword />}
                />
              </Route>

              {/* DASHBOARD */}
              <Route
                path="/student/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="apply/form" element={<ApplicationForm />} />
                <Route
                  path="payment/view-receipt"
                  element={<ViewPaymentReceipt />}
                />
                <Route path="contact-us" element={<ContactIndex />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* DASHBOARD */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboardLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="applicants" element={<ManageApplicants />} />
                <Route
                  path="applicants/:formId"
                  element={<ViewApplication />}
                />
                <Route path="payments" element={<ManagePayments />} />
                <Route path="payment/:payId" element={<ViewPaymentInfo />} />
                <Route path="schedules" element={<ManageSchedules />} />
                <Route path="schedules/create" element={<AddSchedule />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NoPage />} />
            </Switch>
          </Router>
          <ToastContainer />
        </MenuProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;

import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { SuccessPage } from "./pages/SuccessPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SignupPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

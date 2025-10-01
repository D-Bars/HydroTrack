import { Route, Routes } from "react-router-dom";
import Calendar from "../pages/Calendar";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/calendar"
                element={
                    <ProtectedRoute>
                        <Calendar />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
export default AppRoutes;
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

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
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
export default AppRoutes;
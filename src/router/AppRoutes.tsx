import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Calendar from "../pages/Calendar";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
};
export default AppRoutes;
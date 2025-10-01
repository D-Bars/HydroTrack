import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import cl from "./styles/Register.module.scss";
import UserRegistrationForm from "../components/User/UserRegistrationForm/UserRegistrationForm";

const Register = () => {
  const isRegistered = useUserStore((state) => state.isRegistered);

  if (isRegistered) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={cl.register}>
      <div className={cl.register__card}>
        <div className={cl.register__head}>
          <h1 className={cl.register__title}>Welcome to HydroTrack</h1>
          <p className={cl.register__subtitle}>
            Let`s personalize your experience. Please fill in a few quick details.
          </p>
        </div>
        <UserRegistrationForm />
      </div>
    </section>
  );
};

export default Register;
import { LoginForm } from "@/dashboard/components/login-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "@dashboard/store/slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const sideImages = Object.values(
  import.meta.glob("../assets/image/*.jpg", { eager: true, import: "default" })
);

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Ganti interval gambar
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sideImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Imagine House | Login";
  }, []);

  const handleLogin = () => {
    // langsung call Redux action yang sudah diarahkan ke Railway
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navigateTo("/dashboard");
    }
  }, [dispatch, isAuthenticated, error, loading, navigateTo]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md">
              <img src="./logo3.svg" alt="Logo" className="h-8 w-auto" />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleLogin}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Gambar samping */}
      <div className="relative hidden lg:block h-screen w-full bg-muted overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={sideImages[currentIndex]}
            alt="Side"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;

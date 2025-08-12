import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "@/store/slices/userSlice";
import { clearAllErrors } from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export function ResetPasswordForm({ className, ...props }) {
  const { token } = useParams();
  const [newPassword, setPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [redirecting, setRedirecting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) {
      toast.error("Password dan Konfirmasi Password wajib diisi!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Password dan Konfirmasi tidak sama!");
      return;
    }

    dispatch(resetPassword({ token, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error("🔥 Redux Error: " + error);
      dispatch(clearAllErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }

    if (message) {
      toast.success(message);
      dispatch(getUser());
      setRedirecting(true);

      const timeout = setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 detik setelah animasi

      return () => clearTimeout(timeout);
    }
  }, [dispatch, isAuthenticated, error, message, navigate]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-[#841618]">
            Reset Password
          </CardTitle>
          <CardDescription>
            Masukkan password baru untuk mengganti yang lama.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {!redirecting && (
              <motion.form
                key="reset-form"
                onSubmit={handleResetPassword}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full hover:bg-[#721419] bg-[#841618]"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {redirecting && (
              <motion.p
                key="redirect-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-center text-muted-foreground"
              >
                Redirecting to login page...
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

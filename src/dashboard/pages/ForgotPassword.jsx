import {
  forgotPassword,
  clearAllErrors,
  clearMessage,
} from "@/store/slices/forgotResetPasswordSlice";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgotPasswordForm } from "@/components/forgotPassword-form";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    document.title = "Imagine House | Forgot Password";
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          onSubmit={handleForgotPassword}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;

import React from "react";
import { ResetPasswordForm } from "@/components/resetPassword-form";
import { useState, useEffect } from "react";

function ResetPassword() {
  useEffect(() => {
    document.title = "Imagine House | Forgot Password";
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPassword;

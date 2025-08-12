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
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm({
  className,
  email,
  onEmailChange,
  onSubmit,
  loading,
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-[#841618]">
            Forgot password
          </CardTitle>
          <CardDescription>
            Enter your email below and we'll send you instructions to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={onEmailChange}
                  required
                  className="..."
                />
              </div>
              <Link to="/login" className="text-sm text-end hover:underline">
                Sudah memiliki akun?
              </Link>
              <Button
                type="submit"
                className="w-full hover:bg-[#721419] bg-[#841618]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "../pages/sub-components/SpecialLoadingButton";

export function LoginForm({
  className,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading,
  ...props
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col  gap-2">
        <h1 className="text-[#841618] text-4xl font-bold">Login</h1>
        <p className=" text-sm text-balance">Masukan Email dan Password Anda</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
        </div>
        {loading ? (
          <SpecialLoadingButton content={"Logging In"} />
        ) : (
          <Button
            type="submit"
            className="w-full text-white hover:bg-[#721419] bg-[#841618]"
          >
            Login
          </Button>
        )}

        {/* Forgot password link */}
        <Link
          to="/password/forgot"
          className="text-sm text-end hover:underline"
        >
          Lupa Password Anda?
        </Link>
      </div>
    </form>
  );
}

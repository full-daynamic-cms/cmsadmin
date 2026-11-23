import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Input, InputGroup, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useOffice } from "@/office";

export function LoginPage() {
  const { user, login } = useOffice();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    try {
      const message = await login(email, password);
      toast.success(message || "Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <Card className="border border-line bg-white shadow-none">
        <Card.Header>
          <Card.Title className="font-serif text-3xl">Sign in</Card.Title>
          <Card.Description>Sign in with your office email.</Card.Description>
        </Card.Header>
        <Card.Content>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField value={email} onChange={setEmail} isRequired>
              <Label>Email</Label>
              <Input type="email" autoComplete="username" />
            </TextField>
            <TextField value={password} onChange={setPassword} isRequired>
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input type={showPassword ? "text" : "password"} autoComplete="current-password" />
                <InputGroup.Suffix className="px-1">
                  <Button isIconOnly aria-label={showPassword ? "Hide password" : "Show password"} variant="ghost" size="sm" type="button" onPress={() => setShowPassword((visible) => !visible)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
            <Button type="submit" variant="primary" isPending={pending}>
              Open the office
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-stone-600">
            Need an account?{" "}
            <Link to="/register" className="font-medium text-amber-800 hover:underline">
              Create one
            </Link>
          </p>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
}

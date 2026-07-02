import { LoginForm } from "@/components/auth/LoginForm";

export default function BusinessLoginPage() {
  return (
    <main className="auth-page">
      <LoginForm
        userType="BUSINESS"
        defaultMobile="9625732059"
        defaultPassword="123456789"
      />
    </main>
  );
}

import { LoginForm } from "@/components/auth/LoginForm";

export default function BusinessLoginPage() {
  return (
    <main className="auth-page">
      <LoginForm
        userType="BUSINESS"
        defaultEmail="supplier@coirboard.gov.in"
        defaultPassword="123456789"
      />
    </main>
  );
}

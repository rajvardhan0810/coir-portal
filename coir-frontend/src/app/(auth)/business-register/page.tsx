import { RegisterForm } from "@/components/auth/RegisterForm";

export default function BusinessRegisterPage() {
  return (
    <main className="auth-page">
      <RegisterForm userType="BUSINESS" />
    </main>
  );
}

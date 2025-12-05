import { AuthLayout } from './AuthLayout';
import { LoginForm } from './LoginForm';

export function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footerText="Don't have an account?"
      footerLink="/auth/sign-up"
      footerLinkText="Sign up"
    >
      <LoginForm />
    </AuthLayout>
  );
}


import { AuthLayout } from './AuthLayout';
import { SignupForm } from './SignupForm';

export function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start preserving your memories today"
      footerText="Already have an account?"
      footerLink="/auth/sign-in"
      footerLinkText="Sign in"
    >
      <SignupForm />
    </AuthLayout>
  );
}


'use client';

import { AuthLayout } from './AuthLayout';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll help you get back into your account"
      footerText="Remember your password?"
      footerLink="/auth/sign-in"
      footerLinkText="Sign in"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}


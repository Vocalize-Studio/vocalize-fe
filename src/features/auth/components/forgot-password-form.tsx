"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordRequest, forgotPasswordSchema } from "../schema/auth";
import StepEmailForm from "./step-email-form";
import StepNewPasswordForm from "./new-password-form";
import StepCodeForm from "./step-code-form";
import StepDoneForm from "./step-done-form";
import { useAuthStep } from "../hooks/use-auth-step";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";

export default function ForgotPasswordForm({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) {
  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", otp: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });
  const stepRef = useRef<HTMLDivElement | null>(null);
  const { currentIndex, goToNext } = useAuthStep(4);

  const steps = useMemo(
    () => [
      <StepEmailForm
        key="email"
        next={() => goToNext()}
        onBackToLogin={onBackToLogin}
      />,
      <StepCodeForm
        key="code"
        next={() => goToNext()}
        onBackToLogin={onBackToLogin}
      />,
      <StepNewPasswordForm
        key="new"
        next={() => goToNext()}
        onBackToLogin={onBackToLogin}
      />,
      <StepDoneForm key="done" onBackToLogin={onBackToLogin} />,
    ],
    [onBackToLogin]
  );

  useGSAP(
    () => {
      if (!stepRef.current) return;
      gsap.fromTo(
        stepRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    { dependencies: [currentIndex], scope: stepRef }
  );

  return (
    <FormProvider {...form}>
      <div className="mx-auto w-full max-w-[420px] px-5">
        <div ref={stepRef} className="w-full">
          {steps[currentIndex]}
        </div>
        <StepIndicator total={steps.length} current={currentIndex} />
      </div>
    </FormProvider>
  );
}

function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
      {[...Array(total)].map((_, idx) => (
        <div
          key={idx}
          className={`h-2 w-[68px] md:w-[72px] rounded-full transition-colors ${
            idx === current ? "bg-[#3B82F6]" : "bg-[#4b4b4b]/60"
          }`}
        />
      ))}
    </div>
  );
}

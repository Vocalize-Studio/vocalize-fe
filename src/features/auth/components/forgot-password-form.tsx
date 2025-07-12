"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../schema/auth";
import { z } from "zod";
import StepEmailForm from "./step-email-form";
import StepNewPasswordForm from "./new-password-form";
import StepCodeForm from "./step-code-form";
import StepDoneForm from "./step-done-form";
import { useStepper } from "../hooks/use-stepper";

interface ForgotPasswordContentProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({
  onBackToLogin,
}: ForgotPasswordContentProps) {
  const methods = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", otp: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const { currentIndex, goToNext } = useStepper(4);

  console.log("Current Index:", currentIndex);

  const steps = [
    <StepEmailForm key="email" next={goToNext} />,
    <StepCodeForm key="code" next={goToNext} />,
    <StepNewPasswordForm key="new" next={goToNext} />,
    <StepDoneForm key="done" />,
  ];

  return (
    <FormProvider {...methods}>
      <div className="space-y-4">{steps[currentIndex]}</div>
      <StepIndicator total={steps.length} current={currentIndex} />
    </FormProvider>
  );
}

function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      {[...Array(total)].map((_, idx) => (
        <div
          key={idx}
          className={`h-2 w-18 rounded-full transition-colors ${
            idx === current ? "bg-[#3B82F6]" : "bg-[#4b4b4b]/60"
          }`}
        />
      ))}
    </div>
  );
}

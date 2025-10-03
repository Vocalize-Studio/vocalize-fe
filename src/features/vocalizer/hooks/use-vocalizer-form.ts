"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useUploadFile } from "../hooks/use-upload-file";
import { VocalizerRequest, vocalizerSchema } from "../schema/vocalizer";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { createGuestSessionAction } from "@/features/auth/services/auth";

export function useVocalizerForm(userId: number | null) {
  const form = useForm<VocalizerRequest>({
    resolver: zodResolver(vocalizerSchema),
    defaultValues: {
      vocal_audio: undefined as any,
      instrumental_audio: undefined as any,
      reference_audio: undefined as any,
    },
    mode: "onChange",
  });

  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  const { open } = useLoginDialogStore();

  const [jobId, setJobId] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isGuestCreating, setIsGuestCreating] = useState(false);
  const [pendingValues, setPendingValues] = useState<VocalizerRequest | null>(
    null
  );

  const busy = isPending || isGuestCreating;

  const doUpload = useCallback(
    async (uid: number, values: VocalizerRequest) => {
      const res = await uploadFile({
        user_id: uid,
        vocal_audio: values.vocal_audio as File,
        instrumental_audio: values.instrumental_audio as any,
        reference_audio: values.reference_audio as any,
      } as any);
      console.log("upload response:", res);
      setJobId(res?.data?.ml_job?.job_id ?? null);
      return res;
    },
    [uploadFile]
  );

  const onSubmit = form.handleSubmit(async (values) => {
    if (userId == null) {
      setPendingValues(values);
      setAuthDialogOpen(true);
      return;
    }
    try {
      await doUpload(userId, values);
      toast.success("Upload started");
    } catch (e: any) {}
  });

  const handleClickLogin = useCallback(() => {
    setAuthDialogOpen(false);
    open("login");
  }, [open]);

  const handleContinueAsGuest = useCallback(async () => {
    if (!pendingValues) return;
    try {
      setIsGuestCreating(true);
      const { guestUserId } = await createGuestSessionAction();
      await doUpload(guestUserId, pendingValues);
      toast.success("Uploaded as guest");
      setPendingValues(null);
      setAuthDialogOpen(false);
    } catch (e: any) {
      toast.error("Guest flow failed", {
        description: e?.message || "Unknown error",
      });
    } finally {
      setIsGuestCreating(false);
    }
  }, [pendingValues, doUpload]);

  return {
    form,
    isPending: busy,
    jobId,
    onSubmit,
    authDialogOpen,
    setAuthDialogOpen,
    handleClickLogin,
    handleContinueAsGuest,
  };
}

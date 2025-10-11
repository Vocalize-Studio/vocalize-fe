"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useUploadFile } from "../hooks/use-upload-file";
import { VocalizerRequest, vocalizerSchema } from "../schema/vocalizer";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { createGuestSessionAction } from "@/features/auth/services/auth";

type Phase = "idle" | "uploading" | "processing";

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

  const { mutate: upload, isPending } = useUploadFile();
  const { open } = useLoginDialogStore();

  const [jobId, setJobId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [sessionKey, setSessionKey] = useState(0);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isGuestCreating, setIsGuestCreating] = useState(false);
  const [pendingValues, setPendingValues] = useState<VocalizerRequest | null>(
    null
  );

  const busy = isPending || isGuestCreating;

  const doUpload = useCallback(
    (uid: number, values: VocalizerRequest) => {
      setSessionKey((k) => k + 1);
      setJobId(null);
      setPhase("uploading");
      upload(
        {
          user_id: uid,
          vocal_audio: values.vocal_audio as File,
          instrumental_audio: values.instrumental_audio as any,
          reference_audio: values.reference_audio as any,
        } as any,
        {
          onSuccess: (res: any) => {
            const jid = res?.data?.ml_job?.job_id ?? null;
            setJobId(jid);
            setPhase("processing");
            toast.success("Upload started");
            if (!jid) toast.error("Server didn't return job_id");
          },
          onError: (e: any) => {
            setPhase("idle");
            toast.error("Upload Failed", {
              description: e?.message ?? "Failed",
            });
          },
        }
      );
    },
    [upload]
  );

  const onSubmit = form.handleSubmit((values) => {
    if (userId == null) {
      setPendingValues(values);
      setAuthDialogOpen(true);
      return;
    }
    doUpload(userId, values);
  });

  const handleClickLogin = useCallback(() => {
    setAuthDialogOpen(false);
    open("login");
  }, [open]);

  const handleContinueAsGuest = useCallback(async () => {
    if (!pendingValues) return;
    try {
      setIsGuestCreating(true);
      setAuthDialogOpen(false);
      const { guestUserId } = await createGuestSessionAction();
      doUpload(guestUserId, pendingValues);
      setPendingValues(null);
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
    phase,
    sessionKey,
    onSubmit,
    authDialogOpen,
    setAuthDialogOpen,
    handleClickLogin,
    handleContinueAsGuest,
  };
}

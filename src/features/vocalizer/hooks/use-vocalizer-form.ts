import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VocalizerRequest,
  vocalizerSchema,
  UploadPayload,
} from "../schema/vocalizer";
import { useUploadFile } from "../hooks/use-upload-file";
import { toast } from "sonner";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { useState } from "react";

export function useVocalizerForm(userId: number | null) {
  const form = useForm<VocalizerRequest>({
    resolver: zodResolver(vocalizerSchema),
    defaultValues: {
      vocal_audio: undefined,
      instrumental_audio: undefined,
      reference_audio: undefined,
    },
    mode: "onChange",
  });

  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  const { open } = useLoginDialogStore();
  const [jobId, setJobId] = useState<string | null>(null);

  async function onSubmit(values: VocalizerRequest) {
    if (!userId) {
      toast.error("Please login first");
      open("login");
      return;
    }
    const payload: UploadPayload = { ...values, user_id: userId };
    const res = await uploadFile(payload);
    console.log("upload response:", res);
    setJobId(res?.data?.ml_job?.job_id ?? null);
  }
  console.log(jobId);

  return {
    form,
    isPending,
    jobId,
    onSubmit: form.handleSubmit(onSubmit),
  };
}

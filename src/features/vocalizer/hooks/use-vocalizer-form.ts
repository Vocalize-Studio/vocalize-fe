import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VocalizerRequest, vocalizerSchema } from "../schema/vocalizer";
import { useUploadFile } from "../hooks/use-upload-file";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { toast } from "sonner";
import { useState } from "react";
import { buildUploadFormData } from "../utils/build-upload-form";

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
  // const { open } = useLoginDialogStore();
  const [jobId, setJobId] = useState<string | null>(null);

  const onSubmit = form.handleSubmit(async (values) => {
    // if (!userId) {
    //   toast.error("Please login first");
    //   open("login");
    //   return;
    // }

    const fd = buildUploadFormData({
      user_id: userId ?? null,
      vocal_audio: values.vocal_audio as File,
      instrumental_audio: values.instrumental_audio as any,
      reference_audio: values.reference_audio as any,
    });

    const res = await uploadFile(fd);
    setJobId(res?.data?.ml_job?.job_id ?? null);
  });

  return { form, isPending, jobId, onSubmit };
}

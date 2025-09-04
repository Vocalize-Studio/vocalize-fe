"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UploadPayload,
  VocalizerRequest,
  vocalizerSchema,
} from "../schema/vocalizer";
import { useForm } from "react-hook-form";
import { VocalizedPreviewComparison } from "./vocalizer-preview-comparison";
import PreprocessingUpload from "./preprocessing-upload";
import { useUploadFile } from "../hooks/use-upload-file";
import { toast } from "sonner";
import { useJobStatus } from "../hooks/use-job-status";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { Icon } from "@iconify/react";

export default function VocalizerForm({ userId }: { userId: number | null }) {
  const form = useForm<VocalizerRequest>({
    resolver: zodResolver(vocalizerSchema),
    defaultValues: {
      vocal_audio: "",
      instrumental_audio: "",
      reference_audio: "",
    },
    mode: "onChange",
  });
  console.log("ini userId : ", userId);

  const { isValid } = form.formState;

  const dragAndDropRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [jobId, setJobId] = useState<string | null>(null);

  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  const { open } = useLoginDialogStore();

  const { data: job, isFetching } = useJobStatus(jobId);
  console.log("Polling job status:", job, "fetching:", isFetching);
  console.log("ini job", job);

  function simulateUpload(file: File) {
    setUploadProgress(0);
    setUploadedFile(file);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev !== null && prev < 100) {
          return prev + 5;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 100);
  }

  function resetAllUI() {
    form.reset({
      vocal_audio: "",
      instrumental_audio: "",
      reference_audio: "",
    });

    if (dragAndDropRef.current) dragAndDropRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (referenceRef.current) referenceRef.current.value = "";

    setUploadedFile(null);
    setUploadProgress(null);
  }

  async function onSubmit(values: VocalizerRequest) {
    if (!userId) {
      toast.error("Please login first");
      open("login");
      return;
    }

    const payload: UploadPayload = { ...values, user_id: userId };
    console.log("ini request : ", payload);

    const res = await uploadFile(payload);
    console.log("ini response : ", res);
    const mlJobId = res?.data?.ml_job?.job_id ?? null;
    console.log("job Id : ", mlJobId);
    setJobId(mlJobId);

    setIsUploading(true);
  }

  useEffect(() => {
    if (job?.data?.status === "completed" && !showPreview) {
      setPreviewFile((prev) => prev ?? (uploadedFile || null));
      setShowPreview(true);
      setIsUploading(false);
      // resetAllUI();
    }
  }, [job?.data?.status]);

  return (
    <div className="space-y-4 mt-4 px-4 sm:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="vocal_audio"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormControl>
                  <div
                    onClick={() => dragAndDropRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        simulateUpload(file);
                        onChange(file);
                      }
                    }}
                    className="bg-transparent border-3 border-dashed border-white rounded-xl p-6 transition-colors max-w-xl w-full hover-lift mx-auto lg:mx-0 mt-2 cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".mp3,.mp4,.wav"
                      ref={dragAndDropRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          simulateUpload(file);
                          onChange(file);
                        }
                      }}
                    />

                    <div className="relative w-full">
                      {uploadProgress !== null ? (
                        <div className="flex items-center justify-between w-full text-white p-4 rounded-xl">
                          <div className="flex items-center gap-3 max-w-sm">
                            {uploadProgress < 100 ? (
                              <ProgressCircle value={uploadProgress} />
                            ) : (
                              <Icon
                                icon="mdi:success-bold"
                                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[#C2D8FC]"
                              />
                            )}
                            <div className="font-semibold text-sm md:text-base">
                              {uploadProgress < 100
                                ? "Uploading..."
                                : (typeof value !== "string" && value?.name) ||
                                  uploadedFile?.name ||
                                  "File uploaded"}
                            </div>
                          </div>

                          {uploadProgress < 100 ? (
                            <Button
                              type="button"
                              onClick={() => {
                                setUploadedFile(null);
                                setUploadProgress(null);
                                onChange("");
                                if (dragAndDropRef.current)
                                  dragAndDropRef.current.value = "";
                              }}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
                            >
                              Cancel
                            </Button>
                          ) : (
                            <div className="flex items-center justify-center space-x-4">
                              <span className="text-lg text-white text-center">
                                or
                              </span>
                              <Button
                                type="button"
                                onClick={() => dragAndDropRef.current?.click()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer border-[#C2D8FC] border-1 font-semibold font-montserrat"
                              >
                                Browse
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-12 max-w-lg">
                          <div className="flex flex-col items-center space-y-2">
                            <Icon
                              icon="icon-park-outline:voice-one"
                              color="#C2D8FC"
                              width={53}
                              height={52}
                            />
                            <p className="text-white text-sm md:text-base text-center font-semibold font-montserrat">
                              Your Voice
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white max-w-2xl mx-auto">
                            <span className="text-base font-semibold font-montserrat text-center">
                              Drag & Drop
                            </span>
                            <span className="text-base text-white font-semibold font-montserrat">
                              or
                            </span>
                            <Button
                              type="button"
                              onClick={() => dragAndDropRef.current?.click()}
                              className="bg-[#3B82F6] border-none text-white hover:bg-blue-700 hover:text-white cursor-pointer font-montserrat font-normal text-lg"
                            >
                              Browse
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="w-full max-w-xl mx-auto text-center mt-1 lg:mx-0 lg:text-left font-medium text-lg" />
              </FormItem>
            )}
          />

          <div className="space-y-2 mt-4">
            <FormField
              control={form.control}
              name="instrumental_audio"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-lg font-montserrat mx-auto lg:mx-0">
                    Instrumental Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-xl w-full mx-auto lg:mx-0">
                      <input
                        type="file"
                        accept=".mp3,.wav,.mp4"
                        className="hidden"
                        ref={(el) => {
                          fileInputRef.current = el;
                          ref?.(el);
                        }}
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                      />

                      <span className="absolute left-4 text-blue-500">
                        <Icon
                          icon="streamline-ultimate:instrument-tambourine-bold"
                          color="#3B82F6"
                          width={24}
                          height={24}
                        />
                      </span>

                      <Input
                        type="text"
                        value={
                          typeof value === "string" ? value : value?.name || ""
                        }
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Paste the Link here"
                        className="!text-[#3B82F6] pl-12 pr-28 bg-white border-white/50 placeholder:text-[#585858]/50 input-glow font-montserrat"
                      />

                      <Button
                        type="button"
                        className="h-full absolute -right-0 top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1 cursor-pointer border-[#C2D8FC] border-1 font-semibold font-montserrat"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="w-full max-w-xl mx-auto text-center mt-1 lg:mx-0 lg:text-left font-medium text-lg" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 mt-4">
            <FormField
              control={form.control}
              name="reference_audio"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-lg font-montserrat mx-auto lg:mx-0">
                    Reference Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-xl w-full mx-auto lg:mx-0">
                      <input
                        type="file"
                        accept=".mp3,.wav,.mp4"
                        className="hidden"
                        ref={(el) => {
                          referenceRef.current = el;
                          ref?.(el);
                        }}
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                      />

                      <span className="absolute left-4 text-blue-500">
                        <Icon
                          icon="streamline-sharp:song-recommendation-remix"
                          color="#3B82F6"
                          width={24}
                          height={24}
                        />
                      </span>

                      <Input
                        type="text"
                        value={
                          typeof value === "string" ? value : value?.name || ""
                        }
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Paste the Link here"
                        className="!text-[#3B82F6] pl-12 pr-28 bg-white border-white/50 placeholder:text-[#585858]/50 input-glow font-montserrat"
                      />

                      <Button
                        type="button"
                        className="absolute -right-0 top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1 cursor-pointer border-[#C2D8FC] border-1 font-montserrat font-bold"
                        onClick={() => referenceRef.current?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="w-full max-w-xl mx-auto text-center mt-1 lg:mx-0 lg:text-left font-medium text-lg" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center lg:justify-start">
            <Button
              disabled={isPending}
              type="submit"
              className={`group w-full font-semibold px-4 py-5 text-lg mt-6 max-w-xl relative hover-lift cursor-pointer border-2
                ${
                  isValid && !isPending
                    ? "bg-blue-500 text-white hover:bg-blue-600 border-[#C2D8FC]"
                    : "bg-white text-gray-400 hover:bg-blue-50 border-[#c2d8fc]"
                }
              `}
            >
              <span
                className={`relative font-montserrat ${
                  isValid && !isPending
                    ? "text-white"
                    : "button-vocalize btn-glow"
                }`}
              >
                {isPending ? "Uploading..." : "Vocalize"}
                {!isPending && (
                  <span
                    className={`inline-block text-sm align-super -translate-y-[0.05em] opacity-0 group-hover:opacity-100 transition duration-100
                      ${isValid ? "text-white" : "text-blue-500"} leading-none`}
                  >
                    {"\u2728\uFE0E"}
                  </span>
                )}
              </span>
            </Button>
          </div>
        </form>
      </Form>

      <PreprocessingUpload
        open={isUploading && job?.data?.status !== "completed"}
        fileName={uploadedFile?.name}
        progress={Number(job?.data?.progress || 0)}
        status={job?.data?.status}
      />

      {/* <PreprocessingUpload
        open={isUploading}
        fileName={uploadedFile?.name}
        progress={Number(job?.data?.progress || 0)}
        status={job?.data?.status}
      /> */}

      {job?.data?.status === "completed" && showPreview && (
        <VocalizedPreviewComparison
          isVisible={showPreview}
          onClose={() => setShowPreview(false)}
          uploadedFile={previewFile}
          result={{
            standard_url: job.data.metadata.standard_url,
            smooth_url: job.data.metadata.smooth_url,
            dynamic_url: job.data.metadata.dynamic_url,
          }}
        />
      )}
      {/* {job?.data?.status === "completed" && (
        <VocalizedPreviewComparison
          isVisible
          onClose={() => setShowPreview(false)}
          uploadedFile={previewFile}
          result={{
            standard_url: job.data.metadata.standard_url,
            smooth_url: job.data.metadata.smooth_url,
            dynamic_url: job.data.metadata.dynamic_url,
          }}
        />
      )} */}
    </div>
  );
}

export function ProgressCircle({ value }: { value: number }) {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-[#C2D8FC]"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset={`${100 - value}`}
          d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-base font-semibold">
        {value}%
      </div>
    </div>
  );
}

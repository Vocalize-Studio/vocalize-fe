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
import React, { ReactNode, RefObject, useRef, useState } from "react";
import { VocalizedPreviewComparison } from "./vocalizer-preview-comparison";
import PreprocessingUpload from "./preprocessing-upload";
import { Icon } from "@iconify/react";
import { useVocalizerForm } from "../hooks/use-vocalizer-form";
import { useWatch } from "react-hook-form";
import { useRawVoiceUpload } from "../hooks/use-raw-voice-upload";
import { useJobStatus } from "../hooks/use-job-status";
import { UploadAccessDialog } from "./upload-access-dialog";
import { Role } from "@/lib/role-access";

export default function VocalizerForm({
  userId,
  role,
}: {
  userId: number | null;
  role: Role;
}) {
  const {
    form,
    isPending,
    jobId,
    onSubmit,
    authDialogOpen,
    setAuthDialogOpen,
    handleClickLogin,
    handleContinueAsGuest,
  } = useVocalizerForm(userId);

  const { isValid } = form.formState;

  const vocalRef = useRef<HTMLInputElement>(null);
  const instrumentalRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);

  console.log("job id : ", jobId);

  const { data: job } = useJobStatus(jobId);
  const status = job?.data.status;
  console.log("status", status);
  const jobProgress = job?.data.progress ?? 0;
  console.log("jobProgress", jobProgress);
  const meta = job?.data.metadata;
  console.log("meta", meta);

  const isProcessing = Boolean(jobId) && status !== "completed";
  console.log("is process", isProcessing);

  const [dismissedForJobId, setDismissedForJobId] = useState<string | null>(
    null
  );
  const isPreviewVisible =
    Boolean(jobId) && status === "completed" && dismissedForJobId !== jobId;

  const vocalVal = useWatch({ control: form.control, name: "vocal_audio" }) as
    | string
    | File;

  console.log(vocalVal);

  const vocalFile: File | null = typeof vocalVal === "string" ? null : vocalVal;

  const vocalFileName: string | undefined =
    typeof vocalVal === "string" ? vocalVal || undefined : vocalVal?.name;

  const {
    progress: uploadProgress,
    file: uploadedFile,
    start: simulateUpload,
    cancel: cancelUpload,
  } = useRawVoiceUpload();

  return (
    <div className="space-y-4 mt-4 px-4 sm:px-0">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="vocal_audio"
            render={({ field: { value } }) => (
              <FormItem>
                <FormControl>
                  <VocalDropzone
                    inputRef={vocalRef}
                    value={value}
                    onChange={(v) =>
                      form.setValue("vocal_audio", v as any, {
                        shouldValidate: true,
                      })
                    }
                    onSimulate={simulateUpload}
                    uploadProgress={uploadProgress}
                    uploadedFileName={uploadedFile?.name}
                    onCancel={cancelUpload}
                  />
                </FormControl>
                <FormMessage className="w-full max-w-xl mx-auto text-center mt-1 lg:mx-0 lg:text-left font-medium text-lg" />
              </FormItem>
            )}
          />

          <div className="space-y-2 mt-4">
            <TrackFormField
              name="instrumental_audio"
              label="Instrumental Track"
              control={form.control}
              inputRef={instrumentalRef}
              icon={
                <Icon
                  icon="streamline-ultimate:instrument-tambourine-bold"
                  color="#3B82F6"
                  width={24}
                  height={24}
                />
              }
            />
          </div>

          <div className="space-y-2 mt-4">
            <TrackFormField
              name="reference_audio"
              label="Reference Track"
              control={form.control}
              inputRef={referenceRef}
              icon={
                <Icon
                  icon="streamline-sharp:song-recommendation-remix"
                  color="#3B82F6"
                  width={24}
                  height={24}
                />
              }
            />
          </div>

          <div className="flex justify-center lg:justify-start">
            <SubmitButton
              disabled={isPending}
              isValid={isValid}
              isPending={isPending}
            />
          </div>
        </form>
      </Form>

      <PreprocessingUpload
        open={isPending || isProcessing}
        fileName={vocalFileName}
        progress={Number(jobProgress || 0)}
        status={status}
        result={{
          detailed_status: meta?.detailed_status,
        }}
      />

      {isPreviewVisible && (
        <VocalizedPreviewComparison
          isVisible
          onClose={() => {
            if (jobId) setDismissedForJobId(jobId);
          }}
          uploadedFile={vocalFile}
          result={{
            standard_url: meta?.standard_url,
            smooth_url: meta?.smooth_url,
            dynamic_url: meta?.dynamic_url,
          }}
          role={role}
        />
      )}
      <UploadAccessDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onLogin={handleClickLogin}
        onGuest={handleContinueAsGuest}
        loading={isPending}
      />
    </div>
  );
}

function UploadProgressBar({
  progress,
  fileName,
  onCancel,
  onBrowse,
}: {
  progress: number;
  fileName: string;
  onCancel: () => void;
  onBrowse: () => void;
}) {
  return (
    <div className="flex items-center justify-between w-full text-white p-4 rounded-xl">
      <div className="flex items-center gap-3 max-w-sm">
        {progress < 100 ? (
          <ProgressCircle value={progress} />
        ) : (
          <Icon
            icon="mdi:success-bold"
            className="w-12 h-12 md:w-16 md:h-16 text-[#C2D8FC]"
          />
        )}
        <div className="font-semibold text-sm md:text-base">
          {progress < 100 ? "Uploading..." : fileName}
        </div>
      </div>

      {progress < 100 ? (
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
        >
          Cancel
        </Button>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-lg text-white">or</span>
          <Button
            type="button"
            onClick={onBrowse}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 border-[#C2D8FC] border-[1px] font-semibold"
          >
            Browse
          </Button>
        </div>
      )}
    </div>
  );
}

function VocalDropzone({
  inputRef,
  value,
  onChange,
  onSimulate,
  uploadProgress,
  uploadedFileName,
  onCancel,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  value: File | undefined;
  onChange: (v: File | undefined) => void;
  onSimulate: (file: File) => void;
  uploadProgress: number | null;
  uploadedFileName?: string;
  onCancel: () => void;
}) {
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file) {
          onSimulate(file);
          onChange(file);
        }
      }}
      className="bg-transparent border-[3px] border-dashed border-white rounded-xl p-6 transition-colors max-w-xl w-full hover-lift mx-auto lg:mx-0 mt-2 cursor-pointer"
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*,video/mp4,video/quicktime"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            onSimulate(f);
            onChange(f);
          }
        }}
      />

      {uploadProgress !== null && value instanceof File ? (
        <UploadProgressBar
          progress={uploadProgress}
          fileName={value?.name || uploadedFileName || "File uploaded"}
          onCancel={onCancel}
          onBrowse={() => inputRef.current?.click()}
        />
      ) : (
        <VoiceUploadField onBrowse={() => inputRef.current?.click()} />
      )}
    </div>
  );
}

function VoiceUploadField({ onBrowse }: { onBrowse: () => void }) {
  return (
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
          onClick={(e) => {
            e.stopPropagation();
            onBrowse();
          }}
          className="bg-[#3B82F6] border-none text-white hover:bg-blue-700 hover:text-white cursor-pointer font-montserrat font-normal text-lg"
        >
          Browse
        </Button>
      </div>
    </div>
  );
}

function TrackFormField({
  name,
  inputRef,
  label,
  icon,
  control,
}: {
  name: "instrumental_audio" | "reference_audio";
  label: string;
  inputRef: RefObject<HTMLInputElement | null>;
  icon: ReactNode;
  control: any;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full max-w-xl mx-auto lg:mx-0">
          <FormLabel className="text-white font-semibold text-lg">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center max-w-xl w-full mx-auto lg:mx-0">
              <input
                ref={inputRef}
                type="file"
                accept="audio/*,video/mp4,video/quicktime"
                className="hidden"
                onChange={(e) => field.onChange(e.target.files?.[0] ?? "")}
              />

              <span className="absolute left-4">{icon}</span>

              <Input
                type="text"
                value={
                  typeof field.value === "string"
                    ? field.value
                    : field.value?.name || ""
                }
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Paste the link here"
                className="!text-[#3B82F6] pl-12 pr-28 bg-white border-white/50 placeholder:text-[#585858]/50 input-glow"
              />

              <Button
                type="button"
                className="h-full absolute -right-0 top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1 border-[#C2D8FC] border-[1px]"
                onClick={() => inputRef.current?.click()}
              >
                Browse
              </Button>
            </div>
          </FormControl>
          <FormMessage className="w-full max-w-xl mx-auto text-center mt-1 lg:mx-0 lg:text-left font-medium text-lg" />
        </FormItem>
      )}
    />
  );
}

function ProgressCircle({ value }: { value: number }) {
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

function SubmitButton({
  disabled,
  isValid,
  isPending,
}: {
  disabled: boolean;
  isValid: boolean;
  isPending: boolean;
}) {
  return (
    <Button
      disabled={disabled}
      type="submit"
      className={`group w-full font-semibold px-4 py-5 text-lg mt-6 max-w-xl relative border-2
        ${
          isValid && !isPending
            ? "bg-blue-500 text-white hover:bg-blue-600 border-[#C2D8FC]"
            : "bg-white text-gray-400 hover:bg-blue-50 border-[#c2d8fc]"
        }
      `}
    >
      <span
        className={`relative font-montserrat ${
          isValid && !isPending ? "text-white" : "button-vocalize btn-glow"
        }`}
      >
        {isPending ? "Uploading..." : "Vocalize"}
        {!isPending && (
          <span
            className={`inline-block text-sm align-super -translate-y-[0.05em] opacity-0 group-hover:opacity-100 transition duration-100 ${
              isValid ? "text-white" : "text-blue-500"
            } leading-none`}
          >
            {"\u2728\uFE0E"}
          </span>
        )}
      </span>
    </Button>
  );
}

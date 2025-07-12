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
import { FileAudio, Music, Globe } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vocalizerSchema } from "../schema/vocalizer";
import { useForm } from "react-hook-form";

export default function VocalizerForm() {
  const form = useForm<z.infer<typeof vocalizerSchema>>({
    resolver: zodResolver(vocalizerSchema),
    defaultValues: {
      instrumental: "",
      reference: "",
    },
  });
  const dragAndDropRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const instrumentalFile = form.watch("instrumental");

  function simulateUpload(file: File) {
    setUploadProgress(0);

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

  useEffect(() => {
    if (instrumentalFile instanceof File) {
      simulateUpload(instrumentalFile);
    }
  }, [instrumentalFile]);

  function cancelUpload() {
    setUploadProgress(null);
    form.resetField("instrumental");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function onSubmit(values: z.infer<typeof vocalizerSchema>) {}

  return (
    <div className="space-y-4 mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                form.setValue("instrumental", file, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                simulateUpload(file);
              }
            }}
            className="bg-transparent border-3 border-dashed border-white rounded-xl p-6 transition-colors max-w-lg w-full hover-lift"
          >
            <input
              type="file"
              ref={dragAndDropRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setValue("instrumental", file, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  simulateUpload(file);
                }
              }}
            />

            <div ref={dragAndDropRef} className="relative w-full">
              {instrumentalFile instanceof File && uploadProgress !== null ? (
                <div className="flex items-center justify-between w-full text-white p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    {uploadProgress < 100 ? (
                      <div className="relative w-16 h-16">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-[#C2D8FC]"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="100"
                            strokeDashoffset={`${100 - uploadProgress}`}
                            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-base font-semibold">
                          {uploadProgress}%
                        </div>
                      </div>
                    ) : (
                      <svg
                        width="66"
                        height="54"
                        viewBox="0 0 66 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.5792 54L0 32.4208L9.83398 22.5869L21.5792 34.3668L55.9112 0L65.7452 9.83398L21.5792 54Z"
                          fill="#C2D8FC"
                        />
                      </svg>
                    )}

                    <div className="font-semibold text-lg">
                      {uploadProgress < 100
                        ? "Uploading..."
                        : `${instrumentalFile.name}`}
                    </div>
                  </div>

                  {uploadProgress < 100 ? (
                    <Button
                      type="button"
                      onClick={cancelUpload}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
                    >
                      Cancel
                    </Button>
                  ) : (
                    <>
                      <span className="text-lg text-white">or</span>
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer"
                      >
                        Browse
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-12 max-w-lg">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FileAudio className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-lg md:text-base font-medium">
                      Your Voice
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-white max-w-xl mx-6 ">
                    <span className="text-base font-bold">Drag & Drop</span>
                    <span className="text-base text-white/70">or</span>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#3B82F6] border-none text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                    >
                      Browse
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <FormField
              control={form.control}
              name="instrumental"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold text-lg">
                    Instrumental Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-lg w-full">
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

                      <span className="absolute left-3.5 text-blue-500">
                        <Globe size={20} />
                      </span>

                      <Input
                        type="text"
                        readOnly
                        // value={
                        //   typeof value === "string" ? value : value?.name || ""
                        // }
                        placeholder="Paste the Link here"
                        className="pl-10 pr-28 bg-white border-white/50 text-white placeholder:text-[#585858]/50 input-glow"
                      />

                      <Button
                        type="button"
                        className="h-full absolute -right-0 top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1 cursor-pointer border-[#C2D8FC] border-1"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 mt-2">
            <FormField
              control={form.control}
              name="reference"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold text-lg">
                    Reference Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-lg w-full">
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

                      <span className="absolute left-3.5 text-blue-500">
                        <Music size={20} />
                      </span>

                      <Input
                        type="text"
                        readOnly
                        // value={
                        //   typeof value === "string" ? value : value?.name || ""
                        // }
                        placeholder="Paste the Link here"
                        className="pl-10 pr-28 bg-white border-white/50 text-white placeholder:text-[#585858]/50 input-glow"
                      />

                      <Button
                        type="button"
                        className="absolute -right-0 top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-1 cursor-pointer border-[#C2D8FC] border-1"
                        onClick={() => referenceRef.current?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="group w-full bg-white hover:bg-blue-50 font-semibold px-4 py-5 text-lg mt-4 max-w-lg relative hover-lift cursor-pointer border-[#c2d8fc] border-2">
            <span className="button-vocalize relative btn-glow">
              Vocalize
              <span className="inline-block text-sm align-super translate-y-[-0.05em] opacity-0 group-hover:opacity-100 transition duration-400 hover:from-blue-200 hover:to-blue-400">
                ✨
              </span>
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

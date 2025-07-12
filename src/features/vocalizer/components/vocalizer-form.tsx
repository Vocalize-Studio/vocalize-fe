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
    <div className="space-y-4 mt-4">
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
            className="bg-transparent border-3 border-dashed border-white rounded-xl p-6 transition-colors max-w-lg w-full hover-lift mx-auto lg:mx-0 mt-4"
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
                  <div className="flex items-center gap-3 max-w-xs">
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
                    <svg
                      width="53"
                      height="52"
                      viewBox="0 0 53 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.8823 47.5588C38.8217 47.5588 48.4999 37.8806 48.4999 25.9412C48.4999 14.0017 38.8217 4.32353 26.8823 4.32353C14.9429 4.32353 5.26465 14.0017 5.26465 25.9412C5.26465 37.8806 14.9429 47.5588 26.8823 47.5588Z"
                        stroke="#C2D8FC"
                        strokeWidth="2.47059"
                      />
                      <path
                        d="M33.3676 19.4559V32.4265M39.8529 23.7794V28.1029M20.397 19.4559V32.4265M13.9117 23.7794V28.1029M26.8823 15.1324V36.75"
                        stroke="#C2D8FC"
                        strokeWidth="2.47059"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-white text-sm md:text-base font-semibold font-montserrat">
                      Your Voice
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-white max-w-xl mx-6 ">
                    <span className="text-base font-semibold font-montserrat">
                      Drag & Drop
                    </span>
                    <span className="text-base text-white font-semibold font-montserrat">
                      or
                    </span>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#3B82F6] border-none text-white hover:bg-blue-700 hover:text-white cursor-pointer font-montserrat font-normal text-lg"
                    >
                      Browse
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <FormField
              control={form.control}
              name="instrumental"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-lg font-montserrat mx-auto lg:mx-0">
                    Instrumental Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-lg w-full mx-auto lg:mx-0">
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
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_47_272)">
                            <path
                              d="M21.06 8.9C21.0805 8.94188 21.1116 8.97771 21.1502 9.004C21.1887 9.03029 21.2335 9.04614 21.28 9.05C21.3264 9.05086 21.3723 9.03925 21.4127 9.01639C21.4532 8.99352 21.4867 8.96024 21.51 8.92C21.9011 8.20183 22.0628 7.38102 21.9731 6.56816C21.8835 5.7553 21.5468 4.98946 21.0085 4.37381C20.4702 3.75816 19.7562 3.32229 18.9626 3.12493C18.169 2.92756 17.3339 2.97819 16.57 3.27C16.5271 3.28482 16.4894 3.31147 16.4611 3.34687C16.4327 3.38226 16.415 3.42495 16.41 3.47C16.4041 3.51628 16.4113 3.56329 16.4307 3.6057C16.4501 3.64811 16.4811 3.68424 16.52 3.71C17.2753 4.1928 17.9761 4.75609 18.61 5.39C19.6304 6.40371 20.4603 7.59262 21.06 8.9ZM22.82 15.17L22.56 14.93C22.5201 14.9081 22.4754 14.8966 22.43 14.8966C22.3845 14.8966 22.3398 14.9081 22.3 14.93C22.2582 14.948 22.2222 14.9771 22.1958 15.0141C22.1693 15.0511 22.1535 15.0947 22.15 15.14C21.9495 17.5053 21.0633 19.7608 19.6 21.63C19.5781 21.6698 19.5666 21.7145 19.5666 21.76C19.5666 21.8054 19.5781 21.8502 19.6 21.89C19.6197 21.9325 19.6506 21.9689 19.6893 21.9953C19.728 22.0217 19.7732 22.0371 19.82 22.04C20.6261 22.0757 21.4241 21.8668 22.1093 21.4407C22.7945 21.0146 23.3348 20.3913 23.6593 19.6525C23.9838 18.9138 24.0773 18.0942 23.9275 17.3013C23.7777 16.5085 23.3916 15.7794 22.82 15.21V15.17ZM9.99996 1.8C10.0361 1.80083 10.0716 1.79078 10.1019 1.77117C10.1322 1.75155 10.1559 1.72327 10.17 1.69C10.1919 1.6594 10.2038 1.62267 10.2038 1.585C10.2038 1.54732 10.1919 1.5106 10.17 1.48C10.0821 1.37186 9.98863 1.26838 9.88996 1.17C9.1401 0.421945 8.12415 0.00184631 7.06496 0.00184631C6.00577 0.00184631 4.98983 0.421945 4.23996 1.17C3.58491 1.76298 3.14819 2.55893 2.99996 3.43C2.99071 3.47791 2.99628 3.5275 3.01593 3.57217C3.03558 3.61684 3.06838 3.65445 3.10996 3.68C3.15065 3.70472 3.19735 3.71779 3.24496 3.71779C3.29257 3.71779 3.33927 3.70472 3.37996 3.68C5.3605 2.43105 7.65861 1.77842 9.99996 1.8Z"
                              fill="#3B82F6"
                            />
                            <path
                              d="M13.6599 23.86C13.9344 23.9502 14.2211 23.9975 14.5099 24C15.001 23.9956 15.4816 23.8573 15.8999 23.6C16.6261 23.1495 17.2973 22.6159 17.8999 22.01C18.9876 20.9757 19.8572 19.7343 20.4577 18.3588C21.0582 16.9833 21.3774 15.5015 21.3965 14.0008C21.4156 12.5 21.1343 11.0106 20.569 9.62028C20.0036 8.22994 19.1659 6.96677 18.1049 5.90515C17.044 4.84354 15.7813 4.00496 14.3913 3.43878C13.0014 2.8726 11.5121 2.59027 10.0114 2.60843C8.5106 2.62658 7.02864 2.94486 5.65276 3.5445C4.27688 4.14414 3.03489 5.01303 1.99994 6.1C1.39055 6.70209 0.853577 7.3733 0.399942 8.1C0.0498656 8.66731 -0.0735316 9.34573 0.0543536 9.99998C0.182239 10.6542 0.55201 11.2363 1.08994 11.63C1.11844 11.6512 1.14209 11.6782 1.15933 11.7092C1.17658 11.7403 1.18701 11.7746 1.18994 11.81C1.22076 12.1349 1.33063 12.4473 1.50994 12.72C1.58535 12.8353 1.67248 12.9426 1.76994 13.04C1.91816 13.1909 2.09053 13.3159 2.27994 13.41C5.81122 15.2967 8.70328 18.1887 10.5899 21.72C10.7694 22.0692 11.0476 22.3578 11.3899 22.55C11.6347 22.6918 11.908 22.7773 12.1899 22.8C12.2572 22.8107 12.3179 22.8464 12.3599 22.9C12.6803 23.35 13.1356 23.6862 13.6599 23.86ZM3.99994 7C4.04645 6.96181 4.10476 6.94093 4.16494 6.94093C4.22512 6.94093 4.28343 6.96181 4.32994 7C4.83747 7.4556 5.45305 7.77386 6.11822 7.92455C6.78339 8.07525 7.47603 8.05336 8.13036 7.86097C8.78468 7.66858 9.37895 7.31208 9.85669 6.82534C10.3344 6.3386 10.6798 5.73779 10.8599 5.08C10.8742 5.02092 10.9094 4.96905 10.9591 4.93409C11.0088 4.89912 11.0695 4.88345 11.1299 4.89C12.1244 5.01356 13.093 5.29369 13.9999 5.72C14.0495 5.74838 14.0888 5.79174 14.1121 5.84384C14.1355 5.89595 14.1417 5.95412 14.1299 6.01C13.9621 6.64117 13.9513 7.30385 14.0985 7.94016C14.2458 8.57646 14.5466 9.16702 14.9748 9.66025C15.4029 10.1535 15.9453 10.5344 16.5545 10.7697C17.1638 11.0049 17.8214 11.0875 18.4699 11.01C18.528 11.0003 18.5875 11.0123 18.6373 11.0436C18.6871 11.075 18.7236 11.1235 18.7399 11.18C19.0316 12.0612 19.1867 12.9819 19.1999 13.91C19.2016 13.9671 19.1837 14.0231 19.1491 14.0685C19.1145 14.114 19.0654 14.1463 19.0099 14.16C18.4023 14.3194 17.8407 14.6197 17.3707 15.0366C16.9008 15.4535 16.5356 15.9752 16.3048 16.5595C16.074 17.1438 15.9841 17.7743 16.0423 18.3998C16.1005 19.0253 16.3053 19.6283 16.6399 20.16C16.6766 20.2033 16.6967 20.2582 16.6967 20.315C16.6967 20.3717 16.6766 20.4267 16.6399 20.47L16.5299 20.59C16.0297 21.083 15.4763 21.519 14.8799 21.89C14.7998 21.939 14.7099 21.9698 14.6166 21.9801C14.5233 21.9905 14.4288 21.9802 14.3399 21.95C14.2846 21.9305 14.2384 21.8913 14.2099 21.84C14.1978 21.8115 14.1916 21.7809 14.1916 21.75C14.1916 21.7191 14.1978 21.6885 14.2099 21.66C14.3442 21.3861 14.4139 21.085 14.4139 20.78C14.4139 20.4749 14.3442 20.1739 14.2099 19.9C11.9217 15.6043 8.39142 12.0984 4.07994 9.84C3.8447 9.72188 3.58846 9.65136 3.32591 9.63248C3.06335 9.61361 2.79966 9.64674 2.54994 9.73C2.46985 9.75038 2.39259 9.78061 2.31994 9.82C2.29334 9.83248 2.26432 9.83896 2.23494 9.83896C2.20556 9.83896 2.17654 9.83248 2.14994 9.82C2.11749 9.81264 2.08713 9.79802 2.06115 9.77723C2.03517 9.75645 2.01424 9.73004 1.99994 9.7C1.96955 9.60944 1.95917 9.51336 1.96953 9.41841C1.97989 9.32345 2.01074 9.23187 2.05994 9.15C2.44605 8.55653 2.89534 8.00665 3.39994 7.51L3.99994 7Z"
                              fill="#3B82F6"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_47_272">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <Input
                        type="text"
                        readOnly
                        // value={
                        //   typeof value === "string" ? value : value?.name || ""
                        // }
                        placeholder="Paste the Link here"
                        className="pl-12 pr-28 bg-white border-white/50 text-white placeholder:text-[#585858]/50 input-glow"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 mt-4">
            <FormField
              control={form.control}
              name="reference"
              render={({ field: { onChange, value, ref } }) => (
                <FormItem>
                  <FormLabel className="text-white font-semibold text-lg font-montserrat mx-auto lg:mx-0">
                    Reference Track
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-lg w-full mx-auto lg:mx-0">
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
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_47_275)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 3.75V6.25C0.645 6.25 1.595 6.696 2.45 7.55C3.304 8.405 3.75 9.355 3.75 10H6.25C6.25 9.355 6.696 8.405 7.55 7.55C8.405 6.696 9.355 6.25 10 6.25V3.75C9.355 3.75 8.405 3.304 7.55 2.45C6.697 1.594 6.25 0.644 6.25 0H3.75C3.75 0.645 3.304 1.595 2.45 2.45C1.595 3.304 0.645 3.75 0 3.75ZM13.5 4H15.75C17.938 4 20.0365 4.86919 21.5836 6.41637C23.1308 7.96354 24 10.062 24 12.25H21.5C21.5001 10.7682 20.9282 9.34358 19.9035 8.27323C18.8788 7.20287 17.4804 6.56943 16 6.505V19.25C15.9998 20.2895 15.6587 21.3002 15.0289 22.1272C14.3991 22.9542 13.5154 23.5517 12.5134 23.8282C11.5114 24.1047 10.4463 24.0448 9.48155 23.6578C8.51679 23.2708 7.70562 22.578 7.17244 21.6857C6.63927 20.7934 6.41352 19.7508 6.52983 18.7178C6.64613 17.6849 7.09807 16.7186 7.81633 15.9672C8.53459 15.2157 9.4795 14.7207 10.5062 14.5579C11.5328 14.3951 12.5845 14.5736 13.5 15.066V4ZM11.25 17C11.8467 17 12.419 17.2371 12.841 17.659C13.2629 18.081 13.5 18.6533 13.5 19.25C13.5 19.8467 13.2629 20.419 12.841 20.841C12.419 21.2629 11.8467 21.5 11.25 21.5C10.6533 21.5 10.081 21.2629 9.65901 20.841C9.23705 20.419 9 19.8467 9 19.25C9 18.6533 9.23705 18.081 9.65901 17.659C10.081 17.2371 10.6533 17 11.25 17Z"
                              fill="#3B82F6"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_47_275">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <Input
                        type="text"
                        readOnly
                        // value={
                        //   typeof value === "string" ? value : value?.name || ""
                        // }
                        placeholder="Paste the Link here"
                        className="pl-12 pr-28 bg-white border-white/50 text-white placeholder:text-[#585858]/50 input-glow"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center lg:justify-start">
            <Button className="group w-full bg-white hover:bg-blue-50 font-semibold px-4 py-5 text-lg mt-6 max-w-lg relative hover-lift cursor-pointer border-[#c2d8fc] border-2">
              <span className="button-vocalize relative btn-glow font-montserrat">
                Vocalize
                <span className="inline-block text-sm align-super translate-y-[-0.05em] opacity-0 group-hover:opacity-100 transition duration-400 hover:from-blue-200 hover:to-blue-400">
                  ✨
                </span>
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

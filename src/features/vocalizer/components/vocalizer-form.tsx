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
import { FileAudio } from "lucide-react";
import React, { useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSubmit(values: z.infer<typeof vocalizerSchema>) {}
  
  return (
    <div className="space-y-6 mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-transparent border-3 border-dashed border-white rounded-xl p-6 transition-colors max-w-xl w-full hover-lift">
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
                  variant="outline"
                  className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <FormField
              control={form.control}
              name="instrumental"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold text-lg">
                    Instrumental Track
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-2 items-center">
                      <Input
                        type="file"
                        accept=".mp3,.wav,.mp4"
                        className="hidden"
                        id="instrumental-upload"
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                        {...rest}
                      />

                      <Input
                        type="text"
                        placeholder="Paste the link here"
                        readOnly
                        value={form.watch("instrumental") || ""}
                        className="bg-white/10 border-white/50 text-white max-w-xl flex-1 placeholder:text-white hover-lift input-glow"
                      />

                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
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

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="reference"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold text-lg">
                    Reference Track
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-2 items-center">
                      <Input
                        type="file"
                        accept=".mp3,.wav,.mp4"
                        className="hidden"
                        id="instrumental-upload"
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                        {...rest}
                      />

                      <Input
                        type="text"
                        placeholder="Paste the link here"
                        // value={form.watch("instrumental")?.name || ""}
                        className="bg-white/10 border-white/20 text-white max-w-xl flex-1 placeholder:text-white hover-lift input-glow"
                      />

                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        onClick={() =>
                          document
                            .getElementById("instrumental-upload")
                            ?.click()
                        }
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

          <Button className="group w-full bg-white hover:bg-blue-50 font-semibold px-4 py-5 text-lg mt-4 max-w-xl relative hover-lift cursor-pointer">
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

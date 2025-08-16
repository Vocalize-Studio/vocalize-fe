"use client";

import Image from "next/image";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const MAX_MSG = 3000;

const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  message: z
    .string()
    .min(1, "Please write your message")
    .max(MAX_MSG, `Max ${MAX_MSG} characters`),
  agree: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree before sending" }),
});

type ContactValues = z.infer<typeof ContactSchema>;

export default function ContactInformation() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      agree: false,
    },
    mode: "onTouched",
  });

  const msgLen = form.watch("message")?.length ?? 0;
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ContactValues) => {
    console.log(values);
    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      agree: false,
    });
  };

  return (
    <section className="relative bg-white py-20">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="/contact-information.svg"
            fill
            alt="People singing and smiling"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-10 bg-gradient-vocalize" />

          <div className="relative z-10 grid md:grid-cols-[1.2fr_minmax(320px,420px)] gap-6 p-6 sm:p-8 md:p-10">
            <div className="text-white flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat tracking-tight">
                  Contact Information
                </h2>
                <p className="mt-3 max-w-sm text-xl font-normal leading-tight text-white/90">
                  If you have any question about{" "}
                  <span className="font-semibold">AI Vocalize</span>, please
                  leave a message!
                </p>

                <ul className="mt-6 space-y-3 text-white/95">
                  {[
                    "Collaboration",
                    "B2B",
                    "Need to vocalize a large amount of track",
                    "Join the Vocalize Engineer",
                    "Any other inquiries",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="mt-1 inline-block h-1 w-1 rounded-full bg-white/80" />
                      <span className="font-montserrat font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-lg font-semibold text-white/90">
                We will contact you within 3 business days.
              </p>
            </div>

            <div className="relative">
              <div className="mx-auto w-full max-w-xl rounded-2xl bg-white/90 p-5 sm:p-6 lg:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-gray-600">
                            First Name*
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="First Name*"
                              className="border-2 border-gray-300 focus:border-blue-500 py-5 px-3 text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-gray-600">
                            Last Name*
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Last Name*"
                              className="border-2 border-gray-300 focus:border-blue-500 py-5 px-3 text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-gray-600">
                            Email*
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder="john@example.com"
                              className="border-2 border-gray-300 focus:border-blue-500 py-5 px-3 text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-gray-600">
                            Write your message*.
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Textarea
                                {...field}
                                rows={6}
                                maxLength={MAX_MSG}
                                className="resize-none border-2 border-gray-300 focus:border-blue-500 text-base"
                              />
                              <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-gray-400">
                                {String(msgLen).padStart(3, "0")}/{MAX_MSG}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agree"
                      render={({ field }) => (
                        <FormItem>
                          <FormDescription className="text-[11px] leading-snug text-gray-500">
                            Please agree to the collection and use of
                            information for the purpose of responding.
                          </FormDescription>
                          <FormControl>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(v) =>
                                  field.onChange(Boolean(v))
                                }
                              />
                              I agree
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!form.watch("agree") || isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send a Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

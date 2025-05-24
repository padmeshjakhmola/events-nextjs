"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    password: z.string().min(6).max(50),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
              password: values.password,
            })
          : await signInUser({
              email: values.email,
              password: values.password,
            });

      if (
        (user && "error" in user && user.error.message === "user_not_found") ||
        (user && "error" in user && user.error.message === "invalid_password")
      ) {
        return setErrorMessage("Incorrect email or password.");
      }

      if (user && "status" in user && user.status === 200) {
        router.push("/");
      }
    } catch {
      setErrorMessage("Failed to create account. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8 text-black"
        >
          <h1 className="h1 text-center md:text-left">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-lg">
                    <FormLabel className="pt-2 body-2 w-full">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border-none shadow-none p-0 shad-no-focus placeholder:text-gray-500 body-2"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red body-2 ml-4" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-lg">
                  <FormLabel className="text-text-gray-800 pt-2 body-2 w-full">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-none shadow-none p-0 shad-no-focus placeholder:text-gray-500 body-2"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-400 body-2 ml-4" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-lg">
                  <FormLabel className="text-text-gray-800 pt-2 body-2 w-full">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Sssssshhhhh!!"
                      className="border-none shadow-none p-0 shad-no-focus placeholder:text-gray-500 body-2"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-brand-dark h-[66px] hover:bg-brand-dark/80 cursor-pointer"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                width={24}
                height={24}
                alt="loader"
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && (
            <p className="body-2 mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-red-500">
              *{errorMessage}
            </p>
          )}
          <div className="body-2 flex justify-center">
            <p className="text-gray-800">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand-dark"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;

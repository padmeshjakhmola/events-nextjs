"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createAccount = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fullname: fullName,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: "Unable to login",
      error: data,
    };
  }

  (await cookies()).set("token", data.token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });

  return {
    status: 200,
    message: "User created successfully",
    user: data.user,
    token: data.token,
  };
};

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: "Unable to login",
      error: data,
    };
  }

  (await cookies()).set("token", data.token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });

  return {
    status: 200,
    message: "User logged in successfully",
    user: data.user,
    token: data.token,
  };
};

export const logout = async () => {
  const cookieStore = cookies();
  (await cookieStore).set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  redirect("/");
};

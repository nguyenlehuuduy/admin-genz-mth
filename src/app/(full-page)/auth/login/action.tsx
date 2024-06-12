"use server";


import { API_PRIVATE_URL, COOKIE_ACCESS_TOKEN_KEY } from "@/src/app/lib/constant";
import { setCookie } from "@/src/app/lib/cookies";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ValidateFromType {
  email?: string;
  password?: string;
}

export interface ActionLoginState {
  validate?: ValidateFromType;
  success?: boolean;
}

const schema = z.object({
  email: z
    .string({ invalid_type_error: "email empty !!!" })
    .min(1, "email empty !!!")
    .email("error account"),
  password: z
    .string({ invalid_type_error: "password is not valid!" })
    .min(8, "password is not valid!")
    .max(20, "password is not valid!"),
});

export async function login(_: ActionLoginState, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      validate: {
        email: validatedFields.error.formErrors.fieldErrors.email?.[0],
        password: validatedFields.error.formErrors.fieldErrors.password?.[0],
      },
      success: false,
    };
  }
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const body: LoginRequest = {
    email: email!,
    password: password!,
  };
  const loginResult = await loginAccount(body);
  if (loginResult?.roles.includes("ADMIN")) {
    setCookie(COOKIE_ACCESS_TOKEN_KEY, loginResult.access_token);
    redirect("/")
  }
  return {
    validate: {
      email: "account is not have permission",
    },
  };
}

export interface LoginResponse {
  access_token: string;
  roles: Array<string>;
}

export interface LoginRequest {
  email: string;
  password: string;
}


async function loginAccount(
  body: LoginRequest,
): Promise<LoginResponse | undefined> {
  try {
    const response = await fetch(`${API_PRIVATE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status === 201) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json()
      }
    }
  } catch (error) {
    console.error(error)
  }
}



"use server";

import { redirect } from "next/navigation";

import { contactSchema } from "@/validations/contact";

// ActionStateの型定義
type ActionState = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
  };
  serverError?: string;
};

export async function submitContactForm(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = contactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    const error = validationResult.error.flatten().fieldErrors;
    console.log("サーバー側でエラー:", error);
    return {
      success: false,
      error: { name: error.name || [], email: error.email || [] },
    };
  }

  // DB登録

  console.log("送信されたデータ:", name, email);
  redirect("/contacts/complete");
}

"use server";

import { redirect } from "next/navigation";

import { contactSchema } from "@/validations/contact";
import { prisma } from "@/lib/prisma";

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
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

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
  // メールアドレスの存在確認
  const existingRecord = await prisma.contact.findUnique({ where: { email: email } });

  if (existingRecord) {
    return {
      success: false,
      error: { name: [], email: ["このメールアドレスは既に登録されています。"] },
    };
  }

  // 登録処理
  await prisma.contact.create({
    data: {
      name,
      email,
    },
  });

  console.log("送信されたデータ:", name, email);
  redirect("/contacts/complete");
}

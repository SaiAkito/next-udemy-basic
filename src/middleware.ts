// ページを表示する前に実行したい処理を記述 ex) 認証しているかどうかの確認
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.includes(".")) {
    console.log("ミドルウェアのテスト");
  }
  return NextResponse.next();
}

// 特定のパスにのみミドルウェアを適用
export const config = {
  matcher: ["/blog/:path*"],
};

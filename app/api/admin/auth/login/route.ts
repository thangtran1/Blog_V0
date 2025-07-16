import { type NextRequest, NextResponse } from "next/server";

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  user: {
    id: "vanthang",
    email: process.env.ADMIN_EMAIL,
    name: "Admin NoBugKai",
    role: "admin",
    avatar: null,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = `admin_token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      return NextResponse.json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        user: ADMIN_CREDENTIALS.user,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Đã có lỗi xảy ra",
      },
      { status: 500 }
    );
  }
}

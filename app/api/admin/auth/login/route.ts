import { type NextRequest, NextResponse } from "next/server"

// Demo admin credentials - Trong thực tế nên lưu trong database với hash password
const ADMIN_CREDENTIALS = {
  email: "admin@codeeasy.com",
  password: "admin123", // Trong thực tế cần hash
  user: {
    id: "admin-1",
    email: "admin@codeeasy.com",
    name: "Admin CodeEasy",
    role: "admin",
    avatar: null,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (trong thực tế nên dùng JWT)
      const token = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      return NextResponse.json({
        success: true,
        message: "Đăng nhập thành công",
        token,
        user: ADMIN_CREDENTIALS.user,
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Đã có lỗi xảy ra",
      },
      { status: 500 },
    )
  }
}

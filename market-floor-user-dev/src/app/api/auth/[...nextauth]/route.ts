// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { NextResponse } from "next/server"; // Không cần dùng NextResponse ở đây nếu không chuyển hướng tùy chỉnh

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 1, // Đặt maxAge ngắn (ví dụ 1 phút) để cookie JWT vẫn tồn tại đủ lâu cho bạn đọc
    // Đây vẫn là session của NextAuth, nhưng chúng ta sẽ không phụ thuộc vào nó lâu dài
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (!user?.email) {
        return "/login?error=no_email_found";
      }

      // TRẢ VỀ true để cho phép NextAuth hoàn tất quá trình xác thực
      // và thiết lập cookie JWT tạm thời (với maxAge ngắn)
      return true; // NextAuth sẽ tự động chuyển hướng đến `callbackUrl` (mặc định là '/')
      // hoặc `/login` nếu bạn cấu hình `pages: { signIn: '/login' }`
    },
    // RẤT QUAN TRỌNG: Thêm callback `jwt` để đảm bảo email có trong JWT token
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Gán email vào JWT token
      }
      return token;
    },
    // RẤT QUAN TRỌNG: Thêm callback `session` để đảm bảo email có trong đối tượng session
    // khi bạn gọi `useSession` hoặc `getSession` trên client
    async session({ session, token }) {
      // Đảm bảo session.user.email có giá trị từ token
      session.user.email = token.email as string;
      return session;
    },
  },
  // Chuyển hướng người dùng về trang `/login` sau khi xác thực thành công
  pages: {
    signIn: "/login", // Trang này sẽ được NextAuth sử dụng làm điểm khởi đầu cho luồng đăng nhập
    // và cũng là nơi người dùng sẽ được chuyển hướng về sau khi xác thực thành công
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

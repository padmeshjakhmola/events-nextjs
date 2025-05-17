import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  return (
    <main>
      <Navbar token={token!} />
      {children}
    </main>
  );
}

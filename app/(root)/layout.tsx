import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  return (
    <GlobalProvider>
      <main>
        <Navbar token={token!} />
        {children}
      </main>
    </GlobalProvider>
  );
}

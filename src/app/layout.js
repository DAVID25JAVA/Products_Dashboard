import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Dashboard",
  description: "Created by David",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster/>
         <Providers>{children}</Providers>
      </body>
    </html>
  );
}

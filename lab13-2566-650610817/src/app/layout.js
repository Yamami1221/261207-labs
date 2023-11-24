import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lab13",
  description: "Next13 Routing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <div style={{ maxWidth: "600px" }} className="mx-auto">
          <Header />
          <Navbar />
          {children}
          <Footer
            year="2023"
            fullName="Anak Sarntinoranont"
            studentId="650610817"
          />
        </div>
      </body>
    </html>
  );
}

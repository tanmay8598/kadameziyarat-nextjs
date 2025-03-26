"use client";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Public_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import jwtDecode from "jwt-decode";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthContext from "@/auth/context";
import { useEffect, useState } from "react";
import { Providers } from "@/redux/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SplashScreen from "@/components/splashScreen/SplashScreen";

config.autoAddCss = false;

const fonts = Public_Sans({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const restoreUser = async () => {
    const user = await localStorage.getItem("token");
    if (user) setUser(jwtDecode(user));
  };

  useEffect(() => {
    restoreUser();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, []);

  return (
    <html lang="en">
      <body className={fonts.className}>
        {loading ? (
          <SplashScreen loading={loading} />
        ) : (
          <Providers>
            <AuthContext.Provider value={{ user, setUser }}>
              <Navbar />

              <div className="container">
                <a
                  target="_blank"
                  // href="https://wa.me/+97466178767"
                  style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "20px",
                    cursor: "pointer",
                    zIndex: "1",
                  }}
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/27/03/07/whatsapp-1623579_1280.png"
                    alt=""
                    style={{ height: "50px" }}
                  />
                </a>
                {children}
              </div>
              {/* <MailList /> */}
              <Footer />
            </AuthContext.Provider>
          </Providers>
        )}
      </body>
    </html>
  );
}

"use client";
import Controller from "@/components/Controller";
import { Detail } from "@/components/Detail";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LangContext } from "@/contexts/LangContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function HomePage() {
  const THEMES = {
    LIGHT: {
      name: "light",
      bgColor: "white",
      fgColor: "black",
    },
    DARK: {
      name: "dark",
      bgColor: "black",
      fgColor: "white",
    },
  };

  const LANGS = {
    EN: {
      name: "en",
      header: "A simple useContext Example",
      detail: {
        lightActivated: "light theme activated",
        darkActivated: "dark theme activated",
      },
      buttons: {
        setLightTheme: "Light",
        setDarkTheme: "Dark",
        toggleTheme: "Toggle Theme",
        toggleLang: "Toggle Language",
      },
    },
    TH: {
      name: "th",
      header: "ตัวอย่างเว็บไซท์ useContext อย่างง่าย",
      detail: {
        lightActivated: "กำลังใช้ธีมไลท์",
        darkActivated: "กำลังใช้ธีมดาร์ค",
      },
      buttons: {
        setLightTheme: "ธีมไลท์",
        setDarkTheme: "ธีมดาร์ค",
        toggleTheme: "สลับธีม",
        toggleLang: "สลับภาษา",
      },
    },
  };

  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [lang, setLang] = useState(LANGS.EN);

  const setLightTheme = () => setTheme(THEMES.LIGHT);
  const setDarkTheme = () => setTheme(THEMES.DARK);
  const toggleTheme = () =>
    setTheme(theme.name === "dark" ? THEMES.LIGHT : THEMES.DARK);

  const toggleLang = () => setLang(lang.name === "en" ? LANGS.TH : LANGS.EN);

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        minHeight: "100vh",
      }}
    >
      <ThemeContext.Provider
        value={{ theme, toggleTheme, setDarkTheme, setLightTheme }}
      >
        <LangContext.Provider value={{ lang, toggleLang }}>
          <Header />
          <Detail />
          <Controller />
        </LangContext.Provider>
      </ThemeContext.Provider>
      <Footer year="2023" fullName="Anak Sarntinoranont" studentId="650610817" />
    </div>
  );
}

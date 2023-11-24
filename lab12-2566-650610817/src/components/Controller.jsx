import { LangContext } from "@/contexts/LangContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Controller() {
  const { toggleTheme, setDarkTheme, setLightTheme } = useContext(ThemeContext);
  const { toggleLang } = useContext(LangContext);
  const { lang } = useContext(LangContext);
  return (
    <div className="d-flex justify-content-center gap-2">
      <button className="btn btn-secondary" onClick={setLightTheme}>
        {lang.buttons.setLightTheme}
      </button>
      <button className="btn btn-dark" onClick={setDarkTheme}>
        {lang.buttons.setDarkTheme}
      </button>
      <button className="btn btn-primary" onClick={toggleTheme}>
        {lang.buttons.toggleTheme}
      </button>
      <button className="btn btn-danger" onClick={toggleLang}>
        {lang.buttons.toggleLang}
      </button>
    </div>
  );
}

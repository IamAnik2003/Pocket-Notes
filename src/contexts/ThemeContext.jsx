import { createContext } from "react";
import { useState ,useEffect} from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("dark");
    return stored !== null ? JSON.parse(stored) : true;
  });
    useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);


    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    )
}
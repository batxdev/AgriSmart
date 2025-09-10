import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DEFAULT_TEXT,
  translateAllText,
  getLanguageName,
  getLanguageFlag,
  SUPPORTED_LANGUAGES,
} from "../services/translationService.jsx";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState(DEFAULT_TEXT);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);

  // Function to change language and translate content
  const changeLanguage = async (language) => {
    if (language === currentLanguage) return;

    setIsTranslating(true);
    setTranslationError(null);
    setCurrentLanguage(language);

    try {
      const translated = await translateAllText(DEFAULT_TEXT, language);
      setTranslatedText(translated);
      setTranslationError(null);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslationError(
        `Translation failed for ${language}. Using fallback translations.`
      );

      // Try to use offline translations as fallback
      try {
        const fallbackTranslated = await translateAllText(
          DEFAULT_TEXT,
          language
        );
        setTranslatedText(fallbackTranslated);
      } catch (fallbackError) {
        console.error("Fallback translation also failed:", fallbackError);
        // Final fallback to English
        setTranslatedText(DEFAULT_TEXT);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to get translated text
  const t = (key) => {
    return translatedText[key] || DEFAULT_TEXT[key] || key;
  };

  // Function to get translated array (for action steps)
  const tArray = (key) => {
    return translatedText[key] || DEFAULT_TEXT[key] || [];
  };

  // Initialize with English on first load
  useEffect(() => {
    setTranslatedText(DEFAULT_TEXT);
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    tArray,
    isTranslating,
    translationError,
    getLanguageName,
    getLanguageFlag,
    availableLanguages: Object.keys(SUPPORTED_LANGUAGES),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

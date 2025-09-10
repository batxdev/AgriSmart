import React, { useState, useEffect } from "react";
import { Globe, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const LanguageSelector = () => {
  const {
    currentLanguage,
    changeLanguage,
    getLanguageName,
    getLanguageFlag,
    availableLanguages,
    isTranslating,
    translationError,
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLanguageChange = async (language) => {
    await changeLanguage(language);
    setIsOpen(false);
  };

  // Show error notification when translation fails
  useEffect(() => {
    if (translationError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [translationError]);

  return (
    <div className="relative">
      {/* Error notification */}
      {showError && translationError && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-lg z-50">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Translation Notice</p>
              <p className="text-amber-700 mt-1">{translationError}</p>
            </div>
            <button
              onClick={() => setShowError(false)}
              className="text-amber-600 hover:text-amber-800 ml-auto"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className="flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="text-sm">
          {getLanguageFlag(currentLanguage)} {getLanguageName(currentLanguage)}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {availableLanguages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageChange(language)}
              disabled={isTranslating}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                currentLanguage === language
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-700"
              }`}
            >
              <span className="text-lg">{getLanguageFlag(language)}</span>
              <span className="font-medium flex-1">
                {getLanguageName(language)}
              </span>
              {currentLanguage === language && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              )}
              {isTranslating && currentLanguage === language && (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSelector;

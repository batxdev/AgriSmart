import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  ArrowLeft,
  Leaf,
  Droplets,
  Bug,
  TrendingUp,
  MapPin,
  Calendar,
  ThermometerSun,
  Cloud,
  CheckCircle,
  AlertTriangle,
  Sprout,
  Target,
} from "lucide-react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext.jsx";
import LanguageSelector from "./components/LanguageSelector";

const AgriSmartAppContent = () => {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("organic");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { t, tArray } = useLanguage();

  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("crop-results");
    }, 2500);
  };

  const handleWaterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("water-results");
    }, 2500);
  };

  const handlePestSubmit = (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert(t("pleaseUploadImage"));
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("pest-results");
    }, 3000);
  };

  // Dashboard Screen Component
  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 pt-12 pb-16">
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">
                  {t("agriSmart")}
                </h1>
                <p className="text-emerald-100 text-sm">
                  {t("smartAssistant")}
                </p>
              </div>
            </div>
            <LanguageSelector />
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {t("welcome")}
            </h2>
            <p className="text-emerald-100 text-lg">{t("readyToOptimize")}</p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="px-6 -mt-8 pb-8">
        <div className="space-y-6">
          <div
            onClick={() => showScreen("crop-input")}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {t("cropRecommendation")}
                </h3>
                <p className="text-slate-600">{t("cropDescription")}</p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-all">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => showScreen("water-input")}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/30 transition-all duration-300">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {t("waterManagement")}
                </h3>
                <p className="text-slate-600">{t("waterDescription")}</p>
              </div>
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center group-hover:bg-cyan-200 transition-all">
                <Calendar className="w-4 h-4 text-cyan-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => showScreen("pest-input")}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-teal-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-xl group-hover:shadow-teal-500/30 transition-all duration-300">
                <Bug className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {t("pestDetection")}
                </h3>
                <p className="text-slate-600">{t("pestDescription")}</p>
              </div>
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-all">
                <Target className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modern Header Component
  const ModernHeader = ({ title, subtitle, onBack, icon: Icon }) => (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 pt-12 pb-8">
      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              {Icon && <Icon className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-emerald-100">{subtitle}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </div>
  );

  // Crop Input Screen
  const CropInputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <ModernHeader
        title={t("cropRecommendationTitle")}
        subtitle={t("cropRecommendationSubtitle")}
        onBack={() => showScreen("dashboard")}
        icon={Leaf}
      />

      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handleCropSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{t("location")}</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">{t("selectDistrict")}</option>
                  <option value="Hisar, Haryana">{t("hisarHaryana")}</option>
                  <option value="Karnal, Haryana">{t("karnalHaryana")}</option>
                  <option value="Ludhiana, Punjab">
                    {t("ludhianaPunjab")}
                  </option>
                  <option value="Jaipur, Rajasthan">
                    {t("jaipurRajasthan")}
                  </option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>{t("farmSize")}</span>
                </label>
                <input
                  type="number"
                  placeholder={t("enterSizeInAcres")}
                  step="0.1"
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300"
            >
              {t("getAIRecommendations")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Water Input Screen
  const WaterInputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      <ModernHeader
        title={t("waterManagementTitle")}
        subtitle={t("waterManagementSubtitle")}
        onBack={() => showScreen("dashboard")}
        icon={Droplets}
      />

      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handleWaterSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Leaf className="w-4 h-4 text-cyan-600" />
                  <span>{t("cropType")}</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">{t("selectCrop")}</option>
                  <option value="Wheat">{t("wheat")}</option>
                  <option value="Rice">{t("rice")}</option>
                  <option value="Mustard">{t("mustard")}</option>
                  <option value="Tomato">{t("tomato")}</option>
                  <option value="Cotton">{t("cotton")}</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span>{t("growthStage")}</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">{t("selectStage")}</option>
                  <option value="Sowing">{t("sowing")}</option>
                  <option value="Vegetative">{t("vegetative")}</option>
                  <option value="Flowering">{t("flowering")}</option>
                  <option value="Maturity">{t("maturity")}</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Target className="w-4 h-4 text-cyan-600" />
                  <span>{t("farmSize")}</span>
                </label>
                <input
                  type="number"
                  placeholder={t("enterSizeInAcres")}
                  step="0.1"
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-[1.02] transition-all duration-300"
            >
              {t("generateWaterSchedule")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Pest Input Screen
  const PestInputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30">
      <ModernHeader
        title={t("pestDetectionTitle")}
        subtitle={t("pestDetectionSubtitle")}
        onBack={() => showScreen("dashboard")}
        icon={Bug}
      />

      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handlePestSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                <Camera className="w-4 h-4 text-teal-600" />
                <span>{t("plantImage")}</span>
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-teal-300 rounded-3xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition-all duration-300 group"
              >
                {!uploadedImage ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-xl group-hover:shadow-teal-500/30 transition-all duration-300">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-lg">
                        {t("captureOrUpload")}
                      </p>
                      <p className="text-slate-500 mt-1">
                        {t("supportedFormats")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded plant"
                      className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                        fileInputRef.current.value = "";
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
                    >
                      {t("removeImage")}
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!uploadedImage}
              className={`w-full py-4 font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 ${
                uploadedImage
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/30 transform hover:scale-[1.02]"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              {uploadedImage ? t("analyzeWithAI") : t("uploadImageFirst")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Loading Screen
  const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          {t("loading")}
        </h3>
        <p className="text-slate-600 text-lg">{t("analyzing")}</p>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );

  // Crop Results Screen
  const CropResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <ModernHeader
        title={t("cropAnalysisResults")}
        subtitle={t("cropAnalysisSubtitle")}
        onBack={() => showScreen("dashboard")}
        icon={Leaf}
      />

      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Farm Information Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("farmOverview")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-emerald-600 font-medium">
                {t("location")}
              </p>
              <p className="text-lg font-bold text-slate-800">
                {t("hisarHaryana")}
              </p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-teal-600 font-medium">
                {t("farmSize")}
              </p>
              <p className="text-lg font-bold text-slate-800">2.0 acres</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-cyan-600 font-medium">
                {t("soilType")}
              </p>
              <p className="text-lg font-bold text-slate-800">{t("loamy")}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">
                {t("rainfall")}
              </p>
              <p className="text-lg font-bold text-slate-800">600mm</p>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl shadow-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <ThermometerSun className="w-6 h-6" />
            <h3 className="text-xl font-bold">{t("currentWeather")}</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-cyan-100 text-sm">{t("temperature")}</p>
              <p className="text-2xl font-bold">32°C</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-100 text-sm">{t("humidity")}</p>
              <p className="text-2xl font-bold">65%</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-100 text-sm">{t("rainfall")}</p>
              <p className="text-2xl font-bold">5mm</p>
            </div>
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>{t("topRecommendations")}</span>
          </h3>

          {/* Mustard - #1 */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌻</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">#1 {t("mustard")}</h4>
                  <p className="text-emerald-100">{t("bestROI")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm">
                  {t("expectedProfit")}
                </p>
                <p className="text-3xl font-bold">₹11,000</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">ROI</p>
                <p className="text-xl font-bold">83.3%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">{t("marketPrice")}</p>
                <p className="text-xl font-bold">₹5,000/q</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">{t("yield")}</p>
                <p className="text-xl font-bold">1,200kg</p>
              </div>
            </div>
          </div>

          {/* Rice - #2 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800">
                    #2 {t("rice")}
                  </h4>
                  <p className="text-slate-600">{t("highYieldPotential")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">{t("expectedProfit")}</p>
                <p className="text-3xl font-bold text-cyan-600">₹7,900</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">ROI</p>
                <p className="text-xl font-bold text-slate-800">65.8%</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">{t("marketPrice")}</p>
                <p className="text-xl font-bold text-slate-800">₹2,200/q</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">{t("yield")}</p>
                <p className="text-xl font-bold text-slate-800">4,500kg</p>
              </div>
            </div>
          </div>

          {/* Wheat - #3 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800">
                    #3 {t("wheat")}
                  </h4>
                  <p className="text-slate-600">{t("stableReliable")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">{t("expectedProfit")}</p>
                <p className="text-3xl font-bold text-amber-600">₹5,400</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">ROI</p>
                <p className="text-xl font-bold text-slate-800">67.5%</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">{t("marketPrice")}</p>
                <p className="text-xl font-bold text-slate-800">₹1,800/q</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">{t("yield")}</p>
                <p className="text-xl font-bold text-slate-800">3,000kg</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen("dashboard")}
          className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-500/25 hover:shadow-2xl hover:shadow-slate-500/30 transform hover:scale-[1.02] transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // Water Results Screen
  const WaterResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/30">
      <ModernHeader
        title={t("waterManagementPlan")}
        subtitle={t("smartIrrigationSchedule")}
        onBack={() => showScreen("dashboard")}
        icon={Droplets}
      />

      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Crop Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("cropInformation")}
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cyan-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-cyan-600 font-medium">
                {t("cropType")}
              </p>
              <p className="text-lg font-bold text-slate-800">{t("wheat")}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">
                {t("growthStage")}
              </p>
              <p className="text-lg font-bold text-slate-800">
                {t("vegetative")}
              </p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-teal-600 font-medium">
                {t("farmSize")}
              </p>
              <p className="text-lg font-bold text-slate-800">2.0 acres</p>
            </div>
          </div>
        </div>

        {/* Water Requirements */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl shadow-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <Droplets className="w-6 h-6" />
            <h3 className="text-xl font-bold">{t("waterRequirements")}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">{t("currentStageNeed")}</span>
              <span className="text-2xl font-bold">20mm/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">{t("totalFarmDaily")}</span>
              <span className="text-2xl font-bold">25mm (2,024L)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">{t("weeklyRequirement")}</span>
              <span className="text-2xl font-bold">175mm</span>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("weatherForecast")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { date: "Sep 4", temp: "30°C", rain: "2mm", day: t("today") },
              { date: "Sep 5", temp: "32°C", rain: "0mm", day: t("tomorrow") },
              { date: "Sep 6", temp: "28°C", rain: "5mm", day: t("friday") },
              { date: "Sep 7", temp: "31°C", rain: "0mm", day: t("saturday") },
            ].map((day, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-4 text-center"
              >
                <p className="text-sm font-medium text-slate-600">{day.day}</p>
                <p className="text-lg font-bold text-slate-800">{day.temp}</p>
                <p
                  className={`text-sm font-medium ${
                    day.rain === "0mm" ? "text-orange-600" : "text-blue-600"
                  }`}
                >
                  {day.rain} rain
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Irrigation Schedule */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("smartIrrigationSchedule")}
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                day: `${t("today")} (Sep 4)`,
                action: `${t("irrigate")} 20mm`,
                status: "recommended",
                reason: t("lightRainExpected"),
              },
              {
                day: `${t("tomorrow")} (Sep 5)`,
                action: `${t("irrigate")} 25mm`,
                status: "required",
                reason: t("noRainForecast"),
              },
              {
                day: t("sep6"),
                action: t("skipIrrigation"),
                status: "skip",
                reason: t("rainExpected"),
              },
              {
                day: t("sep7"),
                action: `${t("irrigate")} 25mm`,
                status: "required",
                reason: t("noRainForecast"),
              },
            ].map((schedule, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 flex items-center justify-between ${
                  schedule.status === "required"
                    ? "bg-red-50 border-l-4 border-red-500"
                    : schedule.status === "skip"
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                <div>
                  <p className="font-semibold text-slate-800">{schedule.day}</p>
                  <p className="text-sm text-slate-600">{schedule.reason}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      schedule.status === "required"
                        ? "text-red-600"
                        : schedule.status === "skip"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {schedule.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border-l-4 border-emerald-500">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800">
                  {t("smartTip")}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  {t("smartTipText")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen("dashboard")}
          className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-500/25 hover:shadow-2xl hover:shadow-slate-500/30 transform hover:scale-[1.02] transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // Pest Results Screen
  const PestResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30">
      <ModernHeader
        title={t("diseaseAnalysis")}
        subtitle={t("diseaseAnalysisSubtitle")}
        onBack={() => showScreen("dashboard")}
        icon={Bug}
      />

      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Detection Results */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("detectionResults")}
            </h3>
          </div>

          <div className="text-center mb-6">
            <img
              src={
                uploadedImage ||
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%2364748b'%3EPlant Image%3C/text%3E%3C/svg%3E"
              }
              alt="Analyzed plant"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">
                  {t("identifiedCondition")}
                </span>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">{t("tomatoEarlyBlight")}</p>
              <p className="text-orange-100 text-sm mt-1">
                {t("diseaseFungalInfection")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">
                  {t("confidenceLevel")}
                </span>
                <span className="text-2xl font-bold text-emerald-600">87%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: "87%" }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {t("highConfidenceDetection")}
              </p>
            </div>
          </div>
        </div>

        {/* Treatment Options */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("treatmentOptions")}
            </h3>
          </div>

          <div className="flex rounded-2xl overflow-hidden mb-4 bg-slate-100">
            <button
              onClick={() => setActiveTab("organic")}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-300 ${
                activeTab === "organic"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {t("organic")}
            </button>
            <button
              onClick={() => setActiveTab("chemical")}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-300 ${
                activeTab === "chemical"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {t("chemical")}
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === "organic" ? (
              <div className="bg-green-50 rounded-2xl p-4 border-l-4 border-green-500">
                <h4 className="font-bold text-green-800 mb-2">
                  {t("organicTreatment")}
                </h4>
                <p className="text-green-700 mb-3">
                  {t("organicTreatmentText")}
                </p>
                <div className="bg-green-100 rounded-xl p-3">
                  <p className="font-semibold text-green-800 text-sm">
                    {t("benefits")}:
                  </p>
                  <p className="text-green-700 text-sm">
                    {t("organicBenefits")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-2">
                  {t("chemicalTreatment")}
                </h4>
                <p className="text-blue-700 mb-3">
                  {t("chemicalTreatmentText")}
                </p>
                <div className="bg-blue-100 rounded-xl p-3">
                  <p className="font-semibold text-blue-800 text-sm">
                    {t("note")}:
                  </p>
                  <p className="text-blue-700 text-sm">{t("chemicalNote")}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prevention & Action Plan */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {t("preventionTips")}
            </h3>
          </div>

          <p className="text-slate-700 mb-4 leading-relaxed">
            {t("preventionText")}
          </p>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border-l-4 border-cyan-500">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-cyan-600 mt-0.5" />
              <div>
                <p className="font-bold text-cyan-800 mb-2">
                  {t("actionPlan")}
                </p>
                <ol className="space-y-2 text-cyan-700 text-sm">
                  {tArray("actionSteps").map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen("dashboard")}
          className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-500/25 hover:shadow-2xl hover:shadow-slate-500/30 transform hover:scale-[1.02] transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // Main App Render
  if (isLoading) {
    return <LoadingScreen />;
  }

  switch (currentScreen) {
    case "dashboard":
      return <DashboardScreen />;
    case "crop-input":
      return <CropInputScreen />;
    case "water-input":
      return <WaterInputScreen />;
    case "pest-input":
      return <PestInputScreen />;
    case "crop-results":
      return <CropResultsScreen />;
    case "water-results":
      return <WaterResultsScreen />;
    case "pest-results":
      return <PestResultsScreen />;
    default:
      return <DashboardScreen />;
  }
};

// Main App Component with Language Provider
const AgriSmartApp = () => {
  return (
    <LanguageProvider>
      <AgriSmartAppContent />
    </LanguageProvider>
  );
};

export default AgriSmartApp;

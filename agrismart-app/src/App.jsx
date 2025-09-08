import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Leaf, Droplets, Bug, TrendingUp, MapPin, Calendar, ThermometerSun, Cloud, CheckCircle, AlertTriangle, Sprout, Target } from 'lucide-react';

const AgriSmartApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('organic');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const showScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    if (email) {
      setCurrentUser({
        name: 'Rajesh Kumar',
        email: email,
        location: 'Hisar, Haryana'
      });
      setCurrentScreen('dashboard');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    if (name && email) {
      setCurrentUser({
        name: name,
        email: email,
        location: formData.get('location')
      });
      setCurrentScreen('dashboard');
    }
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
      setCurrentScreen('crop-results');
    }, 2500);
  };

  const handleWaterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('water-results');
    }, 2500);
  };

  const handlePestSubmit = (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('pest-results');
    }, 3000);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  // Login Screen Component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="relative min-h-screen flex flex-col">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -left-8 w-24 h-24 bg-cyan-200/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-teal-200/25 rounded-full blur-md animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl mb-6 shadow-lg shadow-emerald-500/25">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              AgriSmart
            </h1>
            <p className="text-slate-600 text-lg font-medium">Smart Farming Revolution</p>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-sm mx-auto">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    defaultValue="farmer@example.com"
                    required
                    className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-transparent rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 shadow-lg shadow-slate-200/50"
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    defaultValue="password123"
                    required
                    className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-transparent rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 shadow-lg shadow-slate-200/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                New to AgriSmart?{' '}
                <button
                  onClick={() => showScreen('signup')}
                  className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Signup Screen Component
  const SignupScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="relative min-h-screen">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 pt-12 pb-8">
          <button
            onClick={() => showScreen('login')}
            className="absolute left-6 top-12 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center text-white px-6">
            <h1 className="text-3xl font-bold mb-2">Join AgriSmart</h1>
            <p className="text-emerald-100">Start your smart farming journey</p>
          </div>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSignup} className="space-y-6 max-w-sm mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300"
              />
              <input
                type="text"
                name="location"
                placeholder="Location (City, State)"
                required
                className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300"
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                required
                className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );

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
                <h1 className="text-white font-bold text-xl">AgriSmart</h1>
                <p className="text-emerald-100 text-sm">Smart Assistant</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium"
            >
              Logout
            </button>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {currentUser?.name}! 👋
            </h2>
            <p className="text-emerald-100 text-lg">Ready to optimize your farming today?</p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="px-6 -mt-8 pb-8">
        <div className="space-y-6">
          <div
            onClick={() => showScreen('crop-input')}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Crop Recommendation</h3>
                <p className="text-slate-600">AI-powered crop selection & profit analysis</p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-all">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => showScreen('water-input')}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/30 transition-all duration-300">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Water Management</h3>
                <p className="text-slate-600">Smart irrigation scheduling & optimization</p>
              </div>
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center group-hover:bg-cyan-200 transition-all">
                <Calendar className="w-4 h-4 text-cyan-600" />
              </div>
            </div>
          </div>

          <div
            onClick={() => showScreen('pest-input')}
            className="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-teal-500/10 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-xl group-hover:shadow-teal-500/30 transition-all duration-300">
                <Bug className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">Pest Detection</h3>
                <p className="text-slate-600">Image-based disease identification & treatment</p>
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
        <div className="flex items-center space-x-4 mb-6">
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
      </div>
    </div>
  );

  // Crop Input Screen
  const CropInputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <ModernHeader
        title="Crop Recommendation"
        subtitle="Find the best crops for your farm"
        onBack={() => showScreen('dashboard')}
        icon={Leaf}
      />
      
      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handleCropSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Location</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">Select District</option>
                  <option value="Hisar, Haryana">Hisar, Haryana</option>
                  <option value="Karnal, Haryana">Karnal, Haryana</option>
                  <option value="Ludhiana, Punjab">Ludhiana, Punjab</option>
                  <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Farm Size</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter size in acres"
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
              Get AI Recommendations
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
        title="Water Management"
        subtitle="Optimize your irrigation schedule"
        onBack={() => showScreen('dashboard')}
        icon={Droplets}
      />
      
      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handleWaterSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Leaf className="w-4 h-4 text-cyan-600" />
                  <span>Crop Type</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">Select Crop</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span>Growth Stage</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:bg-white transition-all duration-300"
                >
                  <option value="">Select Stage</option>
                  <option value="Sowing">Sowing</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Maturity">Maturity</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                  <Target className="w-4 h-4 text-cyan-600" />
                  <span>Farm Size</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter size in acres"
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
              Generate Water Schedule
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
        title="Pest Detection"
        subtitle="Upload plant image for AI analysis"
        onBack={() => showScreen('dashboard')}
        icon={Bug}
      />
      
      <div className="px-6 -mt-4 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <form onSubmit={handlePestSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                <Camera className="w-4 h-4 text-teal-600" />
                <span>Plant Image</span>
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
                      <p className="font-semibold text-slate-700 text-lg">Capture or Upload Image</p>
                      <p className="text-slate-500 mt-1">JPG, PNG, WEBP supported</p>
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
                        fileInputRef.current.value = '';
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
                    >
                      Remove Image
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
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/30 transform hover:scale-[1.02]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {uploadedImage ? 'Analyze with AI' : 'Upload Image First'}
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
        <h3 className="text-2xl font-bold text-slate-800 mb-3">AI Processing...</h3>
        <p className="text-slate-600 text-lg">Analyzing your data with advanced algorithms</p>
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
        title="Crop Analysis Results"
        subtitle="AI-powered recommendations for your farm"
        onBack={() => showScreen('dashboard')}
        icon={Leaf}
      />
      
      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Farm Information Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Farm Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-emerald-600 font-medium">Location</p>
              <p className="text-lg font-bold text-slate-800">Hisar, Haryana</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-teal-600 font-medium">Farm Size</p>
              <p className="text-lg font-bold text-slate-800">2.0 acres</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-cyan-600 font-medium">Soil Type</p>
              <p className="text-lg font-bold text-slate-800">Loamy</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">Rainfall</p>
              <p className="text-lg font-bold text-slate-800">600mm</p>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl shadow-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <ThermometerSun className="w-6 h-6" />
            <h3 className="text-xl font-bold">Current Weather</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-cyan-100 text-sm">Temperature</p>
              <p className="text-2xl font-bold">32°C</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-100 text-sm">Humidity</p>
              <p className="text-2xl font-bold">65%</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-100 text-sm">Rainfall</p>
              <p className="text-2xl font-bold">5mm</p>
            </div>
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>Top Recommendations</span>
          </h3>

          {/* Mustard - #1 */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌻</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">#1 Mustard</h4>
                  <p className="text-emerald-100">Best ROI crop for your region</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm">Expected Profit</p>
                <p className="text-3xl font-bold">₹11,000</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">ROI</p>
                <p className="text-xl font-bold">83.3%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">Market Price</p>
                <p className="text-xl font-bold">₹5,000/q</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
                <p className="text-emerald-100 text-sm">Yield</p>
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
                  <h4 className="text-2xl font-bold text-slate-800">#2 Rice</h4>
                  <p className="text-slate-600">High yield potential</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">Expected Profit</p>
                <p className="text-3xl font-bold text-cyan-600">₹7,900</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">ROI</p>
                <p className="text-xl font-bold text-slate-800">65.8%</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">Market Price</p>
                <p className="text-xl font-bold text-slate-800">₹2,200/q</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-3 text-center">
                <p className="text-cyan-600 text-sm">Yield</p>
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
                  <h4 className="text-2xl font-bold text-slate-800">#3 Wheat</h4>
                  <p className="text-slate-600">Stable & reliable option</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">Expected Profit</p>
                <p className="text-3xl font-bold text-amber-600">₹5,400</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">ROI</p>
                <p className="text-xl font-bold text-slate-800">67.5%</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">Market Price</p>
                <p className="text-xl font-bold text-slate-800">₹1,800/q</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-3 text-center">
                <p className="text-amber-600 text-sm">Yield</p>
                <p className="text-xl font-bold text-slate-800">3,000kg</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen('dashboard')}
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
        title="Water Management Plan"
        subtitle="Optimized irrigation schedule"
        onBack={() => showScreen('dashboard')}
        icon={Droplets}
      />
      
      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Crop Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Crop Information</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cyan-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-cyan-600 font-medium">Crop</p>
              <p className="text-lg font-bold text-slate-800">Wheat</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">Stage</p>
              <p className="text-lg font-bold text-slate-800">Vegetative</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-teal-600 font-medium">Farm Size</p>
              <p className="text-lg font-bold text-slate-800">2.0 acres</p>
            </div>
          </div>
        </div>

        {/* Water Requirements */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl shadow-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <Droplets className="w-6 h-6" />
            <h3 className="text-xl font-bold">Water Requirements</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">Current Stage Need</span>
              <span className="text-2xl font-bold">20mm/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">Total Farm Daily</span>
              <span className="text-2xl font-bold">25mm (2,024L)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-100">Weekly Requirement</span>
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
            <h3 className="text-xl font-bold text-slate-800">4-Day Weather Forecast</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { date: 'Sep 4', temp: '30°C', rain: '2mm', day: 'Today' },
              { date: 'Sep 5', temp: '32°C', rain: '0mm', day: 'Tomorrow' },
              { date: 'Sep 6', temp: '28°C', rain: '5mm', day: 'Fri' },
              { date: 'Sep 7', temp: '31°C', rain: '0mm', day: 'Sat' }
            ].map((day, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-sm font-medium text-slate-600">{day.day}</p>
                <p className="text-lg font-bold text-slate-800">{day.temp}</p>
                <p className={`text-sm font-medium ${day.rain === '0mm' ? 'text-orange-600' : 'text-blue-600'}`}>
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
            <h3 className="text-xl font-bold text-slate-800">Smart Irrigation Schedule</h3>
          </div>
          <div className="space-y-3">
            {[
              { day: 'Today (Sep 4)', action: 'Irrigate 20mm', status: 'recommended', reason: 'Light rain expected' },
              { day: 'Tomorrow (Sep 5)', action: 'Irrigate 25mm', status: 'required', reason: 'No rain forecast' },
              { day: 'Sep 6', action: 'Skip irrigation', status: 'skip', reason: 'Rain expected (5mm)' },
              { day: 'Sep 7', action: 'Irrigate 25mm', status: 'required', reason: 'No rain forecast' }
            ].map((schedule, index) => (
              <div key={index} className={`rounded-2xl p-4 flex items-center justify-between ${
                schedule.status === 'required' ? 'bg-red-50 border-l-4 border-red-500' :
                schedule.status === 'skip' ? 'bg-green-50 border-l-4 border-green-500' :
                'bg-blue-50 border-l-4 border-blue-500'
              }`}>
                <div>
                  <p className="font-semibold text-slate-800">{schedule.day}</p>
                  <p className="text-sm text-slate-600">{schedule.reason}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    schedule.status === 'required' ? 'text-red-600' :
                    schedule.status === 'skip' ? 'text-green-600' :
                    'text-blue-600'
                  }`}>{schedule.action}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border-l-4 border-emerald-500">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800">Smart Tip</p>
                <p className="text-sm text-emerald-700 mt-1">
                  Monitor soil moisture levels and adjust irrigation based on actual field conditions. The vegetative stage requires consistent moisture for optimal growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen('dashboard')}
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
        title="Disease Analysis"
        subtitle="AI-powered plant health assessment"
        onBack={() => showScreen('dashboard')}
        icon={Bug}
      />
      
      <div className="px-6 -mt-4 pb-8 space-y-6">
        {/* Detection Results */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Detection Results</h3>
          </div>
          
          <div className="text-center mb-6">
            <img
              src={uploadedImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%2364748b'%3EPlant Image%3C/text%3E%3C/svg%3E"}
              alt="Analyzed plant"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Identified Condition</span>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">Tomato Early Blight</p>
              <p className="text-orange-100 text-sm mt-1">Disease - Fungal Infection</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">Confidence Level</span>
                <span className="text-2xl font-bold text-emerald-600">87%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000" style={{width: '87%'}}></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">High confidence detection</p>
            </div>
          </div>
        </div>

        {/* Treatment Options */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Treatment Options</h3>
          </div>

          <div className="flex rounded-2xl overflow-hidden mb-4 bg-slate-100">
            <button
              onClick={() => setActiveTab('organic')}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-300 ${
                activeTab === 'organic'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              🌿 Organic
            </button>
            <button
              onClick={() => setActiveTab('chemical')}
              className={`flex-1 py-3 px-4 font-semibold transition-all duration-300 ${
                activeTab === 'chemical'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              ⚗️ Chemical
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'organic' ? (
              <div className="bg-green-50 rounded-2xl p-4 border-l-4 border-green-500">
                <h4 className="font-bold text-green-800 mb-2">Organic Treatment</h4>
                <p className="text-green-700 mb-3">
                  Neem oil spray, 5ml/L weekly application. Apply in early morning or evening.
                </p>
                <div className="bg-green-100 rounded-xl p-3">
                  <p className="font-semibold text-green-800 text-sm">Benefits:</p>
                  <p className="text-green-700 text-sm">
                    Safe for environment, no chemical residues, maintains beneficial insects
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-2">Chemical Treatment</h4>
                <p className="text-blue-700 mb-3">
                  Mancozeb fungicide, 2g/L water. Spray every 7-10 days.
                </p>
                <div className="bg-blue-100 rounded-xl p-3">
                  <p className="font-semibold text-blue-800 text-sm">Note:</p>
                  <p className="text-blue-700 text-sm">
                    Follow safety guidelines, use protective equipment, observe pre-harvest intervals
                  </p>
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
            <h3 className="text-xl font-bold text-slate-800">Prevention Tips</h3>
          </div>
          
          <p className="text-slate-700 mb-4 leading-relaxed">
            Remove infected leaves immediately, avoid overhead irrigation, ensure proper plant spacing for air circulation, rotate crops annually.
          </p>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border-l-4 border-cyan-500">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-cyan-600 mt-0.5" />
              <div>
                <p className="font-bold text-cyan-800 mb-2">Action Plan</p>
                <ol className="space-y-2 text-cyan-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">1</span>
                    <span>Apply selected treatment immediately</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">2</span>
                    <span>Monitor plants daily for 1-2 weeks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">3</span>
                    <span>Remove and dispose of affected leaves</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">4</span>
                    <span>Improve drainage and air circulation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-cyan-200 rounded-full flex items-center justify-center text-xs font-bold text-cyan-800 mt-0.5">5</span>
                    <span>Consider preventive spraying for healthy plants</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => showScreen('dashboard')}
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
    case 'login':
      return <LoginScreen />;
    case 'signup':
      return <SignupScreen />;
    case 'dashboard':
      return <DashboardScreen />;
    case 'crop-input':
      return <CropInputScreen />;
    case 'water-input':
      return <WaterInputScreen />;
    case 'pest-input':
      return <PestInputScreen />;
    case 'crop-results':
      return <CropResultsScreen />;
    case 'water-results':
      return <WaterResultsScreen />;
    case 'pest-results':
      return <PestResultsScreen />;
    default:
      return <LoginScreen />;
  }
};

export default AgriSmartApp;
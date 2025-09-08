# 🌱 AgriSmart - AI-Powered Agriculture Platform

> **Smart Farming Solutions for Modern Agriculture**

AgriSmart is a comprehensive web application designed to revolutionize farming practices through AI-powered insights and recommendations. Built specifically for farmers, this platform provides intelligent crop recommendations, water management optimization, and pest detection capabilities.

![AgriSmart Banner](https://via.placeholder.com/800x300/4CAF50/FFFFFF?text=AgriSmart+-+Smart+Farming+Revolution)

## 🚀 Features

### 🌾 **Crop Recommendation & Profit Estimation**
- AI-powered crop selection based on location and soil conditions
- Real-time market price analysis
- Profit estimation and ROI calculations
- Weather-based recommendations
- Expected yield predictions

### 💧 **Water Management Optimization**
- Smart irrigation scheduling
- Weather-integrated water planning
- Crop-specific water requirements
- Growth stage-based recommendations
- Water usage optimization

### 🌿 **Pest & Disease Detection**
- Image-based disease identification
- AI-powered plant health assessment
- Treatment recommendations (organic & chemical)
- Prevention strategies and tips
- Confidence-based detection results


## 🛠️ Technology Stack

- **Frontend**: React 18+ with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for beautiful iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: React useState and useRef hooks
- **Image Processing**: FileReader API for image uploads

## 📱 Application Flow

```
Login/Signup → Dashboard → Module Selection → Input Forms → AI Processing → Results Display
```

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone or create the project**
   ```bash
   # Create a new Vite React project
   npm create vite@latest agrismart-app -- --template react
   cd agrismart-app
   ```

2. **Install dependencies**
   ```bash
   # Install base dependencies
   npm install
   
   # Install required packages
   npm install lucide-react
   
   # Install Tailwind CSS
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind CSS**
   
   Update `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
   
   Update `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Replace the default App component**
   
   Replace the contents of `src/App.jsx` with the AgriSmart React component code.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 🏃‍♂️ Running the Project

### Development Mode
```bash
npm run dev
```
Runs the app in development mode with hot reloading.

### Build for Production
```bash
npm run build
```
Builds the app for production to the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## 📝 Usage Instructions

### 1. **Authentication**
- Use the pre-filled demo credentials or create a new account
- Demo login: `farmer@example.com` / `password123`

### 2. **Crop Recommendations**
- Select your location from the dropdown
- Enter your farm size in acres
- Get AI-powered crop suggestions with profit estimates

### 3. **Water Management**
- Choose your crop type and growth stage
- Enter farm size for water calculations
- Receive optimized irrigation schedules

### 4. **Pest Detection**
- Upload or capture an image of affected plants
- Get instant AI-powered disease identification
- Access treatment options (organic/chemical)

## 🗂️ Project Structure

```
agrismart-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main AgriSmart component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # React root
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:
```env
VITE_API_BASE_URL=your_api_endpoint
VITE_WEATHER_API_KEY=your_weather_api_key
```

### API Integration
The current version uses dummy data for demonstration. To integrate with real APIs:

1. Replace dummy data in form submission handlers
2. Add API service files in `src/services/`
3. Implement proper error handling and loading states

```bash
npm run build
npx vercel
```


```bash
npm run build
# Upload dist/ folder to Netlify
```


```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🤝 Contributing

Contributions are welcomed! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure mobile responsiveness for all new features
- Add proper error handling and loading states
- Test on multiple devices and browsers




```json
{
  "location": "Hisar, Haryana",
  "farm_size_acres": 2,
  "soil_type": "Loamy",
  "weather_forecast": {"temp": 32, "rainfall_mm": 5},
  "market_price": {"wheat": 1800, "mustard": 5000},
  "expected_yield": {"wheat": 3000, "mustard": 1200},
  "recommendations": [
    {"crop": "Mustard", "profit": 11000, "roi": 83.3}
  ]
}
```


```json
{
  "crop": "Wheat",
  "growth_stage": "Vegetative",
  "water_requirement_mm": {"vegetative": 20, "flowering": 30},
  "weather_forecast": [
    {"date": "2025-09-04", "rainfall_mm": 2, "temp": 30}
  ]
}
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


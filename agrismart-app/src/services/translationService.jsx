import { translate } from "google-translate-api-x";

// Cache for translations to avoid repeated API calls
const translationCache = new Map();

// Complete offline translations for all supported languages
const OFFLINE_TRANSLATIONS = {
  hi: {
    // Navigation & Common
    welcome: "AgriSmart में आपका स्वागत है! 👋",
    readyToOptimize: "आज अपनी खेती को अनुकूलित करने के लिए तैयार हैं?",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    loading: "AI प्रसंस्करण...",
    analyzing: "उन्नत एल्गोरिदम के साथ आपके डेटा का विश्लेषण",
    agriSmart: "AgriSmart",
    smartAssistant: "स्मार्ट असिस्टेंट",
    
    // Dashboard Cards
    cropRecommendation: "फसल सिफारिश",
    cropDescription: "AI-संचालित फसल चयन और लाभ विश्लेषण",
    waterManagement: "जल प्रबंधन",
    waterDescription: "स्मार्ट सिंचाई अनुसूची और अनुकूलन",
    pestDetection: "कीट पहचान",
    pestDescription: "छवि-आधारित रोग पहचान और उपचार",
    
    // Form Fields
    location: "स्थान",
    selectDistrict: "जिला चुनें",
    farmSize: "खेत का आकार",
    enterSizeInAcres: "एकड़ में आकार दर्ज करें",
    getAIRecommendations: "AI सिफारिशें प्राप्त करें",
    cropType: "फसल प्रकार",
    selectCrop: "फसल चुनें",
    growthStage: "विकास चरण",
    selectStage: "चरण चुनें",
    generateWaterSchedule: "जल अनुसूची उत्पन्न करें",
    plantImage: "पौधे की छवि",
    captureOrUpload: "छवि कैप्चर या अपलोड करें",
    supportedFormats: "JPG, PNG, WEBP समर्थित",
    removeImage: "छवि हटाएं",
    analyzeWithAI: "AI के साथ विश्लेषण करें",
    uploadImageFirst: "पहले छवि अपलोड करें",
    pleaseUploadImage: "कृपया पहले एक छवि अपलोड करें",
    
    // Crop Options
    wheat: "गेहूं",
    rice: "चावल",
    mustard: "सरसों",
    tomato: "टमाटर",
    cotton: "कपास",
    
    // Growth Stages
    sowing: "बुवाई",
    vegetative: "वानस्पतिक",
    flowering: "फूल आना",
    maturity: "परिपक्वता",
    
    // Weather & Results
    currentWeather: "वर्तमान मौसम",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    topRecommendations: "शीर्ष सिफारिशें",
    expectedProfit: "अपेक्षित लाभ",
    marketPrice: "बाजार मूल्य",
    yield: "उपज",
    bestROI: "आपके क्षेत्र के लिए सबसे अच्छा ROI फसल",
    highYieldPotential: "उच्च उपज क्षमता",
    stableReliable: "स्थिर और विश्वसनीय विकल्प",
    soilType: "मिट्टी का प्रकार",
    rainfall: "वर्षा",
    loamy: "दोमट",
    
    // Results Pages
    cropAnalysisResults: "फसल विश्लेषण परिणाम",
    cropAnalysisSubtitle: "आपके खेत के लिए AI-संचालित सिफारिशें",
    farmOverview: "खेत का अवलोकन",
    waterManagementPlan: "जल प्रबंधन योजना",
    cropInformation: "फसल की जानकारी",
    waterRequirements: "जल आवश्यकताएं",
    currentStageNeed: "वर्तमान चरण की आवश्यकता",
    totalFarmDaily: "कुल खेत दैनिक",
    weeklyRequirement: "साप्ताहिक आवश्यकता",
    weatherForecast: "4-दिन का मौसम पूर्वानुमान",
    today: "आज",
    tomorrow: "कल",
    smartIrrigationSchedule: "स्मार्ट सिंचाई अनुसूची",
    irrigate: "सिंचाई करें",
    skipIrrigation: "सिंचाई छोड़ें",
    lightRainExpected: "हल्की बारिश की उम्मीद",
    noRainForecast: "बारिश का पूर्वानुमान नहीं",
    rainExpected: "बारिश की उम्मीद",
    smartTip: "स्मार्ट टिप",
    smartTipText: "मिट्टी की नमी के स्तर की निगरानी करें और वास्तविक खेत की स्थिति के आधार पर सिंचाई को समायोजित करें। वानस्पतिक चरण में बेहतर विकास के लिए निरंतर नमी की आवश्यकता होती है।",
    
    // Disease Analysis
    diseaseAnalysis: "रोग विश्लेषण",
    diseaseAnalysisSubtitle: "AI-संचालित पौधे की स्वास्थ्य मूल्यांकन",
    detectionResults: "पहचान परिणाम",
    identifiedCondition: "पहचानी गई स्थिति",
    diseaseFungalInfection: "रोग - फंगल संक्रमण",
    confidenceLevel: "विश्वास स्तर",
    highConfidenceDetection: "उच्च विश्वास पहचान",
    treatmentOptions: "उपचार विकल्प",
    organic: "🌿 जैविक",
    chemical: "⚗️ रासायनिक",
    organicTreatment: "जैविक उपचार",
    organicTreatmentText: "नीम तेल स्प्रे, 5ml/L साप्ताहिक आवेदन। सुबह जल्दी या शाम को लागू करें।",
    benefits: "लाभ:",
    organicBenefits: "पर्यावरण के लिए सुरक्षित, कोई रासायनिक अवशेष नहीं, लाभकारी कीड़े बनाए रखता है",
    chemicalTreatment: "रासायनिक उपचार",
    chemicalTreatmentText: "मैंकोजेब कवकनाशी, 2g/L पानी। हर 7-10 दिन में स्प्रे करें।",
    note: "नोट:",
    chemicalNote: "सुरक्षा दिशानिर्देशों का पालन करें, सुरक्षात्मक उपकरण का उपयोग करें, फसल-पूर्व अंतराल का पालन करें",
    preventionTips: "रोकथाम युक्तियां",
    preventionText: "संक्रमित पत्तियों को तुरंत हटा दें, ऊपरी सिंचाई से बचें, हवा के परिसंचरण के लिए उचित पौधे की दूरी सुनिश्चित करें, वार्षिक फसल चक्रण करें।",
    actionPlan: "कार्य योजना",
    
    // Days and Dates
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    sep6: "6 सितंबर",
    sep7: "7 सितंबर",
    sep8: "8 सितंबर",
    sep9: "9 सितंबर",
    
    // Locations
    hisarHaryana: "हिसार, हरियाणा",
    karnalHaryana: "करनाल, हरियाणा",
    ludhianaPunjab: "लुधियाना, पंजाब",
    jaipurRajasthan: "जयपुर, राजस्थान",
    
    // Units and Measurements
    acres: "एकड़",
    liters: "लीटर",
    perDay: "प्रति दिन",
    perWeek: "प्रति सप्ताह",
    celsius: "सेल्सियस",
    percentage: "प्रतिशत",
    mm: "मिमी",
    
    // Action Steps
    actionSteps: [
      "चयनित उपचार तुरंत लागू करें",
      "1-2 सप्ताह के लिए पौधों की दैनिक निगरानी करें",
      "प्रभावित पत्तियों को हटाएं और निपटान करें",
      "जल निकासी और हवा के परिसंचरण में सुधार करें",
      "स्वस्थ पौधों के लिए निवारक स्प्रे पर विचार करें"
    ]
  },
  
  // Add similar comprehensive translations for other languages...
  // For brevity, I'll show the pattern for Telugu as well
  
  te: {
    // Navigation & Common
    welcome: "AgriSmartకు స్వాగతం! 👋",
    readyToOptimize: "ఈరోజు మీ వ్యవసాయాన్ని ఆప్టిమైజ్ చేయడానికి సిద్ధంగా ఉన్నారా?",
    backToDashboard: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    loading: "AI ప్రాసెసింగ్...",
    analyzing: "అధునాతన అల్గోరిథంలతో మీ డేటాను విశ్లేషిస్తోంది",
    agriSmart: "AgriSmart",
    smartAssistant: "స్మార్ట్ అసిస్టెంట్",
    
    // Dashboard Cards
    cropRecommendation: "పంట సిఫార్సు",
    cropDescription: "AI-ఆధారిత పంట ఎంపిక & లాభ విశ్లేషణ",
    waterManagement: "నీటి నిర్వహణ",
    waterDescription: "స్మార్ట్ నీటిపారుదల షెడ్యూల్ & ఆప్టిమైజేషన్",
    pestDetection: "కీటక గుర్తింపు",
    pestDescription: "చిత్ర-ఆధారిత వ్యాధి గుర్తింపు & చికిత్స",
    
    // Form Fields
    location: "స్థానం",
    selectDistrict: "జిల్లా ఎంచుకోండి",
    farmSize: "వ్యవసాయ భూమి పరిమాణం",
    enterSizeInAcres: "ఎకరాలలో పరిమాణం నమోదు చేయండి",
    getAIRecommendations: "AI సిఫార్సులను పొందండి",
    cropType: "పంట రకం",
    selectCrop: "పంటను ఎంచుకోండి",
    growthStage: "వృద్ధి దశ",
    selectStage: "దశను ఎంచుకోండి",
    generateWaterSchedule: "నీటి షెడ్యూల్ ఉత్పత్తి చేయండి",
    plantImage: "మొక్క చిత్రం",
    captureOrUpload: "చిత్రాన్ని క్యాప్చర్ లేదా అప్‌లోడ్ చేయండి",
    supportedFormats: "JPG, PNG, WEBP మద్దతు",
    removeImage: "చిత్రాన్ని తొలగించండి",
    analyzeWithAI: "AIతో విశ్లేషించండి",
    uploadImageFirst: "మొదట చిత్రాన్ని అప్‌లోడ్ చేయండి",
    pleaseUploadImage: "దయచేసి మొదట చిత్రాన్ని అప్‌లోడ్ చేయండి",
    
    // Crop Options
    wheat: "గోధుమలు",
    rice: "వరి",
    mustard: "ఆవాలు",
    tomato: "టమాట",
    cotton: "పత్తి",
    
    // Growth Stages
    sowing: "విత్తనం",
    vegetative: "వృక్ష",
    flowering: "పుష్పించే",
    maturity: "పరిపక్వత",
    
    // Weather & Results
    currentWeather: "ప్రస్తుత వాతావరణం",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    topRecommendations: "టాప్ సిఫార్సులు",
    expectedProfit: "అంచనా లాభం",
    marketPrice: "మార్కెట్ ధర",
    yield: "పంట",
    bestROI: "మీ ప్రాంతానికి ఉత్తమ ROI పంట",
    highYieldPotential: "అధిక పంట సామర్థ్యం",
    stableReliable: "స్థిరమైన మరియు నమ్మకమైన ఎంపిక",
    soilType: "నేల రకం",
    rainfall: "వర్షపాతం",
    loamy: "లోమీ",
    
    // Results Pages
    cropAnalysisResults: "పంట విశ్లేషణ ఫలితాలు",
    cropAnalysisSubtitle: "మీ వ్యవసాయ భూమికి AI-ఆధారిత సిఫార్సులు",
    farmOverview: "వ్యవసాయ భూమి అవలోకనం",
    waterManagementPlan: "నీటి నిర్వహణ ప్రణాళిక",
    cropInformation: "పంట సమాచారం",
    waterRequirements: "నీటి అవసరాలు",
    currentStageNeed: "ప్రస్తుత దశ అవసరం",
    totalFarmDaily: "మొత్తం వ్యవసాయ భూమి దైనిక",
    weeklyRequirement: "వారపు అవసరం",
    weatherForecast: "4-రోజుల వాతావరణ సూచన",
    today: "ఈరోజు",
    tomorrow: "రేపు",
    smartIrrigationSchedule: "స్మార్ట్ నీటిపారుదల షెడ్యూల్",
    irrigate: "నీటిపారుదల",
    skipIrrigation: "నీటిపారుదల దాటవేయండి",
    lightRainExpected: "తేలికపాటి వర్షం అంచనా",
    noRainForecast: "వర్షం సూచన లేదు",
    rainExpected: "వర్షం అంచనా",
    smartTip: "స్మార్ట్ చిట్కా",
    smartTipText: "నేల తేమ స్థాయిలను పర్యవేక్షించండి మరియు వాస్తవ పొలం పరిస్థితుల ఆధారంగా నీటిపారుదలను సర్దుబాటు చేయండి। వృక్ష దశకు సరైన వృద్ధికి స్థిరమైన తేమ అవసరం.",
    
    // Disease Analysis
    diseaseAnalysis: "వ్యాధి విశ్లేషణ",
    diseaseAnalysisSubtitle: "AI-ఆధారిత మొక్క ఆరోగ్య మదింపు",
    detectionResults: "గుర్తింపు ఫలితాలు",
    identifiedCondition: "గుర్తించబడిన పరిస్థితి",
    diseaseFungalInfection: "వ్యాధి - ఫంగల్ ఇన్ఫెక్షన్",
    confidenceLevel: "నమ్మకం స్థాయి",
    highConfidenceDetection: "అధిక నమ్మకం గుర్తింపు",
    treatmentOptions: "చికిత్స ఎంపికలు",
    organic: "🌿 సేంద్రీయ",
    chemical: "⚗️ రసాయన",
    organicTreatment: "సేంద్రీయ చికిత్స",
    organicTreatmentText: "వేప నూనె స్ప్రే, 5ml/L వారపు అప్లికేషన్. ఉదయం లేదా సాయంత్రం వర్తించండి.",
    benefits: "లాభాలు:",
    organicBenefits: "పర్యావరణానికి సురక్షితం, రసాయన అవశేషాలు లేవు, లాభకరమైన కీటకాలను కాపాడుతుంది",
    chemicalTreatment: "రసాయన చికిత్స",
    chemicalTreatmentText: "మాంకోజెబ్ ఫంగిసైడ్, 2g/L నీరు. ప్రతి 7-10 రోజులకు స్ప్రే చేయండి.",
    note: "గమనిక:",
    chemicalNote: "భద్రతా మార్గదర్శకాలను అనుసరించండి, రక్షణ పరికరాలను ఉపయోగించండి, పూర్వ-కోత అంతరాలను గమనించండి",
    preventionTips: "నివారణ చిట్కాలు",
    preventionText: "సోకిన ఆకులను వెంటనే తొలగించండి, పైన నీటిపారుదలను నివారించండి, గాలి ప్రసరణ కోసం సరైన మొక్కల అంతరం నిర్ధారించండి, వార్షిక పంటల మార్పిడి చేయండి.",
    actionPlan: "చర్య ప్రణాళిక",
    
    // Days and Dates
    friday: "శుక్రవారం",
    saturday: "శనివారం",
    sunday: "ఆదివారం",
    monday: "సోమవారం",
    tuesday: "మంగళవారం",
    wednesday: "బుధవారం",
    thursday: "గురువారం",
    sep6: "6 సెప్టెంబర్",
    sep7: "7 సెప్టెంబర్",
    
    // Units and Measurements
    acres: "ఎకరాలు",
    liters: "లీటర్లు",
    perDay: "రోజుకు",
    perWeek: "వారానికి",
    celsius: "సెల్సియస్",
    percentage: "శాతం",
    mm: "మిమీ",
    
    // Action Steps
    actionSteps: [
      "ఎంచుకున్న చికిత్సను వెంటనే వర్తించండి",
      "1-2 వారాల పాటు రోజువారీ మొక్కలను పర్యవేక్షించండి",
      "ప్రభావిత ఆకులను తొలగించి పారవేయండి",
      "డ్రైనేజీ మరియు గాలి ప్రసరణను మెరుగుపరచండి",
      "ఆరోగ్యకరమైన మొక్కలకు నివారణ స్ప్రేని పరిగణించండి"
    ]
  },

  gu: {
    // Navigation & Common
    welcome: "AgriSmart માં આપનું સ્વાગત છે! 👋",
    readyToOptimize: "આજે તમારી ખેતીને ઓપ્ટિમાઇઝ કરવા તૈયાર છો?",
    backToDashboard: "ડેશબોર્ડ પર પાછા જાવ",
    loading: "AI પ્રોસેસિંગ...",
    analyzing: "અદ્યતન અલ્ગોરિધમ્સ સાથે તમારા ડેટાનું વિશ્લેષણ",
    agriSmart: "AgriSmart",
    smartAssistant: "સ્માર્ટ સહાયક",

    // Dashboard Cards
    cropRecommendation: "પાક ભલામણ",
    cropDescription: "AI-સંચાલિત પાક પસંદગી અને નફા વિશ્લેષણ",
    waterManagement: "પાણી વ્યવસ્થાપન",
    waterDescription: "સ્માર્ટ સિંચાઈ શેડ્યૂલ અને ઓપ્ટિમાઇઝેશન",
    pestDetection: "કીટક શોધ",
    pestDescription: "ઇમેજ-આધારિત રોગ ઓળખ અને ઉપચાર",

    // Form Fields
    location: "સ્થાન",
    selectDistrict: "જિલ્લો પસંદ કરો",
    farmSize: "ખેતરનું કદ",
    enterSizeInAcres: "એકરમાં કદ દાખલ કરો",
    getAIRecommendations: "AI ભલામણો મેળવો",
    cropType: "પાકનો પ્રકાર",
    selectCrop: "પાક પસંદ કરો",
    growthStage: "વૃદ્ધિનો તબક્કો",
    selectStage: "તબક્કો પસંદ કરો",
    generateWaterSchedule: "પાણી શેડ્યૂલ જનરેટ કરો",
    plantImage: "છોડની છબી",
    captureOrUpload: "છબી કેપ્ચર અથવા અપલોડ કરો",
    supportedFormats: "JPG, PNG, WEBP સપોર્ટેડ",
    removeImage: "છબી દૂર કરો",
    analyzeWithAI: "AI સાથે વિશ્લેષણ કરો",
    uploadImageFirst: "પહેલા છબી અપલોડ કરો",
    pleaseUploadImage: "કૃપા કરીને પહેલા એક છબી અપલોડ કરો",
    
    // Crop Options
    wheat: "ઘઉં",
    rice: "ચોખા",
    mustard: "સરસવ",
    tomato: "ટમાટર",
    cotton: "કપાસ",
    
    // Growth Stages
    sowing: "વાવણી",
    vegetative: "વનસ્પતિ",
    flowering: "ફૂલ આવવું",
    maturity: "પરિપક્વતા",


    // Weather & Results
    currentWeather: "વર્તમાન હવામાન",
    temperature: "તાપમાન",
    humidity: "આર્દ્રતા",
    topRecommendations: "ટોચની ભલામણો",
    expectedProfit: "અપેક્ષિત નફો",
    marketPrice: "બજાર ભાવ",
    yield: "ઉપજ",
    bestROI: "તમારા પ્રદેશ માટે શ્રેષ્ઠ ROI પાક",
    highYieldPotential: "ઊંચી ઉપજ ક્ષમતા",
    stableReliable: "સ્થિર અને વિશ્વસનીય વિકલ્પ",
    soilType: "માટીનો પ્રકાર",
    rainfall: "વરસાદ",
    loamy: "ચિકણી માટી",


    // Results Pages
    cropAnalysisResults: "પાક વિશ્લેષણ પરિણામો",
    cropAnalysisSubtitle: "તમારા ખેતર માટે AI-સંચાલિત ભલામણો",
    farmOverview: "ખેતરનું અવલોકન",
    waterManagementPlan: "પાણી વ્યવસ્થાપન યોજના",
    cropInformation: "પાક માહિતી",
    waterRequirements: "પાણીની જરૂરિયાતો",
    currentStageNeed: "વર્તમાન તબક્કો જરૂરિયાત",
    totalFarmDaily: "કુલ ખેતર દૈનિક",
    weeklyRequirement: "સાપ્તાહિક જરૂરિયાત",
    weatherForecast: "4-દિવસની હવામાન પૂર્વાનુમાન",
    today: "આજે",
    tomorrow: "આવતીકાલ",
    smartIrrigationSchedule: "સ્માર્ટ સિંચાઈ શેડ્યૂલ",
    irrigate: "સિંચાઈ કરો",
    skipIrrigation: "સિંચાઈ છોડો",
    lightRainExpected: "હલકા વરસાદની અપેક્ષા",
    noRainForecast: "વરસાદનું પૂર્વાનુમાન નથી",
    rainExpected: "વરસાદની અપેક્ષા",
    smartTip: "સ્માર્ટ ટીપ",
    smartTipText: "માટીની ભેજનું સ્તર મોનિટર કરો અને વાસ્તવિક ખેતરની પરિસ્થિતિઓના આધારે સિંચાઈ સમાયોજિત કરો. વનસ્પતિ તબક્કામાં શ્રેષ્ઠ વૃદ્ધિ માટે સતત ભેજ જરૂરી છે.",
    

    // Disease Analysis
    diseaseAnalysis: "રોગ વિશ્લેષણ",
    diseaseAnalysisSubtitle: "AI-સંચાલિત છોડ આરોગ્ય મૂલ્યાંકન",
    detectionResults: "શોધ પરિણામો",
    identifiedCondition: "ઓળખાયેલી સ્થિતિ",
    diseaseFungalInfection: "રોગ - ફંગલ ચેપ",
    confidenceLevel: "વિશ્વાસ સ્તર",
    highConfidenceDetection: "ઊંચી વિશ્વાસ શોધ",
    treatmentOptions: "ઉપચાર વિકલ્પો",
    organic: "🌿 ઓર્ગેનિક",
    chemical: "⚗️ કેમિકલ",
    organicTreatment: "ઓર્ગેનિક ઉપચાર",
    organicTreatmentText: "નીમ તેલ સ્પ્રે, 5ml/L સાપ્તાહિક એપ્લિકેશન. સવારે અથવા સાંજે લાગુ કરો.",
    benefits: "ફાયદા:",
    organicBenefits: "પર્યાવરણ માટે સુરક્ષિત, કોઈ રાસાયણિક અવશેષો નથી, ફાયદાકારક કીટકો જાળવે છે",
    chemicalTreatment: "કેમિકલ ઉપચાર",
    chemicalTreatmentText: "મેન્કોઝેબ ફંગિસાઇડ, 2g/L પાણી. દર 7-10 દિવસે સ્પ્રે કરો.",
    note: "નોંધ:",
    chemicalNote: "સલામતી માર્ગદર્શિકાઓનું પાલન કરો, રક્ષણાત્મક ઉપકરણોનો ઉપયોગ કરો, પૂર્વ-કાપણી અંતરાલો જુઓ",
    preventionTips: "પ્રિવેન્શન ટીપ્સ",
    preventionText: "સંક્રમિત પાંદડાઓ તરત જ દૂર કરો, ઓવરહેડ સિંચાઈથી બચો, હવા પરિભ્રમણ માટે યોગ્ય છોડ અંતર સુનિશ્ચિત કરો, વાર્ષિક પાક ફેરબદલ કરો.",
    actionPlan: "ક્રિયા યોજના",
    

    // Days and Dates
    friday: "શુક્રવાર",
    saturday: "શનિવાર",
    sunday: "રવિવાર",
    monday: "સોમવાર",
    tuesday: "મંગળવાર",
    wednesday: "બુધવાર",
    thursday: "ગુરુવાર",
    sep6: "6 સપ્ટેમ્બર",
    sep7: "7 સप્ટેમ્બર",
    sep8: "8 સप્ટેમ્બર",
    sep9: "9 સप્ટેમ્બર",
    

    // Units and Measurements
    acres: "એકર",
    liters: "લિટર",
    perDay: "દિવસ દીઠ",
    perWeek: "સપ્તાહ દીઠ",
    celsius: "સેલ્સિયસ",
    percentage: "ટકા",
    mm: "મીમી",


    // Action Steps
    actionSteps: [
      "પસંદ કરેલ ઉપચાર તરત જ લાગુ કરો",
      "1-2 અઠવાડિયા માટે રોજ છોડની મોનિટરિંગ કરો",
      "પ્રભાવિત પાંદડાઓ દૂર કરો અને નિકાલ કરો",
      "ડ્રેનેજ અને હવા પરિભ્રમણ સુધારો",
      "સ્વસ્થ છોડ માટે નિવારક સ્પ્રે પર વિચાર કરો"
    ]
  },


  // Punjabi translations
  pa: {
    // Navigation & Common
    welcome: "AgriSmart ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ! 👋",
    readyToOptimize: "ਅੱਜ ਆਪਣੀ ਖੇਤੀ ਨੂੰ ਓਪਟੀਮਾਈਜ਼ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?",
    backToDashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    loading: "AI ਪ੍ਰੋਸੈਸਿੰਗ...",
    analyzing: "ਉਨ੍ਹਾਂਤ ਅਲਗੋਰਿਦਮਾਂ ਨਾਲ ਤੁਹਾਡੇ ਡੇਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ",
    agriSmart: "AgriSmart",
    smartAssistant: "ਸਮਾਰਟ ਅਸਿਸਟੈਂਟ",


    // Dashboard Cards
    cropRecommendation: "ਫਸਲ ਸਿਫਾਰਸ਼",
    cropDescription: "AI-ਸੰਚਾਲਿਤ ਫਸਲ ਚੋਣ ਅਤੇ ਲਾਭ ਵਿਸ਼ਲੇਸ਼ਣ",
    waterManagement: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ",
    waterDescription: "ਸਮਾਰਟ ਸਿੰਚਾਈ ਸ਼ੈਡਿਊਲ ਅਤੇ ਓਪਟੀਮਾਈਜ਼ੇਸ਼ਨ",
    pestDetection: "ਕੀੜੇ ਦੀ ਪਛਾਣ",
    pestDescription: "ਚਿੱਤਰ-ਅਧਾਰਤ ਬਿਮਾਰੀ ਪਛਾਣ ਅਤੇ ਇਲਾਜ",
    

    // Form Fields
    location: "ਟਿਕਾਣਾ",
    selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    farmSize: "ਖੇਤ ਦਾ ਆਕਾਰ",
    enterSizeInAcres: "ਏਕੜ ਵਿੱਚ ਆਕਾਰ ਦਾਖਲ ਕਰੋ",
    getAIRecommendations: "AI ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    cropType: "ਫਸਲ ਦੀ ਕਿਸਮ",
    selectCrop: "ਫਸਲ ਚੁਣੋ",
    growthStage: "ਵਿਕਾਸ ਦਾ ਪੜਾਅ",
    selectStage: "ਪੜਾਅ ਚੁਣੋ",
    generateWaterSchedule: "ਪਾਣੀ ਦਾ ਸ਼ੈਡਿਊਲ ਬਣਾਓ",
    plantImage: "ਪੌਦੇ ਦੀ ਤਸਵੀਰ",
    captureOrUpload: "ਤਸਵੀਰ ਕੈਪਚਰ ਜਾਂ ਅਪਲੋਡ ਕਰੋ",
    supportedFormats: "JPG, PNG, WEBP ਸਮਰਥਿਤ",
    removeImage: "ਤਸਵੀਰ ਹਟਾਓ",
    analyzeWithAI: "AI ਨਾਲ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    uploadImageFirst: "ਪਹਿਲਾਂ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    pleaseUploadImage: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਇੱਕ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    
    // Crop Options
    wheat: "ਕਣਕ",
    rice: "ਚਾਵਲ",
    mustard: "ਸਰ੍ਹੋਂ",
    tomato: "ਟਮਾਟਰ",
    cotton: "ਕਪਾਹ",
    

    // Growth Stages
    sowing: "ਬਿਜਾਈ",
    vegetative: "ਵਨਸਪਤੀ",
    flowering: "ਫੁੱਲ ਆਉਣਾ",
    maturity: "ਪਰਿਪੱਕਤਾ",
    
    // Weather & Results
    currentWeather: "ਮੌਜੂਦਾ ਮੌਸਮ",
    temperature: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    topRecommendations: "ਚੋਟੀ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ",
    expectedProfit: "ਅਨੁਮਾਨਿਤ ਲਾਭ",
    marketPrice: "ਬਾਜ਼ਾਰ ਮੁੱਲ",
    yield: "ਪੈਦਾਵਾਰ",
    bestROI: "ਤੁਹਾਡੇ ਖੇਤਰ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ROI ਫਸਲ",
    highYieldPotential: "ਉੱਚ ਪੈਦਾਵਾਰ ਸਮਰੱਥਾ",
    stableReliable: "ਸਥਿਰ ਅਤੇ ਭਰੋਸੇਯੋਗ ਵਿਕਲਪ",
    soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    rainfall: "ਬਾਰਿਸ਼",
    loamy: "ਦੋਮਟ",
    
    // Results Pages
    cropAnalysisResults: "ਫਸਲ ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ",
    cropAnalysisSubtitle: "ਤੁਹਾਡੇ ਖੇਤ ਲਈ AI-ਸੰਚਾਲਿਤ ਸਿਫਾਰਸ਼ਾਂ",
    farmOverview: "ਖੇਤ ਦਾ ਸੰਖੇਪ ਜਾਣਕਾਰੀ",
    waterManagementPlan: "ਪਾਣੀ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ",
    cropInformation: "ਫਸਲ ਜਾਣਕਾਰੀ",
    waterRequirements: "ਪਾਣੀ ਦੀਆਂ ਲੋੜਾਂ",
    currentStageNeed: "ਮੌਜੂਦਾ ਪੜਾਅ ਲੋੜ",
    totalFarmDaily: "ਕੁਲ ਖੇਤ ਰੋਜ਼ਾਨਾ",
    weeklyRequirement: "ਹਫਤਾਵਾਰੀ ਲੋੜ",
    weatherForecast: "4-ਦਿਨ ਦਾ ਮੌਸਮ ਪੂਰਵਾਨੁਮਾਨ",
    today: "ਅੱਜ",
    tomorrow: "ਕੱਲ੍ਹ",
    smartIrrigationSchedule: "ਸਮਾਰਟ ਸਿੰਚਾਈ ਸ਼ੈਡਿਊਲ",
    irrigate: "ਸਿੰਚਾਈ ਕਰੋ",
    skipIrrigation: "ਸਿੰਚਾਈ ਛੱਡੋ",
    lightRainExpected: "ਹਲਕੀ ਬਾਰਿਸ਼ ਦੀ ਉਮੀਦ",
    noRainForecast: "ਬਾਰਿਸ਼ ਦਾ ਪੂਰਵਾਨੁਮਾਨ ਨਹੀਂ",
    rainExpected: "ਬਾਰਿਸ਼ ਦੀ ਉਮੀਦ",
    smartTip: "ਸਮਾਰਟ ਸਲਾਹ",
    smartTipText: "ਮਿੱਟੀ ਦੀ ਨਮੀ ਦੇ ਪੱਧਰਾਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਅਸਲ ਖੇਤ ਦੀਆਂ ਹਾਲਤਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸਿੰਚਾਈ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ। ਵਨਸਪਤੀ ਪੜਾਅ ਲਈ ਉੱਤਮ ਵਿਕਾਸ ਲਈ ਲਗਾਤਾਰ ਨਮੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
    

    // Disease Analysis
    diseaseAnalysis: "ਬਿਮਾਰੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    diseaseAnalysisSubtitle: "AI-ਸੰਚਾਲਿਤ ਪੌਦਾ ਸਿਹਤ ਮੁਲਾਂਕਣ",
    detectionResults: "ਖੋਜ ਨਤੀਜੇ",
    identifiedCondition: "ਪਛਾਣੀ ਗਈ ਸਥਿਤੀ",
    diseaseFungalInfection: "ਬਿਮਾਰੀ - ਫੰਗਲ ਇਨਫੈਕਸ਼ਨ",
    confidenceLevel: "ਵਿਸ਼ਵਾਸ ਪੱਧਰ",
    highConfidenceDetection: "ਉੱਚ ਵਿਸ਼ਵਾਸ ਖੋਜ",
    treatmentOptions: "ਇਲਾਜ ਵਿਕਲਪ",
    organic: "🌿 ਆਰਗੈਨਿਕ",
    chemical: "⚗️ ਕੈਮੀਕਲ",
    organicTreatment: "ਆਰਗੈਨਿਕ ਇਲਾਜ",
    organicTreatmentText: "ਨੀਮ ਤੇਲ ਸਪਰੇ, 5ml/L ਹਫਤਾਵਾਰੀ ਐਪਲੀਕੇਸ਼ਨ। ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਲਗਾਓ।",
    benefits: "ਫਾਇਦੇ:",
    organicBenefits: "ਵਾਤਾਵਰਣ ਲਈ ਸੁਰੱਖਿਅਤ, ਕੋਈ ਰਸਾਇਣਕ ਅਵਸ਼ੇਸ਼ ਨਹੀਂ, ਲਾਭਕਾਰੀ ਕੀੜੇ ਬਚਾਉਂਦਾ ਹੈ",
    chemicalTreatment: "ਕੈਮੀਕਲ ਇਲਾਜ",
    organicTreatmentText: "ਨੀਮ ਤੇਲ ਸਪਰੇ, 5ml/L ਹਫਤਾਵਾਰੀ ਐਪਲੀਕੇਸ਼ਨ। ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਲਗਾਓ।",
    benefits: "ਫਾਇਦੇ:",
    organicBenefits: "ਵਾਤਾਵਰਣ ਲਈ ਸੁਰੱਖਿਅਤ, ਕੋਈ ਰਸਾਇਣਕ ਅਵਸ਼ੇਸ਼ ਨਹੀਂ, ਲਾਭਕਾਰੀ ਕੀੜੇ ਬਚਾਉਂਦਾ ਹੈ",
    chemicalTreatment: "ਕੈਮੀਕਲ ਇਲਾਜ",
    chemicalTreatmentText: "ਮੈਨਕੋਜ਼ੇਬ ਫੰਗੀਸਾਈਡ, 2g/L ਪਾਣੀ। ਹਰ 7-10 ਦਿਨਾਂ ਵਿੱਚ ਸਪਰੇ ਕਰੋ।",
    note: "ਨੋਟ:",
    chemicalNote: "ਸੁਰੱਖਿਆ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ, ਸੁਰੱਖਿਆ ਉਪਕਰਣ ਵਰਤੋਂ, ਕਟਾਈ-ਪੂਰਵ ਅੰਤਰਾਲਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ",
    preventionTips: "ਰੋਕਥਾਮ ਸਲਾਹ",
    preventionText: "ਸੰਕਰਮਿਤ ਪੱਤੇ ਤੁਰੰਤ ਹਟਾਓ, ਓਵਰਹੈੱਡ ਸਿੰਚਾਈ ਤੋਂ ਬਚੋ, ਹਵਾ ਸੰਚਾਰ ਲਈ ਢੁਕਵਾਂ ਪੌਦਾ ਦੂਰੀ ਯਕੀਨੀ ਬਣਾਓ, ਸਾਲਾਨਾ ਫਸਲ ਚੱਕਰ ਅਪਣਾਓ।",
    actionPlan: "ਕਾਰਵਾਈ ਯੋਜਨਾ",


     // Days and Dates
    friday: "ਸ਼ੁੱਕਰਵਾਰ",
    saturday: "ਸ਼ਨੀਵਾਰ",
    sunday: "ਐਤਵਾਰ",
    monday: "ਸੋਮਵਾਰ",
    tuesday: "ਮੰਗਲਵਾਰ",
    wednesday: "ਬੁੱਧਵਾਰ",
    thursday: "ਵੀਰਵਾਰ",
    sep6: "6 ਸਤੰਬਰ",
    sep7: "7 ਸਤੰਬਰ",
    sep8: "8 ਸਤੰਬਰ",
    sep9: "9 ਸਤੰਬਰ",
    

    // Units and Measurements
    acres: "ਏਕੜ",
    liters: "ਲੀਟਰ",
    perDay: "ਪ੍ਰਤੀ ਦਿਨ",
    perWeek: "ਪ੍ਰਤੀ ਹਫਤਾ",
    celsius: "ਸੈਲਸੀਅਸ",
    percentage: "ਪ੍ਰਤੀਸ਼ਤ",
    mm: "ਮਿਮੀ",


     // Action Steps
    actionSteps: [
      "ਚੁਣੇ ਗਏ ਇਲਾਜ ਨੂੰ ਤੁਰੰਤ ਲਾਗੂ ਕਰੋ",
      "1-2 ਹਫਤਿਆਂ ਲਈ ਰੋਜ਼ਾਨਾ ਪੌਦਿਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ",
      "ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਹਟਾਓ ਅਤੇ ਨਿਪਟਾਓ",
      "ਡਰੇਨੇਜ ਅਤੇ ਹਵਾ ਸੰਚਾਰ ਵਿੱਚ ਸੁਧਾਰ ਕਰੋ",
      "ਸਿਹਤਮੰਦ ਪੌਦਿਆਂ ਲਈ ਰੋਕਥਾਮ ਸਪਰੇ 'ਤੇ ਵਿਚਾਰ ਕਰੋ"
    ]
  },



  // Haryanvi translations
  bgc: {
    // Navigation & Common
    welcome: "AgriSmart में स्वागत है! 👋",
    readyToOptimize: "आज अपने खेती के ऑप्टिमाइज करे के तैयार हो?",
    backToDashboard: "डैशबोर्ड पर वापस जाओ",
    loading: "AI प्रोसेसिंग...",
    analyzing: "एडवांस्ड एल्गोरिदम से आपके डेटा का विश्लेषण",
    agriSmart: "AgriSmart",
    smartAssistant: "स्मार्ट असिस्टेंट",

    // Dashboard Cards
    cropRecommendation: "फसल सिफारिश",
    cropDescription: "AI-चलित फसल चयन और मुनाफा विश्लेषण",
    waterManagement: "पानी प्रबंधन",
    waterDescription: "स्मार्ट सिंचाई शेड्यूल और ऑप्टिमाइजेशन",
    pestDetection: "कीड़ा पहचान",
    pestDescription: "तस्वीर-आधारित बीमारी पहचान और इलाज",
    

    // Form Fields
    location: "जगह",
    selectDistrict: "जिला चुनो",
    farmSize: "खेत का आकार",
    enterSizeInAcres: "एकड़ में आकार डालो",
    getAIRecommendations: "AI सिफारिशें पाओ",
    cropType: "फसल का प्रकार",
    selectCrop: "फसल चुनो",
    growthStage: "विकास का चरण",
    selectStage: "चरण चुनो",
    generateWaterSchedule: "पानी का शेड्यूल बनाओ",
    plantImage: "पौधे की तस्वीर",
    captureOrUpload: "तस्वीर कैप्चर या अपलोड करो",
    supportedFormats: "JPG, PNG, WEBP सपोर्टेड",
    removeImage: "तस्वीर हटाओ",
    analyzeWithAI: "AI से विश्लेषण करो",
     uploadImageFirst: "पहले तस्वीर अपलोड करो",
    pleaseUploadImage: "पहले एक तस्वीर अपलोड करो",
    
    // Crop Options
    wheat: "गेहूं",
    rice: "धान",
    mustard: "सरसों",
    tomato: "टमाटर",
    cotton: "कपास",
    
    // Growth Stages
    sowing: "बिजाई",
    vegetative: "वनस्पति",
    flowering: "फूल आना",
    maturity: "पक्कापन",

    // Weather & Results
    currentWeather: "मौजूदा मौसम",
    temperature: "तापमान",
    humidity: "नमी",
    topRecommendations: "टॉप सिफारिशें",
    expectedProfit: "अनुमानित मुनाफा",
    marketPrice: "बाजार भाव",
    yield: "पैदावार",
    bestROI: "तुम्हारे इलाके के लिए सबसे अच्छा ROI फसल",
    highYieldPotential: "ऊंची पैदावार क्षमता",
    stableReliable: "स्थिर और भरोसेमंद विकल्प",
    soilType: "मिट्टी का प्रकार",
    rainfall: "बारिश",
    loamy: "दोमट",

    // Results Pages
    cropAnalysisResults: "फसल विश्लेषण नतीजे",
    cropAnalysisSubtitle: "तुम्हारे खेत के लिए AI-चलित सिफारिशें",
    farmOverview: "खेत का ओवरव्यू",
    waterManagementPlan: "पानी प्रबंधन योजना",
    cropInformation: "फसल जानकारी",
    waterRequirements: "पानी की जरूरतें",
    currentStageNeed: "मौजूदा चरण जरूरत",
    totalFarmDaily: "कुल खेत रोजाना",
    weeklyRequirement: "हफ्तावार जरूरत",
    weatherForecast: "4-दिन का मौसम पूर्वानुमान",
    today: "आज",
    tomorrow: "कल",
    smartIrrigationSchedule: "स्मार्ट सिंचाई शेड्यूल",
    irrigate: "सिंचाई करो",
    skipIrrigation: "सिंचाई छोड़ो",
    lightRainExpected: "हल्की बारिश की उम्मीद",
    noRainForecast: "बारिश का पूर्वानुमान नहीं",
    rainExpected: "बारिश की उम्मीद",
    smartTip: "स्मार्ट टिप",
    smartTipText: "मिट्टी की नमी के स्तर की निगरानी करो और असल खेत की हालत के आधार पर सिंचाई समायोजित करो। वनस्पति चरण में बेहतर विकास के लिए लगातार नमी जरूरी है।",
    
    // Disease Analysis
    diseaseAnalysis: "बीमारी विश्लेषण",
    diseaseAnalysisSubtitle: "AI-चलित पौधा स्वास्थ्य मूल्यांकन",
    detectionResults: "खोज नतीजे",
    identifiedCondition: "पहचानी गई हालत",
    diseaseFungalInfection: "बीमारी - फंगल इन्फेक्शन",
    confidenceLevel: "विश्वास स्तर",
    highConfidenceDetection: "ऊंचा विश्वास खोज",
    treatmentOptions: "इलाज विकल्प",
    organic: "🌿 ऑर्गेनिक",
    chemical: "⚗️ केमिकल",
    organicTreatment: "ऑर्गेनिक इलाज",
    organicTreatmentText: "नीम तेल स्प्रे, 5ml/L हफ्तावार आवेदन। सुबह या शाम को लगाओ।",
    benefits: "फायदे:",
    organicBenefits: "पर्यावरण के लिए सुरक्षित, कोई रासायनिक अवशेष नहीं, फायदेमंद कीड़े बचाता है",
    chemicalTreatment: "केमिकल इलाज",
    chemicalTreatmentText: "मैन्कोजेब फंगीसाइड, 2g/L पानी। हर 7-10 दिन में स्प्रे करो।",
    note: "नोट:",
    chemicalNote: "सुरक्षा दिशानिर्देशों का पालन करो, सुरक्षात्मक उपकरण इस्तेमाल करो, कटाई-पूर्व अंतराल देखो",
    preventionTips: "रोकथाम टिप्स",
    preventionText: "संक्रमित पत्तियां तुरंत हटाओ, ऊपरी सिंचाई से बचो, हवा संचार के लिए उचित पौधा दूरी सुनिश्चित करो, सालाना फसल चक्र अपनाओ।",
    actionPlan: "कार्य योजना",
    

    // Days and Dates
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    sep6: "6 सितंबर",
    sep7: "7 सितंबर",
    sep8: "8 सितंबर",
    sep9: "9 सितंबर",
    

    // Units and Measurements
    acres: "एकड़",
    liters: "लीटर",
    perDay: "प्रति दिन",
    perWeek: "प्रति हफ्ता",
    celsius: "सेल्सियस",
    percentage: "प्रतिशत",
    mm: "मिमी",

    // Action Steps
    actionSteps: [
      "चुने गए इलाज को तुरंत लागू करो",
      "1-2 हफ्तों के लिए रोज पौधों की निगरानी करो",
      "प्रभावित पत्तियां हटाओ और निपटाओ",
      "ड्रेनेज और हवा संचार सुधारो",
      "स्वस्थ पौधों के लिए निवारक स्प्रे पर विचार करो"
    ]
  },


  // Odia translations
  or: {
    // Navigation & Common
    welcome: "AgriSmart କୁ ସ୍ୱାଗତ! 👋",
    readyToOptimize: "ଆଜି ଆପଣଙ୍କର କୃଷିକୁ ଅପ୍ଟିମାଇଜ୍ କରିବାକୁ ପ୍ରସ୍ତୁତ ଅଛନ୍ତି କି?",
    backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    loading: "AI ପ୍ରୋସେସିଂ...",
    analyzing: "ଉନ୍ନତ ଆଲଗୋରିଦମ୍ ସହିତ ଆପଣଙ୍କର ଡାଟା ବିଶ୍ଳେଷଣ",
    agriSmart: "AgriSmart",
    smartAssistant: "ସ୍ମାର୍ଟ ଆସିଷ୍ଟାଣ୍ଟ",


    // Dashboard Cards
    cropRecommendation: "ଫସଲ ପରାମର୍ଶ",
    cropDescription: "AI-ଚାଳିତ ଫସଲ ଚୟନ ଏବଂ ଲାଭ ବିଶ୍ଳେଷଣ",
    waterManagement: "ଜଳ ପରିଚାଳନା",
    waterDescription: "ସ୍ମାର୍ଟ ସିଞ୍ଚାଇ କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ଅପ୍ଟିମାଇଜେସନ୍",
    pestDetection: "କୀଟ ଚିହ୍ନଟ",
    pestDescription: "ଛବି-ଆଧାରିତ ରୋଗ ଚିହ୍ନଟ ଏବଂ ଚିକିତ୍ସା",
    

    // Form Fields
    location: "ଅବସ୍ଥାନ",
    selectDistrict: "ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ",
    farmSize: "ଚାଷ ଜମିର ଆକାର",
    enterSizeInAcres: "ଏକରରେ ଆକାର ପ୍ରବେଶ କରନ୍ତୁ",
    getAIRecommendations: "AI ପରାମର୍ଶ ପ୍ରାପ୍ତ କରନ୍ତୁ",
    cropType: "ଫସଲ ପ୍ରକାର",
    selectCrop: "ଫସଲ ଚୟନ କରନ୍ତୁ",
    growthStage: "ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ",
    selectStage: "ପର୍ଯ୍ୟାୟ ଚୟନ କରନ୍ତୁ",
    generateWaterSchedule: "ଜଳ କାର୍ଯ୍ୟକ୍ରମ ସୃଷ୍ଟି କରନ୍ତୁ",
    plantImage: "ଗଛର ଛବି",
    captureOrUpload: "ଛବି ଧରନ୍ତୁ କିମ୍ବା ଅପଲୋଡ୍ କରନ୍ତୁ",
    supportedFormats: "JPG, PNG, WEBP ସମର୍ଥିତ",
    removeImage: "ଛବି ଅପସାରଣ କରନ୍ତୁ",
    analyzeWithAI: "AI ସହିତ ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
    uploadImageFirst: "ପ୍ରଥମେ ଛବି ଅପଲୋଡ୍ କରନ୍ତୁ",
    pleaseUploadImage: "ଦୟାକରି ପ୍ରଥମେ ଏକ ଛବି ଅପଲୋଡ୍ କରନ୍ତୁ",
    
    // Crop Options
    wheat: "ଗହମ",
    rice: "ଚାଉଳ",
    mustard: "ସରଷୀ",
    tomato: "ଟମାଟୋ",
    cotton: "କପା",

    // Growth Stages
    sowing: "ବୁଣାବୁଣି",
    vegetative: "ସବ୍ଜୀ",
    flowering: "ଫୁଲ ଧରିବା",
    maturity: "ପରିପକ୍ୱତା",
    
    // Weather & Results
    currentWeather: "ବର୍ତ୍ତମାନ ପାଗ",
    temperature: "ତାପମାତ୍ରା",
    humidity: "ଆର୍ଦ୍ରତା",
    topRecommendations: "ଶୀର୍ଷ ପରାମର୍ଶ",
    expectedProfit: "ଆଶାକୃତ ଲାଭ",
    marketPrice: "ବଜାର ମୂଲ୍ୟ",
    yield: "ଫସଲ",
    bestROI: "ଆପଣଙ୍କ ଅଞ୍ଚଳ ପାଇଁ ସର୍ବୋତ୍ତମ ROI ଫସଲ",
    highYieldPotential: "ଉଚ୍ଚ ଫସଲ ସମ୍ଭାବନା",
    stableReliable: "ସ୍ଥିର ଏବଂ ବିଶ୍ୱସନୀୟ ବିକଳ୍ପ",
    soilType: "ମାଟି ପ୍ରକାର",
    rainfall: "ବର୍ଷା",
    loamy: "ଦୋଆଁଶ",
    
    // Results Pages
    cropAnalysisResults: "ଫସଲ ବିଶ୍ଳେଷଣ ଫଳାଫଳ",
    cropAnalysisSubtitle: "ଆପଣଙ୍କ ଚାଷ ଜମି ପାଇଁ AI-ଚାଳିତ ପରାମର୍ଶ",
    farmOverview: "ଚାଷ ଜମି ସମୀକ୍ଷା",
    waterManagementPlan: "ଜଳ ପରିଚାଳନା ଯୋଜନା",
    cropInformation: "ଫସଲ ସୂଚନା",
    waterRequirements: "ଜଳ ଆବଶ୍ୟକତା",
    currentStageNeed: "ବର୍ତ୍ତମାନ ପର୍ଯ୍ୟାୟ ଆବଶ୍ୟକତା",
    totalFarmDaily: "ମୋଟ ଚାଷ ଜମି ଦୈନିକ",
    weeklyRequirement: "ସାପ୍ତାହିକ ଆବଶ୍ୟକତା",
    weatherForecast: "4-ଦିନିଆ ପାଗ ପୂର୍ବାନୁମାନ",
     today: "ଆଜି",
    tomorrow: "ଆସନ୍ତାକାଲି",
    smartIrrigationSchedule: "ସ୍ମାର୍ଟ ସିଞ୍ଚାଇ କାର୍ଯ୍ୟକ୍ରମ",
    irrigate: "ସିଞ୍ଚାଇ କରନ୍ତୁ",
    skipIrrigation: "ସିଞ୍ଚାଇ ଛାଡ଼ନ୍ତୁ",
    lightRainExpected: "ହାଲୁକା ବର୍ଷା ଆଶା",
    noRainForecast: "ବର୍ଷା ପୂର୍ବାନୁମାନ ନାହିଁ",
    rainExpected: "ବର୍ଷା ଆଶା",
    smartTip: "ସ୍ମାର୍ଟ ଟିପ୍",
    smartTipText: "ମାଟିର ଆର୍ଦ୍ରତା ସ୍ତର ମନିଟର୍ କରନ୍ତୁ ଏବଂ ପ୍ରକୃତ ଚାଷ ଜମି ଅବସ୍ଥା ଉପରେ ଆଧାର କରି ସିଞ୍ଚାଇ ସଂଯୋଜନ କରନ୍ତୁ। ସବ୍ଜୀ ପର୍ଯ୍ୟାୟ ପାଇଁ ଉତ୍କୃଷ୍ଟ ବୃଦ୍ଧି ପାଇଁ ସ୍ଥିର ଆର୍ଦ୍ରତା ଆବଶ୍ୟକ।",
    

    // Disease Analysis
    diseaseAnalysis: "ରୋଗ ବିଶ୍ଳେଷଣ",
    diseaseAnalysisSubtitle: "AI-ଚାଳିତ ଗଛ ସ୍ୱାସ୍ଥ୍ୟ ମୂଲ୍ୟାଙ୍କନ",
    detectionResults: "ଚିହ୍ନଟ ଫଳାଫଳ",
    identifiedCondition: "ଚିହ୍ନଟ କରାଯାଇଥିବା ଅବସ୍ଥା",
    diseaseFungalInfection: "ରୋଗ - ଫଙ୍ଗାଲ୍ ସଂକ୍ରମଣ",
    confidenceLevel: "ଆତ୍ମବିଶ୍ୱାସ ସ୍ତର",
    highConfidenceDetection: "ଉଚ୍ଚ ଆତ୍ମବିଶ୍ୱାସ ଚିହ୍ନଟ",
    treatmentOptions: "ଚିକିତ୍ସା ବିକଳ୍ପ",
    organic: "🌿 ଜୈବିକ",
    chemical: "⚗️ ରାସାୟନିକ",
    organicTreatment: "ଜୈବିକ ଚିକିତ୍ସା",
    organicTreatmentText: "ନିମ୍ ତେଲ ସ୍ପ୍ରେ, 5ml/L ସାପ୍ତାହିକ ପ୍ରୟୋଗ। ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟାରେ ପ୍ରୟୋଗ କରନ୍ତୁ।",
    benefits: "ସୁବିଧା:",
    organicBenefits: "ପରିବେଶ ପାଇଁ ସୁରକ୍ଷିତ, କୌଣସି ରାସାୟନିକ ଅବଶେଷ ନାହିଁ, ଉପକାରୀ କୀଟ ରକ୍ଷା କରେ",
    chemicalTreatment: "ରାସାୟନିକ ଚିକିତ୍ସା",
    chemicalTreatmentText: "ମ୍ୟାଙ୍କୋଜେବ୍ ଫଙ୍ଗିସାଇଡ୍, 2g/L ପାଣି। ପ୍ରତ୍ୟେକ 7-10 ଦିନରେ ସ୍ପ୍ରେ କରନ୍ତୁ।",
    note: "ଟିପ୍ପଣୀ:",
    chemicalNote: "ସୁରକ୍ଷା ଦିଗନିର୍ଦେଶ ଅନୁସରଣ କରନ୍ତୁ, ସୁରକ୍ଷାତ୍ମକ ଉପକରଣ ବ୍ୟବହାର କରନ୍ତୁ, ଫସଲ-ପୂର୍ବ ବିରତି ମାନନ୍ତୁ",
    preventionTips: "ପ୍ରତିଷେଧ ଟିପ୍ସ",
    preventionText: "ସଂକ୍ରମିତ ପତ୍ର ତୁରନ୍ତ ଅପସାରଣ କରନ୍ତୁ, ଓଭରହେଡ୍ ସିଞ୍ଚାଇ ଏଡ଼ାନ୍ତୁ, ବାୟୁ ପରିଚଳନ ପାଇଁ ଉପଯୁକ୍ତ ଗଛ ଦୂରତା ନିଶ୍ଚିତ କରନ୍ତୁ, ବାର୍ଷିକ ଫସଲ ଆବର୍ତ୍ତନ କରନ୍ତୁ।",
    actionPlan: "କାର୍ଯ୍ୟ ଯୋଜନା",


    // Days and Dates
    friday: "ଶୁକ୍ରବାର",
    saturday: "ଶନିବାର",
    sunday: "ରବିବାର",
    monday: "ସୋମବାର",
    tuesday: "ମଙ୍ଗଳବାର",
    wednesday: "ବୁଧବାର",
    thursday: "ଗୁରୁବାର",
    sep6: "6 ସେପ୍ଟେମ୍ବର",
    sep7: "7 ସେପ୍ଟେମ୍ବର",
    sep8: "8 ସେପ୍ଟେମ୍ବର",
    sep9: "9 ସେପ୍ଟେମ୍ବର",

    // Units and Measurements
    acres: "ଏକର",
    liters: "ଲିଟର",
    perDay: "ପ୍ରତିଦିନ",
    perWeek: "ପ୍ରତିସପ୍ତାହ",
    celsius: "ସେଲ୍ସିଅସ",
    percentage: "ପ୍ରତିଶତ",
    mm: "ମିମି",


    // Action Steps
    actionSteps: [
      "ଚୟନ କରାଯାଇଥିବା ଚିକିତ୍ସା ତୁରନ୍ତ ପ୍ରୟୋଗ କରନ୍ତୁ",
      "1-2 ସପ୍ତାହ ପାଇଁ ଦୈନିକ ଗଛ ମନିଟର୍ କରନ୍ତୁ",
      "ପ୍ରଭାବିତ ପତ୍ର ଅପସାରଣ ଏବଂ ବିସର୍ଜନ କରନ୍ତୁ",
      "ଡ୍ରେନେଜ୍ ଏବଂ ବାୟୁ ପରିଚଳନ ଉନ୍ନତ କରନ୍ତୁ",
      "ସୁସ୍ଥ ଗଛ ପାଇଁ ପ୍ରତିଷେଧକ ସ୍ପ୍ରେ ବିଚାର କରନ୍ତୁ"
    ]
  }
};


  // Note: You would need to add similar comprehensive translations for all other languages
  // (bn, ta, gu, mr, kn, ml, pa, or, as) following the same pattern


// Supported languages with their codes
export const SUPPORTED_LANGUAGES = {
  en: { name: "English", flag: "🇺🇸", code: "en" },
  hi: { name: "हिन्दी", flag: "🇮🇳", code: "hi" },
  te: { name: "తెలుగు", flag: "🇮🇳", code: "te" },
  bn: { name: "বাংলা", flag: "🇮🇳", code: "bn" },
  ta: { name: "தமிழ்", flag: "🇮🇳", code: "ta" },
  gu: { name: "ગુજરાતી", flag: "🇮🇳", code: "gu" },
  mr: { name: "मराठी", flag: "🇮🇳", code: "mr" },
  kn: { name: "ಕನ್ನಡ", flag: "🇮🇳", code: "kn" },
  ml: { name: "മലയാളം", flag: "🇮🇳", code: "ml" },
  pa: { name: "ਪੰਜਾਬੀ", flag: "🇮🇳", code: "pa" },
  or: { name: "ଓଡ଼ିଆ", flag: "🇮🇳", code: "or" },
  as: { name: "অসমীয়া", flag: "🇮🇳", code: "as" },
};

// Enhanced DEFAULT_TEXT with all possible text content
export const DEFAULT_TEXT = {
  // Navigation & Common
  welcome: "Welcome to AgriSmart! 👋",
  readyToOptimize: "Ready to optimize your farming today?",
  backToDashboard: "Back to Dashboard",
  loading: "AI Processing...",
  analyzing: "Analyzing your data with advanced algorithms",
  agriSmart: "AgriSmart",
  smartAssistant: "Smart Assistant",

  // Dashboard Cards
  cropRecommendation: "Crop Recommendation",
  cropDescription: "AI-powered crop selection & profit analysis",
  waterManagement: "Water Management",
  waterDescription: "Smart irrigation scheduling & optimization",
  pestDetection: "Pest Detection",
  pestDescription: "Image-based disease identification & treatment",

  // Form Fields
  location: "Location",
  selectDistrict: "Select District",
  farmSize: "Farm Size",
  enterSizeInAcres: "Enter size in acres",
  getAIRecommendations: "Get AI Recommendations",
  cropType: "Crop Type",
  selectCrop: "Select Crop",
  growthStage: "Growth Stage",
  selectStage: "Select Stage",
  generateWaterSchedule: "Generate Water Schedule",
  plantImage: "Plant Image",
  captureOrUpload: "Capture or Upload Image",
  supportedFormats: "JPG, PNG, WEBP supported",
  removeImage: "Remove Image",
  analyzeWithAI: "Analyze with AI",
  uploadImageFirst: "Upload Image First",
  pleaseUploadImage: "Please upload an image first",

  // Crop Options
  wheat: "Wheat",
  rice: "Rice",
  mustard: "Mustard",
  tomato: "Tomato",
  cotton: "Cotton",

  // Growth Stages
  sowing: "Sowing",
  vegetative: "Vegetative",
  flowering: "Flowering",
  maturity: "Maturity",

  // Weather & Results
  currentWeather: "Current Weather",
  temperature: "Temperature",
  humidity: "Humidity",
  topRecommendations: "Top Recommendations",
  expectedProfit: "Expected Profit",
  marketPrice: "Market Price",
  yield: "Yield",
  bestROI: "Best ROI crop for your region",
  highYieldPotential: "High yield potential",
  stableReliable: "Stable & reliable option",
  soilType: "Soil Type",
  rainfall: "Rainfall",
  loamy: "Loamy",

  // Results Pages
  cropAnalysisResults: "Crop Analysis Results",
  cropAnalysisSubtitle: "AI-powered recommendations for your farm",
  farmOverview: "Farm Overview",
  waterManagementPlan: "Water Management Plan",
  cropInformation: "Crop Information",
  waterRequirements: "Water Requirements",
  currentStageNeed: "Current Stage Need",
  totalFarmDaily: "Total Farm Daily",
  weeklyRequirement: "Weekly Requirement",
  weatherForecast: "4-Day Weather Forecast",
  today: "Today",
  tomorrow: "Tomorrow",
  smartIrrigationSchedule: "Smart Irrigation Schedule",
  irrigate: "Irrigate",
  skipIrrigation: "Skip irrigation",
  lightRainExpected: "Light rain expected",
  noRainForecast: "No rain forecast",
  rainExpected: "Rain expected",
  smartTip: "Smart Tip",
  smartTipText: "Monitor soil moisture levels and adjust irrigation based on actual field conditions. The vegetative stage requires consistent moisture for optimal growth.",

  // Disease Analysis
  diseaseAnalysis: "Disease Analysis",
  diseaseAnalysisSubtitle: "AI-powered plant health assessment",
  detectionResults: "Detection Results",
  identifiedCondition: "Identified Condition",
  diseaseFungalInfection: "Disease - Fungal Infection",
  confidenceLevel: "Confidence Level",
  highConfidenceDetection: "High confidence detection",
  treatmentOptions: "Treatment Options",
  organic: "🌿 Organic",
  chemical: "⚗️ Chemical",
  organicTreatment: "Organic Treatment",
  organicTreatmentText: "Neem oil spray, 5ml/L weekly application. Apply in early morning or evening.",
  benefits: "Benefits:",
  organicBenefits: "Safe for environment, no chemical residues, maintains beneficial insects",
  chemicalTreatment: "Chemical Treatment",
  chemicalTreatmentText: "Mancozeb fungicide, 2g/L water. Spray every 7-10 days.",
  note: "Note:",
  chemicalNote: "Follow safety guidelines, use protective equipment, observe pre-harvest intervals",
  preventionTips: "Prevention Tips",
  preventionText: "Remove infected leaves immediately, avoid overhead irrigation, ensure proper plant spacing for air circulation, rotate crops annually.",
  actionPlan: "Action Plan",

  // Days and Dates
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  sep6: "Sep 6",
  sep7: "Sep 7",
  sep8: "Sep 8",
  sep9: "Sep 9",

  // Locations
  hisarHaryana: "Hisar, Haryana",
  karnalHaryana: "Karnal, Haryana",
  ludhianaPunjab: "Ludhiana, Punjab",
  jaipurRajasthan: "Jaipur, Rajasthan",

  // Disease Names
  tomatoEarlyBlight: "Tomato Early Blight",

  // Units and Measurements
  acres: "acres",
  liters: "liters",
  perDay: "per day",
  perWeek: "per week",
  celsius: "Celsius",
  percentage: "percentage",
  mm: "mm",

  // Action Steps
  actionSteps: [
    "Apply selected treatment immediately",
    "Monitor plants daily for 1-2 weeks",
    "Remove and dispose of affected leaves",
    "Improve drainage and air circulation",
    "Consider preventive spraying for healthy plants",
  ],

  // Additional common phrases
  selectOption: "Select Option",
  noDataAvailable: "No data available",
  error: "Error",
  success: "Success",
  processing: "Processing",
  completed: "Completed",
  pending: "Pending",
  retry: "Retry",
  cancel: "Cancel",
  confirm: "Confirm",
  save: "Save",
  edit: "Edit",
  delete: "Delete",
  view: "View",
  close: "Close",
  next: "Next",
  previous: "Previous",
  submit: "Submit",
  reset: "Reset",
};

// Function to translate text
export const translateText = async (text, targetLanguage = "en") => {
  // If target language is English, return original text
  if (targetLanguage === "en") {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}_${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // For languages with offline support, use offline translations as primary method
  if (OFFLINE_TRANSLATIONS[targetLanguage]) {
    // Try exact match first
    const offlineText = OFFLINE_TRANSLATIONS[targetLanguage][text];
    if (offlineText) {
      translationCache.set(cacheKey, offlineText);
      return offlineText;
    }

    // Try to find the key in DEFAULT_TEXT and then translate it
    const textKey = Object.keys(DEFAULT_TEXT).find(key => DEFAULT_TEXT[key] === text);
    if (textKey && OFFLINE_TRANSLATIONS[targetLanguage][textKey]) {
      const translatedText = OFFLINE_TRANSLATIONS[targetLanguage][textKey];
      translationCache.set(cacheKey, translatedText);
      return translatedText;
    }

    // Try partial match for similar keys
    const lowerText = text.toLowerCase();
    for (const [key, value] of Object.entries(OFFLINE_TRANSLATIONS[targetLanguage])) {
      if (key.toLowerCase().includes(lowerText) || lowerText.includes(key.toLowerCase())) {
        translationCache.set(cacheKey, value);
        return value;
      }
    }

    // For offline-supported languages, return original text if no match found
    return text;
  }

  // For languages without offline support, try API
  try {
    const result = await translate(text, { to: targetLanguage });
    const translatedText = result.text;
    translationCache.set(cacheKey, translatedText);
    return translatedText;
  } catch (error) {
    console.warn(`Translation API failed for ${targetLanguage}:`, error.message);
    return text;
  }
};

// Function to translate all text content
export const translateAllText = async (textObject, targetLanguage = "en") => {
  if (targetLanguage === "en") {
    return textObject;
  }

  const translatedText = {};

  // Check if we have offline translations for this language
  const hasOfflineTranslations = OFFLINE_TRANSLATIONS[targetLanguage];

  if (hasOfflineTranslations) {
    // Use offline translations as primary source - no API calls needed
    for (const [key, value] of Object.entries(textObject)) {
      if (Array.isArray(value)) {
        // Handle arrays (like actionSteps) - use offline translations
        if (OFFLINE_TRANSLATIONS[targetLanguage][key] && Array.isArray(OFFLINE_TRANSLATIONS[targetLanguage][key])) {
          translatedText[key] = OFFLINE_TRANSLATIONS[targetLanguage][key];
        } else {
          translatedText[key] = value.map((item) => {
            // Try to find exact match in offline translations
            for (const [offlineKey, offlineValue] of Object.entries(OFFLINE_TRANSLATIONS[targetLanguage])) {
              if (typeof offlineValue === 'string' && 
                  (offlineValue.toLowerCase().includes(item.toLowerCase()) || 
                   item.toLowerCase().includes(offlineKey.toLowerCase()))) {
                return offlineValue;
              }
            }
            return item; // Return original if no match found
          });
        }
      } else {
        // Use offline translation if available, otherwise return original
        translatedText[key] = OFFLINE_TRANSLATIONS[targetLanguage][key] || value;
      }
    }
  } else {
    // For languages without offline support, use API translation
    for (const [key, value] of Object.entries(textObject)) {
      if (Array.isArray(value)) {
        // Handle arrays (like actionSteps)
        translatedText[key] = await Promise.all(
          value.map((item) => translateText(item, targetLanguage))
        );
      } else {
        translatedText[key] = await translateText(value, targetLanguage);
      }
    }
  }

  return translatedText;
};

// Helper function to get translated text by key
export const getTranslatedText = (key, targetLanguage = "en") => {
  if (targetLanguage === "en") {
    return DEFAULT_TEXT[key] || key;
  }

  if (OFFLINE_TRANSLATIONS[targetLanguage] && OFFLINE_TRANSLATIONS[targetLanguage][key]) {
    return OFFLINE_TRANSLATIONS[targetLanguage][key];
  }

  return DEFAULT_TEXT[key] || key;
};

// Function to get language name
export const getLanguageName = (code) => {
  return SUPPORTED_LANGUAGES[code]?.name || code;
};

// Function to get language flag
export const getLanguageFlag = (code) => {
  return SUPPORTED_LANGUAGES[code]?.flag || "🌐";
};
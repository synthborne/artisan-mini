export interface LanguageInfo {
  language: string;
  confidence: number;
  code: string;
}

// Language configuration with Unicode ranges and common words
const LANGUAGE_CONFIG = {
  hindi: {
    code: 'hi',
    name: 'Hindi',
    script: 'Devanagari',
    unicodeRanges: ['\u0900-\u097F'],
    commonWords: ['मैं', 'आप', 'है', 'हैं', 'में', 'से', 'को', 'का', 'की', 'के', 'और', 'या', 'हो', 'हैं', 'था', 'थी', 'थे', 'कर', 'करने', 'हैं', 'मुझे', 'आपको', 'उन्हें', 'हमें', 'इस', 'उस', 'वह', 'यह', 'जो', 'कि', 'तो', 'भी', 'सभी', 'कुछ', 'बहुत', 'अच्छा', 'बुरा', 'बड़ा', 'छोटा', 'नया', 'पुराना', 'दिन', 'रात', 'समय', 'पैसा', 'घर', 'परिवार', 'दोस्त', 'काम', 'व्यापार', 'मार्केटिंग', 'स्ट्रैटेजी', 'बजट', 'विज्ञापन', 'उत्पाद', 'सेवा']
  },
  tamil: {
    code: 'ta',
    name: 'Tamil',
    script: 'Tamil',
    unicodeRanges: ['\u0B80-\u0BFF'],
    commonWords: ['நான்', 'நீங்கள்', 'அவர்', 'அவள்', 'அது', 'நாங்கள்', 'நீங்கள்', 'அவர்கள்', 'இது', 'அது', 'என்', 'உன்', 'அவனுடைய', 'அவளுடைய', 'அதன்', 'நம்முடைய', 'உங்களுடைய', 'அவர்களுடைய', 'உள்ள', 'இல்லை', 'ஆக', 'ஆனால்', 'மற்றும்', 'அல்லது', 'பிறகு', 'முன்', 'மேல்', 'கீழ்', 'உள்ளே', 'வெளியே', 'இங்கே', 'அங்கே', 'எங்கே', 'எப்போது', 'எப்படி', 'ஏன்', 'எது', 'எவர்', 'நல்ல', 'கெட்ட', 'பெரிய', 'சிறிய', 'புதிய', 'பழைய', 'பகல்', 'இரவு', 'நேரம்', 'பணம்', 'வீடு', 'குடும்பம்', 'நண்பர்', 'வேலை', 'வியாபாரம்', 'விளம்பரம்', 'தயாரிப்பு', 'சேவை']
  },
  telugu: {
    code: 'te',
    name: 'Telugu',
    script: 'Telugu',
    unicodeRanges: ['\u0C00-\u0C7F'],
    commonWords: ['నేను', 'మీరు', 'అతను', 'ఆమె', 'అది', 'మేము', 'మీరు', 'వారు', 'ఇది', 'అది', 'నా', 'మీ', 'అతని', 'ఆమె', 'దాని', 'మన', 'మీరి', 'వారి', 'ఉంది', 'లేదు', 'అవుతుంది', 'కానీ', 'మరియు', 'లేదా', 'తరువాత', 'ముందు', 'పైన', 'కింద', 'లోపల', 'వెలుపల', 'ఇక్కడ', 'అక్కడ', 'ఎక్కడ', 'ఎప్పుడు', 'ఎలా', 'ఎందుకు', 'ఏమి', 'ఎవరు', 'మంచి', 'చెడ్డ', 'పెద్ద', 'చిన్న', 'కొత్త', 'పాత', 'పగలు', 'రాత్రి', 'సమయం', 'డబ్బు', 'ఇల్లు', 'కుటుంబం', 'స్నేహితుడు', 'పని', 'వ్యాపారం', 'విజ్ఞాపన', 'ఉత్పత్తి', 'సేవ']
  },
  bengali: {
    code: 'bn',
    name: 'Bengali',
    script: 'Bengali',
    unicodeRanges: ['\u0980-\u09FF'],
    commonWords: ['আমি', 'আপনি', 'তিনি', 'সে', 'এটি', 'আমরা', 'আপনারা', 'তারা', 'এই', 'সেটি', 'আমার', 'আপনার', 'তার', 'এর', 'আমাদের', 'আপনাদের', 'তাদের', 'আছে', 'নেই', 'হয়', 'কিন্তু', 'এবং', 'অথবা', 'পরে', 'আগে', 'উপরে', 'নিচে', 'ভিতরে', 'বাইরে', 'এখানে', 'সেখানে', 'কোথায়', 'কখন', 'কীভাবে', 'কেন', 'কী', 'কে', 'ভালো', 'খারাপ', 'বড়', 'ছোট', 'নতুন', 'পুরানো', 'দিন', 'রাত', 'সময়', 'টাকা', 'বাড়ি', 'পরিবার', 'বন্ধু', 'কাজ', 'ব্যবসা', 'বিজ্ঞাপন', 'পণ্য', 'সেবা']
  },
  gujarati: {
    code: 'gu',
    name: 'Gujarati',
    script: 'Gujarati',
    unicodeRanges: ['\u0A80-\u0AFF'],
    commonWords: ['હું', 'તમે', 'તેઓ', 'તે', 'આ', 'અમે', 'તમે', 'તેઓ', 'આ', 'તે', 'મારું', 'તમારું', 'તેમનું', 'તેનું', 'અમારું', 'તમારું', 'તેમનું', 'છે', 'નથી', 'છે', 'પણ', 'અને', 'અથવા', 'પછી', 'પહેલાં', 'ઉપર', 'નીચે', 'અંદર', 'બહાર', 'અહીં', 'ત્યાં', 'ક્યાં', 'ક્યારે', 'કેવી રીતે', 'કેમ', 'શું', 'કોણ', 'સારું', 'ખરાબ', 'મોટું', 'નાનું', 'નવું', 'જૂનું', 'દિવસ', 'રાત', 'સમય', 'પૈસા', 'ઘર', 'કુટુંબ', 'મિત્ર', 'કામ', 'વ્યવસાય', 'જાહેરાત', 'ઉત્પાદન', 'સેવા']
  },
  marathi: {
    code: 'mr',
    name: 'Marathi',
    script: 'Devanagari',
    unicodeRanges: ['\u0900-\u097F'],
    commonWords: ['मी', 'तुम्ही', 'तो', 'ती', 'ते', 'आम्ही', 'तुम्ही', 'ते', 'हे', 'ते', 'माझे', 'तुमचे', 'त्याचे', 'तिचे', 'त्याचे', 'आमचे', 'तुमचे', 'त्यांचे', 'आहे', 'नाही', 'होते', 'पण', 'आणि', 'किंवा', 'नंतर', 'आधी', 'वर', 'खाली', 'आत', 'बाहेर', 'इथे', 'तिथे', 'कुठे', 'कधी', 'कसे', 'का', 'काय', 'कोण', 'चांगले', 'वाईट', 'मोठे', 'लहान', 'नवे', 'जुने', 'दिवस', 'रात्र', 'वेळ', 'पैसे', 'घर', 'कुटुंब', 'मित्र', 'काम', 'व्यवसाय', 'जाहिरात', 'उत्पादन', 'सेवा']
  },
  kannada: {
    code: 'kn',
    name: 'Kannada',
    script: 'Kannada',
    unicodeRanges: ['\u0C80-\u0CFF'],
    commonWords: ['ನಾನು', 'ನೀವು', 'ಅವನು', 'ಅವಳು', 'ಅದು', 'ನಾವು', 'ನೀವು', 'ಅವರು', 'ಇದು', 'ಅದು', 'ನನ್ನ', 'ನಿಮ್ಮ', 'ಅವನ', 'ಅವಳ', 'ಅದರ', 'ನಮ್ಮ', 'ನಿಮ್ಮ', 'ಅವರ', 'ಇದೆ', 'ಇಲ್ಲ', 'ಆಗುತ್ತದೆ', 'ಆದರೆ', 'ಮತ್ತು', 'ಅಥವಾ', 'ನಂತರ', 'ಮೊದಲು', 'ಮೇಲೆ', 'ಕೆಳಗೆ', 'ಒಳಗೆ', 'ಹೊರಗೆ', 'ಇಲ್ಲಿ', 'ಅಲ್ಲಿ', 'ಎಲ್ಲಿ', 'ಎಂದು', 'ಹೇಗೆ', 'ಏಕೆ', 'ಏನು', 'ಯಾರು', 'ಒಳ್ಳೆಯದು', 'ಕೆಟ್ಟದು', 'ದೊಡ್ಡದು', 'ಚಿಕ್ಕದು', 'ಹೊಸದು', 'ಹಳೆಯದು', 'ದಿನ', 'ರಾತ್ರಿ', 'ಸಮಯ', 'ಹಣ', 'ಮನೆ', 'ಕುಟುಂಬ', 'ಸ್ನೇಹಿತ', 'ಕೆಲಸ', 'ವ್ಯವಹಾರ', 'ಜಾಹೀರಾತು', 'ಉತ್ಪನ್ನ', 'ಸೇವೆ']
  },
  malayalam: {
    code: 'ml',
    name: 'Malayalam',
    script: 'Malayalam',
    unicodeRanges: ['\u0D00-\u0D7F'],
    commonWords: ['ഞാൻ', 'നിങ്ങൾ', 'അവൻ', 'അവൾ', 'അത്', 'ഞങ്ങൾ', 'നിങ്ങൾ', 'അവർ', 'ഇത്', 'അത്', 'എന്റെ', 'നിങ്ങളുടെ', 'അവന്റെ', 'അവളുടെ', 'അതിന്റെ', 'ഞങ്ങളുടെ', 'നിങ്ങളുടെ', 'അവരുടെ', 'ഉണ്ട്', 'ഇല്ല', 'ആകുന്നു', 'പക്ഷേ', 'ഒപ്പം', 'അല്ലെങ്കിൽ', 'ശേഷം', 'മുമ്പ്', 'മുകളിൽ', 'താഴെ', 'ഉള്ളിൽ', 'പുറത്ത്', 'ഇവിടെ', 'അവിടെ', 'എവിടെ', 'എപ്പോൾ', 'എങ്ങനെ', 'എന്തുകൊണ്ട്', 'എന്ത്', 'ആര്', 'നല്ലത്', 'മോശം', 'വലുത്', 'ചെറുത്', 'പുതിയത്', 'പഴയത്', 'പകൽ', 'രാത്രി', 'സമയം', 'പണം', 'വീട്', 'കുടുംബം', 'സുഹൃത്ത്', 'ജോലി', 'വ്യവസായം', 'പരസ്യം', 'ഉൽപ്പന്നം', 'സേവനം']
  },
  punjabi: {
    code: 'pa',
    name: 'Punjabi',
    script: 'Gurmukhi',
    unicodeRanges: ['\u0A00-\u0A7F'],
    commonWords: ['ਮੈਂ', 'ਤੁਸੀਂ', 'ਉਹ', 'ਉਹ', 'ਇਹ', 'ਅਸੀਂ', 'ਤੁਸੀਂ', 'ਉਹ', 'ਇਹ', 'ਉਹ', 'ਮੇਰਾ', 'ਤੁਹਾਡਾ', 'ਉਸਦਾ', 'ਉਸਦੀ', 'ਇਸਦਾ', 'ਸਾਡਾ', 'ਤੁਹਾਡਾ', 'ਉਨ੍ਹਾਂਦਾ', 'ਹੈ', 'ਨਹੀਂ', 'ਹੁੰਦਾ', 'ਪਰ', 'ਅਤੇ', 'ਜਾਂ', 'ਬਾਅਦ', 'ਪਹਿਲਾਂ', 'ਉੱਪਰ', 'ਹੇਠਾਂ', 'ਅੰਦਰ', 'ਬਾਹਰ', 'ਇੱਥੇ', 'ਉੱਥੇ', 'ਕਿੱਥੇ', 'ਕਦੋਂ', 'ਕਿਵੇਂ', 'ਕਿਉਂ', 'ਕੀ', 'ਕੌਣ', 'ਚੰਗਾ', 'ਮਾੜਾ', 'ਵੱਡਾ', 'ਛੋਟਾ', 'ਨਵਾਂ', 'ਪੁਰਾਣਾ', 'ਦਿਨ', 'ਰਾਤ', 'ਸਮਾਂ', 'ਪੈਸਾ', 'ਘਰ', 'ਪਰਿਵਾਰ', 'ਦੋਸਤ', 'ਕੰਮ', 'ਵਪਾਰ', 'ਇਸ਼ਤਿਹਾਰ', 'ਉਤਪਾਦ', 'ਸੇਵਾ']
  },
  odia: {
    code: 'or',
    name: 'Odia',
    script: 'Odia',
    unicodeRanges: ['\u0B00-\u0B7F'],
    commonWords: ['ମୁଁ', 'ଆପଣ', 'ସେ', 'ସେ', 'ଏହା', 'ଆମେ', 'ଆପଣମାନେ', 'ସେମାନେ', 'ଏହା', 'ସେହା', 'ମୋର', 'ଆପଣଙ୍କର', 'ତାଙ୍କର', 'ତାଙ୍କର', 'ଏହାର', 'ଆମର', 'ଆପଣଙ୍କର', 'ସେମାନଙ୍କର', 'ଅଛି', 'ନାହିଁ', 'ହୁଏ', 'କିନ୍ତୁ', 'ଏବଂ', 'କିମ୍ବା', 'ପରେ', 'ପୂର୍ବରୁ', 'ଉପରେ', 'ନିମ୍ନରେ', 'ଭିତରେ', 'ବାହାରେ', 'ଏଠାରେ', 'ସେଠାରେ', 'କେଉଁଠାରେ', 'କେବେ', 'କିପରି', 'କାହିଁକି', 'କଣ', 'କିଏ', 'ଭଲ', 'ଖରାପ', 'ବଡ଼', 'ଛୋଟ', 'ନୂଆ', 'ପୁରୁଣା', 'ଦିନ', 'ରାତି', 'ସମୟ', 'ଟଙ୍କା', 'ଘର', 'ପରିବାର', 'ବନ୍ଧୁ', 'କାମ', 'ବ୍ୟବସାୟ', 'ବିଜ୍ଞାପନ', 'ଉତ୍ପାଦ', 'ସେବା']
  },
  assamese: {
    code: 'as',
    name: 'Assamese',
    script: 'Bengali',
    unicodeRanges: ['\u0980-\u09FF'],
    commonWords: ['মই', 'আপুনি', 'তেওঁ', 'এই', 'আমি', 'আপোনালোক', 'সিহঁত', 'সেয়া', 'মোৰ', 'আপোনাৰ', 'তেওঁৰ', 'এইয়াৰ', 'আমাৰ', 'আপোনালোকৰ', 'সিহঁতৰ', 'আছে', 'নাই', 'হয়', 'কিন্তু', 'আৰু', 'নাইবা', 'পিছত', 'আগেয়ে', 'ওপৰত', 'তলত', 'ভিতৰত', 'বাহিৰত', 'ইয়াত', 'তাত', 'কেতিয়া', 'কেনেকৈ', 'কিয়', 'কি', 'কোন', 'ভাল', 'বেয়া', 'ডাঙৰ', 'সৰু', 'নতুন', 'পুৰণি', 'দিন', 'ৰাতি', 'সময়', 'টকা', 'ঘৰ', 'পৰিয়াল', 'বন্ধু', 'কাম', 'ব্যৱসায়', 'বিজ্ঞাপন', 'উৎপাদন', 'সেৱা']
  },
  english: {
    code: 'en',
    name: 'English',
    script: 'Latin',
    unicodeRanges: ['a-zA-Z'],
    commonWords: ['I', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 'would', 'can', 'could', 'should', 'must', 'may', 'might', 'shall', 'the', 'a', 'an', 'and', 'or', 'but', 'so', 'because', 'if', 'when', 'where', 'why', 'how', 'what', 'who', 'which', 'that', 'this', 'these', 'those', 'good', 'bad', 'big', 'small', 'new', 'old', 'day', 'night', 'time', 'money', 'house', 'family', 'friend', 'work', 'business', 'advertisement', 'product', 'service', 'marketing', 'strategy', 'budget']
  }
};

// Function to detect language from text
export function detectLanguage(text: string): LanguageInfo {
  if (!text || text.trim().length === 0) {
    return { language: 'English', confidence: 0, code: 'en' };
  }

  const cleanText = text.trim().toLowerCase();
  const languageScores: { [key: string]: number } = {};

  // Initialize scores
  Object.keys(LANGUAGE_CONFIG).forEach(lang => {
    languageScores[lang] = 0;
  });

  // Check Unicode ranges
  Object.entries(LANGUAGE_CONFIG).forEach(([langKey, config]) => {
    if (langKey === 'english') {
      // For English, check for Latin characters
      const latinMatches = text.match(/[a-zA-Z]/g);
      if (latinMatches) {
        languageScores[langKey] += latinMatches.length * 0.1;
      }
    } else {
      // For other languages, check Unicode ranges
      config.unicodeRanges.forEach(range => {
        const [start, end] = range.split('-').map(char => char.charCodeAt(0));
        let matches = 0;
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i);
          if (charCode >= start && charCode <= end) {
            matches++;
          }
        }
        languageScores[langKey] += matches * 2; // Higher weight for script detection
      });
    }
  });

  // Check common words
  Object.entries(LANGUAGE_CONFIG).forEach(([langKey, config]) => {
    config.commonWords.forEach(word => {
      const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'g');
      const matches = cleanText.match(regex);
      if (matches) {
        languageScores[langKey] += matches.length * 3; // Higher weight for word matches
      }
    });
  });

  // Find the language with highest score
  let maxScore = 0;
  let detectedLanguage = 'english';

  Object.entries(languageScores).forEach(([lang, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedLanguage = lang;
    }
  });

  // Calculate confidence based on score and text length
  const totalPossibleScore = Math.max(text.length * 0.5, 10);
  const confidence = Math.min(maxScore / totalPossibleScore, 1);

  // If confidence is too low, default to English
  if (confidence < 0.1) {
    return { language: 'English', confidence: 0.1, code: 'en' };
  }

  const config = LANGUAGE_CONFIG[detectedLanguage as keyof typeof LANGUAGE_CONFIG];
  return {
    language: config.name,
    confidence: Math.round(confidence * 100) / 100,
    code: config.code
  };
}

// Function to get language instruction for AI
export function getLanguageInstruction(languageInfo: LanguageInfo): string {
  const { language, code } = languageInfo;
  
  if (code === 'en') {
    return 'Respond in English.';
  }

  const instructions: { [key: string]: string } = {
    hi: 'Respond entirely in Hindi using Devanagari script. Use natural Hindi expressions and maintain cultural context.',
    ta: 'Respond entirely in Tamil using Tamil script. Use natural Tamil expressions and maintain cultural context.',
    te: 'Respond entirely in Telugu using Telugu script. Use natural Telugu expressions and maintain cultural context.',
    bn: 'Respond entirely in Bengali using Bengali script. Use natural Bengali expressions and maintain cultural context.',
    gu: 'Respond entirely in Gujarati using Gujarati script. Use natural Gujarati expressions and maintain cultural context.',
    mr: 'Respond entirely in Marathi using Devanagari script. Use natural Marathi expressions and maintain cultural context.',
    kn: 'Respond entirely in Kannada using Kannada script. Use natural Kannada expressions and maintain cultural context.',
    ml: 'Respond entirely in Malayalam using Malayalam script. Use natural Malayalam expressions and maintain cultural context.',
    pa: 'Respond entirely in Punjabi using Gurmukhi script. Use natural Punjabi expressions and maintain cultural context.',
    or: 'Respond entirely in Odia using Odia script. Use natural Odia expressions and maintain cultural context.',
    as: 'Respond entirely in Assamese using Bengali script. Use natural Assamese expressions and maintain cultural context.'
  };

  return instructions[code] || 'Respond in English.';
}

// Function to get tier names in user's language
export function getTierNames(languageInfo: LanguageInfo): { low: string; mid: string; high: string } {
  const { code } = languageInfo;
  
  const tierNames: { [key: string]: { low: string; mid: string; high: string } } = {
    hi: { low: 'निम्न', mid: 'मध्य', high: 'उच्च' },
    ta: { low: 'குறைந்த', mid: 'நடுத்தர', high: 'உயர்' },
    te: { low: 'తక్కువ', mid: 'మధ్య', high: 'అధిక' },
    bn: { low: 'নিম্ন', mid: 'মধ্য', high: 'উচ্চ' },
    gu: { low: 'નીચું', mid: 'મધ્યમ', high: 'ઉચ્ચ' },
    mr: { low: 'निम्न', mid: 'मध्य', high: 'उच्च' },
    kn: { low: 'ಕಡಿಮೆ', mid: 'ಮಧ್ಯಮ', high: 'ಅಧಿಕ' },
    ml: { low: 'കുറഞ്ഞ', mid: 'ഇടത്തരം', high: 'ഉയർന്ന' },
    pa: { low: 'ਘੱਟ', mid: 'ਮੱਧਮ', high: 'ਵੱਧ' },
    or: { low: 'ନିମ୍ନ', mid: 'ମଧ୍ୟମ', high: 'ଉଚ୍ଚ' },
    as: { low: 'নিম্ন', mid: 'মধ্য', high: 'উচ্চ' },
    en: { low: 'Low', mid: 'Mid', high: 'High' }
  };

  return tierNames[code] || tierNames.en;
}

// Function to get localized UI text
export function getLocalizedText(languageInfo: LanguageInfo, key: string): string {
  const { code } = languageInfo;
  
  const translations: { [key: string]: { [key: string]: string } } = {
    hi: {
      waiting: 'आपकी मार्केटिंग स्ट्रैटेजी तैयार कर रहे हैं... कृपया एक क्षण प्रतीक्षा करें।',
      error: 'क्षमा करें, आपके अनुरोध को संसाधित करने में समस्या हो रही है। कृपया कुछ समय बाद पुनः प्रयास करें।',
      send: 'भेजें',
      placeholder: 'अपना संदेश टाइप करें...',
      processing: 'आपके प्रश्न को संसाधित कर रहे हैं... कृपया एक क्षण प्रतीक्षा करें।',
      strategyOptions: '🎯 मार्केटिंग स्ट्रैटेजी विकल्प\n\nमैंने आपके लिए तीन स्ट्रैटेजी विकल्प तैयार किए हैं:\n\n',
      chooseStrategy: 'विस्तृत जानकारी के लिए एक स्ट्रैटेजी चुनें',
      clickStrategy: 'विस्तृत विवरण के लिए नीचे किसी भी स्ट्रैटेजी पर क्लिक करें',
      askElaborate: 'या किसी विशिष्ट पहलू पर विस्तार के लिए मुझसे पूछें! 💬',
      viewDetailed: 'विस्तृत रणनीति देखें',
      strategyOverview: 'रणनीति अवलोकन',
      whyThisWorks: 'यह क्यों काम करता है',
      implementationSteps: 'कार्यान्वयन चरण',
      budgetBreakdown: 'बजट विवरण',
      techRequirements: 'तकनीकी आवश्यकताएं',
      timeline: 'समयसीमा',
      feelFreeToAsk: 'इस रणनीति के किसी भी पहलू के बारे में अधिक विवरण के लिए बेझिझक पूछें! 💬'
    },
    ta: {
      waiting: 'உங்கள் மார்க்கெட்டிங் உத்தியை தயாரிக்கிறோம்... தயவுசெய்து சிறிது நேரம் காத்திருக்கவும்.',
      error: 'மன்னிக்கவும், உங்கள் கோரிக்கையை செயல்படுத்துவதில் பிரச்சினை ஏற்பட்டுள்ளது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.',
      send: 'அனுப்பு',
      placeholder: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
      processing: 'உங்கள் கேள்வியை செயல்படுத்துகிறோம்... தயவுசெய்து சிறிது நேரம் காத்திருக்கவும்.'
    },
    te: {
      waiting: 'మీ మార్కెటింగ్ వ్యూహాన్ని తయారు చేస్తున్నాము... దయచేసి కొంత సమయం వేచి ఉండండి.',
      error: 'క్షమించండి, మీ అభ్యర్థనను ప్రాసెస్ చేయడంలో సమస్య ఏర్పడింది. దయచేసి కొంత సమయం తర్వాత మళ్లీ ప్రయత్నించండి.',
      send: 'పంపండి',
      placeholder: 'మీ సందేశాన్ని టైప్ చేయండి...',
      processing: 'మీ ప్రశ్నను ప్రాసెస్ చేస్తున్నాము... దయచేసి కొంత సమయం వేచి ఉండండి.'
    },
    bn: {
      waiting: 'আপনার মার্কেটিং কৌশল প্রস্তুত করছি... অনুগ্রহ করে এক মুহূর্ত অপেক্ষা করুন।',
      error: 'দুঃখিত, আপনার অনুরোধ প্রক্রিয়াকরণে সমস্যা হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
      send: 'পাঠান',
      placeholder: 'আপনার বার্তা টাইপ করুন...',
      processing: 'আপনার প্রশ্ন প্রক্রিয়াকরণ করছি... অনুগ্রহ করে এক মুহূর্ত অপেক্ষা করুন।'
    },
    gu: {
      waiting: 'તમારી માર્કેટિંગ વ્યૂહરચના તૈયાર કરી રહ્યા છીએ... કૃપા કરીને એક ક્ષણ રાહ જુઓ.',
      error: 'માફ કરશો, તમારી વિનંતીને પ્રક્રિયા કરવામાં સમસ્યા આવી રહી છે. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
      send: 'મોકલો',
      placeholder: 'તમારો સંદેશ લખો...',
      processing: 'તમારા પ્રશ્નને પ્રક્રિયા કરી રહ્યા છીએ... કૃપા કરીને એક ક્ષણ રાહ જુઓ.'
    },
    mr: {
      waiting: 'तुमची मार्केटिंग स्ट्रॅटेजी तयार करत आहोत... कृपया एक क्षण प्रतीक्षा करा.',
      error: 'माफ करा, तुमच्या विनंतीला प्रक्रिया करताना समस्या येत आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.',
      send: 'पाठवा',
      placeholder: 'तुमचा संदेश टाइप करा...',
      processing: 'तुमच्या प्रश्नाची प्रक्रिया करत आहोत... कृपया एक क्षण प्रतीक्षा करा.'
    },
    kn: {
      waiting: 'ನಿಮ್ಮ ಮಾರ್ಕೆಟಿಂಗ್ ತಂತ್ರವನ್ನು ತಯಾರಿಸುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ಕಾದಿರಿ.',
      error: 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸಂಸ್ಕರಿಸುವಲ್ಲಿ ಸಮಸ್ಯೆ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      send: 'ಕಳುಹಿಸಿ',
      placeholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
      processing: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಸಂಸ್ಕರಿಸುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ಕಾದಿರಿ.'
    },
    ml: {
      waiting: 'നിങ്ങളുടെ മാർക്കറ്റിംഗ് തന്ത്രം തയ്യാറാക്കുന്നു... ദയവായി കുറച്ച് സമയം കാത്തിരിക്കുക.',
      error: 'ക്ഷമിക്കണം, നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നതിൽ പ്രശ്നമുണ്ട്. ദയവായി കുറച്ച് സമയം കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.',
      send: 'അയയ്ക്കുക',
      placeholder: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
      processing: 'നിങ്ങളുടെ ചോദ്യം പ്രോസസ്സ് ചെയ്യുന്നു... ദയവായി കുറച്ച് സമയം കാത്തിരിക്കുക.'
    },
    pa: {
      waiting: 'ਤੁਹਾਡੀ ਮਾਰਕੀਟਿੰਗ ਸਟ੍ਰੈਟੇਜੀ ਤਿਆਰ ਕਰ ਰਹੇ ਹਾਂ... ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਪਲ ਉਡੀਕੋ.',
      error: 'ਮਾਫ਼ ਕਰਨਾ, ਤੁਹਾਡੀ ਬੇਨਤੀ ਨੂੰ ਪ੍ਰੋਸੈਸ ਕਰਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ. ਕਿਰਪਾ ਕਰਕੇ ਥੋੜ੍ਹੀ ਦੇਰ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
      send: 'ਭੇਜੋ',
      placeholder: 'ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...',
      processing: 'ਤੁਹਾਡੇ ਸਵਾਲ ਨੂੰ ਪ੍ਰੋਸੈਸ ਕਰ ਰਹੇ ਹਾਂ... ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਪਲ ਉਡੀਕੋ.'
    },
    or: {
      waiting: 'ଆପଣଙ୍କର ମାର୍କେଟିଂ କୌଶଳ ତିଆରି କରୁଛୁ... ଦୟାକରି ଏକ ମୁହୂର୍ତ୍ତ ଅପେକ୍ଷା କରନ୍ତୁ।',
      error: 'କ୍ଷମା କରନ୍ତୁ, ଆପଣଙ୍କର ଅନୁରୋଧକୁ ପ୍ରକ୍ରିୟାକରଣ କରୁଥିବା ସମୟରେ ସମସ୍ୟା ହେଉଛି। ଦୟାକରି କିଛି ସମୟ ପରେ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।',
      send: 'ପଠାନ୍ତୁ',
      placeholder: 'ଆପଣଙ୍କର ସନ୍ଦେଶ ଟାଇପ୍ କରନ୍ତୁ...',
      processing: 'ଆପଣଙ୍କର ପ୍ରଶ୍ନକୁ ପ୍ରକ୍ରିୟାକରଣ କରୁଛୁ... ଦୟାକରି ଏକ ମୁହୂର୍ତ୍ତ ଅପେକ୍ଷା କରନ୍ତୁ।'
    },
    as: {
      waiting: 'আপোনাৰ মাৰ্কেটিং কৌশল প্ৰস্তুত কৰি আছোঁ... অনুগ্ৰহ কৰি এক মুহূৰ্ত ৰৈ থাকক।',
      error: 'দুঃখিত, আপোনাৰ অনুৰোধ প্ৰক্ৰিয়াকৰণ কৰোতে সমস্যা হৈছে। অনুগ্ৰহ কৰি কিছুসময়ৰ পিছত আকৌ চেষ্টা কৰক।',
      send: 'পঠিয়াওক',
      placeholder: 'আপোনাৰ বাৰ্তা টাইপ কৰক...',
      processing: 'আপোনাৰ প্ৰশ্ন প্ৰক্ৰিয়াকৰণ কৰি আছোঁ... অনুগ্ৰহ কৰি এক মুহূৰ্ত ৰৈ থাকক।'
    },
    en: {
      waiting: 'Generating your marketing strategy... Please wait a moment.',
      error: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
      send: 'Send',
      placeholder: 'Type your message...',
      processing: 'Processing your follow-up question... Please wait a moment.',
      strategyOptions: '🎯 Marketing Strategy Options\n\nI\'ve prepared three strategy options for you:\n\n',
      chooseStrategy: '🎯 Choose a strategy to explore in detail using the buttons below!',
      clickStrategy: 'Click on any strategy below to get a comprehensive breakdown',
      askElaborate: 'Or ask me to elaborate on any specific aspect! 💬',
      viewDetailed: 'View Detailed Strategy',
      strategyOverview: 'Strategy Overview',
      whyThisWorks: 'Why This Works',
      implementationSteps: 'Implementation Steps',
      budgetBreakdown: 'Budget Breakdown',
      techRequirements: 'Tech Requirements',
      timeline: 'Timeline',
      feelFreeToAsk: 'Feel free to ask for more details about any specific aspect of this strategy! 💬'
    }
  };

  return translations[code]?.[key] || translations.en[key] || key;
}

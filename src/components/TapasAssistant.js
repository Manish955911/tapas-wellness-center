'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, Mic, MicOff, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import styles from './TapasAssistant.module.css';

// Keyword-matching database localized in both English and Devanagari Hindi
const KEYWORD_RESPONSES = [
  {
    keywords: ['timing', 'time', 'slot', 'schedule', 'hour', 'baje', 'ghante', 'class', 'classes', 'batch', 'batches', 'subah', 'shaam', 'morning', 'evening', 'duration', '60 mins', 'mins', 'samay', 'samai'],
    response: "TAPAS classes run Monday through Saturday. **Each class is 60 minutes long.**\n\n🌅 **Morning Slots:**\n- 6:00 AM — 7:00 AM\n- 7:15 AM — 8:15 AM\n- 8:30 AM — 9:30 AM (Clinical Therapy Focus)\n- 9:30 AM — 10:30 AM\n- 10:30 AM — 11:30 AM\n\n🌇 **Evening Slots:**\n- 4:00 PM — 5:00 PM\n- 5:00 PM — 6:00 PM\n- 6:15 PM — 7:15 PM\n\nClasses are available in both **Online and Offline modes** so you can practice from home or visit our center!",
    responseHindi: "तपस योग क्लासेस सोमवार से शनिवार तक चलती हैं। **हर क्लास 60 मिनट की होती है।**\n\n🌅 **सुबह के स्लॉट्स:**\n- सुबह 6:00 से 7:00 बजे\n- सुबह 7:15 से 8:15 बजे\n- सुबह 8:30 से 9:30 बजे (स्पेशल क्लीनिकल थेरेपी)\n- सुबह 9:30 से 10:30 बजे\n- सुबह 10:30 से 11:30 बजे\n\n🌇 **शाम के स्लॉट्स:**\n- शाम 4:00 से 5:00 बजे\n- शाम 5:00 से 6:00 बजे\n- शाम 6:15 से 7:15 बजे\n\nहमारी क्लासेस **ऑनलाइन और ऑफलाइन (वाराणसी पहाड़िया सेंटर)** दोनों ही माध्यमों से उपलब्ध हैं!"
  },
  {
    keywords: ['spine', 'back', 'pain', 'sciatica', 'cervical', 'slip disc', 'pith', 'dard', 'kamar', 'joint', 'joints', 'bone', 'alignment', 'neck', 'gardana', 'kandha', 'guthna', 'knee'],
    response: "We offer specialized **Clinical Yoga Therapy for Spine & Joints** (covering back pain, sciatica, slip disc, cervical spondylosis, and neck stiffness).\n\nUnder medical guidance, we focus on safe traction, core stability, and posture correction. You can choose a **1-on-1 Personalized Therapy package** (₹4,000/month) or attend our general batch. Would you like to book a free trial class using our booking widget?",
    responseHindi: "हम रीढ़ की हड्डी और जोड़ों के लिए **विशेष क्लीनिकल योग थेरेपी (Spine & Joints Therapy)** प्रदान करते हैं (जैसे कमर दर्द, साइटिका, स्लिप डिस्क, सर्वाइकल और गर्दन/घुटनों की अकड़न)।\n\nडॉक्टर की देखरेख में हम सुरक्षित ट्रैक्शन, कोर स्टेबिलिटी और पॉस्चर करेक्शन पर काम करते हैं। आप **1-on-1 पर्सनल थेरेपी सेशन** (₹4,000/महीना) या सामान्य बैच चुन सकते हैं। क्या आप फ्री ट्रायल बुक करना चाहेंगे?"
  },
  {
    keywords: ['thyroid', 'pcod', 'pcos', 'hormon', 'hormone', 'hormonal', 'period', 'menstru', 'endocrine', 'weight gain', 'motaapa'],
    response: "For **Thyroid & PCOD/PCOS recovery**, our therapeutic regime combines endocrine-stimulating asanas (like Sarvangasana, Matsyasana), specific Pranayama (Ujjayi, Kapalbhati), and dietary guidelines to restore natural hormonal balance. You can register for a free trial to experience the practice!",
    responseHindi: "तपस योग में **थायराइड और पीसीओडी/पीसीओएस (PCOD/PCOS)** रिकवरी के लिए विशेष चिकित्सा अभ्यास उपलब्ध है। इसमें एंडोक्राइन ग्रंथियों को उत्तेजित करने वाले योगासन (जैसे सर्वांगासन, मत्स्यासन), विशेष प्राणायाम (उज्जायी, कपालभाति) और डाइट चार्ट दिया जाता है। आप ट्रायल क्लास लेकर इसका अनुभव कर सकते हैं।"
  },
  {
    keywords: ['diabet', 'sugar', 'bp', 'blood pressure', 'hypertension', 'insulin', 'pancrea', 'metabol'],
    response: "Manage **Diabetes and Hypertension (Blood Pressure)** naturally with clinical yoga. We use specific deep twists to activate the pancreas, dynamic sequences to burn excess glucose, and restorative meditation to lower high blood pressure. Many of our students have successfully reduced their reliance on medicine.",
    responseHindi: "क्लीनिकल योग द्वारा **डायबिटीज (शुगर) और हाई ब्लड प्रेशर (BP)** को प्राकृतिक रूप से नियंत्रित करें। हम शरीर को घुमाने वाले विशेष ट्विस्ट से पैंक्रियास को उत्तेजित करते हैं, जिससे इंसुलिन प्रोडक्शन बेहतर होता है। कई छात्रों की दवाइयां भी इसके अभ्यास से छूट चुकी हैं।"
  },
  {
    keywords: ['panchakarma', 'detox', 'ayurve', 'cleans', 'kriya', 'massage', 'shirodhara', 'basti', 'oil', 'body pack', 'tel', 'abhyanga', 'potli'],
    response: "Yes! We offer authentic **Panchakarma and Ayurvedic Detox therapies** at our Varanasi Paharia center:\n- **Abhyanga:** Medicated herbal oil massage to improve circulation.\n- **Shirodhara:** Gentle stream of warm herbal oil on the forehead to relieve stress and insomnia.\n- **Basti & Potli:** Deep tissue rejuvenation and pain relief.\n\nAll treatments are performed by trained therapists. Call us at **[WHATSAPP_PHONE_FORMATTED]** to book a session!",
    responseHindi: "हाँ! हमारे वाराणसी पहाड़िया सेंटर पर प्रामाणिक **पंचकर्म और आयुर्वेदिक डिटॉक्स थैरेपी** दी जाती हैं:\n- **अभ्यंग:** मेडिकेटेड आयुर्वेदिक तेल से मसाज जो रक्त संचार बढ़ाती है।\n- **शिरोधारा:** माथे पर गुनगुने तेल की धार, जो तनाव, सिरदर्द और अनिद्रा को दूर करती है।\n- **बस्ती और पोटली:** जोड़ों के दर्द और वात रोगों में अत्यधिक लाभकारी।\n\nसत्र बुक करने के लिए हमें **[WHATSAPP_PHONE_RAW]** पर मैसेज करें!"
  },
  {
    keywords: ['naturopathy', 'natural cure', 'mud bath', 'fasting', 'hydrotherapy', 'wet pack', 'hip bath', 'enema', 'drugless', 'mitti', 'jal', 'upvaas'],
    response: "Our **Naturopathy program** is a drugless healing system centered on five great elements (Pancha Mahabhutas):\n- **Mud Therapy:** Detoxifying mud baths and packs.\n- **Hydrotherapy:** Hip baths, spinal baths, and wet sheet packs to boost blood circulation.\n- **Diet & Fasting:** Scientific juice therapy and supervised fasting.\n\nPerfect for chronic conditions and deep detoxification. Visit our center or call us to plan your personalized program.",
    responseHindi: "हमारा **नेचुरोपैथी (प्राकृतिक चिकित्सा)** प्रोग्राम पांच महाभूतों (मिट्टी, पानी, धूप, हवा, आकाश) पर आधारित है:\n- **मिट्टी चिकित्सा:** बॉडी डिटॉक्स के लिए मिट्टी स्नान और लेप।\n- **जल चिकित्सा:** स्पाइनल बाथ और वेट पैक्स।\n- **डाइट और उपवास:** जूस थेरेपी और वैज्ञानिक उपवास मार्गदर्शन।\n\nयह शरीर की अंदरूनी सफाई और पुराने विकारों को मिटाने के लिए पूरी तरह दवा-रहित चिकित्सा है।"
  },
  {
    keywords: ['price', 'pricing', 'fee', 'fees', 'membership', 'charge', 'cost', 'rupee', 'rs', 'paise', 'money', 'pay', 'paisa', 'rupiya', 'rupae', 'kharcha'],
    response: "Here are our current pricing packages:\n\n💻 **Online/Offline Yoga Classes:**\n- **1 Month:** ₹1,500\n- **3 Months:** ₹4,200 (Best value)\n\n🏥 **Personal 1-on-1 Clinical Therapy:**\n- **1 Month:** ₹4,000\n\n*Note:* Our policies include a strict **no-refund/no-transfer** clause, but we allow package freezing in case of medical emergencies, subject to approval.",
    responseHindi: "हमारी वर्तमान योग फीस और पैकेज इस प्रकार हैं:\n\n💻 **ऑनलाइन/ऑफलाइन सामान्य ग्रुप क्लास:**\n- **1 महीना:** ₹1,500\n- **3 महीने:** ₹4,200 (सबसे लोकप्रिय)\n\n🏥 **पर्सनल 1-on-1 क्लीनिकल योग थेरेपी:**\n- **1 महीना:** ₹4,000 (विशेष रोग निदान)\n\n*नोट:* हमारी नीतियां सख्त हैं, रीफंड नहीं दिया जाता, लेकिन मेडिकल इमरजेंसी में पैकेज फ्रीज (होल्ड) किया जा सकता है।"
  },
  {
    keywords: ['location', 'address', 'where', 'place', 'center', 'studio', 'paharia', 'varanasi', 'banaras', 'kahan', 'map', 'school', 'pata', 'rastra', 'rasta'],
    response: "Our physical wellness sanctuary is located at:\n📍 **Paharia, Varanasi, Uttar Pradesh (Near Happy Model School)**.\n\nWe have a fully equipped facility for both offline classes and therapies (Panchakarma, Naturopathy, Mud bath). Feel free to visit us! Call **[WHATSAPP_PHONE_FORMATTED]** if you need direct directions.",
    responseHindi: "हमारा सेंटर वाराणसी में स्थित है:\n📍 **पहाड़िया, वाराणसी (हैप्पी मॉडल स्कूल के पास)**।\n\nयहाँ हमारी ऑफलाइन क्लासेस और पंचकर्म/नेचुरोपैथी थेरेपी रूम्स की पूरी व्यवस्था है। यदि आपको रास्ता ढूंढने में मदद चाहिए, तो सीधे **[WHATSAPP_PHONE_FORMATTED]** पर व्हाट्सएप करें।"
  },
  {
    keywords: ['contact', 'phone', 'whatsapp', 'number', 'call', 'email', 'support', 'help', 'mobile', 'email', 'fon', 'number', 'baat'],
    response: "You can reach us directly:\n📞 **Phone/WhatsApp:** [WHATSAPP_PHONE_FORMATTED]\n📧 **Email:** [CONTACT_EMAIL]\n\nOur team is available from 6:00 AM to 8:00 PM. You can also click the booking button on the bottom-right to register a free trial!",
    responseHindi: "आप हमसे सीधे संपर्क कर सकते हैं:\n📞 **फोन/व्हाट्सएप:** [WHATSAPP_PHONE_FORMATTED]\n📧 **ईमेल:** [CONTACT_EMAIL]\n\nहमारा सेंटर सुबह 6:00 बजे से रात 8:00 बजे तक खुला रहता है। आप स्क्रीन पर नीचे दाईं ओर दिए गए ट्रायल विजेट से डेमो भी बुक कर सकते हैं।"
  },
  {
    keywords: ['trial', 'book', 'join', 'register', 'free', 'demo', 'admission', 'start', 'seekhna', 'shuru', 'chalu', 'muft'],
    response: "To join TAPAS Yoga, you can start with a **Complimentary Free Trial Class** (either online or offline). \n\nSimply fill in your details using the **'Book Free Trial' widget in the bottom-right corner** of your screen, or WhatsApp us directly at [WHATSAPP_PHONE_FORMATTED]. We will text you the batch details and connection link!",
    responseHindi: "तपस योग शुरू करने के लिए आप एक **फ्री डेमो (ट्रायल) क्लास** ले सकते हैं (ऑनलाइन या ऑफलाइन)।\n\nबस स्क्रीन के निचले-दाएं कोने में दिए गए **'Book Free Trial' विजेट** में अपना विवरण भरें या हमें व्हाट्सएप **[WHATSAPP_PHONE_FORMATTED]** पर मैसेज करें। हम आपको लिंक शेयर कर देंगे!"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'pranam', 'aadesh', 'greet', 'welcome', 'ram', 'shyam', 'hariom'],
    response: "Namaste! 🙏 I am Tapas Assistant, your clinical yoga guide. \n\nI can help you learn about our **60-minute classes**, specific health therapies (Spine pain, PCOD, Diabetes), Panchakarma & Naturopathy, package pricing, or center location in Paharia. What are you looking to resolve today?",
    responseHindi: "नमस्ते! 🙏 मैं तपस असिस्टेंट हूँ, आपका क्लीनिकल योग गाइड।\n\nमैं आपको हमारे **60-मिनट क्लासेस**, विशेष स्वास्थ्य थेरेपी (कमर दर्द, थायराइड, पीसीओडी), पंचकर्म डिटॉक्स, फीस स्ट्रक्चर और पहाड़िया वाराणसी स्थित सेंटर की जानकारी दे सकता हूँ। आप किस समस्या पर चर्चा करना चाहते हैं?"
  },
  {
    keywords: ['term', 'privacy', 'refund', 'cancellation', 'policy', 'niyam', 'paisaa', 'wapas'],
    response: "Our terms specify standard medical waivers, a strict no-refund policy, and package freeze options in case of medical emergency or travel. View full details on our /terms and /privacy pages.",
    responseHindi: "हमारे नियमों के अनुसार फीस रीफंडेबल नहीं है। हालांकि, गंभीर चिकित्सकीय कारणों या यात्रा के दौरान, आप मैनेजमेंट की अनुमति से अपनी मेंबरशिप कुछ समय के लिए फ्रीज (होल्ड) करवा सकते हैं।"
  }
];

export default function TapasAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' (English) or 'hi' (Hindi)
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Namaste! 🙏 I am Tapas Assistant, your clinical yoga guide. You can type your query below, click a suggestion, or tap the microphone to speak with me.\n\nAsk me about back pain, thyroid, classes timings, Panchakarma, or pricing!"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(false);
  const [isSpeakSupported, setIsSpeakSupported] = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [socialLinks, setSocialLinks] = useState({
    whatsapp: '916394554685',
    facebook: 'https://facebook.com/tapasyogavaranasi',
    instagram: 'https://instagram.com/tapasyogavaranasi',
    youtube: 'https://youtube.com/@tapasyogavaranasi',
    email: 'contact@tapasyoga.in'
  });

  // Load language and sound settings from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem('tapas_assistant_lang');
    if (storedLang === 'hi' || storedLang === 'en') {
      setLang(storedLang);
      // Update greeting message to match the loaded language
      const welcomeMsg = storedLang === 'hi'
        ? "नमस्ते! 🙏 मैं तपस असिस्टेंट हूँ, आपका क्लीनिकल योग गाइड। आप नीचे टाइप कर सकते हैं, सजेशन पर क्लिक कर सकते हैं, या माइक बटन दबाकर बात कर सकते हैं।\n\nमुझसे कमर दर्द, थायराइड, क्लासेस के समय, पंचकर्म या फीस के बारे में पूछें!"
        : "Namaste! 🙏 I am Tapas Assistant, your clinical yoga guide. You can type your query below, click a suggestion, or tap the microphone to speak with me.\n\nAsk me about back pain, thyroid, classes timings, Panchakarma, or pricing!";
      setMessages([{ sender: 'assistant', text: welcomeMsg }]);
    }
  }, []);

  // Fetch settings from server configuration
  useEffect(() => {
    fetch('/api/offers')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setSocialLinks({
            whatsapp: res.data.whatsapp_phone || '916394554685',
            facebook: res.data.facebook_link || 'https://facebook.com/tapasyogavaranasi',
            instagram: res.data.instagram_link || 'https://instagram.com/tapasyogavaranasi',
            youtube: res.data.youtube_link || 'https://youtube.com/@tapasyogavaranasi',
            email: res.data.contact_email || 'contact@tapasyoga.in'
          });
        }
      })
      .catch(err => console.error('Error fetching chatbot settings:', err));
  }, []);

  // Initialize Web Speech APIs client-side
  useEffect(() => {
    // 1. Check Speech Recognition Support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsMicSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; // Dynamically bind languages

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleSend(transcript);
        }
      };

      rec.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    // 2. Check Speech Synthesis Support
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSpeakSupported(true);
      // Pre-warm voices for instant playback on first user gesture
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
      // Load saved preferences
      const stored = localStorage.getItem('tapas_assistant_sound');
      setIsSoundOn(stored !== 'false');
    }
  }, [lang]); // Reinitialize recognition language when lang state changes

  // Scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice Output supporting both English and Hindi synthesis Engines
  const speak = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !isSoundOn) return;

    // Cancel active speech
    window.speechSynthesis.cancel();

    // Clean markdown formatting & emojis
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold asterisks
      .replace(/[*\-_#`~[\]()]/g, '')   // Remove other formatting characters
      .replace(/₹/g, lang === 'hi' ? ' रुपये ' : ' Rupees ')
      .replace(/🌅|🌇|📍|📞|📧|🙏|💻|🏥|🧘‍♀️|🦴|🌿|💵|🌱/g, '') // Remove emojis
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();

    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
      // Prioritize native Hindi voices (like Google hi-IN or macOS Lekha)
      const targetVoice = voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('lekha'))
                          || voices.find(v => v.lang.includes('IN'))
                          || voices[0];
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    } else {
      utterance.lang = 'en-IN';
      // Prioritize Indian English voices
      const targetVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'))
                          || voices.find(v => v.lang.startsWith('en'))
                          || voices[0];
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    }

    utterance.rate = lang === 'hi' ? 0.98 : 0.95; // Serene, calm pace
    utterance.pitch = 1.02; // Warm tone

    window.speechSynthesis.speak(utterance);
  };

  // Speak the latest assistant message (welcome greeting or reply) when assistant is opened
  useEffect(() => {
    if (isOpen) {
      const lastAssistantMsg = [...messages].reverse().find(m => m.sender === 'assistant');
      if (lastAssistantMsg) {
        // Serene delay to allow drawer opening animation to complete
        const timer = setTimeout(() => {
          speak(lastAssistantMsg.text);
        }, 400);
        return () => clearTimeout(timer);
      }
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  // Toggle Sound Preference
  const handleToggleSound = () => {
    setIsSoundOn(prev => {
      const nextVal = !prev;
      localStorage.setItem('tapas_assistant_sound', String(nextVal));
      if (!nextVal && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return nextVal;
    });
  };

  // Toggle Language preference
  const handleToggleLang = () => {
    setLang(prev => {
      const nextLang = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('tapas_assistant_lang', nextLang);

      // Stop speech
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Reset conversation with the translated greeting
      const welcomeMsg = nextLang === 'hi'
        ? "नमस्ते! 🙏 मैं तपस असिस्टेंट हूँ, आपका क्लीनिकल योग गाइड। आप नीचे टाइप कर सकते हैं, सजेशन पर क्लिक कर सकते हैं, या माइक बटन दबाकर बात कर सकते हैं।\n\nमुझसे कमर दर्द, थायराइड, क्लासेस के समय, पंचकर्म या फीस के बारे में पूछें!"
        : "Namaste! 🙏 I am Tapas Assistant, your clinical yoga guide. You can type your query below, click a suggestion, or tap the microphone to speak with me.\n\nAsk me about back pain, thyroid, classes timings, Panchakarma, or pricing!";

      setMessages([{ sender: 'assistant', text: welcomeMsg }]);

      // Silently unlock speech context for the new language settings
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSoundOn) {
        const unlockUtterance = new SpeechSynthesisUtterance(' ');
        unlockUtterance.volume = 0;
        window.speechSynthesis.speak(unlockUtterance);
      }

      return nextLang;
    });
  };

  // Trigger Speech Recognition (Microphone)
  const handleToggleMic = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel(); // Stop talking before listening
      }
      recognitionRef.current.start();
    }
  };

  // Clear/Reset Chat
  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const resetMsg = lang === 'hi'
      ? "प्रणाम! 🙏 चलिए फिर से शुरू करते हैं। मैं आपके थेरेपी, क्लासेस के समय, फीस या पंचकर्म डिटॉक्स के बारे में क्या मदद कर सकता हूँ?"
      : "Pranam! 🙏 Let's start over. What clinical yoga classes, timings, pricing, or Panchakarma therapies can I help you with?";

    setMessages([
      {
        sender: 'assistant',
        text: resetMsg
      }
    ]);
  };

  // Intelligent Keyword Matcher supporting translation fallbacks
  const findResponse = (query) => {
    const cleanQuery = query.toLowerCase().trim();
    let bestMatch = null;
    let maxMatches = 0;
    let matchedRule = null;

    for (const rule of KEYWORD_RESPONSES) {
      let matchCount = 0;
      for (const kw of rule.keywords) {
        if (cleanQuery.includes(kw)) {
          matchCount++;
        }
      }
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = rule;
      }
    }

    const defaultResponse = "Thank you for asking. At TAPAS Yoga, we focus on clinical yoga therapy for chronic ailments (spine, thyroid, diabetes), Ayurvedic Panchakarma, and Naturopathy treatments.\n\nCould you please specify your health concern? Alternatively, you can speak to our expert advisor at **[WHATSAPP_PHONE_FORMATTED]**!";
    const defaultResponseHindi = "पूछने के लिए धन्यवाद। तपस योग में हम क्रॉनिक बीमारियों जैसे रीढ़ की हड्डी के दर्द (कमर दर्द), थायराइड और डायबिटीज के लिए योग थेरेपी, पंचकर्म और नेचुरोपैथी उपचार देते हैं।\n\nकृपया अपनी बीमारी के बारे में बताएं। या आप सीधे व्हाट्सएप पर **[WHATSAPP_PHONE_FORMATTED]** पर हमारे सलाहकार से संपर्क कर सकते हैं!";

    let responseText = '';
    if (bestMatch) {
      responseText = lang === 'hi' ? bestMatch.responseHindi : bestMatch.response;
    } else {
      responseText = lang === 'hi' ? defaultResponseHindi : defaultResponse;
    }

    const formatPhoneNumber = (phone) => {
      if (!phone) return '+91 63945 54685';
      const clean = phone.replace(/[^0-9]/g, '');
      if (clean.length === 12) {
        return `+${clean.slice(0, 2)} ${clean.slice(2, 7)} ${clean.slice(7)}`;
      }
      return `+${clean}`;
    };

    // Interpolate placeholders
    return responseText
      .replace(/\[WHATSAPP_PHONE_FORMATTED\]/g, formatPhoneNumber(socialLinks.whatsapp))
      .replace(/\[WHATSAPP_PHONE_RAW\]/g, socialLinks.whatsapp)
      .replace(/\[CONTACT_EMAIL\]/g, socialLinks.email);
  };

  // Handle message submission
  const handleSend = (textToSend) => {
    const queryText = textToSend || inputVal;
    if (!queryText.trim()) return;

    // Synchronously unlock SpeechSynthesis for asynchronous timeout execution
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSoundOn) {
      const unlockUtterance = new SpeechSynthesisUtterance(' ');
      unlockUtterance.volume = 0;
      window.speechSynthesis.speak(unlockUtterance);
    }

    // Append user message
    setMessages(prev => [...prev, { sender: 'user', text: queryText }]);
    setInputVal('');
    setIsTyping(true);

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Process and respond with simulated serene breathing delay
    setTimeout(() => {
      const response = findResponse(queryText);
      setMessages(prev => [...prev, { sender: 'assistant', text: response }]);
      setIsTyping(false);
      speak(response);
    }, 750);
  };

  // Quick chips actions
  const handleChipClick = (text) => {
    handleSend(text);
  };

  // Simple Markdown Parser for UI Bubble rendering
  const parseMessageText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, idx) => {
      // Replace bold markdown with strong elements
      let html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <div 
          key={idx} 
          className={styles.msgLine}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Bubble Button (Bottom-Left) */}
      <button 
        className={`${styles.launcher} ${isOpen ? styles.launcherOpen : ''}`} 
        onClick={() => {
          const nextOpen = !isOpen;
          setIsOpen(nextOpen);
          if (nextOpen && typeof window !== 'undefined' && 'speechSynthesis' in window && isSoundOn) {
            // Synchronously unlock speech synthesis on user interaction
            const unlockUtterance = new SpeechSynthesisUtterance(' ');
            unlockUtterance.volume = 0;
            window.speechSynthesis.speak(unlockUtterance);
          }
        }}
        aria-label="Open Tapas Assistant Chatbot"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} className={styles.botIcon} />}
        {!isOpen && <span className={styles.launcherPulse} />}
      </button>

      {/* Chat Drawer Widget */}
      {isOpen && (
        <div className={`${styles.chatDrawer} glass-card`}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerTitleBox}>
              <div className={styles.avatar}>
                <Bot size={18} />
              </div>
              <div>
                <h4>{lang === 'hi' ? "तपस असिस्टेंट" : "Tapas Assistant"}</h4>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span>{lang === 'hi' ? "क्लिनिकल योग गाइड" : "Clinical Yoga Guide"}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.headerActions}>
              {/* Language Selector (Bilingual Toggle) */}
              <button 
                onClick={handleToggleLang} 
                className={styles.langToggleBtn}
                title={lang === 'en' ? " Switch to Hindi (हिंदी)" : "Switch to English"}
                aria-label={lang === 'en' ? "Switch to Hindi (हिंदी)" : "Switch to English"}
              >
                <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
                <span className={styles.langDivider}>|</span>
                <span className={lang === 'hi' ? styles.langActive : ''}>हिं</span>
              </button>

              {/* Reset Chat */}
              <button 
                onClick={handleReset} 
                className={styles.actionIconBtn} 
                title="Reset Chat"
                aria-label="Reset Chat"
              >
                <RotateCcw size={15} />
              </button>

              {/* Sound Toggle */}
              {isSpeakSupported && (
                <button 
                  onClick={handleToggleSound} 
                  className={styles.actionIconBtn} 
                  title={isSoundOn ? "Turn off sound response" : "Turn on sound response"}
                  aria-label={isSoundOn ? "Turn off sound response" : "Turn on sound response"}
                >
                  {isSoundOn ? <Volume2 size={16} className={styles.greenText} /> : <VolumeX size={16} />}
                </button>
              )}

              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className={styles.actionIconBtn} 
                title="Close Assistant"
                aria-label="Close Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className={styles.chatBody}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`${styles.msgRow} ${msg.sender === 'user' ? styles.userRow : styles.assistantRow}`}
              >
                <div className={styles.bubble}>
                  {parseMessageText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={`${styles.msgRow} ${styles.assistantRow}`}>
                <div className={`${styles.bubble} ${styles.typingBubble}`}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips (Localized based on active language) */}
          <div className={styles.chipsRow}>
            {lang === 'hi' ? (
              <>
                <button onClick={() => handleChipClick("classes and timings")} className={styles.chipBtn}>
                  🧘‍♀️ स्लॉट्स और समय
                </button>
                <button onClick={() => handleChipClick("back pain therapy")} className={styles.chipBtn}>
                  🦴 रीढ़ की थेरेपी
                </button>
                <button onClick={() => handleChipClick("panchakarma detox")} className={styles.chipBtn}>
                  🌿 पंचकर्म डिटॉक्स
                </button>
                <button onClick={() => handleChipClick("fees and packages")} className={styles.chipBtn}>
                  💵 फीस और पैकेजेस
                </button>
                <button onClick={() => handleChipClick("naturopathy natural cure")} className={styles.chipBtn}>
                  🌱 नेचुरोपैथी
                </button>
                <button onClick={() => handleChipClick("center map location")} className={styles.chipBtn}>
                  📍 पहाड़िया सेंटर
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleChipClick("timings and schedule")} className={styles.chipBtn}>
                  🧘‍♀️ Slots & Timings
                </button>
                <button onClick={() => handleChipClick("back pain and spine")} className={styles.chipBtn}>
                  🦴 Spine Therapy
                </button>
                <button onClick={() => handleChipClick("panchakarma detox")} className={styles.chipBtn}>
                  🌿 Panchakarma
                </button>
                <button onClick={() => handleChipClick("pricing and fees")} className={styles.chipBtn}>
                  💵 Pricing Plans
                </button>
                <button onClick={() => handleChipClick("naturopathy mud bath")} className={styles.chipBtn}>
                  🌱 Naturopathy
                </button>
                <button onClick={() => handleChipClick("center location address")} className={styles.chipBtn}>
                  📍 Paharia Center
                </button>
              </>
            )}
          </div>

          {/* Footer Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className={styles.chatInputRow}
          >
            {isMicSupported && (
              <button 
                type="button" 
                onClick={handleToggleMic} 
                className={`${styles.micBtn} ${isListening ? styles.micActive : ''}`}
                title={isListening ? "Listening... Click to stop" : "Speak to Tapas Assistant"}
                aria-label={isListening ? "Listening... Click to stop" : "Speak to Tapas Assistant"}
              >
                {isListening ? <Mic size={18} className={styles.micPulseIcon} /> : <MicOff size={18} />}
              </button>
            )}
            
            <input 
              type="text" 
              placeholder={isListening ? (lang === 'hi' ? "सुन रहा हूँ... बोलिए..." : "Listening... Speak now...") : (lang === 'hi' ? "क्लासेस, थेरेपी, फीस के बारे में पूछें..." : "Ask about classes, therapy, timings...")}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className={styles.textInput}
              disabled={isListening}
            />

            <button 
              type="submit" 
              className={styles.sendBtn}
              disabled={!inputVal.trim() || isListening}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

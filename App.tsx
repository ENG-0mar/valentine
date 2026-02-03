
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStep, MainTab } from './types';
import FloatingHearts from './components/FloatingHearts';
import IntroStep from './components/IntroStep';
import ValentineAsk from './components/ValentineAsk';
import LoveAsk from './components/LoveAsk';
import LoveLetter from './components/LoveLetter';
import ValentineGame from './components/ValentineGame';
import { generateCompliment } from './services/geminiService';
import { HeartIcon } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [activeTab, setActiveTab] = useState<MainTab>(MainTab.HOME);
  const [compliment, setCompliment] = useState<string>('كلام لجوجو تستاهله و تستاهل اكتر منه ');
  const [loadingCompliment, setLoadingCompliment] = useState(false);

  const fetchCompliment = async () => {
    setLoadingCompliment(true);
    const text = await generateCompliment();
    setCompliment(text);
    setLoadingCompliment(false);
  };

  useEffect(() => {
    if (step === AppStep.MAIN_SITE) {
      fetchCompliment();
    }
  }, [step]);

  const renderMainContent = () => {
    const tabVariants = {
      initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      enter: { opacity: 1, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" }
    };

    switch (activeTab) {
      case MainTab.HOME:
        return (
          <motion.div 
            key="home"
            variants={tabVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center min-h-[75vh] px-4"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-arabic-romance text-rose-500 mb-8 leading-tight text-center"
            >
             تعالي نلعب الاول 
            </motion.h1>
            
            <ValentineGame 
              onWin={fetchCompliment} 
              compliment={compliment} 
              loading={loadingCompliment} 
            />
          </motion.div>
        );
      case MainTab.LETTER:
        return (
          <motion.div 
            key="letter"
            variants={tabVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <LoveLetter />
          </motion.div>
        );
    }
  };

  return (
    <div className="relative min-h-screen transition-colors duration-1000">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {step === AppStep.INTRO && (
          <motion.div key="intro" exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 1 }}>
            <IntroStep onStart={() => setStep(AppStep.VALENTINE_ASK)} />
          </motion.div>
        )}

        {step === AppStep.VALENTINE_ASK && (
          <motion.div 
            key="vask"
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ValentineAsk onAccept={() => setStep(AppStep.LOVE_ASK)} />
          </motion.div>
        )}

        {step === AppStep.LOVE_ASK && (
          <motion.div 
            key="lask"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
          >
            <LoveAsk onAccept={() => setStep(AppStep.MAIN_SITE)} />
          </motion.div>
        )}

        {step === AppStep.MAIN_SITE && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="pb-40"
          >
            {/* Nav */}
            <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm">
              <div className="glass-nav rounded-[3rem] px-10 py-6 flex justify-around items-center shadow-2xl shadow-rose-200/50">
                <button 
                  onClick={() => setActiveTab(MainTab.HOME)}
                  className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === MainTab.HOME ? 'text-rose-500 scale-110' : 'text-rose-300 hover:text-rose-400'}`}
                >
                  <HeartIcon className={`w-7 h-7 ${activeTab === MainTab.HOME ? 'fill-rose-500 drop-shadow-md' : 'opacity-60'}`} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Main Page</span>
                </button>
                <div className="w-px h-8 bg-rose-100 opacity-50"></div>
                <button 
                  onClick={() => setActiveTab(MainTab.LETTER)}
                  className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${activeTab === MainTab.LETTER ? 'text-rose-500 scale-110' : 'text-rose-300 hover:text-rose-400'}`}
                >
                  <svg className={`w-7 h-7 ${activeTab === MainTab.LETTER ? 'opacity-100' : 'opacity-60'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Letter for 7abibty</span>
                </button>
              </div>
            </nav>

            <div className="container mx-auto">
              <AnimatePresence mode="wait">
                {renderMainContent()}
              </AnimatePresence>
            </div>
            
            <footer className="text-center py-20">
              <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                <p className="font-arabic-romance text-2xl text-rose-900">Kisses for uuuuuuu</p>
              </motion.div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

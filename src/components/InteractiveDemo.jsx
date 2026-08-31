import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, MicOff, CheckCircle2, RefreshCw, Smartphone, Monitor, Database, Plus, Trash2, HelpCircle } from 'lucide-react';

export default function InteractiveDemo() {
  const { t, locale } = useLanguage();
  
  // Hardcoded Initial State for the Collective Yield Pool
  const [crops, setCrops] = useState([
    { id: '1', cropName: 'French Beans', category: 'cultivated', dataCategory: 'Core Veg', poolGrams: 1200, targetGrams: 3000 },
    { id: '2', cropName: 'Carrots', category: 'cultivated', dataCategory: 'Base', poolGrams: 5200, targetGrams: 5000 },
    { id: '3', cropName: 'Wild Amaranth', category: 'foraged', dataCategory: 'Greens', poolGrams: 400, targetGrams: 500 },
    { id: '4', cropName: 'Turmeric', category: 'cultivated', dataCategory: 'Condiments', poolGrams: 200, targetGrams: 1000 },
    { id: '5', cropName: 'Ecosystem Berries', category: 'foraged', dataCategory: 'Herbs/Exotics', poolGrams: 1300, targetGrams: 1000 }
  ]);

  // Voice simulator States
  const [activePreset, setActivePreset] = useState(null);
  const [micState, setMicState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'success'
  const [voiceLogContent, setVoiceLogContent] = useState('');
  const [normalizedResult, setNormalizedResult] = useState(null);

  // Help widget toggle
  const [showHelp, setShowHelp] = useState(false);

  // Preset Configurations for User Clicking
  const presets = [
    {
      id: 'beans',
      textEn: 'Today, I harvested 2.5 kg of raw beans from bed 4.',
      textKn: 'ಇಂದು ಬೆಡ್ 4 ರಿಂದ 2.5 ಕೆಜಿ ಹಸಿರು ಹುರುಳಿಕಾಯಿ ಕಟಾವು ಮಾಡಿದ್ದೇನೆ.',
      crop: 'French Beans',
      category: 'cultivated',
      dataCategory: 'Core Veg',
      valueGrams: 2500,
      notes: 'Harvested from bed 4'
    },
    {
      id: 'turmeric',
      textEn: 'Harvested 900 grams of turmeric from plot 2.',
      textKn: 'ಪ್ಲಾಟ್ 2 ರಿಂದ 900 ಗ್ರಾಂ ಅರಿಶಿನ ಕಟಾವು ಮಾಡಿದ್ದೇನೆ.',
      crop: 'Turmeric',
      category: 'cultivated',
      dataCategory: 'Condiments',
      valueGrams: 900,
      notes: 'Harvested from plot 2'
    },
    {
      id: 'amaranth',
      textEn: 'Gathered 300 grams of wild amaranth from the stream borders.',
      textKn: 'ಹೊಲದ ಅಂಚಿನ ಹಳ್ಳದ ಬದಿಯಿಂದ 300 ಗ್ರಾಂ ಕಾಡು ಕೀರೆಸೊಪ್ಪು ಸಂಗ್ರಹಿಸಿದೆ.',
      crop: 'Wild Amaranth',
      category: 'foraged',
      dataCategory: 'Greens',
      valueGrams: 300,
      notes: 'Gathered from stream borders'
    }
  ];

  // Triggers simulation sequence when user clicks a voice log
  const handlePresetSelect = (preset) => {
    if (micState === 'listening' || micState === 'processing') return;
    
    setActivePreset(preset);
    setMicState('listening');
    setVoiceLogContent(locale === 'en' ? preset.textEn : preset.textKn);

    // Timeline Simulation
    setTimeout(() => {
      setMicState('processing');
    }, 2000);

    setTimeout(() => {
      setMicState('success');
      const result = {
        crop: preset.crop,
        grams: preset.valueGrams,
        category: preset.category,
        notes: preset.notes
      };
      setNormalizedResult(result);

      // Reactively update the dashboard table metrics
      setCrops(prevCrops => {
        return prevCrops.map(item => {
          if (item.cropName === preset.crop) {
            return {
              ...item,
              poolGrams: item.poolGrams + preset.valueGrams
            };
          }
          return item;
        });
      });
    }, 3800);
  };

  const handleReset = () => {
    setCrops([
      { id: '1', cropName: 'French Beans', category: 'cultivated', dataCategory: 'Core Veg', poolGrams: 1200, targetGrams: 3000 },
      { id: '2', cropName: 'Carrots', category: 'cultivated', dataCategory: 'Base', poolGrams: 5200, targetGrams: 5000 },
      { id: '3', cropName: 'Wild Amaranth', category: 'foraged', dataCategory: 'Greens', poolGrams: 400, targetGrams: 500 },
      { id: '4', cropName: 'Turmeric', category: 'cultivated', dataCategory: 'Condiments', poolGrams: 200, targetGrams: 1000 },
      { id: '5', cropName: 'Ecosystem Berries', category: 'foraged', dataCategory: 'Herbs/Exotics', poolGrams: 1300, targetGrams: 1000 }
    ]);
    setActivePreset(null);
    setMicState('idle');
    setVoiceLogContent('');
    setNormalizedResult(null);
  };

  // Status helper based on kaithota.md criteria
  const getStatus = (pool, target) => {
    if (pool < target) return { label: 'Deficit', class: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (pool >= target * 1.2) return { label: 'Surplus', class: 'bg-blue-100 text-blue-900 border-blue-300' };
    return { label: 'Target Met', class: 'bg-green-100 text-green-900 border-green-300' };
  };

  // Dispatch logic (simulates shipping deliveries, reactively reducing available pool)
  const handleDispatch = (id, gramsToDispatch) => {
    setCrops(prevCrops => {
      return prevCrops.map(item => {
        if (item.id === id) {
          const newWeight = Math.max(0, item.poolGrams - gramsToDispatch);
          return { ...item, poolGrams: newWeight };
        }
        return item;
      });
    });
  };

  // KPI Calculations
  const totalYieldRegisteredKg = (crops.reduce((acc, c) => acc + c.poolGrams, 0) / 1000).toFixed(1);
  const activeFarmersCount = 48 + (micState === 'success' ? 1 : 0);
  const totalTargetsMet = crops.filter(c => c.poolGrams >= c.targetGrams).length;
  const fulfillmentRate = ((totalTargetsMet / crops.length) * 100).toFixed(0);

  return (
    <section id="demo" className="bg-linen py-16 md:py-24 border-b border-linen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-earth font-semibold">Live Sandbox Platform</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-earth">
            {t('demo.title')}
          </h2>
          <p className="text-base text-charcoal/70">
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Phone Simulator (Farmer Voice UI) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4 text-xs font-mono text-charcoal/60 uppercase">
              <Smartphone className="w-4 h-4" />
              <span>{t('demo.phone.title')}</span>
            </div>

            {/* Smart Phone Shell */}
            <div className="w-[310px] h-[600px] bg-charcoal rounded-[40px] p-3 shadow-2xl border-4 border-charcoal/90 relative overflow-hidden flex flex-col">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-charcoal rounded-b-xl z-20 flex justify-center items-center">
                <div className="w-3 h-3 bg-earth/30 rounded-full"></div>
              </div>

              {/* Phone Internal Screen */}
              <div className="flex-1 bg-linen rounded-[32px] p-4 pt-8 flex flex-col justify-between overflow-y-auto relative text-sm select-none">
                
                {/* Header Info */}
                <div className="flex justify-between items-center text-[10px] font-mono text-charcoal/50 border-b border-linen-dark pb-2 mb-4">
                  <span>OPERATOR: COLLECTIVE_01</span>
                  <span>📶 OFFLINE</span>
                </div>

                {/* Main Mic Interface Area */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  
                  {/* Glowing microphone indicator */}
                  <div className="relative">
                    {micState === 'listening' && (
                      <span className="absolute inset-0 rounded-full bg-olive/35 animate-ping"></span>
                    )}
                    {micState === 'processing' && (
                      <span className="absolute inset-0 rounded-full bg-earth/25 animate-spin border-t-2 border-earth"></span>
                    )}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-inner transition-all duration-300 ${
                      micState === 'listening' ? 'bg-olive text-linen border-olive' :
                      micState === 'processing' ? 'bg-earth/10 text-earth border-earth/20' :
                      micState === 'success' ? 'bg-green-600 text-linen border-green-600' :
                      'bg-linen-dark text-earth border-earth/10 hover:bg-linen-dark/80 cursor-pointer'
                    }`}>
                      {micState === 'success' ? (
                        <CheckCircle2 className="w-10 h-10" />
                      ) : (
                        <Mic className={`w-10 h-10 ${micState === 'listening' ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Status labels */}
                  <div className="text-center space-y-1">
                    <span className="font-mono text-[10px] uppercase text-charcoal/50 tracking-wider">Status</span>
                    <p className="font-serif font-bold text-earth text-sm">
                      {micState === 'idle' && t('demo.phone.status')}
                      {micState === 'listening' && t('demo.phone.listening')}
                      {micState === 'processing' && t('demo.phone.processing')}
                      {micState === 'success' && t('demo.phone.success')}
                    </p>
                  </div>

                  {/* Transcript Display Box */}
                  <div className="w-full min-h-[90px] bg-[#FAF9F5] border border-earth/10 rounded-lg p-3 text-xs leading-relaxed text-charcoal/80 italic font-mono flex items-center justify-center text-center">
                    {voiceLogContent || "Audio waveform awaits input. Select a preset log below to trigger..."}
                  </div>
                </div>

                {/* Simulated Parser Output */}
                {normalizedResult && (
                  <div className="bg-olive/10 border border-olive/20 rounded-lg p-3 mt-4 text-xs space-y-2 animate-fadeIn">
                    <span className="font-mono font-bold text-olive text-[10px] uppercase block tracking-wider">
                      {t('demo.phone.parsedResult')}
                    </span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-charcoal/80">
                      <div>{t('demo.phone.crop')}:</div>
                      <div className="font-bold text-earth">{normalizedResult.crop}</div>
                      <div>{t('demo.phone.weight')}:</div>
                      <div className="font-bold text-earth">{normalizedResult.grams} g</div>
                      <div>{t('demo.phone.notes')}:</div>
                      <div className="font-bold text-earth text-[10px] line-clamp-1">{normalizedResult.notes}</div>
                    </div>
                  </div>
                )}

                {/* Presets List */}
                <div className="mt-4 pt-4 border-t border-linen-dark space-y-2">
                  <span className="text-[10px] font-mono font-semibold text-charcoal/60 uppercase block">
                    {t('demo.phone.placeholderText')}
                  </span>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {presets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        disabled={micState === 'listening' || micState === 'processing'}
                        className={`w-full text-left p-2 rounded text-[11px] leading-tight border transition-all ${
                          activePreset?.id === preset.id
                            ? 'bg-earth text-linen border-earth'
                            : 'bg-linen-dark/50 hover:bg-linen-dark border-earth/5 text-charcoal/80'
                        }`}
                      >
                        {locale === 'en' ? preset.textEn : preset.textKn}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Laptop Frame (Cooperative Hub Dashboard) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-charcoal/60 uppercase">
                <Monitor className="w-4 h-4" />
                <span>{t('demo.hub.title')}</span>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center space-x-1 text-xs text-earth hover:text-olive font-semibold transition-all border border-earth/25 hover:border-earth rounded px-2.5 py-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Sandbox Data</span>
              </button>
            </div>

            {/* Hub Dashboard Shell */}
            <div className="w-full bg-[#FCFAF6] border border-earth/15 rounded-lg shadow-xl overflow-hidden flex flex-col min-h-[550px]">
              
              {/* Dashboard Browser Header bar */}
              <div className="bg-linen-dark px-4 py-3 border-b border-earth/10 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="text-[11px] font-mono text-charcoal/65 pl-4">hub.buffalobacklabs.coop/fulfillment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-olive/10 text-olive font-bold">STAGING CONNECTION</span>
                  <button 
                    onClick={() => setShowHelp(!showHelp)}
                    className="p-1 rounded hover:bg-earth/5 text-earth/80"
                    title="In-App Help Center"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Header Widget (Alert Context) */}
              {showHelp && (
                <div className="bg-earth text-linen p-4 text-xs font-mono border-b border-earth/10 space-y-2 animate-fadeIn relative">
                  <h4 className="font-serif font-bold text-sm tracking-wide">💡 BBL Operator Documentation Panel</h4>
                  <p className="leading-relaxed opacity-90">
                    This simulated screen aggregates deliveries logged by farmers via local language voice messages.
                    To experience real-time calculations:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 opacity-90">
                    <li>Select a preset on the phone simulator and wait for it to process.</li>
                    <li>Observe the <strong>Communal Pool Balance</strong> adjust natively in Grams.</li>
                    <li>Check row statuses shifting from <strong>Deficit (Amber)</strong> to <strong>Target Met (Green)</strong> or <strong>Surplus (Blue)</strong>.</li>
                    <li>Click <strong>[Dispatch 500g]</strong> in the right-hand action column to dispatch products to Community Supported Agriculture packages and watch the pool reactively decrease.</li>
                  </ul>
                  <button 
                    onClick={() => setShowHelp(false)} 
                    className="absolute top-2 right-4 text-sm font-bold opacity-60 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Dashboard Content */}
              <div className="p-6 flex-1 flex flex-col space-y-6">
                
                {/* KPI Summarizer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="border border-earth/10 rounded-lg p-4 bg-[#FAF9F5] shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-charcoal/65 block">{t('demo.hub.kpiYield')}</span>
                    <div className="flex items-baseline space-x-1.5 mt-1">
                      <span className="font-serif text-2xl font-bold text-earth">{totalYieldRegisteredKg}</span>
                      <span className="text-xs text-charcoal/60 font-mono">kg</span>
                    </div>
                  </div>

                  <div className="border border-earth/10 rounded-lg p-4 bg-[#FAF9F5] shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-charcoal/65 block">{t('demo.hub.kpiFulfillment')}</span>
                    <div className="flex items-baseline space-x-1.5 mt-1">
                      <span className="font-serif text-2xl font-bold text-earth">{fulfillmentRate}%</span>
                      <span className="text-xs text-charcoal/60 font-mono">of targets</span>
                    </div>
                  </div>

                  <div className="border border-earth/10 rounded-lg p-4 bg-[#FAF9F5] shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-charcoal/65 block">{t('demo.hub.kpiActiveFarmers')}</span>
                    <div className="flex items-baseline space-x-1.5 mt-1">
                      <span className="font-serif text-2xl font-bold text-earth">{activeFarmersCount}</span>
                      <span className="text-xs text-charcoal/60 font-mono">registered</span>
                    </div>
                  </div>

                </div>

                {/* Main Yield Distribution Table */}
                <div className="flex-1 flex flex-col border border-earth/10 rounded-lg bg-[#FAF9F5] overflow-hidden">
                  <div className="bg-linen-dark/65 px-4 py-2 border-b border-earth/10 flex justify-between items-center">
                    <span className="font-serif font-bold text-xs text-earth">{t('demo.hub.activePlots')}</span>
                    <span className="font-mono text-[9px] text-charcoal/50">COORDINATE MAPPING: PLOT_ACTIVE_02</span>
                  </div>

                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-earth/10 text-charcoal/60 font-mono uppercase text-[9px] bg-linen-dark/25">
                          <th className="p-3 pl-4">{t('demo.hub.crop')}</th>
                          <th className="p-3">{t('demo.hub.category')}</th>
                          <th className="p-3">{t('demo.hub.availablePool')}</th>
                          <th className="p-3">{t('demo.hub.normalizedWeight')}</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-earth/5 font-sans">
                        {crops.map((crop) => {
                          const status = getStatus(crop.poolGrams, crop.targetGrams);
                          const isForaged = crop.category === 'foraged';
                          
                          return (
                            <tr key={crop.id} className="hover:bg-linen-dark/20 transition-all">
                              <td className="p-3 pl-4 font-serif font-bold text-earth flex items-center space-x-1.5">
                                <span>{crop.cropName}</span>
                                {isForaged && (
                                  <span className="text-[8px] font-mono tracking-wider font-semibold bg-olive/10 text-olive border border-olive/15 px-1.5 py-0.5 rounded">
                                    {t('demo.hub.wildBadge')}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-charcoal/70 font-mono text-[11px]">{crop.dataCategory}</td>
                              <td className="p-3 font-mono font-semibold">{(crop.poolGrams / 1000).toFixed(2)} kg</td>
                              <td className="p-3 text-charcoal/60 font-mono">{crop.poolGrams.toLocaleString()} g</td>
                              <td className="p-3">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${status.class}`}>
                                  {status.label.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-3 text-right pr-4">
                                <button
                                  onClick={() => handleDispatch(crop.id, 500)}
                                  disabled={crop.poolGrams === 0}
                                  className="text-[10px] px-2 py-1 rounded bg-earth text-linen hover:bg-earth-dark disabled:bg-charcoal/10 disabled:text-charcoal/40 font-mono font-bold transition-all"
                                >
                                  Dispatch 500g
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
              
              {/* Bottom status bar */}
              <div className="bg-linen-dark/40 px-4 py-2 border-t border-earth/10 flex justify-between items-center text-[10px] font-mono text-charcoal/50">
                <div className="flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-olive" />
                  <span>LOCAL CACHE SYNCHRONIZATION: CURRENT (100%)</span>
                </div>
                <span>AUDIT SECURE / STANDBY</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

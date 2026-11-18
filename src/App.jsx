import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import Research from './components/Research';
import About from './components/About';
import Ecosystem from './components/Ecosystem';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-[#FAF6F0] text-[#222222] font-sans antialiased selection:bg-[#1B2A4A]/20 selection:text-[#1B2A4A]">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Products />
          <Services />
          <Research />
          <About />
          <Ecosystem />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
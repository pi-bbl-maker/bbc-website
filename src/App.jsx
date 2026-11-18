import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
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
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-canvas-light text-ink-light dark:bg-canvas-dark dark:text-ink-dark transition-colors duration-200">
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
    </ThemeProvider>
  );
}
import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Ecosystem from './components/Ecosystem';
import Pitch from './components/Pitch';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-linen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Problem />
          <Ecosystem />
          <Pitch />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

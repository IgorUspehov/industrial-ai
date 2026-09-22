import { LanguageProvider } from '@/i18n';
import { Hero } from '@/components/sections/Hero';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { YourEnterprise } from '@/components/sections/YourEnterprise';
import { SpecificAI } from '@/components/sections/SpecificAI';
import { FutureProduction } from '@/components/sections/FutureProduction';
import { Examples } from '@/components/sections/Examples';
import { LiveDemo } from '@/components/sections/LiveDemo';
import { AuditQuestionnaire } from '@/components/sections/AuditQuestionnaire';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <Hero />
        <WhatWeDo />
        <YourEnterprise />
        <SpecificAI />
        <FutureProduction />
        <Examples />
        <LiveDemo />
        <AuditQuestionnaire />
        <FinalCTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

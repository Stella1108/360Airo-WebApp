'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { CompactSidebar } from '@/components/sidebar';
import ComprehensiveDashboard from '@/components/dashboard';
import { PlaceholderPage } from '@/components/placeholder-page';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: '',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ComprehensiveDashboard />;
      default:
        return (
          <PlaceholderPage
            title={navTitle(activeTab)}
            subtitle="This section is coming soon."
          />
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#E8EDF6' }}>
      <Navbar user={user} />
      <CompactSidebar activeTab={activeTab} onTabChangeAction={setActiveTab}>
        {/* 🔥 reduced padding from p-6 md:p-8 to p-2 md:p-3 */}
        <div className="pt-[72px] p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </CompactSidebar>
    </div>
  );
}

const navLabels: Record<string, string> = {
  overview: 'Dashboard',
  campaigns: 'Campaigns',
  linkedin: 'LinkedIn',
  inbox: 'Inbox',
  data: 'Data',
  calendar: 'Calendar',
  accounts: 'Accounts',
  automation: 'Airo Intelligence',
  credits: 'Credits',
  help: 'Help',
};

function navTitle(id: string): string {
  return navLabels[id] ?? id;
}
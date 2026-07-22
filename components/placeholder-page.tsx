'use client';

import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
}

export function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-[24px] border border-slate-200/80 p-16 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <Construction size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Coming Soon</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          This section is being crafted with the same premium experience as the rest of 360Airo.
        </p>
      </motion.div>
    </div>
  );
}

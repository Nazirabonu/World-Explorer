import React from 'react';

interface StatCardProps {
  icon: string | React.ReactNode;
  label: string;
  value: string | number;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="relative overflow-hidden p-5 sm:p-6 flex flex-col bg-white dark:bg-slate-800/90 rounded-[24px] shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group h-full">
      {/* Decorative background element icon */}
      <div className="absolute right-[-20%] top-[-10%] opacity-[0.03] dark:opacity-[0.02] transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none w-32 h-32 flex items-center justify-center [&>*]:w-full [&>*]:h-full">
        {icon}
      </div>

      <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-blue-50/50 dark:bg-slate-900/60 rounded-[16px] mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm border border-gray-100/50 dark:border-white/5 [&>*]:w-6 [&>*]:h-6">
        {icon}
      </div>

      <div className="mt-auto relative z-10">
        <p className="text-[12px] sm:text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider line-clamp-2 md:line-clamp-1">{label}</p>
        <p className="text-base sm:text-[17px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug" title={String(value)}>{value}</p>
      </div>
    </div>
  );
}

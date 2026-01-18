import React from 'react';
import Sidebar from '../Common/Sidebar';
import MetricCard from './MetricCard';
import PredictiveInsights from './PredictiveInsights';
import WishlistGenerator from './WishlistGenerator';
import InventoryLogs from './InventoryLogs';

export default function InventoryDashboard() {
  return (
    <div className="flex h-screen bg-[#f8faf9] font-['Manrope'] overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Header Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Inventory & Resources</h2>
            <p className="text-sm text-gray-400">Real-time tracking for 124 residents across 4 care wings.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg font-bold text-sm text-gray-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span> Export Report
            </button>
            <button className="px-4 py-2 bg-[#3cc9e1] text-white rounded-lg font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span> Add New Item
            </button>
          </div>
        </div>

        {/* 1. Metrics Grid */}
        <div className="grid grid-cols-4 gap-6">
          <MetricCard icon="restaurant" title="Food & Nutrition" level={85} status="HEALTHY" color="#0d828c" />
          <MetricCard icon="medical_services" title="Medical Supplies" level={22} status="CRITICAL" color="#ef4444" />
          <MetricCard icon="hygiene" title="Hygiene Kits" level={42} status="LOW" color="#f97316" />
          <MetricCard icon="bolt" title="Utilities" level={95} status="STABLE" color="#0d828c" />
        </div>

        {/* 2. Middle Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <PredictiveInsights />
          </div>
          <div className="col-span-4">
            <WishlistGenerator />
          </div>
        </div>

        {/* 3. Detailed Logs */}
        <section className="space-y-4">
          <h3 className="text-xl font-black text-gray-800">Granular Inventory Logs</h3>
          <InventoryLogs />
        </section>
      </main>
    </div>
  );
}
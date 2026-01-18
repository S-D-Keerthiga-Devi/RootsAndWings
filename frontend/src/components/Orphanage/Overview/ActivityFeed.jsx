import React from 'react';
import { format } from 'date-fns';

/**
 * ActivityFeed Component
 * A high-density, scrollable log of real-time administrative actions.
 * Designed to fit perfectly within a fixed-height dashboard grid.
 */
export default function ActivityFeed() {
  // Mock data representing different types of system activity
  const activities = [
    {
      id: 1,
      user: 'Sarah Jenkins',
      action: 'Visit Approved',
      time: new Date(),
      icon: 'event_available',
      color: 'text-[#1a4d48] bg-[#f1f5f3]'
    },
    {
      id: 2,
      user: 'System Bot',
      action: 'Inventory Alert: Medicine',
      time: new Date(Date.now() - 3600000),
      icon: 'warning',
      color: 'text-[#9a3412] bg-[#fff7ed]'
    },
    {
      id: 3,
      user: 'Robert Chen',
      action: 'New Donation: ₹5,000',
      time: new Date(Date.now() - 7200000),
      icon: 'volunteer_activism',
      color: 'text-[#1a4d48] bg-[#f1f5f3]'
    },
    {
      id: 4,
      user: 'Marcus Thorne',
      action: 'Audit Log Updated',
      time: new Date(Date.now() - 14400000),
      icon: 'fact_check',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 5,
      user: 'Emily Watts',
      action: 'Schedule Requested',
      time: new Date(Date.now() - 86400000),
      icon: 'pending_actions',
      color: 'text-[#9a3412] bg-[#fff7ed]'
    },
    // Adding extra items to demonstrate internal scrolling
    { id: 6, user: 'Admin', action: 'System Backup', time: new Date(Date.now() - 100000000), icon: 'cloud_done', color: 'text-gray-500 bg-gray-100' },
  ];

  return (
    <div className="h-full bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col overflow-hidden">
      {/* Header section - fixed height */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="text-xl font-black text-[#111827]">Recent Activity</h3>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
          Live Feed
        </span>
      </div>

      {/* SCROLLABLE CONTENT AREA: 
          flex-1 allows it to grow to the bottom of the dashboard.
          min-h-0 prevents it from pushing the dashboard footer out of view.
      */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar min-h-0">
        {activities.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:bg-[#f8faf9] transition-all group"
          >
            {/* Action Icon */}
            <div className={`p-3 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${item.color}`}>
              <span className="material-symbols-outlined text-[20px] font-bold">
                {item.icon}
              </span>
            </div>

            {/* Content Container */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <h4 className="text-sm font-black text-[#111827] truncate">
                  {item.user}
                </h4>
                <span className="text-[9px] font-bold text-gray-300 whitespace-nowrap ml-2 uppercase">
                  {format(item.time, 'h:mm a')}
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-500 truncate">
                {item.action}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link - fixed height */}
      <div className="mt-6 pt-4 border-t border-gray-50 shrink-0">
        <button className="w-full py-2 text-[10px] font-black text-[#1a4d48] uppercase tracking-widest hover:bg-[#f1f5f3] rounded-lg transition-colors">
          View Complete Audit Log
        </button>
      </div>
    </div>
  );
}
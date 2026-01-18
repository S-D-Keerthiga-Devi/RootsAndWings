import React from 'react';

export default function InventoryLogs() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-end gap-2">
        <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-100">
          Filter By Category
        </button>
        <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-100">
          Recent First
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50/50">
            <th className="px-8 py-4">Item Name</th>
            <th className="px-8 py-4">Category</th>
            <th className="px-8 py-4">Batch ID</th>
            <th className="px-8 py-4">Stock Status</th>
            <th className="px-8 py-4">Last Updated</th>
            <th className="px-8 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-bold text-gray-700">
          <tr className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td className="px-8 py-6">Fresh Whole Milk (1L)</td>
            <td className="px-8 py-6 text-gray-500 font-medium">Food & Nutrition</td>
            <td className="px-8 py-6 font-mono text-xs text-gray-400">#MK-882</td>
            <td className="px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-[#3cc9e1] h-full w-[70%]" />
                </div>
                <span className="text-[10px] font-black">142 Units</span>
              </div>
            </td>
            <td className="px-8 py-6 text-gray-400 font-medium text-xs">2 hours ago</td>
            <td className="px-8 py-6">
              <button className="text-[#3cc9e1] hover:bg-[#0d828c]/10 p-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
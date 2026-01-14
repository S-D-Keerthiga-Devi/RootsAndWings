import React from 'react';

export default function MonthlyContributions() {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-[#e8e4db] shadow-sm h-full flex flex-col">
      <h4 className="text-lg font-black text-[#7d6e63] mb-6">Monthly Contributions</h4>
      <div className="h-40 flex items-end justify-between gap-2 px-2 grow">
        {/* Mock Bar Chart using arbitrary Tailwind heights */}
        <div className="w-full bg-[#5a8c76]/10 rounded-t-lg h-[40%]"></div>
        <div className="w-full bg-[#5a8c76]/10 rounded-t-lg h-[60%]"></div>
        <div className="w-full bg-[#5a8c76]/10 rounded-t-lg h-[50%]"></div>
        <div className="w-full bg-[#3cc9e1] rounded-t-lg h-[85%] relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#3cc9e1]">
            ₹3,200
          </div>
        </div>
        <div className="w-full bg-[#5a8c76]/10 rounded-t-lg h-[30%]"></div>
        <div className="w-full bg-[#5a8c76]/10 rounded-t-lg h-[45%]"></div>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-bold text-[#7d6e63]/40 uppercase px-1">
        {months.map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}
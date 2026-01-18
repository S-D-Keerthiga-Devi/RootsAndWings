import React from 'react';

export default function WishlistGenerator() {
  const items = [
    { id: 1, name: 'Amoxicillin Syrup', qty: '12 bottles left', checked: true, color: 'text-red-500' },
    { id: 2, name: 'Adult Diapers (Large)', qty: '4 packs left', checked: true, color: 'text-orange-500' },
    { id: 3, name: 'Basmati Rice (25kg)', qty: '10 bags left', checked: false, color: 'text-gray-400' },
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-[#0d828c]">shopping_cart</span>
        <h3 className="text-lg font-black text-gray-800">Wishlist Generator</h3>
      </div>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-6">
        Select items for donation drive
      </p>

      <div className="space-y-6 flex-grow">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <input 
              type="checkbox" 
              checked={item.checked} 
              readOnly
              className="mt-1 size-4 rounded border-gray-300 text-[#3cc9e1] focus:ring-[#3cc9e1]" 
            />
            <div>
              <p className="text-sm font-bold text-gray-800">{item.name}</p>
              <p className={`text-[10px] font-bold ${item.color}`}>Qty: {item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <button className="w-full bg-[#3cc9e1] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#3cc9e1]/20 hover:bg-[#0a6a72] transition-all">
          Generate Public Drive
        </button>
        <p className="text-[10px] text-center text-gray-400 italic">
          Updates "Adopt a Day" math automatically
        </p>
      </div>
    </div>
  );
}
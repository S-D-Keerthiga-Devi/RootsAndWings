import React, { useState, useEffect } from 'react';
import { Camera, User, Loader2, RefreshCw, Plus, Sprout, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { getAllPlants, adminUpdatePlant } from '../../../api/roots.js';
import Sidebar from '../Common/Sidebar.jsx'; // Ensure path is correct
import AddPlantModal from './AddPlantModal.jsx';

export default function AdminPlantManager() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sidebar & Modal State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Update Logic State
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [message, setMessage] = useState('');
  const [actionType, setActionType] = useState('photo_update'); // Default action type

  // Image Upload State (Copied from AddPlantModal logic)
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const loadPlants = async () => {
    setLoading(true);
    try {
      const data = await getAllPlants();
      setPlants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setUploadError("Please upload a valid image file (JPG, PNG).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size too large (Max 5MB).");
        return;
      }
      setUploadError('');
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) throw new Error("Cloudinary config missing.");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data
    });

    if (!res.ok) throw new Error("Image upload failed");
    const uploadData = await res.json();
    return uploadData.secure_url;
  };

  const handleUpdate = async () => {
    if (!selectedPlant) return;
    setIsUploading(true);
    try {
      let finalPhotoUrl = "https://images.unsplash.com/photo-1599598425947-230084ad37fa"; // Default fallback

      if (imageFile) {
        finalPhotoUrl = await uploadToCloudinary(imageFile);
      }

      await adminUpdatePlant({
        plantId: selectedPlant._id,
        photoUrl: finalPhotoUrl,
        message: message || "Weekly care routine completed.",
        actionType: actionType
      });

      alert("Update Pushed Successfully!");
      resetUpdateState();
      loadPlants();
    } catch (err) {
      alert("Failed to update: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpdateState = () => {
    setSelectedPlant(null);
    setMessage('');
    setActionType('photo_update');
    setImageFile(null);
    setPreviewUrl('');
    setUploadError('');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-['Manrope'] overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Mobile Toggle */}
        <div className="lg:hidden p-4 bg-white shadow-sm flex items-center justify-between">
          <span className="font-bold text-slate-800">Roots Admin</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2"><span className="material-symbols-outlined">menu</span></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800">Admin Plant Control 🌱</h1>
              <p className="text-slate-500 mt-1 font-medium">Manage growth updates & add new saplings.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#3cc9e1] hover:bg-[#35b5cc] text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-cyan-100 flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus size={20} /> Add New Plant
              </button>
              <button onClick={loadPlants} className="bg-white p-3 rounded-xl shadow-sm hover:text-[#3cc9e1] border border-slate-100">
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#3cc9e1]" size={32} /></div>
          ) : (
            <div className="space-y-12">

              {/* SECTION 1: AVAILABLE PLANTS */}
              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <span className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Sprout size={18} /></span>
                  Ready for Adoption
                </h2>

                {plants.filter(p => p.status === 'available').length === 0 ? (
                  <p className="text-slate-400 italic">No plants available in the nursery.</p>
                ) : (
                  <div className="grid gap-6">
                    {plants.filter(p => p.status === 'available').map(plant => (
                      <div key={plant._id} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col xl:flex-row items-center gap-6 transition-all hover:shadow-md opacity-90 hover:opacity-100">
                        <div className="flex items-center gap-5 flex-1 w-full">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0 bg-slate-200">
                            {plant.level}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-black text-lg text-slate-800">{plant.name}</h3>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-yellow-100 text-yellow-600">
                                {plant.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-1">
                              <span>{plant.species}</span>
                              <span>•</span>
                              <span>Fees: ₹{plant.price}</span>
                              <span>•</span>
                              <span>Caretaker: {plant.caretaker || "Staff"}</span>
                            </div>
                          </div>
                        </div>
                        {/* No update button for available plants */}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: ADOPTED PLANTS (Growing Family) */}
              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <span className="p-2 bg-[#3cc9e1] rounded-lg text-white"><User size={18} /></span>
                  Growing Family (Adopted)
                </h2>

                {plants.filter(p => p.status === 'adopted').length === 0 ? (
                  <p className="text-slate-400 italic">No plants have been adopted yet.</p>
                ) : (
                  <div className="grid gap-6">
                    {plants.filter(p => p.status === 'adopted').map(plant => (
                      <div key={plant._id} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col xl:flex-row items-center gap-6 transition-all hover:shadow-md border-l-4 border-l-[#3cc9e1]">
                        <div className="flex items-center gap-5 flex-1 w-full">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0 bg-[#3cc9e1] shadow-cyan-200">
                            {plant.level}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-black text-lg text-slate-800">{plant.name}</h3>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-600">
                                {plant.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-1">
                              <span className="flex items-center gap-1 text-slate-600"><User size={12} /> Parent: {plant.adopterName || "User"}</span>
                              <span>•</span>
                              <span>{plant.species}</span>
                              <span>•</span>
                              <span>Caretaker: {plant.caretaker || "Staff"}</span>
                            </div>
                          </div>
                        </div>

                        {/* UPDATE CONTROLS */}
                        <div className="w-full xl:w-auto">
                          {selectedPlant?._id === plant._id ? (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in fade-in zoom-in duration-200 w-full xl:w-[500px]">

                              {/* Message Input */}
                              <input
                                type="text"
                                placeholder="Message (e.g. Watered today)"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3cc9e1] mb-3"
                              />

                              {/* Growth Stage Selector */}
                              <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                                {[
                                  { id: 'sprout', label: 'Sprout', icon: '🌱', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
                                  { id: 'sapling', label: 'Sapling', icon: '🌿', color: 'bg-lime-100 text-lime-600 border-lime-200' },
                                  { id: 'tree', label: 'Tree', icon: '🌳', color: 'bg-green-100 text-green-600 border-green-200' },
                                  { id: 'mature', label: 'Mature', icon: '🍎', color: 'bg-amber-100 text-amber-600 border-amber-200' },
                                  { id: 'photo_update', label: 'Photo', icon: '📸', color: 'bg-slate-100 text-slate-600 border-slate-200' }
                                ].map(type => (
                                  <button
                                    key={type.id}
                                    onClick={() => setActionType(type.id)}
                                    className={`flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold border-2 transition-all ${actionType === type.id ? type.color + ' border-current scale-105' : 'bg-slate-50 border-transparent text-slate-400 grayscale'}`}
                                  >
                                    <span className="block text-lg mb-1">{type.icon}</span>
                                    {type.label}
                                  </button>
                                ))}
                              </div>

                              {/* Image Upload Area */}
                              {actionType === 'photo_update' && (
                                <div className="mb-3 animate-in fade-in zoom-in duration-300">
                                  <label
                                    className={`flex items-center justify-center w-full h-20 border-2 border-dashed rounded-xl cursor-pointer transition-all bg-white relative overflow-hidden ${uploadError ? 'border-red-300' : 'border-slate-200 hover:border-[#3cc9e1]'}`}
                                  >
                                    {previewUrl ? (
                                      <div className="relative w-full h-full">
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs">
                                          Click to Change
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-center">
                                        <div className="text-[#3cc9e1] mx-auto mb-1"><Camera size={20} className="mx-auto" /></div>
                                        <span className="text-xs text-slate-400 font-bold">Upload Update Photo</span>
                                      </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                  </label>
                                  {uploadError && <p className="text-[10px] text-red-500 font-bold mt-1">{uploadError}</p>}
                                </div>
                              )}

                              <div className="flex gap-2">
                                <button
                                  onClick={handleUpdate}
                                  disabled={isUploading}
                                  className="flex-1 bg-[#3cc9e1] text-white py-2 rounded-lg font-bold text-sm hover:bg-[#2bb8d0] flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                  {isUploading ? <Loader2 className="animate-spin" size={16} /> : "Push Update"}
                                </button>
                                <button onClick={resetUpdateState} className="px-4 text-slate-400 font-bold text-sm hover:text-slate-600">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPlant(plant)}
                              className="w-full xl:w-auto px-6 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-700 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                            >
                              <Camera size={16} /> Update Status
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RENDER ADD MODAL IF OPEN --- */}
      {showAddModal && (
        <AddPlantModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            loadPlants();
            alert("Plant added successfully!");
          }}
        />
      )}

    </div>
  );
}
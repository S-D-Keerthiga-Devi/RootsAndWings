import React, { useState } from 'react';
import { X, Upload, Sprout, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { createPlant } from '../../../api/roots';

export default function AddPlantModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    price: 500,
    caretaker: ''
  });

  // Image and Error States
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size (Max 5MB)
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
      // Create a local preview for immediate user feedback
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing. Check your .env file.");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || "Image upload failed");
      }

      const uploadData = await res.json();
      return uploadData.secure_url; // Returns the public URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');

    try {
      let finalImageUrl = '';

      if (imageFile) {
        // Upload image to Cloudinary and get URL
        finalImageUrl = await uploadToCloudinary(imageFile);
      } else {
        // Use a default placeholder if no image is selected
        finalImageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80";
      }

      // Send new plant data + image URL to the backend
      await createPlant({
        ...formData,
        image: finalImageUrl
      });

      onSuccess(); // Refresh the plant list
      onClose();   // Close the modal
    } catch (err) {
      setUploadError(err.message || "Failed to add plant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <h3 className="text-2xl font-black text-slate-800">Add New Plant</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">

          {/* Plant Name Input */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Plant Name</label>
            <input
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Baby Neem #105"
              className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3cc9e1]"
            />
          </div>

          {/* Species and Price Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Species</label>
              <input
                value={formData.species}
                onChange={e => setFormData({ ...formData, species: e.target.value })}
                placeholder="Neem"
                className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3cc9e1]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Adoption Fee (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3cc9e1]"
              />
            </div>
          </div>

          {/* Caretaker Input */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Caretaker Name</label>
            <input
              value={formData.caretaker}
              onChange={e => setFormData({ ...formData, caretaker: e.target.value })}
              placeholder="e.g. Sister Mary"
              className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3cc9e1]"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Plant Photo</label>

            <div className="mt-2 w-full">
              <label
                htmlFor="plant-image-upload"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all group relative overflow-hidden bg-slate-50 ${uploadError ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:bg-slate-100 hover:border-[#3cc9e1]'}`}
              >

                {previewUrl ? (
                  // Image Preview State (FIXED: object-contain and padding)
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-2xl">
                      <p className="text-white font-bold text-sm flex items-center gap-2"><Upload size={16} /> Change Photo</p>
                    </div>
                  </>
                ) : (
                  // Empty State
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="p-3 bg-cyan-50 rounded-full mb-3 text-[#3cc9e1] group-hover:scale-110 transition-transform shadow-sm">
                      <ImageIcon size={24} />
                    </div>
                    <p className="mb-1 text-sm font-bold text-slate-500">Click to upload image</p>
                    <p className="text-xs text-slate-400">JPG, PNG (Max 5MB)</p>
                  </div>
                )}

                <input
                  id="plant-image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {uploadError && (
              <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> {uploadError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3cc9e1] hover:bg-[#35b5cc] text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-cyan-200 mt-2 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sprout size={20} />}
            {loading ? "Uploading to Cloud..." : "Add to Nursery"}
          </button>

        </form>
      </div>
    </div>
  );
}
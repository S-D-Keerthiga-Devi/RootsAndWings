import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  // Plant Identity
  name: { type: String, required: true },
  species: { type: String, default: "Tree Sapling" },
  price: { type: Number, default: 500 },
  image: { type: String },

  // Status & Ownership
  status: {
    type: String,
    enum: ['available', 'adopted'],
    default: 'available'
  },

  // --- FIX START ---
  // Changed from ObjectId to String to accept Clerk IDs
  adopterId: {
    type: String,
    default: null
  },
  // Added this to store name (since we can't easily populate Clerk IDs)
  adopterName: {
    type: String,
    default: null
  },
  // --- FIX END ---

  // Caretaker Info
  caretaker: {
    type: String,
    default: "Orphanage Staff"
  },

  // Gamification State
  level: { type: Number, default: 1 },
  health: { type: Number, default: 100 },
  plantedDate: { type: Date, default: Date.now },

  // History
  updates: [{
    photoUrl: String,
    message: String,
    adminName: String,
    date: { type: Date, default: Date.now },
    actionType: { type: String, enum: ['sprout', 'sapling', 'tree', 'mature', 'water', 'prune', 'fertilize', 'photo_update', 'sun', 'care'] }
  }]
}, { timestamps: true });

export default mongoose.model('Plant', plantSchema);
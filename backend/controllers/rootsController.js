import Plant from '../models/plant.js';

// 0. GET USER'S PLANT DASHBOARD (Digital Twin)
export const getPlantDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // --- THE FIX ---
    // We must query 'adopterId' because that is what is in your Schema now.
    // Ideally, we search for the most recently adopted plant if they have multiple.
    const plant = await Plant.findOne({ adopterId: userId }).sort({ createdAt: -1 });

    if (!plant) {
      return res.status(404).json({ message: "No plant found for this user" });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 0.5. GET ALL USER'S PLANTS (My Garden)
export const getUserPlants = async (req, res) => {
  try {
    const { userId } = req.params;
    const plants = await Plant.find({ adopterId: userId }).sort({ updatedAt: -1 });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 1. GET AVAILABLE PLANTS (For User Adoption Gallery)
export const getAvailablePlants = async (req, res) => {
  try {
    const plants = await Plant.find({ status: 'available' });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adoptPlant = async (req, res) => {
  try {
    // FIX: Accept userName from frontend
    const { plantId, userId, userName } = req.body;
    const plant = await Plant.findById(plantId);

    if (!plant || plant.status === 'adopted') {
      return res.status(400).json({ message: "Plant unavailable" });
    }

    plant.status = 'adopted';
    plant.adopterId = userId; // Now accepts string
    plant.adopterName = userName || "Anonymous"; // Save name directly

    plant.updates.unshift({
      message: "Adopted by a new loving parent!",
      actionType: "photo_update",
      adminName: plant.caretaker || "Orphanage Staff"
    });

    await plant.save();
    res.json({ message: "Adoption successful!", plant });
  } catch (error) {
    console.error("Adoption Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 3. GET ALL PLANTS (Updated)
export const getAllPlants = async (req, res) => {
  try {
    // FIX: Removed .populate() because adopterId is now a String
    const plants = await Plant.find().sort({ updatedAt: -1 });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. ADMIN UPDATE (The Feedback Loop)
export const adminUpdatePlant = async (req, res) => {
  try {
    const { plantId, photoUrl, message, actionType } = req.body;
    const plant = await Plant.findById(plantId);

    if (!plant) return res.status(404).json({ message: "Plant not found" });

    // Add update to history
    plant.updates.unshift({
      photoUrl,
      message,
      actionType,
      date: new Date(),
      adminName: plant.caretaker || "Orphanage Staff"
    });

    // Level Up Logic: Check if actionType is a direct growth update
    const growthStages = {
      'sprout': 1,
      'sapling': 2,
      'tree': 3,
      'mature': 4
    };

    if (growthStages[actionType]) {
      plant.level = growthStages[actionType];
    } else if (actionType === 'photo_update') {
      // Keep old logic: Every 3 photo updates = +1 Level
      const photoUpdates = plant.updates.filter(u => u.actionType === 'photo_update').length;
      if (photoUpdates % 3 === 0 && plant.level < 4) {
        plant.level += 1;
      }
    }

    await plant.save();
    res.json({ message: "Update pushed to user!", plant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. CREATE NEW PLANT (Admin)
// 5. CREATE NEW PLANT (Admin)
export const createPlant = async (req, res) => {
  try {
    const { name, species, price, image, caretaker } = req.body;
    const newPlant = new Plant({
      name,
      species: species || "Azadirachta indica",
      price: price || 500,
      image, // Optional: URL from Cloudinary
      status: 'available',
      caretaker: caretaker || "Orphanage Staff"
    });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
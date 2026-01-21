// src/api/roots.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper: Fetch with Timeout
const fetchWithTimeout = async (url, options = {}, timeout = 30000) => {
  const controller = new AbortController();
  let didTimeout = false;

  const id = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (didTimeout) {
      throw new Error('Request timed out. The server took too long to respond.');
    }
    throw error;
  }
};

// --- USER FUNCTIONS ---

// 1. GET USER'S PLANT DASHBOARD (Digital Twin)
export const getPlantDashboard = async (userId) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/${userId}`;
    const response = await fetchWithTimeout(url);

    // It's okay if 404 (user hasn't adopted yet), handle in UI
    if (response.status === 404) return null;

    if (!response.ok) {
      throw new Error('Failed to fetch plant data');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (getPlantDashboard):", error);
    throw error;
  }
}

// 1.5. GET ALL USER'S PLANTS (My Garden)
export const getUserPlants = async (userId) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/user-plants/${userId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error("API Error (getUserPlants):", error);
    return [];
  }
};

// 2. GET AVAILABLE PLANTS (Adoption Gallery)
export const getAvailablePlants = async () => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/available`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) throw new Error('Failed to fetch available plants');
    return await response.json();
  } catch (error) {
    console.error("API Error (getAvailablePlants):", error);
    return [];
  }
};

// 3. ADOPT A PLANT (Updated)
export const adoptPlant = async (plantId, userId, userName) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/adopt`;
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // FIX: Sending userName
      body: JSON.stringify({ plantId, userId, userName }),
    };

    const response = await fetchWithTimeout(url, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Adoption failed');
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (adoptPlant):", error);
    throw error;
  }
};

// --- ADMIN FUNCTIONS ---

// 4. GET ALL PLANTS (Admin Dashboard)
export const getAllPlants = async () => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/all`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) throw new Error('Failed to fetch all plants');
    return await response.json();
  } catch (error) {
    console.error("API Error (getAllPlants):", error);
    return [];
  }
};

// 5. UPDATE PLANT STATUS (Admin Feedback Loop)
export const adminUpdatePlant = async (updateData) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/update`;
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    };

    const response = await fetchWithTimeout(url, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update plant');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (adminUpdatePlant):", error);
    throw error;
  }
};

// 6. CREATE PLANT (Admin)
export const createPlant = async (plantData) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/roots/create`;
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plantData),
    };

    const response = await fetchWithTimeout(url, data);

    if (!response.ok) {
      throw new Error('Failed to create plant');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (createPlant):", error);
    throw error;
  }
};
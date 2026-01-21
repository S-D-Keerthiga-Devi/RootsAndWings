import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import DonatorDashboard from './components/Donator/DonatorDashboard'
import OrphanageDashboard from './components/Orphanage/OrphanageDashboard'
import RoleSelection from './components/Home/RoleSelection'
import SmartAdoption from './pages/SmartAdoption'
import Layout from './Layout'
import RootsOfLove from './components/DigitalTwin/RootsOfLove'
import OverviewDashboard from './components/Orphanage/Overview/OverviewDashboard'
import VisitScheduler from './components/Orphanage/Scheduler/VisitScheduler'
import InventoryDashboard from './components/Orphanage/Inventory/InventoryDashboard'
import PlantDashboard from './components/Orphanage/PlantManager/AdminPlantManager'
import AdminPlantManager from './components/Orphanage/PlantManager/AdminPlantManager'
import AdoptionGallery from './components/DigitalTwin/AdoptionGallery'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// --- GLOBAL AUTH WRAPPER ---
const AuthWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // 1. SYNC USER TO MONGODB
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Use the correct env variable
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        }),
      }).catch(err => console.error("Sync failed:", err));
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  if (isSignedIn && !user?.publicMetadata?.role && window.location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    // Level 1: AuthWrapper (Protects ALL routes)
    <Route element={<AuthWrapper />}>
      
      {/* Group A: Pages WITH Navbar & Footer (Layout) */}
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/role-selection' element={<RoleSelection />} />
        <Route path='/smart-adoption' element={<SmartAdoption />} />
        <Route path='/roots-love' element={<RootsOfLove />} />
        <Route path='/adopt' element={<AdoptionGallery />} />
      </Route>

      {/* Group B: Pages WITHOUT Navbar (Dashboards) */}
      {/* These are direct children of AuthWrapper, so they bypass Layout */}
      <Route path='/donor-dashboard' element={<DonatorDashboard />} />
      <Route path='/orphanage-dashboard' element={<OverviewDashboard />} />

      <Route path='/visit-scheduler' element={<VisitScheduler />} />
      <Route path='/inventory-dashboard' element={<InventoryDashboard />} />
      <Route path='/plant-dashboard' element={<AdminPlantManager />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
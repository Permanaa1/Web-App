import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';
import SplashScreen from './pages/SplashScreen';
import FavoritesPage from './pages/FavoritesPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';

function App() {
  return (
    <>
      <DesktopNavbar />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/makanan" element={<MakananPage />} />
        <Route path="/minuman" element={<MinumanPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/:type/:id" element={<DetailPage />} />
      </Routes>
      <MobileNavbar />
    </>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import UnitDetailsPage from './pages/UnitDetailsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/unit/:id" element={<UnitDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}
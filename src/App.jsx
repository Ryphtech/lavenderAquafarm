import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Breeds from './pages/Breeds';
import Admin from './pages/Admin';

import { CartProvider } from './context/CartContext';

// Placeholder Pages
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
  return (
    <CartProvider>
      <Router basename="/lavenderAquafarm">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/breeds" element={<Breeds />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

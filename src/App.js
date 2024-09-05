import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const CharacterListPage = lazy(() => import('./pages/CharacterListPage'));
const CharacterDetailPage = lazy(() => import('./pages/CharacterDetailPage'));
const CharacterByLocationPage = lazy(() => import('./pages/CharacterByLocationPage'));

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<CharacterListPage />} />
              <Route path="/character/:id" element={<CharacterDetailPage />} />
              <Route path="/locations" element={<CharacterByLocationPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

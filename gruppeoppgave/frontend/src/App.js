import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MemberProfile from './pages/MemberProfile';
import { client } from './sanityClient';
import './App.css';

function App() {
  // Feilsøkingsfunksjon - sjekk om Sanity er tilkoblet
  useEffect(() => {
    client
      .fetch(`*[_type == "member"][0...5]`)
      .then(data => {
        console.log("Sanity tilkobling fungerer! Hentet data:", data);
      })
      .catch(error => {
        console.error("Feil ved tilkobling til Sanity:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:firstName" element={<MemberProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
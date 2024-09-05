import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import daftarImage from '../assets/daftar.png'; // Import gambar

const CharacterByLocation = () => {
  const [locations, setLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
    setLocations(storedLocations);
  }, []);

  const handleDeleteLocation = (location) => {
    const updatedLocations = { ...locations };
    delete updatedLocations[location];
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    if (selectedLocation === location) {
      setSelectedLocation(null);
    }
  };

  const handleDeleteCharacter = (location, characterId) => {
    const updatedLocations = { ...locations };
    updatedLocations[location] = updatedLocations[location].filter(
      (character) => character.id !== characterId
    );
    if (updatedLocations[location].length === 0) {
      delete updatedLocations[location];
    }
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-dark-green text-center">Characters by Location</h1>
      {Object.keys(locations).length === 0 && (
        <div className="flex justify-center mt-4">
          <img src={daftarImage} alt="No characters registered" className="w-64 h-64" />
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(locations).map((location) => (
          <div key={location} className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <button onClick={() => setSelectedLocation(location)} className="text-dark-green font-semibold text-lg">
              {location}
            </button>
            <button onClick={() => handleDeleteLocation(location)} className="ml-2 text-red-500 font-semibold text-lg">
              Delete Location
            </button>
          </div>
        ))}
      </div>
      {selectedLocation && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-dark-green text-center">Characters in {selectedLocation}</h2>
          {locations[selectedLocation] && locations[selectedLocation].length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {locations[selectedLocation].map((character) => (
                <div
                  key={character.id}
                  className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCharacterClick(character.id)}
                >
                  <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg" />
                  <p className="text-center mt-4 font-bold text-dark-green text-lg">{character.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCharacter(selectedLocation, character.id);
                    }}
                    className="mt-4 bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete Character
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <img src={daftarImage} alt="No characters registered" className="w-64 h-64" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterByLocation;

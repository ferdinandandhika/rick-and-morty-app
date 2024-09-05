import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAIL } from '../graphql/queries';
import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id }
  });

  const [locationName, setLocationName] = useState('');
  const [notification, setNotification] = useState('');

  if (loading) return <p className="text-center text-dark-green">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { name, status, species, gender, origin, location, image } = data.character;

  const handleAssignLocation = () => {
    const locations = JSON.parse(localStorage.getItem('locations')) || {};
    if (!locations[locationName]) {
      locations[locationName] = [];
    }
    locations[locationName].push(data.character);
    localStorage.setItem('locations', JSON.stringify(locations));
    setLocationName('');
    setNotification(`Character sudah berhasil didaftarkan di ${locationName}`);
    setTimeout(() => setNotification(''), 3000); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center bg-white p-4 rounded shadow-lg">
        <img src={image} alt={name} className="w-48 h-48 rounded-full shadow-md" />
        <h1 className="text-2xl font-bold mt-4 text-dark-green">{name}</h1>
        <p className="text-dark-green">Status: {status}</p>
        <p className="text-dark-green">Species: {species}</p>
        <p className="text-dark-green">Gender: {gender}</p>
        <p className="text-dark-green">Origin: {origin.name}</p>
        <p className="text-dark-green">Location: {location.name}</p>
        <div className="mt-4">
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Masukan Nama Lokasi"
            className="border p-2 rounded"
          />
          <button onClick={handleAssignLocation} className="ml-2 bg-dark-green text-white p-2 rounded hover:bg-light-green transition-colors duration-300">
            Daftarkan Lokasi Character
          </button>
        </div>
        {notification && (
          <div className="mt-4 p-2 bg-green-500 text-white rounded">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;

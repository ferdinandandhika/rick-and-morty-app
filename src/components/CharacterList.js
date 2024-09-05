import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p className="text-center text-dark-green">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-dark-green mb-6 text-center">Characters List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.characters.results.map(character => (
          <div key={character.id} className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg" />
              <p className="text-center mt-4 font-bold text-dark-green text-lg">{character.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;

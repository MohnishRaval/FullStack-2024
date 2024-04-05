import { useState } from 'react';
import PropTypes from 'prop-types';
import { useData } from '../context/DataContext';

export const DetailModal = ({ pokemonName }) => {
  const [openModal, setOpenModal] = useState(false);
  const { pokemonModalData } = useData();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayPokemonModalData = pokemonModalData.filter((pokemon) => {
    return pokemon.name === pokemonName;
  });

  // Console log the data outside the return statement
  // console.log('Pokemon Modal Data:', displayPokemonModalData);

  return (
    <div>
      <button
        className="flex justify-center rounded-full bg-red-600 p-2"
        onClick={handleOpenModal}
      >
        View Details
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="relative w-96 rounded-lg bg-white p-6">
            <button
              className="absolute right-0 top-0 m-3 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="mb-4 text-xl font-semibold">{pokemonName}</h2>
            {/* Render the data here */}
            {displayPokemonModalData.map((pokemon, index) => (
              <div key={index}>
                <h3>{pokemon.name}</h3>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Base Experience: {pokemon.base_experience}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DetailModal.propTypes = {
  pokemonName: PropTypes.string.isRequired,
};

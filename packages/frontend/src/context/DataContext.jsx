import { useContext, useState, createContext } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

import PropTypes from 'prop-types';

export const DataProvider = ({ children }) => {
  const [pokemonModalData, setPokemonModalData] = useState([]);

  return (
    <DataContext.Provider value={{ pokemonModalData, setPokemonModalData }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

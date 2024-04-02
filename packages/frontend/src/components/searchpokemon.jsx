import { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

export const Searchpokemon = ({ onSearch }) => {
  const [inputSearchPokemon, setInputSearchPokemon] = useState('');
  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 2000);

  const handleSearchPokemon = (e) => {
    e.preventDefault();
    if (e.target.value === '') {
      setInputSearchPokemon('');
    }
    setInputSearchPokemon(e.target.value);
    debouncedSearch(e.target.value);
    console.log('entered=', e.target.value);
  };

  return (
    <div
      className="parent-searchpokemon flex
     w-full py-4"
    >
      <input
        type="search"
        placeholder="Search Pokemon"
        className="mx-auto flex size-full h-10 w-1/2 justify-center rounded-lg border-2 border-black p-1"
        onChange={handleSearchPokemon}
      />
    </div>
  );
};

Searchpokemon.propTypes = {
  onSearch: PropTypes.func,
};

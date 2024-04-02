import { constants } from '../constants/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pokemon } from './pokemon';
import ReactPaginate from 'react-paginate';
import { Searchpokemon } from './searchpokemon';

export const Displaypokemons = () => {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPokemon, setSearchPokemon] = useState('');

  useEffect(() => {
    //Function: Fetch All Pokemon Names
    const fetchAllPokemons = async (url) => {
      try {
        const response = await axios.get(url);
        const getAllPokemonNames = response.data.results.map((pokemon) => {
          return pokemon.name;
        });
        setAllPokemonNames(getAllPokemonNames);
      } catch (error) {
        console.log(error);
      }
    };

    //Function: Fetch Pokemons in range of 20
    const fetchPokemons = async (url) => {
      try {
        const response = await axios.get(url);
        const totalPages = Math.ceil(response.data.count / 20);
        setTotalPages(totalPages);

        const pokemonPromises = response.data.results.map(async (pokemon) => {
          const urlResponse = await axios.get(pokemon.url);
          const urlResponseData = urlResponse.data;

          const imageResponse = await axios.get(
            constants.URLS.IMG_URL + `${urlResponseData.id}.png`,
          );

          return {
            ...urlResponseData,
            image: imageResponse.config.url,
          };
        });

        const pokemonResponse = await Promise.all(pokemonPromises);
        console.log(
          'Pokemon Response from fetchPokemon Function:',
          pokemonResponse,
        );
        setPokemonDetails(pokemonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    //Function: Fetch Pokemon by Name
    const fetchPokemonByName = async (filteredPokemonNames) => {
      try {
        const promises = filteredPokemonNames.map(async (pokemon) => {
          const pokemonResponse = await axios.get(
            constants.URLS.BASE_URL + `pokemon/${pokemon}`,
          );
          const getFilteredPokemonImage = await axios.get(
            constants.URLS.IMG_URL + `${pokemonResponse.data.id}.png`,
          );

          pokemonResponse.data.image = getFilteredPokemonImage.config.url;

          console.log('Filtered Pokemon Response:', pokemonResponse);

          return pokemonResponse;
        });

        const filteredPokemonResponses = await Promise.all(promises);

        const filteredPokemonDetails = filteredPokemonResponses.map(
          (pokemon) => {
            return {
              name: pokemon.data.name,
              image: pokemon.data.image,
            };
          },
        );
        console.log(
          'Pokemon Response from fetchPokemonByName Function:',
          filteredPokemonDetails,
        );
        setPokemonDetails(filteredPokemonDetails);
      } catch (error) {
        console.error('Error fetching filtered Pokemon data:', error);
        throw error;
      }
    };

    if (searchPokemon === '') {
      fetchPokemons(
        constants.URLS.BASE_URL +
          `pokemon?offset=${(currentPage - 1) * 20}&limit=20`,
      );
    } else {
      setPokemonDetails([]);
      const filteredPokemonNames = allPokemonNames
        .filter((pokemon) => pokemon.includes(searchPokemon))
        .sort((a, b) => a.length - b.length);
      console.log('Filtered Pokemons:', filteredPokemonNames);
      fetchPokemonByName(filteredPokemonNames);
      // console.log('Filtered Pokemon Final', pokemonDetails);
    }

    fetchAllPokemons(constants.URLS.BASE_URL + 'pokemon?limit=1302');
  }, [currentPage, searchPokemon]);

  //Pokemon Details
  const details = pokemonDetails.map((pokemonDetail, index) => {
    return (
      <div key={index} className="w-1/2 p-2">
        <Pokemon
          key={index}
          index={index + 1 + (currentPage - 1) * 20}
          name={pokemonDetail.name}
          image={pokemonDetail?.image}
        ></Pokemon>
      </div>
    );
  });

  //Page Change Functions
  const handlePageChange = (selectedPage) => {
    const newPageNumber = selectedPage.selected + 1;
    setCurrentPage(newPageNumber);
  };

  const handleSearch = (searchPokemon) => {
    setSearchPokemon(searchPokemon);
  };

  return (
    <div className="parent-displaypokemons container flex flex-col p-4 pt-0">
      <Searchpokemon onSearch={handleSearch}></Searchpokemon>
      <div className="pokemon-details flex flex-grow flex-wrap p-2">
        {details}
      </div>
      <div className="pagination bottom-0 left-0 right-0 mx-auto flex h-auto w-full rounded-xl border bg-gray-600">
        <ReactPaginate
          className="pagination m-auto flex justify-center space-x-16 py-4 font-bold"
          pageCount={totalPages}
          onPageChange={handlePageChange}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          activeClassName={
            'active bg-sky-400 hover:bg-sky-300 text-white rounded-lg'
          }
          containerClassName={'pagination flex justify-center mt-4'}
          pageClassName={'active'}
          pageLinkClassName={
            'page-link text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
          }
          previousClassName={
            'previous bg-amber-300 hover:bg-yellow-100 rounded-lg'
          }
          nextClassName={'next bg-amber-300 hover:bg-yellow-100 rounded-lg'}
          previousLinkClassName={
            'previous text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
          }
          nextLinkClassName={
            'next text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
          }
        ></ReactPaginate>
      </div>
    </div>
  );
};

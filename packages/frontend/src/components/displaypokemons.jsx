import { constants } from '../constants/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pokemon } from './pokemon';
import ReactPaginate from 'react-paginate';
import { Searchpokemon } from './searchpokemon';
import { throttle } from 'lodash';
import { Oval } from 'react-loader-spinner';
import { useData } from '../context/DataContext';

const cache = {};

export const Displaypokemons = () => {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [loading, setLoading] = useState(true);

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  useEffect(() => {
    console.log('cache=', cache);

    // Function: Fetch All Pokemon Names
    const fetchAllPokemons = async (url) => {
      try {
        if (cache[url]) {
          setAllPokemonNames(cache[url]);
          return;
        }
        const response = await axios.get(url);
        const getAllPokemonNames = response.data.results.map(
          (pokemon) => pokemon.name,
        );
        setAllPokemonNames(getAllPokemonNames);
        cache[url] = getAllPokemonNames;
      } catch (error) {
        console.error('Error fetching all Pokemon names:', error);
      }
    };

    // Function: Fetch Pokemons in range of 20
    const fetchPokemons = async (url) => {
      setLoading(true);
      try {
        if (cache[url]) {
          setLoading(false);
          setPokemonDetails(cache[url]);
          return;
        }
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
        setPokemonDetails(pokemonResponse);
        cache[url] = pokemonResponse;
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    setLoading(true);
    // Function: Fetch Pokemon by Name
    const fetchPokemonByName = throttle(async (filteredPokemonNames) => {
      try {
        const promises = filteredPokemonNames.map(async (pokemon) => {
          try {
            const pokemonResponse = await axios.get(
              constants.URLS.BASE_URL + `pokemon/${pokemon}`,
            );
            const getFilteredPokemonImage = await axios.get(
              constants.URLS.IMG_URL + `${pokemonResponse.data.id}.png`,
            );

            const pokemonDetails = {
              name: pokemonResponse.data.name,
              image: getFilteredPokemonImage.config.url,
            };

            return pokemonDetails;
          } catch (imageError) {
            console.error(`Error fetching image for ${pokemon}:`, imageError);
            return {
              name: pokemon,
              image: null, // or provide a default image URL
            };
          }
        });

        const filteredPokemonDetails = await Promise.all(promises);
        setPokemonDetails(filteredPokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching filtered Pokemon data:', error);
      }
    }, 2000);

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
      fetchPokemonByName(filteredPokemonNames);
    }

    fetchAllPokemons(constants.URLS.BASE_URL + 'pokemon?limit=1302');
  }, [currentPage, searchPokemon]);

  // Pokemon Details
  const details = pokemonDetails.map((pokemonDetail, index) => (
    <div key={index} className="w-1/2 p-2">
      <Pokemon
        key={index}
        index={index + 1 + (currentPage - 1) * 20}
        name={pokemonDetail.name}
        image={pokemonDetail?.image}
      />
    </div>
  ));

  // Page Change Functions
  const handlePageChange = (selectedPage) =>
    setCurrentPage(selectedPage.selected + 1);

  const handleSearch = (searchPokemon) => setSearchPokemon(searchPokemon);

  return (
    <div className="parent-displaypokemons container flex min-h-screen flex-col p-4 pt-0">
      <Searchpokemon onSearch={handleSearch} setLoading={setLoadingState} />
      <div className="pokemon-details flex flex-grow flex-wrap p-2">
        {loading ? (
          <div className="flex h-full min-h-screen w-full items-center justify-center rounded-xl bg-black opacity-30 backdrop-blur">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          details
        )}
      </div>
      {!searchPokemon && (
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
          />
        </div>
      )}
    </div>
  );
};

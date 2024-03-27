import { constants } from '../constants/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokemon from './pokemon';
import ReactPaginate from 'react-paginate';

const Displaypokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  console.log('New Page=', currentPage);
  useEffect(() => {
    fetchPokemons(
      constants.URLS.BASE_URL +
        `pokemon?offset=${(currentPage - 1) * 20}&limit=20`,
    );
  }, [currentPage]);

  const fetchPokemons = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log('1st API Call=', response.data.results);
        setPokemons(response.data.results);
        setTotalPages(
          Math.ceil(response.data.count / response.data.results.length),
        );
        return response.data.results.map((pokemon) => axios.get(pokemon.url));
      })
      .then((pokemonPromises) => {
        return Promise.all(pokemonPromises);
      })
      .then((pokemonResponse) => {
        console.log('Individual Pokemon response=', pokemonResponse);
        setPokemonDetails(pokemonResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const details = pokemons.map((pokemon, index) => {
    const pokemonDetail = pokemonDetails[index]?.data;
    // console.log('pokemonDetail=', pokemonDetail);
    return (
      <Pokemon
        key={index}
        name={pokemon.name}
        pokemonDetail={pokemonDetail}
      ></Pokemon>
      // <div key={index}>
      //   {pokemon.name}
      //   {pokemonDetail && pokemonDetail.order}
      // </div>
    );
  });

  //Page Change Functions
  const handlePageChange = (selectedPage) => {
    const newPageNumber = selectedPage.selected + 1;
    setCurrentPage(newPageNumber);
  };

  return (
    <div className="parent-displaypokemons container border p-4">
      <div className="pokemon-details p-2">{details}</div>
      <ReactPaginate
        className="pagination flex justify-center space-x-4 p-3 font-bold"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        activeClassName={'active bg-blue-500 text-white rounded-lg'}
        containerClassName={'pagination flex justify-center mt-4'}
        pageClassName={'active'}
        pageLinkClassName={
          'page-link text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
        }
        previousClassName={
          'previous bg-yellow-500 hover:bg-yellow-600 rounded-lg'
        }
        nextClassName={'next bg-yellow-500 hover:bg-yellow-600 rounded-lg'}
        previousLinkClassName={
          'previous text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
        }
        nextLinkClassName={
          'next text-base text-gray-900 dark:text-black w-8 h-8 mr-1 flex justify-center items-center w-full p-1'
        }
      ></ReactPaginate>
    </div>
  );
};

export default Displaypokemons;

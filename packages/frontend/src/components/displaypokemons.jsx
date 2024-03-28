import { constants } from '../constants/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokemon from './pokemon';
import ReactPaginate from 'react-paginate';

const Displaypokemons = () => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
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
        // setPokemons(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 20));
        return response.data.results.map((pokemon) => {
          return axios.get(pokemon.url).then((urlResponse) => {
            const urlResponseData = urlResponse.data;
            return axios
              .get(constants.URLS.IMG_URL + `${urlResponseData.id}.png`)
              .then((imageResponse) => {
                return {
                  ...urlResponseData,
                  image: imageResponse.config.url,
                };
              });
          });
        });
      })
      .then((pokemonPromises) => {
        return Promise.all(pokemonPromises);
      })
      .then((pokemonResponse) => {
        setPokemonDetails(pokemonResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  return (
    <div className="parent-displaypokemons container p-4">
      <div className="pokemon-details flex flex-wrap p-2">{details}</div>
      <div className="pagination fixed bottom-0 left-0 right-0 border bg-gray-600">
        <ReactPaginate
          className="pagination m-auto flex justify-center space-x-16 p-3 font-bold"
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

export default Displaypokemons;

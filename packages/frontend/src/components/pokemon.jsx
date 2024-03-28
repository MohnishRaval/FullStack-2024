import PropTypes from 'prop-types';

const Pokemon = ({ name, index }) => {
  return (
    <div className="border p-1">
      {index}. {name}
      {/* {pokemonDetail && pokemonDetail.order} */}
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string,
  pokemonDetail: PropTypes.object,
  index: PropTypes.number,
};
export default Pokemon;

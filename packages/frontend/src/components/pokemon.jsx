import PropTypes from 'prop-types';

const Pokemon = ({ name, pokemonDetail }) => {
  return (
    <div className="border p-1">
      {name}
      {pokemonDetail && pokemonDetail.order}
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string,
  pokemonDetail: PropTypes.object,
};
export default Pokemon;

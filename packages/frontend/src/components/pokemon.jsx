import PropTypes from 'prop-types';

const Pokemon = ({ name, index, image }) => {
  return (
    <div className="border p-1">
      {index}. {name}
      {image ? (
        <img src={image} alt={name} className="h-20 w-20" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string,
  pokemonDetail: PropTypes.object,
  index: PropTypes.number,
  image: PropTypes.string,
};
export default Pokemon;

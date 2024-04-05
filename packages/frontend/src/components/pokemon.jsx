import PropTypes from 'prop-types';
import pokemonIcon from '../assets/pokemon-icon.png';
import { DetailModal } from './detailModal';

export const Pokemon = ({ name, index, image }) => {
  return (
    <div className="rounded-lg border-2 border-black p-1">
      {index}. {name}
      {image !== null ? (
        <img src={image} alt={name} className="h-20 w-20" />
      ) : (
        <img src={pokemonIcon} alt="Pokemon Icon" className="h-20 w-20" />
      )}
      <DetailModal pokemonName={name} />
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string,
  pokemonDetail: PropTypes.object,
  index: PropTypes.number,
  image: PropTypes.string,
};

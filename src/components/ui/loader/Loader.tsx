import './Loader.scss';
import pokeball from '../../../assets/pokeball.svg';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img className="pokeball" src={pokeball} alt="Loading..." />
        <div className="shadow" />
      </div>
    </div>
  );
}

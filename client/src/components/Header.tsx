import '../styles/Header.css';
import { FaPlane } from 'react-icons/fa';

export default function Navbar(): JSX.Element {
  return (
    <>
      <div className='navbar'>
        <p className='initialtext'>Travel with </p>
        <img className='logo' src='./Wefox_Logo.svg' alt='wefox' />
        <div className='navbarplane-container'>
          <FaPlane className={'navbarplane'} />
        </div>
      </div>
    </>
  );
}

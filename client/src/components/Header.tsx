import React from 'react';
import { useDispatch } from 'react-redux';
import { clickShowAddForm } from '../redux/post';
import { AppDispatch } from '../redux/store';
import '../styles/Header.css';
import { FaPlane } from 'react-icons/fa';

export default function Navbar(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <div className='navbar'>
        <p className='initialtext'>Travel with </p>
        <img className='logo' src='./Wefox_Logo.svg' alt='wefox' />
        <div className='navbarplane-container'>
          <FaPlane className={'navbarplane'} />
        </div>
        <button
          className={'navbutton enlargesmall'}
          onClick={() => {
            dispatch(clickShowAddForm());
          }}
          id={'button1'}
        >
          Add Destination
        </button>
      </div>
    </>
  );
}

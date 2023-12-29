import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickShowAddForm } from '../redux/post';
import { AppDispatch, RootState } from '../redux/store';

export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className='navbar'>
      <button
        className={'navbutton underline'}
        onClick={() => {
          dispatch(clickShowAddForm());
        }}
        id={'button1'}
      >
        Create Post
      </button>
      <button
        className={
          'navbutton underline'
        } /*onClick={() => dispatch(clickShowAddForm())}*/
        id={'button2'}
      >
        Countries Visited
      </button>
      <button
        className={
          'navbutton underline'
        } /*onClick={() => dispatch(clickShowAddForm())}*/
        id={'button3'}
      >
        All Points Map
      </button>
      <button
        className={
          'navbutton underline'
        } /*onClick={() => dispatch(clickShowAddForm())}*/
        id={'button4'}
      >
        Clear Selection
      </button>
    </div>
  );
}

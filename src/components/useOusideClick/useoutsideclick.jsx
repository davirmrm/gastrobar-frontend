import { useEffect } from 'react';

export const useOutsideClick = (ref, callback) => {
  const rootSelect = document.getElementById('root-select')
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(false, rootSelect?.contains(e.target));
    }
    // else {
    //   callback(true)
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 100);
    return () => {
      document.removeEventListener('click', handleClick);
    };

  });
};

export default useOutsideClick;

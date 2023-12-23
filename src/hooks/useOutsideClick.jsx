import { useEffect } from 'react';

const useClickOutside = (refs, callback) => {

  useEffect(() => {
    const handleClick = (e) => {
        const refsoutside=refs.every((ref)=>{return ref.current && !ref.current.contains(e.target)});
        if (refsoutside) {
          callback();
        }
        else{
            return;
        }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, callback]);
};

export default useClickOutside;
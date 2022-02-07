import React, { useEffect}  from 'react';
import { useDispatch } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function ListView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS' })
  }, []);

  return (
    <div className="container">
      <p>Your Photos</p>
    </div>
  );
}

export default ListView;

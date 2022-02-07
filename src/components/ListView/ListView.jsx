import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../Filter/Filter';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function ListView() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const photoList = useSelector(store => store.photos);

  useEffect(() => {
    dispatch({ type: 'FETCH_PHOTOS', payload: user.id })
  }, []);

  console.log('photos are', photoList);

  return (
    <div className="container">
      <Filter />
      <p>Your Photos</p>
      {photoList.map(photo => (
        <>
        <img key={photo.photoID} src={photo.imageURL} />
        <p>Photo of {photo.array_agg.join(", ")} taken on {photo.photoDate}</p>
        </>
      ))}
    </div>
  );
}

export default ListView;

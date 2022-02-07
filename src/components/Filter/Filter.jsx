import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Filter () {
    const dispatch = useDispatch();

    const tags = useSelector(store => store.tags);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_TAGS', payload: user.id });
    }, []);

    console.log('tags are', tags);


    return (
        <>
        Test
        {/* {tags && 
            <>{tags[0].array_agg.filter(tag => tag.includes('R').map(filter => (
            <li>{filter}</li>
                )))}
            </>
        } */}
        </>
    )
};

export default Filter;
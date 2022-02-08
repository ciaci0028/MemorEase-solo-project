import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Filter () {
    const dispatch = useDispatch();

    const tags = useSelector(store => store.tags);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_TAGS', payload: user.id });
    }, []);

    // const tagArray = tags[0].array_agg;
    console.log('tags are', tags);


    return (
        <>
        Filter
        <input></input>
        {tags[0] && 
            <>{tags[0].array_agg.map(filter => (
            <li>{filter}</li>
                ))}
            </>
        }
        </>
    )
};

export default Filter;
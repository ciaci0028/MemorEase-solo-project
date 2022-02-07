import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Filter () {
    const dispatch = useDispatch();

    const tags = useSelector(store => store.tags);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_TAGS', payload: user.id })
    }, [])

    console.log('tags are', tags);

    return (
        <>
        Test
        </>
    )
};

export default Filter;
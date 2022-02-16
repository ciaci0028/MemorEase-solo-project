import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Filter () {
    const dispatch = useDispatch();

    const tags = useSelector(store => store.tags);
    const [selectedTag, setSelectedTag] = useState('');


    const emptyArray = ['Add New Tags'];
    
    useEffect(() => {
        dispatch({ type: 'FETCH_TAGS' });
    }, []);


    return (
        <>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tags[0] && tags[0].array_agg}
            sx={{ width: 300 }}
            renderInput={(params) => 
            <TextField {...params} 
                label="Filter By"
                onSelect={(event) => dispatch({ type: 'FILTER_PHOTOS', payload: event.target.value})}    
            />}
        />
        <br/>
        {/* { selectedTag &&
        <button onClick={() => dispatch({type: 'FETCH_PHOTOS'})}>List All</button>
        } */}
        </>
    )
};

export default Filter;
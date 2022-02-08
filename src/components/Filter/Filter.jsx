import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Filter () {
    const dispatch = useDispatch();

    const tags = useSelector(store => store.tags);
    const user = useSelector(store => store.user);
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_TAGS' });
    }, []);

    // const tagArray = tags[0].array_agg;
    console.log('tags are', tags);

    const handleFilter = () => {
        console.log('filter by', selectedTag);

        dispatch({ 
            type: 'FILTER_PHOTOS', 
            payload: selectedTag
        })
    };


    return (
        <>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tags[0] && tags[0].array_agg}
            sx={{ width: 300 }}
            renderInput={(params) => 
                <TextField 
                {...params} 
                label="Filter By"
                value={selectedTag}
                onSelect={(event) => setSelectedTag(event.target.value)} />
            }
        />
        <button onClick={() => handleFilter()}>Select</button>
        </>
    )
};

export default Filter;
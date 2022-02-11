import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';

// Autocomplete element on the Upload Form
function AutocompleteElement () {
    
    // Ability to use the filter options from MUI
    const filter = createFilterOptions();
    // Value to use and play with during the functionality of Autocomplete
    const [value, setValue] = useState(null);
    // Retrieving the users tags from the redux store
    const fetchedTags = useSelector(store => store.tags);
    console.log('fetched tags are', fetchedTags);



    return (
        <Autocomplete
                    value={value}
                    // As the user is changing/selecting a tag...
                    onChange={(event, newValue) => {
                        // If the newValue is a string, set the value to that string
                        if (typeof newValue === 'string'){
                            setValue({
                                tagName: newValue
                            });
                        }
                        // If they are typing a new value, set the value to that
                        else if (newValue && newValue.inputValue){
                            setValue({
                                tagName: newValue.inputValue
                            });
                        }
                        // Otherwise, keep the value as null
                        else {
                            setValue(null);
                        }
                    }}
                    // Filter options should be..
                    filterOptions={(options, params) => {
                        // Create a new variable that is filtering through the options
                        const filtered = filter(options, params);
                        const { inputValue } = params;  
                        const isExisting = options.some((option) => inputValue === option.tagName);
                        if (inputValue !== '' & !isExisting) {
                            filtered.push({
                                inputValue,
                                title: `Add "${inputValue}"`,
                            })
                        }
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="list-of-user-tags"
                    options={fetchedTags & fetchedTags.tagName}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue){
                            return option.inputValue;
                        }
                        return option.title;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.title}</li>}
                    sx={{width: 300}}
                    freeSolo
                    renderInput={(params) => (<TextField {...params} label="Current Tags" 
                    />)}
                />  

    )
};

export default AutocompleteElement;
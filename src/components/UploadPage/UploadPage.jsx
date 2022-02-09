import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactChipInput from './ChipInput';

function UploadPage () {
    const dispatch = useDispatch();



    const user = useSelector(store => store.user);
    const [startDate, setStartDate] = useState(new Date());

    const [imageURL, setImageURL] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState(moment().clone().format('MM-DD-YYYY'));
    const [chips, setChips] = useState([]);


    const newImage = {
        imageURL: imageURL,
        description: description,
        photoDate: startDate,
        uploadDate: uploadDate,
        tags: tags
    };

    const handleTags = (event) => {
        console.log('in handleTags', event);
        setTags(event);
    };


    console.log('newImage is:', newImage);
    console.log('tags are', tags);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('getting info', newImage);

        dispatch({
            type: 'POST_PHOTO',
            payload: newImage
        });

    };

    // // Chip code
    // class Example extends React.Component {
    //     state = {
    //       chips: []
    //     };
    //     addChip = value => {
    //       const chips = this.state.chips.slice();
    //       chips.push(value);
    //       this.setState({ chips });
    //     };
    //     removeChip = index => {
    //       const chips = this.state.chips.slice();
    //       chips.splice(index, 1);
    //       this.setState({ chips });
    //     };
    //     render() {
    //       return (
    //         <ReactChipInput
              
    //         />
    //       );
    //     }
    //   }
    
    return (
        <>
            <p>Upload New Photo Here</p>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                >
                </input>
                <br/>
                {/* <ReactChipInput 
                    classes="class1 class2"
                    chips={this.state.chips}
                    onSubmit={value => this.addChip(value)}
                    onRemove={index => this.removeChip(index)}
                /> */}
                <input
                    placeholder="Tags"
                    value={tags}
                    onChange={(event) => handleTags(event.target.value)}
                >
                </input>
                <br/>
                <input
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                >
                </input>
                <DatePicker 
                    selected={startDate} onChange={(date) => setStartDate(date)}
                />
                <br/>
                <button>
                    Upload
                </button>
            </form>
        </>
    )
};

export default UploadPage;
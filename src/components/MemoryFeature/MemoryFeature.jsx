import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function MemoryFeature () {
    const dispatch = useDispatch();

    const memory = useSelector(store => store.memory);
    console.log('memory is', memory);

    const relativeDate = moment(memory.photoDate).format("YYYYMMD");

    useEffect(() => {
        retrieveMemory();
    }, [])

    const retrieveMemory = () => {
        dispatch({ type: 'RETRIEVE_MEMORY' })
    }

    return (
        <>
            <p>A Special Memory for You</p>
            <p>{moment(relativeDate).fromNow()}</p>
            <p>{memory.description} from {moment(memory.photoDate).format('MMMM Do, YYYY')}</p>
            {memory ? 
            <><img
                src={memory.imageURL}
            />
            </>
            :
            <p>No photos to share yet! Upload a new photo <Link to="/upload">here</Link></p>
            }
        </>
    )
};

export default MemoryFeature;
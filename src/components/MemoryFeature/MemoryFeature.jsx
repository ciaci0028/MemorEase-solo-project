import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function MemoryFeature () {
    const dispatch = useDispatch();

    const memory = useSelector(store => store.memory);
    console.log('memory is', memory);

    useEffect(() => {
        retrieveMemory();
    }, [])

    const retrieveMemory = () => {


        dispatch({ type: 'RETRIEVE_MEMORY' })

    }

    return (
        <>
            <p>Random Photo or On this day</p>
            {memory && 
            <img
                src={memory[0].imageURL}
            />}
        </>
    )
};

export default MemoryFeature;
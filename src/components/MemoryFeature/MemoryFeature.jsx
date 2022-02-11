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
            <p>A Special Random Memory for You</p>
            {memory && 
            <><img
                src={memory[0].imageURL}
            />
            <p>{memory[0].description} from {memory[0].to_char}</p>
            </>}
        </>
    )
};

export default MemoryFeature;
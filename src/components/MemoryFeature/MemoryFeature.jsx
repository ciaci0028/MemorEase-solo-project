import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// Card MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
            <p className='specialMemoryCopy'>A Special Memory for You</p>
            {memory ? 
            <>  
                <p className="timeAgoCopy">{moment(relativeDate).fromNow()}</p>
                <Card className="memoryCard" sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    max-height="250"
                    image={memory.imageURL}
                    alt={memory.description}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {moment(memory.photoDate).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {memory.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </>
            :
            <p>No photos to share yet! Upload a new photo <Link to="/upload">here</Link></p>
            }
            
        </>
    )
};

export default MemoryFeature;
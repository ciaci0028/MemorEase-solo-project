import {useState} from 'react';
import DatePicker from 'react-datepicker';

// Date Filter that will take in the month and 
// days of photos and display only the ones
// that match the selected
function DateFilter () {
    
    // Local state for date picker
    const [startDate, setStartDate] = useState(new Date());


    //function to handle the selected date and start
    // the SQL query to display all form that
    // date regardless of year
    const handleSelectedDate = (date) => {
        setStartDate(date);
        console.log('the date is', date.toLocaleDateString("en-US"));
    
        dispatch({
            type: 'FILTER_BY_DATE',
            payload: date.toLocaleDateString("en-US")
        });
    };

    return (
        <>
        <p>Filter by date:</p>
        <DatePicker 
            selected={startDate} 
            onChange={(date) => handleSelectedDate(date)}
        />  
        </>
    )
};

export default DateFilter;
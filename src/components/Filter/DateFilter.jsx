import {useState} from 'react';
import DatePicker from 'react-datepicker';
import {useDispatch} from 'react-redux';

// Date Filter that will take in the month and 
// days of photos and display only the ones
// that match the selected
function DateFilter () {
    const dispatch = useDispatch();
    
    // Local state for date picker
    const [startDate, setStartDate] = useState(new Date());


    //function to handle the selected date and start
    // the SQL query to display all form that
    // date regardless of year
    const handleSelectedDate = (date) => {
        setStartDate(date);
        console.log('the date is', date.toLocaleDateString("en-US"));
        console.log(new Date(date).getMonth() + 1,  new Date(date).getDate());
        let selectedDate = new Date(date).getDate();
        let selectedMonth = new Date(date).getMonth() + 1;
    
        // dispatch the day and month for the SQL query
        dispatch({
            type: 'FILTER_BY_DATE',
            payload: {
                day: selectedDate,
                month: selectedMonth
            }
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
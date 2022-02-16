import React, { useState, useEffect } from 'react';
// Moment.js is a library for dealing with dates and times
import moment from 'moment';
// Premade styles
import "./calendarStyles.css";

// Moved function to build the calendar off the selected day
// into its own file
import buildCalendar from './CalendarBuild';
// Helper function to assist with styling
import dayStyles from './CalendarStyles';

// Child component
import CalendarHeader from './CalendarHeader';

export default function Calendar() {
    // Array of array - months will contain weeks and weeks will contain days
    // Create the calendar as an empty array
    const [calendar, setCalendar] = useState([]);

    // Value is using moment.js to point to the current date
    const [value, setValue] = useState(moment());

    // ^^ Use react useState to set the default state and create local component state
    // so that we can change state and render different months
    // useState sets default value
    // Calendar contains our matrix
    // Value contains our selected day



    // We only want it to retrigger when the dependencies change (designated in the empty array)
    // Leaving it blank, the useEffect only happens once because the dependencies never change
    // But we want the calendar to rerender when a new day is selected
    // So we put the value variable in the array, so when that is changed
    // then the calendar will rerender and show the proper month
    useEffect(() => {
        setCalendar(buildCalendar(value));
        console.log(moment());
    }, [value]);


    // const tinyPic = {
    //     date: 6,                
    //     url: "https://www.akc.org/wp-content/uploads/2017/11/Australian-Shepherd.1.jpg"
    // };



    return (
        <div className='calendar'>
            <CalendarHeader
                value={value}
                setValue={setValue}
            />
            <div className='day-names'>
                {
                    ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"].map(d => <div className="week" key={d}>{d}</div>)
                }
            </div>
                <div className='body'>
                    {   // Map through the calendar and each seven day chunk is our week
                    calendar.map(week => <div key={week}>
                        {   // map through the seven week and put each day in a div with formatting
                            week.map(day => 
                        <div 
                            className='day'
                            // If you click a day, the value will be set to that day
                            onClick={() => setValue(day)}
                            key={day}
                        >
                        <div 
                            // Condition to say that, as looping, if the value
                            // matches something then change the class name to that
                            // returned string
                            className={dayStyles(day, value)}
                        >
                            {day.format("D")}<br/>
                            {/* <img className='tinyPic' src={tinyPic.url}/>     */}
                            {/* if there is a photo with that date, render that photo
                            
                            */}
                            {/* <br/>
                            {tinyPic.date === day.format("D") &&
                                <img className="tinyPic" src={tinyPic.url} alt="doggy pic" />
                            } */}
                        </div>
                        </div>)
                        }
                    </div>)
                    }
                </div>
        </div>
    )
}
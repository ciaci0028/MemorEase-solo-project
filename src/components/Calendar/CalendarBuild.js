// no html in this javascript, pure js so that's why it's not jsx

export default function buildCalendar(value) {
    // Copy of the date object, so original object doesn't get changed.
    // Then use that clone to get the date at the start of the month
    // But by chaining the start of the week we get the beginning of 
    // the week as a calendar would see it.
    // .start of "month" would return 02/01 but on a calendar the
    // .start of week would return 01/30
    const startDay = value.clone().startOf("month").startOf("week");

    // Same thing with end of, returns 03/05
    const endDay = value.clone().endOf("month").endOf("week");

    // To build calendar, use a while loop to build up those days
    // and place them inside of the matrix.
    // We need an iterator to do so, so we'll clone the start day
    // And then subtract one day
    const day = startDay.clone().subtract(1, "day");

    // We need a temporary variable to prevent our useState from rendering excessively
    // Because useState is asynchronous and will rerender every time we change state
    const calendar = [];

    // While loop has condition, and while it's true it will continue to execute
    // When condition becomes false, we exit the loop
    // So our condition is: If our day variable (the clone of our start day minus one) 
    // is before the end day (isBefore comes from moment.js) at one day intervals
    while(day.isBefore(endDay, "day")){
        // Matrix - array of arrays
        // Each iteration, we push on a weeks worth of data
        calendar.push(
            Array(7)
                .fill(0)
                // Each iteration we return a clone of the next day
                .map(() => day.add(1, "day").clone())
        )
    };

    return calendar;

}
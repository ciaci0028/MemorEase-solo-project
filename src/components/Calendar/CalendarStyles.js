// Helper functions for further styling:

function isSelected(day, value){
    return value.isSame(day, "day");
};

// Days of the past look different
function beforeToday(day) {
    // new Date always gives today's date
    return day.isBefore(new Date(), "day");
};

// Styling for today
function isToday(day) {
    return day.isSame(new Date(), "day");
};

// Return different strings using conditional to render for styling later
export default function dayStyles(day, value) {
    if (beforeToday(day)) return "before"
    if (isSelected(day, value)) return "selected"
    if (isToday(day)) return "today"
    return
}

// file2.js
// A simple JavaScript file that contains a function to calculate the average of an array of numbers.
function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Export the function so it can be used in other files
module.exports = calculateAverage;
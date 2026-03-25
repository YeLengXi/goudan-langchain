# Color Converter

// Main function to handle CLI arguments
function main() {
    var input = process.argv[2];
    var outputFormat = process.argv[4] || "hex";
    var operation = process.argv[3];

    // Validate the input
    if (!input) {
        console.error("No input provided");
        return;
    }

    // Perform the conversion or operation
    if (operation === "to") {
        if (outputFormat === "rgb") {
            console.log("Input: " + input + "\nOutput: " + hexToRgb(input));
        } else if (outputFormat === "hex") {
            console.log("Input: " + input + "\nOutput: " + rgbToHex(input));
        } else {
            console.error("Invalid output format");
            return;
        }
    } else if (operation === "lighten") {
        var percent = parseInt(process.argv[5]) || 20;
        console.log("Input: " + input + "\nOutput: " + lighten(input, percent));
    } else if (operation === "darken") {
        var percent = parseInt(process.argv[5]) || 20;
        console.log("Input: " + input + "\nOutput: " + darken(input, percent));
    } else if (operation === "invert") {
        console.log("Input: " + input + "\nOutput: " + invert(input));
    } else if (operation === "mix") {
        var percent = parseInt(process.argv[5]) || 50;
        var color2 = process.argv[6] || "#FFFFFF";
        console.log("Input: " + input + "\nOutput: " + mixColors(input, color2, percent));
    } else {
        console.error("Invalid operation");
        return;
    }
}

// Run the main function
main();
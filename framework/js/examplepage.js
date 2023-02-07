/*
    This example JS file demonstrates how you can load page-specific javacript from a TPL file,
    which will still be executed when the goToPage() function is ran.
*/

console.log("This line of text demonstrates "+document.currentScript.src+" is being loaded.");

/*
    This example JS file demonstrates how you can load page-specific javacript from a TPL file,
    which will still be executed when the goToPage() function is ran.
*/

console.log("This line of text demonstrates " + document.currentScript.src + " is being loaded.");

var test = {
    one: 'one',
    two: 2,
    three: Array(3),
}
saveSessionVar(test);

console.log('Testing retrieval of a session variable:', getSessionVar('test'));

getServerTime()
    .then(function (serverTime) {
        console.log("Server time:", serverTime);
    })
    .catch(function (error) {
        console.error("Error fetching server time:", error);
    });
/*
    Login Javascript
*/

/**
 * Performs reCaptcha validation and executes the specified success function if successful.
 * Retrieves the reCaptcha token and sends it to the server for verification.
 * @param {HTMLElement} button - The button element that triggers the reCaptcha validation.
 * @param {Function} successFunction - The function to be executed if reCaptcha validation is successful.
 */
function reCaptcha(button, successFunction) {
    event.preventDefault();
    grecaptcha.ready(function () {
        grecaptcha.execute(GLOBAL.config.recaptcha_key, { action: 'submit' }).then(function (token) {
            sendTokenToServer(token, successFunction);// Send the token to your backend server for verification
        });
    });
}

/**
 * Sends the reCaptcha token to the server for verification and handles the response.
 * @param {string} token - The reCaptcha token to be sent for verification.
 * @param {Function} successFunction - The function to be executed if the token verification is successful.
 */
function sendTokenToServer(token, successFunction) {
    // Make an AJAX request to your backend server to verify the token
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'framework/lib/reCaptcha.php');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Token verification successful, handle the response from the server
                var response = JSON.parse(xhr.responseText);
                if (response.success) {// Proceed with the successFunction
                    successFunction();
                } else {// Token verification failed, handle the error
                    showMessage('reCaptcha token verification failed', 'error');
                }
            } else {
                // Request failed, handle the error
                showMessage('Request failed with status code: ' + xhr.status, 'error');
            }
        }
    };

    var params = 'token=' + encodeURIComponent(token);
    xhr.send(params);
}

/**
    Performs a login by sending an AJAX request to the server.
    Retrieves the username and password from the input fields,
    and POSTs them to the 'login.php' endpoint.
    -On success, the user is authenticated, session is created.
    -On error, displays the error message using the showMessage function with the 'error' level.
*/
function login() {

    var username = $('#username').val();
    var password = $('#password').val();

    // Send the AJAX request
    $.ajax({
        type: 'POST',
        url: 'framework/auth/login.php',
        data: { username: username, password: password },
        success: function (response) {
            if (response === 'authsuccess') {
                showMessage(response, 'success');
                location.reload();
            } else {
                showMessage(response);
            }
        },
        error: function (xhr, status, error) {
            showMessage(error, 'error');
        }
    });

}

/**
 * Listens for the Enter key press event on the username and password input fields
 * and triggers the desired action, such as calling the login function.
 */
$(document).ready(function () {
    $('#username, #password').keypress(function (event) {
        if (event.keyCode === 13) { // Enter key pressed
            reCaptcha(this, login); // Call the desired action (e.g., login())
        }
    });
});

/**
 * Login Messages
 */
var messages = {
    'authsuccess': "Success, logging you in...",
    'passwordrefused': "Password is incorrect",
    'passwordrefused': 'Password is incorrect',
    'passwordrequired': "Please enter a password",
    'passwordrequired': 'Please enter a password',
    'usernamerequired': "Please enter a username",
    'usernotallowed': "Your account is not allowed to login. Please use an authorized account.",
    'usernotfound': "The entered username was not found. Please try again.",
};
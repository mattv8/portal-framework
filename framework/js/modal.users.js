/*
   User Management Modal Page-Specific Javascript
*/

"use strict";

/////////////////
// Select2 JQuery OnLoad Classes for selection boxes.
$(document).ready(function() {

    // Org Unit selection
    $('#select2-siteMemberships').select2({
        dropdownParent: document.getElementById('select2-siteMemberships').closest('form'),
     });

});

/////////////////
// Edit user details
function editAttr(selector,inputType,user,key) {

    const editButton = selector.querySelector('button');// Save button for later
    
    // Building attribute user text input field
    var td = document.createElement('td');// Create <td></td>
    td.style = "padding:4px;"

    // Building input field. This is special because it depends on the type, whether that be a 
    // multi-select, boolean, password field, etc.
    let input;
    switch (inputType) {
        case 'text': input = createTextInput(selector,'text'); break;
        case 'select-multiple': input = createMultiSelectInput(user); break;
        case 'checkbox': console.log(inputType); break;
        case 'password': input = createTextInput(selector,'password'); break;
        default: console.log(inputType);
    }

    // Building edit submit/save button within "td"
    var saveButton = document.createElement('button');// Create text input field <button></button>
    saveButton.className = "fa fa-fw fa-save inline-icon hover-green ml-1";
    saveButton.onclick = function(event){
        let edits;
        switch (inputType) {
            case 'text':
            case 'password':
                edits = input.value; break;
            case 'select-multiple':
                edits = $('.select2-'+user).select2('data').map(value => value.id); break;// Gets selected id's as array, then stringify
            case 'checkbox': console.log(inputType); break;
            case 'password': console.log(inputType); break;
            default: console.log(inputType);
        }

        // Submit the edits
        var callback = submitEdits(key,user,(typeof(edits)=='object')?JSON.stringify(edits):edits);
        if ( callback.success ) {// Save the edits back to the database
            td.replaceWith(selector);// Swap back to original
            selector.innerText = (typeof(edits)=='object')?edits.join(', '):edits;// Replace innterText with comma-separated string from array
            selector.appendChild(editButton);// Add edit button back
            $(selector).css("background-color", 'lightgreen').animate({ backgroundColor: "white"}, 1000);// Add fade-green class for nice animation
        } else {
            alert(callback.msg);
        }
    };

    // Building edit cancel button within "td"
    var cancelButton = document.createElement('button');// Create text input field <button></button>
    cancelButton.className = "fa fa-fw fa-remove inline-icon hover-red ml-1";
    cancelButton.onclick = function(){
        td.replaceWith(selector);// Swap back to original
    };

    // Replacing "td" with newly created input field
    td.appendChild(input);// Wrap text input field in <td></td>
    td.appendChild(saveButton);// Append saveButton to td2
    td.appendChild(cancelButton);// Append cancelButton to td2
    selector.replaceWith(td);// Replace DOM element
    if ( key === 'siteMemberships' ) { select2_sites(user); }// Replace input with Select2
    if ( user === js_config_obj.currentUser ) { refreshOnModalClose('UserMgmtModal',(inputType === 'password')); }// Trigger refresh on modal close

}

/////////////////
// Delete User
function deleteUser(td,user) {
    
    var tdNew = document.createElement('td');// Create <td></td>

    // Convert delete button to cancel button
    var cancelButton = document.createElement('button');// Create text input field <button></button>
    cancelButton.className = "fa fa-fw fa-remove inline-icon hover-red ml-1";
    cancelButton.onclick = function(){
        tdNew.replaceWith(td);
    };

    // Building edit submit/save button within tdNew
    var confirmText = document.createElement('span');
    confirmText.innerHTML = "Are you sure?";
    confirmText.style.cssText = `
        white-space: nowrap;
        letter-spacing: -.05rem;
        font-size: 12px;
        vertical-align: middle;
        color: #e90000;
    `;

    // Building edit submit/save button within tdNew
    var confirmButton = document.createElement('button');// Create text input field <button></button>
    confirmButton.className = "fa fa-fw fa-check inline-icon hover-green";
    confirmButton.onclick = function(event){
        var callback = '';
        $.ajax({
            type: 'GET',
            url: 'framework/lib/ajax.php',
            data: {request: 'deleteUser', user: user },
            dataType: 'json',
            async: false,
            success: function(data) {
                callback = data;
            }
        });
        if (callback.success) {// Do the delete to the database on successful callback
            tdNew.closest('tr').remove();// Delete the table row
            document.getElementById('user-mgmt-table').classList.add("fade-green");// Add fade-green class for nice animation
            if ( user === js_config_obj.currentUser ) { refreshOnModalClose('UserMgmtModal'); }// Trigger refresh on modal close
        } else {
            alert(callback.msg);
        }
        
    }

    tdNew.appendChild(confirmText);
    tdNew.appendChild(document.createElement('br'));
    tdNew.appendChild(confirmButton);
    tdNew.appendChild(cancelButton);
    td.replaceWith(tdNew);

}

/////////////////
// Create User
function createUser(form) {
    
    event.preventDefault();// Disable default form submit action
    var table = document.getElementById('user-mgmt-table');// Save user table

    // Do the AJAX insert to database
    var submission = getInputs(form);
    var callback = '';
    var req = {
        request: 'createUser',
        values: JSON.stringify(submission),
    }
    $.ajax({
        type: 'GET',
        url: 'framework/lib/ajax.php',
        data: req,
        dataType: 'json',
        async: false,
        success: function(data) {
            callback = data;
        }
    });

    // Final actions
    if (callback.success) {// Do the INSERT to the database on successful callback
        $("#user-mgmt-table").load(location.href + " #user-mgmt-table");// Refresh just the user management table
        $("#user-mgmt-table").css("background-color", 'lightgreen').animate({ backgroundColor: "white"}, 1000);// Animate green
        $('#select2-siteMemberships').val(null).trigger('change');// Reset the Select2 selector
        form.reset();// Reset the form
    } else {
        alert(callback.msg);
    }
    
}

/*
    Supporting functions for editUserAttr() function
*/
function submitEdits(key, user, edits) {
    var response = '';
    var req = {
        request: 'submitEdits',
        key: key,
        user: user,
        edits: edits,
    };
    $.ajax({
        type: 'GET',
        url: 'framework/lib/ajax.php',
        data: req,
        async: false,
        success: function(data) {
            response = data;
            // console.log(data);
        }
    });
    return response ? JSON.parse(response) : null;// Return null if response is empty
}


function createTextInput(selector, type) {
    var input = document.createElement('input');// Create text input field <input></input>
    input.className = "form-control";
    input.style = "height:100%;";
    input.value = ( type == 'password' ) ? "" : selector.innerText;
    input.placeholder = ( type == 'password' ) ? "" : selector.innerText;
    input.type = type;
    return input;
}


function createMultiSelectInput(user) {
    var input = document.createElement('select');// Create text input field <button></button>
    input.className = "form-control populate select2-"+user;
    input.style = "width:100%; height:30px;";
    return input;
}


function select2_sites(user) {
    
    // STEP 1: Initialize the Select2 object with all available sites
    const siteNames = js_config_obj.sites.map(value => value.siteName);// Create array from the siteName key in js_config_obj.sites
    var siteSelect = $('.select2-'+user).select2({
        dropdownParent: $('.select2-'+user).closest('table'),
        placeholder: 'Add or remove sites',
        multiple: true,
        data: siteNames,
    });

    // STEP 2: Do second AJAX call to get existing site memberships and pre-select them
    $.ajax({
        type: 'GET',
        url: 'framework/lib/ajax.php',
        dataType: 'json',
        data: {request: 'site-memberships', user: user},
    }).done(function (memberships) {// THEN add JSON response to Select2 Options
        if(memberships) {// If there are any existing memberships
            const preselected = new Array(); var i = 0;// Initialize some variables
            memberships.forEach(function(m) {// Loop through existing group memberships
                if (siteSelect.find("option[value='" + m.id + "']").length) {// if the option exists
                    preselected[++i] = m.id;// Add it to pre-selection and move to next index
                } else {// Create a new option for it
                    var option = new Option(m.text, m.id, true, true);// Create Option object
                    siteSelect.append(option).trigger('change');// Append the new option
                    preselected[++i] = m.id;// Add it to pre-selection and move to next index
                }
            });
            siteSelect.val(preselected).trigger('change');// Trigger UI update for preselections
        }
    });

}
/*
 * Custom Javascript Functions
 */
    

/////////////////
// Pull a list of sites from the database
function goToPage(page,replaceSelector) {
  
    // Redirect to root if page is null
    if(page == null){ window.location.href = '/'; return; }
  
    // Else route to specified page asynchronously
    $.ajax({
        url: 'index.php',
        type: 'GET',
        data: { page: page },
        // beforeSend: function() {// Start loading animation
        //     showLoadingAnimation();
        // },
        // complete: function() {// Stop loading animation
        //     document.getElementById('loading-animation').style.display = 'none';// Hide the loading animation
        // },
        success: function(response) {
            let selector;
            if (replaceSelector) { 
                selector = document.getElementById(replaceSelector);
                selector.style.transition = 'opacity 500ms';
                selector.style.opacity = 0;
            } else {
                document.body.style.transition = 'opacity 500ms';
                document.body.style.opacity = 0;
            }
            setTimeout( async function() {
                if (replaceSelector) {
                    var parser = new DOMParser();
                    var newDoc = parser.parseFromString(response, 'text/html');
                    var container = newDoc.getElementById(replaceSelector);
                    selector.innerHTML = container.innerHTML;
            
                    var scripts = container.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = scripts[i].src;
                        selector.appendChild(script);
                    }
            
                    selector.style.transition = 'opacity 500ms';
                    selector.style.opacity = 1;
                } else {
                    var parser = new DOMParser();
                    var newDoc = parser.parseFromString(response, 'text/html');
                    document.head.innerHTML = newDoc.head.innerHTML;
                    document.body.innerHTML = newDoc.body.innerHTML;
            
                    var scripts = newDoc.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = scripts[i].src;
                        document.body.appendChild(script);
                    }
            
                    document.body.style.transition = 'opacity 500ms';
                    document.body.style.opacity = 1;
                }
        
            }, 500);
            
            history.pushState(page, null, '/?page=' + page);// add the page to the browser's history
        },
        
    });
}

/* This function returns a Promise that resolves to the contents of a script file 
    wrapped in an anonymous function. The contents are fetched using an XMLHttpRequest GET request.
    The purpose of the anonymous function wrapping is so the goToPage() function can be called multiple
    times without having collisions with variables declared as `const`.
*/
async function anonymousFromScriptSrc(scriptFile) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", scriptFile, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let scriptContents = xhr.responseText;
                resolve("(function() {" + scriptContents + "})();");// wrap the contents in an anonymous function
            }
        };
        xhr.send();
    });
}


/////////////////
// Pull a list of sites from the database
function getSites() {
    var callback = '';
    $.ajax({
        type: 'GET',
        url: 'framework/lib/ajax.php',
        data: { request: 'getSites' },
        dataType: 'json',
        async: false,
        success: function(data) {
            callback = data;
        }
    });
    if (callback.success) {// Do the delete to the database on successful callback
        return callback.data;
    } else {
        alert(callback.msg);
    }
}


/////////////////
// Loggoff user
function logoff() {
    $.ajax({
        type: 'POST',
        url: 'framework/auth/login.php',
        data: { logoff: '1' },
        success: function(data) { 
            window.location.href= "/" // Redirect to webroot.
        },
    });
}

/////////////////
// Open Nav Buttons as Modals
// This function is called from the menu button
function openModal(modalId,navButton) {

    ////////////////
    // Add event listener for modal close/dismiss
    modalId.addEventListener('hidden.bs.modal', function (e) {
        $(navButton).addClass('btn-secondary');
        $(navButton).removeClass('btn-primary');
    })
    
    ////////////////
    // Initialize the modal
    $(modalId).modal('toggle');
    $(navButton).removeClass('btn-secondary');
    $(navButton).addClass('btn-primary');

}

/////////////////
// Simple function to get Site Name from Site ID
function getSiteNameFromId(siteId) {
    GLOBAL.config.sites.forEach(site => {
        if(site.siteId === siteId.toString()) { return out = site.siteName; }
    })
    return (out)?out:null;// Fallback
}

/////////////////
// Simple function to get Site ID from Site HTML Name
function getSiteIdFromHTMLName(siteHTMLName) {
    GLOBAL.config.sites.forEach(site => {
        if(site.siteHTMLName === siteHTMLName) { return out = site.siteId; }
    })
    return (out)?out:null;// Fallback
}

/////////////////
// Simple function to get Site HTML Name from Site ID.
function getSiteHTMLNameFromId(siteId) {
    GLOBAL.config.sites.forEach(site => {
        if(site.siteId === siteId) { return out = site.siteHTMLName; }
    })
    return (out)?out:null;// Fallback
}

/////////////////
// Simple function to get Site HTML Name from Site ID.
function getSiteIdFromName(siteName) {
    GLOBAL.config.sites.forEach(site => {
        if(site.siteName === siteName) { return out = site.siteId; }
    })
    return (out)?out:null;// Fallback
}

/////////////////
// Simple function to check if variable is null or undefined.
// Thanks: https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
// This will return true for
//  undefined  // Because undefined == null
//  null
//  []
//  ""
function isEmpty(value){
    return (value == null || value.length === 0);
}

/////////////////
// Simple function to save a file using ajax.
// Thanks: https://stackoverflow.com/questions/33664398/how-to-download-file-using-javascript-only
function saveData(blob, fileName)
{
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

}

/////////////////
// Returns true if it is a DOM node
// Thanks: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}

/////////////////
// Returns true if it is a DOM element
// Thanks: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

/////////////////
// Refresh the page when modal is closed
function refreshOnModalClose(modalId,logOff) {
    var modal = document.getElementById(modalId)
    modal.addEventListener('hidden.bs.modal', function (event) {
        if(logOff) { logoff(); }// Trigger logoff
        location.reload();// Do the refresh
    });
}

/////////////////
// Gets all inputs from a particular selector (wether that be a form, div, etc)
// and returns an object as an associative array of the input fields and values.
// I tried to make this as reusable as possible, but will need to add cases as they come up.
// Example use:
//      var inputObj = getInputs(form);
function getInputs(selector) {
    const inputObj = Object();
    const formElements = Array.from(selector.elements);
    formElements.forEach( function(element,i) {
        // console.log("type: "+element.type+", idx: "+i+", name: "+element.name);
        switch (element.type) {
            default: console.warn("Some inputs not included (input type: "+element.type+", name: "+element.name+", id: "+element.id+")"); break;// Show warning
            case 'submit': break;// Ignore submit inputs
            case 'checkbox':
                inputObj[element.name] = (element.checked)?1:0; break;
            case 'select-multiple':
                inputObj[element.name] = JSON.stringify($('#'+element.id).val()); break;
            case 'select-one':
                inputObj[element.name] = $('#'+element.id).val(); break;
            case 'text':
                inputObj[element.name] = element.value.replace(/'/g, "\\'"); break;
            case 'password':
                inputObj[element.name] = element.value; break;
        };
    });
    // console.log(inputObj);
    return inputObj;
}

function findElementWithInnerText(innerText) {
    // Find all elements in the document with the specified inner text
    const elements = document.evaluate(`"td[contains(.,${innerText})]"`, document, null, XPathResult.ANY_TYPE, null );
    console.log(elements);
  
    // Return the first element that was found, or null if no elements were found
    return elements.length > 0 ? elements[0] : null;
  }


  function fadeOutAfter(selector,fadeTime,noShift,button) {
    if (event) { event.preventDefault(); }// If this is in a form, disable the default form action.
    if(noShift) {// Fade the element out without shifting the page
        setTimeout(function() {
            let opacity = (selector.style.opacity)?selector.style.opacity:1;
            if(button) { button.disabled = true; }
            let interval = setInterval(function() {
                if (opacity <= 0) { clearInterval(interval); }
                selector.style.opacity = opacity;
                opacity -= 0.1;
            }, 100);
        }, fadeTime);
    } else {
        setTimeout(function() {
            $(selector).fadeOut(1000);
          }, fadeTime);
    }
}

/*  Little function to return a subobject by subkey and value
    Example:
        obj = {
            "1": {
                    "key": "EventId",
                    "value": "2",
                    "comment": "[PK] Event ID"
            },
            "2": {
                    "key": "SiteId",
                    "value": "1",
                    "comment": "[IDX] Link to the Site Table"
            },
        }

    getKeyByValue(obj,'key','EventId')

    Returns:
        {
            "key": "EventId",
            "value": "2",
            "comment": "[PK] Event ID"
        }
*/
function getObjByValue(object, subkey, value) {
    for (const [key, field] of Object.entries(object)) {
        if (field[subkey] === value) return object[key];
    };
}

// Function to prepend to an array
// Thanks: https://stackoverflow.com/questions/6195729/most-efficient-way-to-prepend-a-value-to-an-array
function prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}

/**
    Creates HTML element from HTML string
    Thanks: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
    @param {String} HTML representing a single element
    @return {Element}
*/
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/*
 * Custom background color animation.
 * Accepts either a DOM selector, like selector = document.getElementById('#EventDate_Open')
 * or a string indicating an ID or class, like '#EventDate_Open' or '.EventDate_Open'.
*/
function animateBackgroundColor(selector, transitionTime, color) {
    
    var element;
    if (typeof selector === "string") {
        element = document.querySelector(selector);
    } else {
        element = selector;
    }
    element.style.backgroundColor = (color)?color:'lightblue';// Defaults to 'lightblue'
    element.addEventListener("transitionend", function(event) {
        this.style.removeProperty("transition");
    }, false);

    var dwellTime = transitionTime / 2;
    setTimeout(() => {
        element.style.transition = `background-color ${transitionTime}ms`;
        element.style.backgroundColor = '';
    }, dwellTime);
}


function showErrorModal(xhr,GETurl) {
    //Selectors of interest, from templates/modals/modal.reservations.tpl
    var modalTitle = document.getElementById('ErrorModalTitle');
    var modalBody = document.getElementById('ErrorModalBody');
    var modalLongText = document.getElementById('ErrorModalLongText');
    
    // Build some error messages
    modalTitle.innerHTML = "There was an error building the PDF. The XHR status is:\
    <b style='color:red'>"+xhr.status+" ("+xhr.statusText+") </b>";
    modalBody.innerHTML = "You can click the following link to try again:<br><a href="+GETurl+">"+GETurl+"<a>";
    
    // Because response is of type "blob" we have to open it with the FileReader object.
    var reader = new FileReader();
    reader.onload = function() {
        modalLongText.innerHTML ="<b>Relevant PHP errors (if any):</b><br>"+reader.result;
    }
    reader.readAsText(xhr.response);

    $('#ErrorModal').modal('toggle');// Show the modal
}
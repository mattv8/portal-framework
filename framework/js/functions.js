/*
 * Custom Javascript Functions
 */
    

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
    
    // Isolated version of JQuery UI Animate function
    // Thanks: https://stackoverflow.com/questions/190560/jquery-animate-backgroundcolor
    // Example: $('#event-data-content').animate({ backgroundColor: "blue" }, "fast");
    // Example Flash: $("div").css("background-color", "blue").animate({ backgroundColor: "white"}, 300);
    (function (d) {
        d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
            d.fx.step[e] = function (g) {
                if (!g.colorInit) {
                    g.start = c(g.elem, e);
                    g.end = b(g.end);
                    g.colorInit = true
                }
                g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
            }
        });
    
        function b(f) {
            var e;
            if (f && f.constructor == Array && f.length == 3) {
                return f
            }
            if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
                return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
            }
            if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
                return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
            }
            if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
                return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
            }
            if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
                return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
            }
            if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
                return a.transparent
            }
            return a[d.trim(f).toLowerCase()]
        }
        function c(g, e) {
            var f;
            do {
                f = d.css(g, e);
                if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                    break
                }
                e = "backgroundColor"
            } while (g = g.parentNode);
            return b(f)
        }
        var a = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0],
            transparent: [255, 255, 255]
        }
    })(jQuery);
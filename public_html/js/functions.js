/*
 * Custom Javascript Functions
 */

/////////////////
// Custom input validation function
// Expects an LDAP 'things' as a string and a DOM stuff.
function ExampleFunction(things,stuff){          

    switch (things) {
        case "blah":
            message = "The variable \"things\" is equal to \"blah\'";
            break;
        case "goober":
            message = "The variable \"things\" is equal to \"goober\'";
            break;
            break;
        case "helloworld":
            message = "The variable \"things\" is equal to \"helloworld\'";
            break;
        default:
            message = "Nothing was matched.";
    }
    foo = "This is just another return variable containing"+stuff;

    return { foo, message };

};
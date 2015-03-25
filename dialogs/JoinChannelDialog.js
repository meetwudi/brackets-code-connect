define(function(require, exports, module) {
    "use strict";
    
    var Dialogs = brackets.getModule('widgets/Dialogs');
    var templateHTML = require('text!dialogs/html/join-channel-dialog.html'),
        $template = $(templateHTML),
        callbackOK = null;
    
    function showDialog(callback) {
        $template.find('.btn-ok').bind('click', function() {
            var serverURL = $template.find('#inputServerURL').val(),
                channelID = $template.find('#inputChannelID').val(),
                valid;
            
            // validate input values
            serverURL = serverURL.trim();
            serverURL = serverURL.replace(/\/+$/g, ''); // trim trailing /
            valid = serverURL.match(/^http:\/\/\S+:[0-9]+$/) &&
                (channelID.match(/^[a-zA-Z]+[a-zA-Z\_]*[a-zA-Z]+$/) || 
                 channelID.match(/^[a-zA-Z]$/));
            
            if (valid) {
                callbackOK(serverURL, channelID);
                Dialogs.cancelModalDialogIfOpen('register-channel-dialog');  
            } else {
                window.alert('Invalid inputs!');   
            }
        });
        
        Dialogs.showModalDialogUsingTemplate($template, false);
        callbackOK = callback;
    }
    
    
    exports.showDialog = showDialog;
});
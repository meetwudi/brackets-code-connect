define(function (require, exports, module) {
    "use strict";
    
    var status = require('status'),
        connection = require('connection');
    
    function Channel(serverURL, channelID) {
        this.channelID = channelID;
        
        // Connect to server [TODO]
        connection.connectAsOwner(this.serverURL, this.channelID, function(){
            
        });
    }
    
    Channel.prototype.unload = function () {
        console.log('unloading');
        connection.unload();
    };
    
    
    exports.Channel = Channel;
});
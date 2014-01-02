define(function (require, exports, module) {
    "use strict";
    
    var context = this;
    
    var socket_io = require('socket.io'),
        status = require('status');
    
    var actived = false,
        serverURL = null,
        channelID = null,
        namespace = null,
        ns = null;
    
    // protect functions to be called in wrong situations
    function _assertActivedStatus(func, shouldBeActived) {
        function compose() {
            if (actived !== shouldBeActived) {
                throw new Error('socket connection is not actived');
            }
            func.apply(context, arguments);
        }
        return compose;
    }
    
    function _deployOwnerSocket(callback) {
        ns.socket.on('connect', function() {
            status.setStatus(status.STATUS.AS_OWNER);
            actived = true;
            window.alert('You are now the owner of channel:' + channelID);
            callback();
        });
        
        ns.socket.on('error', function() {
            window.alert('Connection failed.');
        });
    }
    
    function _deployGuestSocket(callback) {
        ns.on('codeText', function(data) {
            $(exports).triggerHandler('receiveCodeText', [data]);
        });
        
        ns.socket.on('connect', function() {
            status.setStatus(status.STATUS.AS_GUEST);
            actived = true;
            window.alert('You are now the guest of channel:' + channelID);
            callback();
        });
        
        ns.socket.on('error', function() {
            window.alert('Connection failed.');
        });
    }
    
    function connectAsOwner(_serverURL, _channelID, callback) {
        callback = callback || function() {};
        
        serverURL = _serverURL;
        channelID = _channelID;
        namespace = '/' + _channelID;
        
        ns = socket_io.connect(serverURL + namespace, {'force new connection' : true});
        _deployOwnerSocket(callback);
    }
    
    function connectAsGuest(_serverURL, _channelID, callback) {
        callback = callback || function() {};
        
        serverURL = _serverURL;
        channelID = _channelID;
        namespace = '/' + _channelID;
        
        ns = socket_io.connect(serverURL + namespace, {'force new connection' : true});
        _deployGuestSocket(callback);
    }
    
    function sendCode(data) {
        ns.emit('codeText', data);
    }
    
    function unload() { 
        serverURL = null;
        channelID = null;
        namespace = null;
        ns.socket.disconnect();
        ns = null;
        actived = false;
    }
   
    exports.connectAsOwner = _assertActivedStatus(connectAsOwner, false);
    exports.connectAsGuest = _assertActivedStatus(connectAsGuest, false);
    exports.unload = _assertActivedStatus(unload, true);
    exports.sendCode = _assertActivedStatus(sendCode, true);
});
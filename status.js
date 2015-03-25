define(function(require, exports, module){
    "use strict";
    
    var StatusMessageBar = require('./bars/StatusMessageBar');
    
    var STATUS = {
            OFFLINE: 0,
            AS_OWNER: 1,
            AS_GUEST: 2
        },
        currentStatus = null;

    
    function isOffline() {
        return currentStatus === STATUS.OFFLINE;   
    }
    
    function isOwner() {
        return currentStatus === STATUS.AS_OWNER;   
    }
    
    function isGuest() {
        return currentStatus === STATUS.AS_GUEST;   
    }
    
    function getStatus() {
        return currentStatus;
    }
    
    function setStatus(newStatus) {
        currentStatus = newStatus;
        $(exports).triggerHandler('changeStatus');
        
        if (currentStatus === STATUS.AS_OWNER) {
            StatusMessageBar.showBar('owner');
        }
        else if (currentStatus === STATUS.AS_GUEST) {
            StatusMessageBar.showBar('guest');
        }
    }
    
    exports.STATUS = STATUS;
       
    exports.setStatus = setStatus;
    exports.getStatus = getStatus;
    exports.isOffline = isOffline;
    exports.isOwner = isOwner;
    exports.isGuest = isGuest;
});
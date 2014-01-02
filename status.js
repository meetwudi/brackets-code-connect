define(function(require, exports, module){
    "use strict";
    
    var STATUS = {
            OFFLINE: 0,
            AS_OWNER: 1,
            AS_GUEST: 2
        },
        currentStatus = null;

    
    function _notifyStatusChanged() {
        onStatusChanged && typeof onStatusChanged === "function" && onStatusChanged();
    }
    
    function setCbOnStatusChanged(callback) {
        onStatusChanged = callback;
    }
    
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
    }
    
    exports.STATUS = STATUS;
       
    exports.setStatus = setStatus;
    exports.getStatus = getStatus;
    exports.isOffline = isOffline;
    exports.isOwner = isOwner;
    exports.isGuest = isGuest;
});
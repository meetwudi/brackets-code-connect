define(function(require, exports, module){
    "use strict";
    
    var versionCompare = function(left, right) {
        if (typeof left + typeof right !== 'stringstring') {
            return false;
        }
        
        var a = left.split('.'),
            b = right.split('.'),
            len = Math.max(a.length, b.length);
            
        for (i = 0; i < len; i = i + 1) {
            if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
                return 1;
            } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
                return -1;
            }
        }
        
        return 0;
    };
    
    return {
        versionCompare: versionCompare
    };
});
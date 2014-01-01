define(function (require, exports, module) {
    "use strict";
    
    var EditorManager   = brackets.getModule('editor/EditorManager'),
        editor = EditorManager.getActiveEditor();
    
    var status = require('status'),
        connection = require('connection');
    
    function sendCode() {
        if (!status.isOwner() || !editor || !editor.document) {
            // only the owner of the channel can publish code
            return;
        }
        
        connection.sendCode(editor.document.getText());
    }
    
    function refreshEditorBinding() {
        if (!editor) {
            return;
        }
        
        $(editor).on("change", sendCode);
    }
    refreshEditorBinding();
    
    $(EditorManager).on('activeEditorChange', function() {
        editor = EditorManager.getActiveEditor();
        refreshEditorBinding();
        sendCode();
    });
    
    connection.setCbOnReceiveCodeText(function(codeText) {
        if (!editor) {
            return;
        }
        
        editor.document.setText(codeText);
    });
});
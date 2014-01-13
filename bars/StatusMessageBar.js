define(function(require, exports, module) {
    "use strict";
    
    var PanelManager = brackets.getModule('view/PanelManager');
    
    var templateHTML = require('text!bars/html/status-message-bar.html'),
        $template,
        panel;
    
    function showBar(channelID, status) {
        var renderedTemplateHTML = Mustache.render(templateHTML, {channelID: channelID, status: status});
        $template = $(renderedTemplateHTML);
        $template.find('.close').bind('click', function() {
            dismissBar();
        });
        
        panel = PanelManager.createBottomPanel("johnwu.brackets-code-connect.panel", $template, 200);
        panel.setVisible(true);
    }
    
    function dismissBar() {
        panel.setVisible(false);
        panel = null;
    }
    
    
    exports.showBar = showBar;
});
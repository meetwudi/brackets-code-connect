define(function (require, exports, module) {
    "use strict";
    
    var CommandManager  = brackets.getModule('command/CommandManager'),
        Menus           = brackets.getModule('command/Menus');
    var RegisterChannelDialog = require('dialogs/RegisterChannelDialog'),
        JoinChannelDialog = require('dialogs/JoinChannelDialog');
    var Channel = require('Channel').Channel,
        status = require('status'),
        editorHook = require('editor-hook'),
        connection = require('connection');
    var commandRegisterChannel, commandJoinChannel, commandQuitChannel;
    var currentChannel = null; // current connected channel
    
    // program status refresh functions
    function refreshMenuItems() {
        var canRegisterChannel = true, 
            canJoinChannel = true, 
            canQuitChannel = true;
        
        switch (status.getStatus()) {
            case status.STATUS.OFFLINE:
                canQuitChannel = false;
                break;
            case status.STATUS.AS_OWNER || status.STATUS.AS_GUEST:
                canJoinChannel = false;
                canRegisterChannel = false;
                break;
            default: 
                break;
        }
        
        commandRegisterChannel.setEnabled(canRegisterChannel);
        commandJoinChannel.setEnabled(canJoinChannel);
        commandQuitChannel.setEnabled(canQuitChannel);
    }
    
    function refreshAll(/*event*/) {
        refreshMenuItems();  
    }
    
    // Dialog callbacks
    function cbRegisterChannelDialog(serverURL, channelID) {
        $.ajax({ 
            url :   serverURL + '/_createChannel',
            data:   { channelID :   channelID   }
        }).done(function(data) {
            if (data.result === true) {
                currentChannel = new Channel(serverURL, channelID);
            } else {
                window.alert('Duplicated channel ID!');
            }
        }).fail(function() {
			window.alert('Failed to connect to server.');
		});
    }
    
    function cbJoinChannelDialog(serverURL, channelID) {
        connection.connectAsGuest(serverURL, channelID, function() {
            
        });
    }
    
    // Command handlers
    function handleRegisterChannel() {
        RegisterChannelDialog.showDialog(cbRegisterChannelDialog);
    }
    
    function handleJoinChannel() {
        JoinChannelDialog.showDialog(cbJoinChannelDialog);
    }
    
    function handleQuitChannel() {
        if (!!currentChannel) {
            // disconnect as owner
            currentChannel.unload();
            currentChannel = null;
        } else {
            // disconnect as guest 
            connection.unload();
        }
        
        status.setStatus(status.STATUS.OFFLINE);
        window.alert('Goodbye!');
    }
    
    // Register commands
    var COMMAND_REGISTER_CHANNEL    =   "code_connect.register_channel",
        COMMAND_JOIN_CHANNEL        =   "code_connect.join_channel",
        COMMAND_QUIT_CHANNEL        =   "code_connect.quit_channel";
    commandRegisterChannel = CommandManager.register("Register new channel", 
                                                         COMMAND_REGISTER_CHANNEL, 
                                                         handleRegisterChannel);
    commandJoinChannel = CommandManager.register("Join a channel", 
                                                 COMMAND_JOIN_CHANNEL, 
                                                 handleJoinChannel);
    commandQuitChannel = CommandManager.register("Quit channel", 
                                                 COMMAND_QUIT_CHANNEL, 
                                                 handleQuitChannel);
    

    // Create menu items bound to commands
    var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_JOIN_CHANNEL);
    menu.addMenuItem(COMMAND_REGISTER_CHANNEL);
    menu.addMenuItem(COMMAND_QUIT_CHANNEL);
    menu.addMenuDivider();
    
    // Set initial application status
    $(status).bind('changeStatus', refreshAll);
    status.setStatus(status.STATUS.OFFLINE);
});

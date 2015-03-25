> I've not been active on this project for a long time. I wrote it when I first got started with JavaScript and node.

> So now, only GOD know what I was writing.

> I've decided to develop a brand new version and will publish it soon, maybe some day in April 2015. Stay tuned!


#brackets-code-connect
Code connect is an extension for [adobe/brackets](https://github.com/adobe/brackets).   Code connect allows you to synchronize your code in the currently actived brackets editor to others' actived brackets editor. The actived brackets editor is the opened code editor in brackets.  
You can use code connect to share your code to others. It will be especially helpful when teaching students, having a team meeting or discuss with other programmers, etc.  

#Installation
Before using code connect, you should get a [server end](https://github.com/tjwudi/code-connect-server) installed and running or just use an existing server.  
You can install via brackets's extension manager, or clone this repository into the user folder under the brackets's extension folder.  
You should use `cmd + R` (mac) or `F5` (windows/linux) to refresh brackets in order to load extensions properly.

#Usage
##Registering a new channel
Open `View -> Register new channel`, enter the server URL with port (e.g. `http://localhost:6006` the default port will be 6006) and the channel ID.  
Channel ID should be only consist of latin letters or underscore, and the underscore cannot be placed at the beginning of ID neither the ending.  
Legal channel ID examples: `code_Connect`, `CoDeConnecT`, `code`, `C`. We suggest you use package naming convension with dots replaced by underscore, like `io_brackets_codeconnect`, `com_john_channel`.  
Illegal channel ID examples: `_code_connect`, `code123`, `code_connect_`, `code#connect`, `code.connect`.  
You will be the owner of the created channel.  

##Join an existing channel
Open `View -> Join a channel`, fill in the informations just like registering a new channel.  
Be sure to open up an actived editor (that you can type) so that the channel owner can sync his/her code to you. The simplest way to do this is just create an untitled document.

##Quit an channel
Open `View -> Quit channel`, them it will say goodbye to you :)

#Troubleshooting
If any errors encountered, please check first whether you are using the latest version of brackets-code-connect and the code-connect-server.  
You may have interest to hack into the source code, find the problem and fix it. Don't forget to send us your great pull request.  
You are welcomed to write an issue for the problem you encountered. We will check it as soon as possible and give you response, help you fix it.  

#Contributing
Every pull request will be highly appreciated.  
For fixing bugs, refactoring, adding test cases, you can send an pull request directly or just open an issue. For new feature request, it would be nice if you can open an issue first and have it discussed.  

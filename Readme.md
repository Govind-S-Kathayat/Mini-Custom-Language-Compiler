# 🔤 Mini Custom Language Compiler

A web-based mini-compiler that translates code written in a custom pseudo-language (inspired by Hindi/Urdu syntax) into multiple mainstream languages like JavaScript, C, C++, Python, and Go.

## 🌟 Features
- ✍️ Write code in a human-friendly, Hindi-inspired syntax
- ⚙️ Lexer
- ⚙️ Parser + AST-based translator

💻 Converts custom code to:
  - JavaScript
  - Python
  - C
  - C++
  - Go
  - 
- 🧪 Real-time JS code execution in-browser
- 🌗 Light/Dark mode toggle
- 🧾 Tabs for viewing Converted Code and Output

Paste your custom code in the textarea, select your target language, and press "▶ Run Code".

🛠️ Tech Stack
1-Frontend: HTML, CSS (Glassmorphism + Responsive), JavaScript
2-Compiler Engine: Custom Lexer, Parser, and Code Generator (JS-based)

✅Supported Keywords      Keyword	Meaning
maano	                    variable declare
likho	                    print/output
agar	                    if(conditional statements)
warna	                    else
jabtak	                  while loop

🧪 How It Works
1-Lexer breaks down the custom code into tokens.
2-Parser builds an Abstract Syntax Tree (AST).
3-Code Generator outputs code in the selected language.
4-JavaScript is executed directly in-browser to show output.

🖼️ UI Highlights
1-Responsive layout
2-Dark/light theme toggle
3-Syntax-highlighted output panels
4-Tabs to switch between output and translated code

📌 Future Improvements
1-Add support for functions and arrays
2-Syntax highlighting in editor
3-Server-side execution for non-JS code

👨‍💻 Author
#### Author
- [Govind Singh Kathayat](https://www.linkedin.com/in/govind-singh-kathayat-328a5a257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) [July 2025]


## 📚 Sample Pseudo-Code Syntax

```plaintext
maano x = 5
maano y = 10
maano sum = x + y
likho sum

agar x < y {
    likho "x is less than y"
}
warna {
    likho "x is not less than y"
}

maano a = 0
jabtak a < 3 {
    likho a
    a = a + 1
}

📁 Project Structure
📦 Mini Custom Language Compiler
├── index.html        # UI layout
├── styles.css        # Modern glassmorphism styling
├── script.js         # Main compiler logic (lexer, parser, codegen, run)
├── start.js          # Alternate script for CLI-based testing
├── sample code.txt   # Examples of supported syntax





```

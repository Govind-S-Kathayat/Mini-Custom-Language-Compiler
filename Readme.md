# 🔤 Mini Custom Language Compiler

A web-based mini-compiler that translates code written in a custom pseudo-language (inspired by Hindi/Urdu syntax) into multiple mainstream languages like JavaScript, C, C++, Python, and Go.

## 🌟 Features

- ✍️ Write code in a human-friendly, Hindi-inspired syntax
- ⚙️ Lexer
- ⚙️ Parser + AST-based translator

- 💻 Converts to:
  - JavaScript
  - Python
  - C
  - C++
  - Go
- 🧪 Real-time JS code execution in-browser
- 🌗 Light/Dark mode toggle
- 🧾 Tabs for viewing Converted Code and Output

Paste your custom code in the textarea, select your target language, and press "▶ Run Code".

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

🛠️ Tech Stack
Frontend: HTML, CSS (Glassmorphism + Responsive), JavaScript

Compiler Engine: Custom Lexer, Parser, and Code Generator (JS-based)

📁 Project Structure
📦 Mini Custom Language Compiler
├── index.html        # UI layout
├── styles.css        # Modern glassmorphism styling
├── script.js         # Main compiler logic (lexer, parser, codegen, run)
├── start.js          # Alternate script for CLI-based testing
├── sample code.txt   # Examples of supported syntax

✅ Supported Keywords
Keyword	Meaning
maano	variable declare
likho	print/output
agar	if
warna	else
jabtak	while loop

🧪 How It Works
Lexer breaks down the custom code into tokens.

Parser builds an Abstract Syntax Tree (AST).

Code Generator outputs code in the selected language.

JavaScript is executed directly in-browser to show output.

🖼️ UI Highlights
Responsive layout

Dark/light theme toggle

Syntax-highlighted output panels

Tabs to switch between output and translated code

📌 Future Improvements
Add support for functions and arrays

Syntax highlighting in editor

Server-side execution for non-JS code

👨‍💻 Author
#### Author
- [Govind Singh Kathayat](https://www.linkedin.com/in/govind-singh-kathayat-328a5a257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) [July 2025]

```

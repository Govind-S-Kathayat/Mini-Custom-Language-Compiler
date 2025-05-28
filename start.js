function lexer(input) {
    const tokens = [];
    let position = 0;

    while (position < input.length) {
        let char = input[position];

        if (char === ' ') {
            position++;
            continue;
        }

        if (char === '"') {
            position++;
            let text = '';
            while (position < input.length && input[position] !== '"') {
                text += input[position];
                position++;
            }
            position++;
            tokens.push({ type: 'string', value: text });
            continue;
        }

        if (/[a-zA-Z]/.test(char)) {
            let word = '';
            while (position < input.length && /[a-zA-Z]/.test(input[position])) {
                word += input[position];
                position++;
            }

            if (['maano', 'likho', 'agar', 'warna', 'jabtak'].includes(word)) {
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
            continue;
        }

        if (/[0-9]/.test(char)) {
            let number = '';
            while (position < input.length && /[0-9]/.test(input[position])) {
                number += input[position];
                position++;
            }
            tokens.push({ type: 'number', value: parseInt(number) });
            continue;
        }

        if (/[\+\-\*\/=<>!]/.test(char)) {
            if (input[position + 1] === '=') {
                tokens.push({ type: 'operator', value: char + input[position + 1] });
                position += 2;
            } else {
                tokens.push({ type: 'operator', value: char });
                position++;
            }
            continue;
        }

        if (char === '{' || char === '}') {
            tokens.push({ type: 'brace', value: char });
            position++;
            continue;
        }

        position++;
    }

    return tokens;
}

function parser(tokens) {
    const ast = { type: 'program', body: [] };

    function parseExpression() {
        let expression = '';
        while (tokens.length > 0) {
            const token = tokens[0];
            if (token.type === 'operator' || token.type === 'identifier' || token.type === 'number') {
                expression += token.value + ' ';
                tokens.shift();
            } else {
                break;
            }
        }
        return expression.trim();
    }

    function parseBlock() {
        const body = [];
        while (tokens.length > 0 && tokens[0].type !== 'brace') {
            const statement = parseStatement();
            if (statement) body.push(statement);
        }
        tokens.shift(); // Consume '}'
        return body;
    }

    function parseStatement() {
        const token = tokens.shift();
        if (!token) return null;

        if (token.type === 'keyword' && token.value === 'maano') {
            const identifier = tokens.shift();
            tokens.shift(); // Consume '='
            const value = parseExpression();
            return {
                type: 'declaration',
                name: identifier.value,
                value: value
            };
        }

        if (token.type === 'identifier') {
            const name = token.value;
            if (tokens[0] && tokens[0].value === '=') {
                tokens.shift(); // Consume '='
                const value = parseExpression();
                return {
                    type: 'assignment',
                    name: name,
                    value: value
                };
            }
        }

        if (token.type === 'keyword' && token.value === 'likho') {
            const value = tokens.shift();
            if (value.type === 'string') {
                return {
                    type: 'print',
                    isString: true,
                    value: value.value
                };
            }
            return {
                type: 'print',
                isString: false,
                value: value.value
            };
        }

        if (token.type === 'keyword' && token.value === 'agar') {
            const conditionLeft = tokens.shift();
            const conditionOperator = tokens.shift();
            const conditionRight = tokens.shift();

            tokens.shift(); // Consume '{'
            const body = parseBlock();

            let elseBody = [];
            if (tokens.length > 0 && tokens[0].value === 'warna') {
                tokens.shift();
                tokens.shift(); // Consume '{'
                elseBody = parseBlock();
            }

            return {
                type: 'conditional',
                condition: {
                    left: conditionLeft,
                    operator: conditionOperator.value,
                    right: conditionRight
                },
                body,
                elseBody
            };
        }

        if (token.type === 'keyword' && token.value === 'jabtak') {
            const conditionLeft = tokens.shift();
            const conditionOperator = tokens.shift();
            const conditionRight = tokens.shift();

            tokens.shift(); // Consume '{'
            const body = parseBlock();

            return {
                type: 'loop',
                condition: {
                    left: conditionLeft,
                    operator: conditionOperator.value,
                    right: conditionRight
                },
                body
            };
        }

        return null;
    }

    while (tokens.length > 0) {
        const statement = parseStatement();
        if (statement) ast.body.push(statement);
    }

    return ast;
}

function generate(node, language) {
    switch (node.type) {
        case 'program':
            if (language === 'go') {
                return `package main\n\nimport "fmt"\n\nfunc main() {\n${node.body.map(stmt => '    ' + generate(stmt, language)).join('\n')}\n}`;
            }
            return node.body.map(stmt => generate(stmt, language)).join('\n');

        case 'declaration':
            if (language === 'go') return `${node.name} := ${node.value}`;
            return `let ${node.name} = ${node.value};`;

        case 'assignment':
            return `${node.name} = ${node.value};`;

        case 'print':
            if (language === 'go') return node.isString ? `fmt.Println("${node.value}")` : `fmt.Println(${node.value})`;
            return node.isString ? `console.log("${node.value}");` : `console.log(${node.value});`;

        case 'conditional':
            const cond = `${node.condition.left.value} ${node.condition.operator} ${node.condition.right.value}`;
            const ifBody = node.body.map(stmt => generate(stmt, language)).join('\n');
            const elseBody = node.elseBody.map(stmt => generate(stmt, language)).join('\n');
            if (language === 'go') {
                return `if ${cond} {\n${ifBody}\n}${elseBody ? ` else {\n${elseBody}\n}` : ''}`;
            }
            return `if (${cond}) {\n${ifBody}\n}${elseBody ? ` else {\n${elseBody}\n}` : ''}`;

        case 'loop':
            const loopCond = `${node.condition.left.value} ${node.condition.operator} ${node.condition.right.value}`;
            const loopBody = node.body.map(stmt => generate(stmt, language)).join('\n');
            if (language === 'go') {
                return `for ${loopCond} {\n${loopBody}\n}`;
            }
            return `while (${loopCond}) {\n${loopBody}\n}`;

        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
}

function compiler(input, language = 'go') {
    const tokens = lexer(input);
    const ast = parser(tokens);
    const output = generate(ast, language);
    console.log(`✅ Generated ${language.toUpperCase()} Code:\n`);
    console.log(output);
}

const code = `
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
`;

compiler(code, 'go');

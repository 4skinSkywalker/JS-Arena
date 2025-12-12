function solution(program) {
    var stack = [];
    var output = '';
    var dx = 1, dy = 0; 
    var x = 0, y = 0;
    var string_mode = false;
    var instruction_count = 0;
    var a = 0, b = 0;

    program = program.map(function(row) { return row.split(''); });

    while (instruction_count < 100 && output.length < 1100) {
        var command = program[y][x];
        if (string_mode && command != '\"') {
            stack.push(command.charCodeAt());
        } else {
            if (!isNaN(command) && command !== " ") {
                stack.push(Number(command));
            } else if (command == '+') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(a + b);
            } else if (command == '-') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(b - a);
            } else if (command == '*') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(a * b);
            } else if (command == '/') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(b / a | 0);
            } else if (command == '%') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(b % a);
            } else if (command == '!') {
                a = stack.length > 0 ? stack.pop() : 0;
                stack.push(a == 0 ? 1 : 0);
            } else if (command == '`') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(b > a ? 1 : 0);
            } else if (command == '>') {
                dx = 1;
                dy = 0;
            } else if (command == '<') {
                dx = -1;
                dy = 0;
            } else if (command == '^') {
                dx = 0;
                dy = -1;
            } else if (command == 'v') {
                dx = 0;
                dy = 1;
            } else if (command == '_') {
                a = stack.length > 0 ? stack.pop() : 0;
                dx = a == 0 ? 1 : -1;
                dy = 0;
            } else if (command == '|') {
                a = stack.length > 0 ? stack.pop() : 0;
                dx = 0;
                dy = a == 0 ? 1 : -1;
            } else if (command == '\"') {
                string_mode = !string_mode;
            } else if (command == ':') {
                stack.push(stack.length > 0 ? stack[stack.length - 1] : 0);
            } else if (command == '\\') {
                a = stack.length > 0 ? stack.pop() : 0;
                b = stack.length > 0 ? stack.pop() : 0;
                stack.push(a);
                stack.push(b);
            } else if (command == '$') {
                if (stack.length > 0)
                    stack.pop();
            } else if (command == '.') {
                a = stack.length > 0 ? stack.pop() : 0;
                output += a + ' ';
            } else if (command == ',') {
                a = stack.length > 0 ? stack.pop() : 0;
                output += String.fromCharCode(a);
            } else if (command == '@') {
                break;
            }
        }

        x = (x + dx + program[0].length) % program[0].length;
        y = (y + dy + program.length) % program.length;

        instruction_count += 1;
    }

    return output;
}

module.exports = solution;
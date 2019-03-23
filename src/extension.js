const vscode = require('vscode');
const completions = require("./completions");
function activate(context) {
    vscode.languages.registerCompletionItemProvider("go", new completions.default(), '*', '@');
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
"use strict";
const vscode_1 = require("vscode");
const documenter_1 = require("./documenter");
const config_1 = require("./config");

class Completions {
    constructor() {
        this.tags = [
            {
                tag: '@APIVersion',
                snippet: '@APIVersion ${1:1.0.0}'
            },
            {
                tag: '@Title',
                snippet: '@Title'
            },
            {
                tag: '@Description',
                snippet: '@Description'
            },
            {
                tag: '@Param',
                snippet: '@Param'
            },
            {
                tag: '@Success',
                snippet: '@Success 0 success'
            },
            {
                tag: '@Failure',
                snippet: '@Failure 1 failed'
            },
            {
                tag: '@router',
                snippet: '@router / [get]'
            },
            {
                tag: '@Contact',
                snippet: '@Contact'
            },
            {
                tag: '@TermsOfServiceUrl',
                snippet: '@TermsOfServiceUrl'
            },
            {
                tag: '@License',
                snippet: '@License'
            },
            {
                tag: '@LicenseUrl',
                snippet: '@LicenseUrl'
            }
        ];
        this.formatted = false;
    }


    provideCompletionItems(document, position, token) {
        let result = [];
        let match;
        if ((match = document.getWordRangeAtPosition(position, /\/\*\*/)) !== undefined) {
            let documenter = new documenter_1.default(match, vscode_1.window.activeTextEditor);
            let block = new vscode_1.CompletionItem("/**", vscode_1.CompletionItemKind.Snippet);
            block.detail = "Beego DocBlocker";
            block.documentation = "Generate a Beego DocBlock from the code snippet below.";
            let range = document.getWordRangeAtPosition(position, /\/\*\* \*\//);
            block.range = range;
            block.insertText = documenter.autoDocument();
            result.push(block);
            return result;
        }
        if ((match = document.getWordRangeAtPosition(position, /\@[a-z]*/)) === undefined) {
            return result;
        }
        console.log("aa");
        let search = document.getText(match);
        let potential = this.getTags().filter((tag) => {
            return tag.tag.match(search) !== null;
        });
        potential.forEach(tag => {
            let item = new vscode_1.CompletionItem(tag.tag, vscode_1.CompletionItemKind.Snippet);
            item.range = match;
            item.insertText = new vscode_1.SnippetString(tag.snippet);
            result.push(item);
        });
        return result;
    }
    /**
     * Get the tag list for completions
     *
     * @returns {Array<{tag:string, snippet:string}>}
     */
    getTags() {
        if (!this.formatted) {
            this.tags.forEach((tag, index) => {
                if (tag.tag == '@author') {
                    tag.snippet = tag.snippet.replace("{{name}}", config_1.default.instance.get('author').name);
                    tag.snippet = tag.snippet.replace("{{email}}", config_1.default.instance.get('author').email);
                    this.tags[index] = tag;
                }
            });
            this.formatted = true;
        }
        return this.tags;
    }
}
exports.default = Completions;
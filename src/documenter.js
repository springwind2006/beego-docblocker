"use strict";
const doc_1 = require("./doc");
/**
 * Check which type of docblock we need and instruct the components to build the
 * snippet and pass it back
 */
class Documenter {
    constructor(range, editor) {
        this.targetPosition = range.start;
        this.editor = editor;
    }

    autoDocument() {
        return new doc_1.Doc().build(true);
    }
}
exports.default = Documenter;

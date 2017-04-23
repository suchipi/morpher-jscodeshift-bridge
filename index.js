"use babel";
import jscodeshift from "jscodeshift/dist/core";

module.exports = function jscodeshiftBridge(codemod, bufferState) {
  const fileInfo = { source: bufferState.text, path: bufferState.filePath };
  const api = { jscodeshift, stats: () => {} };

  // Since options are normally just extra things from the command line,
  // I decided to inject some morpher-specific helpers there.
  // They're not part of the normal jscodeshift api.
  let cursorPosition;
  let selection;
  const options = {
    setCursorPosition(value) { cursorPosition = value; },
    setSelection(value) { selection = value; },
  };

  const text = codemod(fileInfo, api, options);

  return {
    text,
    cursorPosition,
    selection
  };
}
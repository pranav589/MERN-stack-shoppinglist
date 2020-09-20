import React, { useCallback, useMemo } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "./Editor.css";

// CodeMirror is our code editor
// https://codemirror.net/doc/manual.html
export default React.forwardRef(function Editor({ className }, ref) {
  // Instantiate CodeMirror on the first render
  // React Note: You can use Hooks, or not, whatever you're comfortable with
  const { codeMirror, editorElement } = useMemo(() => {
    const editorElement = document.createElement("article");
    editorElement.id = "text-editor";
    editorElement.className = "text-editor";

    const codeMirror = CodeMirror(editorElement, {
      value: "console.log('Write some JS here!')",
      mode: "javascript",
      theme: "default",
      lineNumbers: true,
      autofocus: true
    });
    return { codeMirror, editorElement };
  }, []);

  // Append CodeMirror element to React div
  const containerRefCallback = useCallback(
    node => {
      if (ref) {
        ref.current = node;
      }

      if (node) {
        node.appendChild(editorElement);

        // Immediately refresh CodeMirror so that it renders properly
        codeMirror.refresh();
      }
    },
    [codeMirror, editorElement, ref]
  );

  return <div className={className} ref={containerRefCallback} />;
});

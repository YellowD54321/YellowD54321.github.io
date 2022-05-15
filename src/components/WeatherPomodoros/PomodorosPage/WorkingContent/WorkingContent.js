import "./workingContent.css";
import React, { useRef, useEffect } from "react";

function WorkingContent({ countState, isReadOnly, getWorkingContentValue }) {
  const inputRef = useRef(null);
  useEffect(() => {
    getWorkingContentValue(inputRef.current?.value);
    if (isReadOnly) {
      inputRef.current?.setAttribute("readonly", "readonly");
    } else {
      inputRef.current?.removeAttribute("readonly");
    }
  }, [countState]);
  return (
    <div>
      <input
        className="working-content-input"
        ref={inputRef}
        placeholder="Record your working content."
      />
    </div>
  );
}
export default WorkingContent;

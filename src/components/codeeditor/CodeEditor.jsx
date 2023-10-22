import { useEffect, useState } from "react";
import "./CodeEditor.css";
import {
  AiFillCopy,
  AiFillSave,
  AiFillLock,
  AiFillUnlock,
} from "react-icons/ai";

const CodeEditor = () => {
  const [code, setCode] = useState("Write your code here...");
  const [isLocked, setIsLocked] = useState(false);
  const codeKey = 'savedCode';
  useEffect(() => {
    const savedCode = localStorage.getItem(codeKey);
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const handleCopyCode = () => {
    if (!isLocked) {
      navigator.clipboard.writeText(code);
      alert("Code Copied to Clipboard!");
    }
  };

  const handleSaveCode = () => {
    try {
      localStorage.setItem(codeKey, code);
      alert('Code saved!');
    } catch (error) {
      console.error('Error saving code:', error);
      alert('Error saving code.');
    }
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="codeeditor">
      <div className="codeeditor__buttons">
        <AiFillCopy className="codeeditor__button" onClick={handleCopyCode} />
        <AiFillSave className="codeeditor__button" onClick={handleSaveCode} />
        {isLocked ? (
          <AiFillLock
            className={`codeeditor__button ${
              isLocked ? "codeeditor__button--locked" : ""
            }`}
            onClick={handleToggleLock}
          />
        ) : (
          <AiFillUnlock
            className={`codeeditor__button ${
              isLocked ? "codeeditor__button--locked" : ""
            }`}
            onClick={handleToggleLock}
          />
        )}
      </div>
      <textarea
        className={`codeeditor__codearea ${
          isLocked ? "codeeditor__codearea--locked" : ""
        }`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={isLocked}
      />
    </div>
  );
};

export default CodeEditor;

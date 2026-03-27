import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

function CodeEditor({ code, onChange, language = 'python', onRun, isRunning }) {
    const editorRef = useRef(null);
    const [fontSize, setFontSize] = useState(14);

    const handleEditorMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const languageMap = {
        python: 'python',
        javascript: 'javascript',
        cpp: 'cpp',
        java: 'java',
    };

    return (
        <div className="code-editor-wrapper">
            <div className="editor-toolbar">
                <div className="toolbar-left">
                    <span className="file-icon">📄</span>
                    <span className="file-name">
                        main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'cpp' ? 'cpp' : 'java'}
                    </span>
                </div>
                <div className="toolbar-right">
                    <div className="font-size-controls">
                        <button onClick={() => setFontSize(Math.max(10, fontSize - 1))} title="ลดขนาดตัวอักษร">A-</button>
                        <span>{fontSize}px</span>
                        <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} title="เพิ่มขนาดตัวอักษร">A+</button>
                    </div>
                    <button
                        className={`run-btn ${isRunning ? 'running' : ''}`}
                        onClick={onRun}
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <>
                                <span className="spinner"></span> กำลังรัน...
                            </>
                        ) : (
                            <>▶ รันโค้ด</>
                        )}
                    </button>
                </div>
            </div>

            <div className="editor-container">
                <Editor
                    height="100%"
                    language={languageMap[language] || 'python'}
                    value={code}
                    onChange={onChange}
                    onMount={handleEditorMount}
                    theme="vs-dark"
                    options={{
                        fontSize,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 16 },
                        lineNumbers: 'on',
                        roundedSelection: true,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: 'on',
                        renderLineHighlight: 'all',
                        cursorBlinking: 'smooth',
                        smoothScrolling: true,
                        bracketPairColorization: { enabled: true },
                    }}
                />
            </div>
        </div>
    );
}

export default CodeEditor;

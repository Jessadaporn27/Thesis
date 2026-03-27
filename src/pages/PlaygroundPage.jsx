import { useState, useCallback } from 'react';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import AiChat from '../components/AiChat';
import { executeCode } from '../services/pistonApi';
import './PlaygroundPage.css';

const LANGUAGES = [
    { id: 'python', name: 'Python', icon: '🐍', defaultCode: `# Python Playground 🐍\n# เขียนอะไรก็ได้ตามใจเลย!\n\nprint("Hello, World!")\n\nfor i in range(1, 6):\n    print(f"Number: {i}")\n` },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', defaultCode: `// JavaScript Playground ⚡\n// เขียนอะไรก็ได้ตามใจเลย!\n\nconsole.log("Hello, World!");\n\nfor (let i = 1; i <= 5; i++) {\n    console.log(\`Number: \${i}\`);\n}\n` },
];

function PlaygroundPage() {
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const [code, setCode] = useState(LANGUAGES[0].defaultCode);
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        setCode(lang.defaultCode);
        setOutput('');
        setError(null);
    };

    const handleRun = useCallback(async () => {
        if (isRunning) return;
        setIsRunning(true);
        setOutput('');
        setError(null);

        const result = await executeCode(code, selectedLang.id);

        if (result.success) {
            setOutput(result.output);
        } else {
            setOutput(result.output || '');
            setError(result.error);
        }
        setIsRunning(false);
    }, [code, selectedLang, isRunning]);

    const handleClear = () => {
        setCode('');
        setOutput('');
        setError(null);
    };

    const handleReset = () => {
        setCode(selectedLang.defaultCode);
        setOutput('');
        setError(null);
    };

    return (
        <div className="playground-page">
            {/* Top Bar */}
            <div className="playground-topbar">
                <div className="playground-title">
                    <span className="playground-icon">🎮</span>
                    <h1>Playground</h1>
                    <span className="playground-subtitle">เขียนโค้ดอะไรก็ได้ตามใจเลย!</span>
                </div>

                <div className="playground-controls">
                    {/* Language Selector */}
                    <div className="lang-selector">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.id}
                                className={`lang-btn ${selectedLang.id === lang.id ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang)}
                            >
                                <span>{lang.icon}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="playground-actions">
                        <button className="btn btn-secondary btn-sm" onClick={handleClear}>
                            🗑️ ล้าง
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                            ↺ รีเซ็ต
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor + Output */}
            <div className="playground-layout">
                <div className="playground-editor">
                    <CodeEditor
                        code={code}
                        onChange={(val) => setCode(val || '')}
                        language={selectedLang.id}
                        onRun={handleRun}
                        isRunning={isRunning}
                    />
                </div>
                <div className="playground-output">
                    <OutputPanel
                        output={output}
                        error={error}
                        isRunning={isRunning}
                    />
                </div>
            </div>

            {/* AI Chat */}
            <AiChat currentCode={code} lessonTitle="Playground - เขียนโค้ดอิสระ" />
        </div>
    );
}

export default PlaygroundPage;

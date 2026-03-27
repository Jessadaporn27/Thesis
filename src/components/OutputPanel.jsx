import './OutputPanel.css';

function OutputPanel({ output, error, isRunning }) {
    return (
        <div className="output-panel">
            <div className="output-header">
                <span className="output-title">
                    📟 เอาต์พุต (Output)
                </span>
                {isRunning && <span className="output-status running">กำลังรัน...</span>}
                {!isRunning && output && !error && <span className="output-status success">สำเร็จ ✓</span>}
                {!isRunning && error && <span className="output-status error">Error ✕</span>}
            </div>
            <div className="output-content">
                {isRunning ? (
                    <div className="output-loading">
                        <div className="loading-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <p>กำลังรันโค้ด...</p>
                    </div>
                ) : error ? (
                    <pre className="output-text error">{error}\n{output}</pre>
                ) : output ? (
                    <pre className="output-text">{output}</pre>
                ) : (
                    <div className="output-empty">
                        <span>👆</span>
                        <p>กดปุ่ม "รันโค้ด" เพื่อดูผลลัพธ์</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OutputPanel;

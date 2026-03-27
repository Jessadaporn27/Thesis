import './ChallengePanel.css';

function ChallengePanel({ challenge, onLoadChallenge, userOutput, isChecking }) {
    if (!challenge) return null;

    const isCorrect = userOutput !== null && userOutput === challenge.expectedOutput;
    const isWrong = userOutput !== null && userOutput !== challenge.expectedOutput;

    return (
        <div className={`challenge-panel ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
            <div className="challenge-header">
                <span className="challenge-badge">🎯 โจทย์</span>
                <h4 className="challenge-title">{challenge.title}</h4>
            </div>

            <div className="challenge-body">
                <p className="challenge-desc">{challenge.description}</p>

                <div className="expected-output">
                    <span className="expected-label">📋 Output ที่ต้องการ:</span>
                    <pre className="expected-code">{challenge.expectedOutput}</pre>
                </div>

                {challenge.hint && (
                    <details className="challenge-hint">
                        <summary>💡 ดูคำใบ้</summary>
                        <p>{challenge.hint}</p>
                    </details>
                )}
            </div>

            <div className="challenge-footer">
                <button className="btn btn-secondary" onClick={onLoadChallenge}>
                    📝 โหลดโจทย์ลง Editor
                </button>

                {isCorrect && (
                    <div className="result-badge correct">
                        <span>✅ ถูกต้อง! เก่งมาก!</span>
                    </div>
                )}

                {isWrong && (
                    <div className="result-badge wrong">
                        <span>❌ ยังไม่ถูกต้อง ลองใหม่อีกครั้ง!</span>
                        <div className="wrong-detail">
                            <div className="diff-row">
                                <span className="diff-label">ผลลัพธ์ของคุณ:</span>
                                <pre className="diff-value wrong-value">{userOutput || '(ไม่มี output)'}</pre>
                            </div>
                            <div className="diff-row">
                                <span className="diff-label">ที่ต้องการ:</span>
                                <pre className="diff-value correct-value">{challenge.expectedOutput}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChallengePanel;

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithAI } from '../services/geminiApi';
import './AiChat.css';

function AiChat({ currentCode, lessonTitle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage = { role: 'user', content: trimmed };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        const result = await chatWithAI(
            newMessages,
            currentCode,
            lessonTitle
        );

        setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: result.message },
        ]);
        setIsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };



    const quickQuestions = [
        'โค้ดนี้ทำงานยังไง?',
        'ช่วยอธิบาย error ให้หน่อย',
        'ยกตัวอย่างเพิ่มเติม',
        'ให้ hint โจทย์หน่อย',
    ];

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className={`ai-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {/* Chat Panel */}
            <div className={`ai-chat-panel ${isOpen ? 'open' : ''}`}>
                <div className="ai-chat-header">
                    <div className="ai-chat-title">
                        <span className="ai-avatar">🤖</span>
                        <div>
                            <h4>CodeBuddy AI</h4>
                            <span className="ai-subtitle">ผู้ช่วยสอนเขียนโค้ด</span>
                        </div>
                    </div>
                    <button className="ai-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="ai-chat-messages">
                    {messages.length === 0 && (
                        <div className="ai-welcome">
                            <div className="ai-welcome-icon">🤖</div>
                            <h4>สวัสดีครับ! ผม CodeBuddy</h4>
                            <p>ผู้ช่วยสอนเขียนโค้ดของคุณ ถามอะไรก็ได้เลยครับ!<br /><small style={{ color: 'var(--text-muted)' }}>ใช้ Ollama LLM — กดปุ่ม 🤖 ที่ Navbar เพื่อตั้งค่า</small></p>
                            <div className="quick-questions">
                                {quickQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        className="quick-q-btn"
                                        onClick={() => {
                                            setInput(q);
                                            if (inputRef.current) inputRef.current.focus();
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`ai-message ${msg.role}`}>
                            <div className="ai-message-avatar">
                                {msg.role === 'user' ? '👤' : '🤖'}
                            </div>
                            <div className="ai-message-content">
                                {msg.role === 'assistant' ? (
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                ) : (
                                    <p>{msg.content}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="ai-message assistant">
                            <div className="ai-message-avatar">🤖</div>
                            <div className="ai-message-content">
                                <div className="ai-typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="ai-chat-input">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="ถามอะไรก็ได้เลยครับ..."
                        rows="1"
                        disabled={isLoading}
                    />
                    <button
                        className="ai-send-btn"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </>
    );
}

export default AiChat;

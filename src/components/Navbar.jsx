import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getModel, setModel, checkOllamaStatus, getAvailableModels } from '../services/geminiApi';
import './Navbar.css';

function Navbar() {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [ollamaOnline, setOllamaOnline] = useState(false);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(getModel());

    useEffect(() => {
        checkOllamaStatus().then(setOllamaOnline);
    }, []);

    const handleOpenModal = async () => {
        setShowModal(true);
        const online = await checkOllamaStatus();
        setOllamaOnline(online);
        if (online) {
            const available = await getAvailableModels();
            setModels(available);
        }
    };

    const handleSelectModel = (modelName) => {
        setModel(modelName);
        setSelectedModel(modelName);
        setShowModal(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-icon">💻</span>
                        <span className="logo-text">
                            Code<span className="gradient-text">Learn</span>
                        </span>
                    </Link>

                    <div className="navbar-links">
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            🏠 หน้าแรก
                        </Link>
                        <Link
                            to="/courses"
                            className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}
                        >
                            📚 คอร์สเรียน
                        </Link>
                        <Link
                            to="/playground"
                            className={`nav-link ${location.pathname === '/playground' ? 'active' : ''}`}
                        >
                            🎮 Playground
                        </Link>
                    </div>

                    <div className="navbar-actions">
                        <button
                            className={`api-key-btn ${ollamaOnline ? 'has-key' : ''}`}
                            onClick={handleOpenModal}
                            title="ตั้งค่า AI Model"
                        >
                            🤖 {ollamaOnline ? `Ollama ✓` : 'ตั้งค่า AI'}
                        </button>
                    </div>
                </div>
            </nav>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>🤖 ตั้งค่า AI (Ollama)</h3>

                        <div className="ollama-status">
                            <span className={`status-dot ${ollamaOnline ? 'online' : 'offline'}`}></span>
                            <span>{ollamaOnline ? 'Ollama กำลังทำงาน' : 'Ollama ไม่ได้ทำงาน'}</span>
                        </div>

                        {!ollamaOnline ? (
                            <div className="ollama-setup">
                                <p className="modal-desc">ติดตั้ง Ollama เพื่อใช้ AI ในเครื่อง (ฟรี!):</p>
                                <ol className="setup-steps">
                                    <li>
                                        ดาวน์โหลดจาก{' '}
                                        <a href="https://ollama.com" target="_blank" rel="noreferrer">ollama.com</a>
                                    </li>
                                    <li>ติดตั้งและเปิด Ollama</li>
                                    <li>
                                        เปิด Terminal แล้วรัน:<br />
                                        <code>ollama pull llama3.2</code>
                                    </li>
                                    <li>กลับมาเปิดหน้านี้ใหม่</li>
                                </ol>
                            </div>
                        ) : (
                            <div className="model-selector">
                                <p className="modal-desc">เลือกโมเดล AI:</p>
                                <div className="model-current">
                                    โมเดลปัจจุบัน: <strong>{selectedModel}</strong>
                                </div>
                                {models.length > 0 ? (
                                    <div className="model-list">
                                        {models.map((m) => (
                                            <button
                                                key={m.name}
                                                className={`model-item ${m.name === selectedModel ? 'active' : ''}`}
                                                onClick={() => handleSelectModel(m.name)}
                                            >
                                                <span className="model-name">{m.name}</span>
                                                <span className="model-size">
                                                    {(m.size / 1e9).toFixed(1)} GB
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-models">
                                        ยังไม่มีโมเดล — รัน <code>ollama pull llama3.2</code> ใน Terminal
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;

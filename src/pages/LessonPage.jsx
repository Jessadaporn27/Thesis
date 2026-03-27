import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import courses from '../data/courses';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import ChallengePanel from '../components/ChallengePanel';
import AiChat from '../components/AiChat';
import { executeCode, preloadPyodide } from '../services/pistonApi';
import './LessonPage.css';

function LessonPage() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    const course = courses.find((c) => c.id === courseId);
    const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
    const lesson = course?.lessons[lessonIndex];

    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [challengeOutput, setChallengeOutput] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (lesson) {
            setCode(lesson.starterCode || '');
            setOutput('');
            setError(null);
            setActiveChallenge(null);
            setChallengeOutput(null);
        }
    }, [lessonId, courseId]);

    // Preload Pyodide when visiting a Python lesson
    useEffect(() => {
        if (course?.language === 'python') {
            preloadPyodide();
        }
    }, [course]);

    const handleRun = useCallback(async () => {
        if (isRunning) return;
        setIsRunning(true);
        setOutput('');
        setError(null);
        setChallengeOutput(null);

        const result = await executeCode(code, course?.language || 'python');

        if (result.success) {
            setOutput(result.output);
            setError(null);
            // Check challenge
            if (activeChallenge) {
                setChallengeOutput(result.output);
            }
        } else {
            setOutput(result.output || '');
            setError(result.error);
        }

        setIsRunning(false);
    }, [code, course, isRunning, activeChallenge]);

    const handleLoadChallenge = (challenge) => {
        setCode(challenge.starterCode || '');
        setActiveChallenge(challenge);
        setChallengeOutput(null);
        setOutput('');
        setError(null);
    };

    const goToLesson = (index) => {
        if (course && course.lessons[index]) {
            navigate(`/learn/${courseId}/${course.lessons[index].id}`);
        }
    };

    if (!course || !lesson) {
        return (
            <div className="lesson-not-found">
                <h2>ไม่พบบทเรียน 😕</h2>
                <Link to="/courses" className="btn btn-primary">กลับไปหน้าคอร์ส</Link>
            </div>
        );
    }

    return (
        <div className="lesson-page">
            {/* Sidebar */}
            <aside className={`lesson-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <Link to="/courses" className="sidebar-back">← คอร์ส</Link>
                    <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                </div>
                {sidebarOpen && (
                    <>
                        <div className="sidebar-course-info">
                            <span className="sidebar-course-icon">{course.icon}</span>
                            <h3>{course.title}</h3>
                        </div>
                        <nav className="sidebar-lessons">
                            {course.lessons.map((l, i) => (
                                <Link
                                    key={l.id}
                                    to={`/learn/${courseId}/${l.id}`}
                                    className={`sidebar-lesson-item ${l.id === lessonId ? 'active' : ''}`}
                                >
                                    <span className="sidebar-lesson-num">{i + 1}</span>
                                    <span className="sidebar-lesson-title">{l.title.replace(/^\d+\.\s*/, '')}</span>
                                </Link>
                            ))}
                        </nav>
                    </>
                )}
            </aside>

            {/* Main Content */}
            <main className="lesson-main">
                <div className="lesson-layout">
                    {/* Left: Lesson Content */}
                    <div className="lesson-content-panel">
                        <div className="lesson-content-header">
                            <div className="lesson-breadcrumb">
                                <span>{course.icon} {course.title}</span>
                                <span className="breadcrumb-sep">/</span>
                                <span>บทที่ {lessonIndex + 1}</span>
                            </div>
                            <div className="lesson-nav-buttons">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    disabled={lessonIndex === 0}
                                    onClick={() => goToLesson(lessonIndex - 1)}
                                >
                                    ← ก่อนหน้า
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    disabled={lessonIndex === course.lessons.length - 1}
                                    onClick={() => goToLesson(lessonIndex + 1)}
                                >
                                    ถัดไป →
                                </button>
                            </div>
                        </div>

                        <div className="lesson-content-body">
                            <div className="markdown-content">
                                <ReactMarkdown>{lesson.content}</ReactMarkdown>
                            </div>

                            {/* Challenges Section */}
                            {lesson.challenges && lesson.challenges.length > 0 && (
                                <div className="challenges-section">
                                    <h3 className="challenges-title">🎯 โจทย์ฝึกหัด</h3>
                                    <div className="challenges-list">
                                        {lesson.challenges.map((ch) => (
                                            <ChallengePanel
                                                key={ch.id}
                                                challenge={ch}
                                                onLoadChallenge={() => handleLoadChallenge(ch)}
                                                userOutput={activeChallenge?.id === ch.id ? challengeOutput : null}
                                                isChecking={isRunning && activeChallenge?.id === ch.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Code Editor + Output */}
                    <div className="lesson-editor-panel">
                        <div className="editor-section">
                            <CodeEditor
                                code={code}
                                onChange={(val) => setCode(val || '')}
                                language={course.language}
                                onRun={handleRun}
                                isRunning={isRunning}
                            />
                        </div>
                        <div className="output-section">
                            <OutputPanel
                                output={output}
                                error={error}
                                isRunning={isRunning}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* AI Chat */}
            <AiChat currentCode={code} lessonTitle={`${course.title} - ${lesson.title}`} />
        </div>
    );
}

export default LessonPage;

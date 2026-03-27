import { Link } from 'react-router-dom';
import courses from '../data/courses';
import './HomePage.css';

function HomePage() {
    const features = [
        {
            icon: '📝',
            title: 'Code Editor',
            desc: 'เขียนโค้ดด้วย Editor ระดับ Pro พร้อม Syntax Highlighting',
        },
        {
            icon: '▶️',
            title: 'รันโค้ดได้ทันที',
            desc: 'รันโค้ดจริงบนเว็บ รองรับ Python, JavaScript และอื่นๆ',
        },
        {
            icon: '🎯',
            title: 'โจทย์ท้าทาย',
            desc: 'ลองทำโจทย์และเช็คคำตอบว่าถูกต้องไหมแบบ Real-time',
        },
        {
            icon: '🤖',
            title: 'AI ช่วยสอน',
            desc: 'ถาม AI ได้ทุกเมื่อ เหมือนมี Tutor ส่วนตัว 24 ชั่วโมง',
        },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>
                </div>
                <div className="hero-content container">
                    <div className="hero-badge animate-fade-in">🚀 เริ่มต้นเรียนเขียนโค้ดวันนี้</div>
                    <h1 className="hero-title animate-fade-in">
                        เรียนเขียนโค้ด<br />
                        <span className="gradient-text">ง่าย สนุก ได้ผลจริง</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in">
                        แพลตฟอร์มสอนเขียนโปรแกรมแบบ Interactive ที่คุณสามารถ<br />
                        เขียนโค้ด, รันผลลัพธ์, ทำโจทย์ และถาม AI ได้ทันทีบนเว็บ
                    </p>
                    <div className="hero-actions animate-fade-in">
                        <Link to="/courses" className="btn btn-primary btn-lg">
                            📚 เริ่มเรียนเลย
                        </Link>
                        <a href="#features" className="btn btn-secondary btn-lg">
                            ✨ คุณสมบัติ
                        </a>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">{courses.reduce((acc, c) => acc + c.lessons.length, 0)}</span>
                            <span className="stat-label">บทเรียน</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">{courses.reduce((acc, c) => acc + c.lessons.reduce((a, l) => a + (l.challenges?.length || 0), 0), 0)}</span>
                            <span className="stat-label">โจทย์</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">{courses.length}</span>
                            <span className="stat-label">คอร์ส</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section" id="features">
                <div className="container">
                    <h2 className="section-title">
                        ทำไมต้อง <span className="gradient-text">CodeLearn</span>?
                    </h2>
                    <div className="features-grid">
                        {features.map((feat, i) => (
                            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-icon">{feat.icon}</div>
                                <h3>{feat.title}</h3>
                                <p>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Preview */}
            <section className="courses-preview-section">
                <div className="container">
                    <h2 className="section-title">คอร์สแนะนำ 📚</h2>
                    <div className="courses-preview-grid">
                        {courses.map((course) => (
                            <Link
                                key={course.id}
                                to={`/learn/${course.id}/${course.lessons[0].id}`}
                                className="course-preview-card"
                            >
                                <div className="course-icon-lg" style={{ background: `${course.color}20` }}>
                                    <span>{course.icon}</span>
                                </div>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div className="course-meta">
                                    <span className="course-difficulty">{course.difficulty}</span>
                                    <span className="course-lesson-count">{course.totalLessons} บทเรียน</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="container">
                    <p>💻 CodeLearn — แพลตฟอร์มเรียนเขียนโค้ดแบบ Interactive</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;

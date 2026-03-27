import { Link } from 'react-router-dom';
import courses from '../data/courses';
import './CoursesPage.css';

function CoursesPage() {
    return (
        <div className="courses-page">
            <div className="container">
                <div className="courses-header">
                    <h1>📚 คอร์สเรียนทั้งหมด</h1>
                    <p>เลือกภาษาที่คุณต้องการเรียนรู้ แต่ละคอร์สมีเนื้อหาสอนและโจทย์ให้ฝึกฝน</p>
                </div>

                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-card-header" style={{ borderColor: course.color }}>
                                <div className="course-card-icon" style={{ background: `${course.color}20`, color: course.color }}>
                                    {course.icon}
                                </div>
                                <div className="course-card-badge">{course.difficulty}</div>
                            </div>

                            <div className="course-card-body">
                                <h2>{course.title}</h2>
                                <p>{course.description}</p>

                                <div className="course-lessons-list">
                                    {course.lessons.map((lesson, i) => (
                                        <Link
                                            key={lesson.id}
                                            to={`/learn/${course.id}/${lesson.id}`}
                                            className="course-lesson-item"
                                        >
                                            <span className="lesson-number">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="lesson-title-text">{lesson.title}</span>
                                            <span className="lesson-challenges">
                                                {lesson.challenges?.length || 0} โจทย์
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="course-card-footer">
                                <Link to={`/learn/${course.id}/${course.lessons[0].id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    ▶ เริ่มเรียน
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoursesPage;

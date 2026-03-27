import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import PlaygroundPage from './pages/PlaygroundPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/learn/:courseId/:lessonId" element={<LessonPage />} />
      </Routes>
    </Router>
  );
}

export default App;

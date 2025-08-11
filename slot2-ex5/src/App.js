import logo from './logo.svg';
import './App.css';

function App() {
  const courses = [
    { id: 1, name: "HTML & CSS" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "ReactJS" },
    { id: 4, name: "NodeJS" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>List of Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

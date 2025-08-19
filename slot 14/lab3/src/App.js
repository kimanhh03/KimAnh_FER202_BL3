import React, { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import SortDropdown from './components/SortDropdown';
import StudentGrid from './components/StudentGrid';
import StudentDetailModal from './components/StudentDetailModal';
import ProfileWizard from './components/ProfileWizard';
import Footer from './components/Footer';
import { students as initialStudentsData } from './data/student';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [students, setStudents] = useState(initialStudentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showProfileWizard, setShowProfileWizard] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const combinedSearch = searchTerm || quickSearch;
      const matchesSearch =
        !combinedSearch ||
        student.name.toLowerCase().includes(combinedSearch.toLowerCase()) ||
        student.email.toLowerCase().includes(combinedSearch.toLowerCase());

      const matchesAge =
        ageRange === 'all' ||
        (ageRange === '<=20' && student.age <= 20) ||
        (ageRange === '21-25' && student.age >= 21 && student.age <= 25) ||
        (ageRange === '>25' && student.age > 25);

      const matchesAvatar = !hasAvatar || (hasAvatar && student.avatar);

      return matchesSearch && matchesAge && matchesAvatar;
    });

    if (sortBy !== 'default') {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'age-asc':
            return a.age - b.age;
          case 'age-desc':
            return b.age - a.age;
          case 'name-az':
            return a.name.localeCompare(b.name);
          case 'name-za':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [students, searchTerm, quickSearch, ageRange, hasAvatar, sortBy]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar 
        quickSearch={quickSearch} 
        setQuickSearch={setQuickSearch}
        onBuildProfile={() => setShowProfileWizard(true)}
      />
      <Hero />

      <Container fluid className="flex-grow-1 py-4">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          hasAvatar={hasAvatar}
          setHasAvatar={setHasAvatar}
        />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          <div className="text-muted">
            Showing {filteredAndSortedStudents.length} of {students.length} students
          </div>
        </div>

        <StudentGrid
          students={filteredAndSortedStudents}
          onViewDetails={handleViewDetails}
          onDelete={deleteStudent}
        />
      </Container>

      <Footer />

      <StudentDetailModal
        student={selectedStudent}
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
      />

      <ProfileWizard
        show={showProfileWizard}
        onHide={() => setShowProfileWizard(false)}
      />
    </div>
  );
};

export default App;
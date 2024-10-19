// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostTypeSelector from './components/PostTypeSelector';
import FindQuestionPage from './components/FindQuestionPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>DEV@Deakin</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-post">New Post</Link>
            <Link to="/find-question">Find Question</Link>
          </nav>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={
              <div className="home-content">
                <h2>Welcome to DEV@Deakin</h2>
                <p>Share your knowledge and connect with developers!</p>
              </div>
            } />
            <Route path="/new-post" element={<PostTypeSelector />} />
            <Route path="/find-question" element={<FindQuestionPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 DEV@Deakin. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
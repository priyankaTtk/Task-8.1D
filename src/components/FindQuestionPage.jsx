// src/components/FindQuestionPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, deleteDoc, doc, orderBy } from 'firebase/firestore';
import QuestionCard from './QuestionCard';

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionList);
      setFilteredQuestions(questionList);
    });

    return () => unsubscribe();
  }, []);

  const handleFilter = () => {
    let filtered = questions;
    if (filterType === 'date') {
      filtered = questions.filter(q => q.createdAt.toDate().toDateString() === new Date(filterValue).toDateString());
    } else if (filterType === 'tag') {
      filtered = questions.filter(q => q.tags.includes(filterValue.toLowerCase()));
    } else if (filterType === 'title') {
      filtered = questions.filter(q => q.title.toLowerCase().includes(filterValue.toLowerCase()));
    }
    setFilteredQuestions(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      console.log('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="find-question-page">
      <h1>Find Questions</h1>
      <div className="filter-section">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Select filter type</option>
          <option value="date">Date</option>
          <option value="tag">Tag</option>
          <option value="title">Title</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter filter value"
        />
        <button onClick={handleFilter}>Apply Filter</button>
      </div>
      <div className="question-list">
        {filteredQuestions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            onDelete={() => handleDelete(question.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FindQuestionPage;
// src/components/QuestionForm.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'questions'), questionData);
      console.log('Question submitted successfully');
      // Reset form fields
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>Ask a Question</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Start your question with how, what, why, etc."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Describe your problem</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide more details about your question"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add up to 3 tags separated by commas (e.g., javascript, react, firebase)"
        />
      </div>
      <button type="submit" className="submit-button">Post Question</button>
    </form>
  );
};

export default QuestionForm;
// src/components/QuestionCard.jsx
import React, { useState } from 'react';

const QuestionCard = ({ question, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="question-card" onClick={() => setExpanded(!expanded)}>
      <h2>{question.title}</h2>
      <p>{question.description.substring(0, 100)}...</p>
      <div className="tags">
        {question.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <p>Posted on: {question.createdAt.toDate().toLocaleDateString()}</p>
      {expanded && (
        <div className="expanded-content">
          <p>{question.description}</p>
          <button onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
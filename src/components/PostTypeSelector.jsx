// src/components/PostTypeSelector.jsx
import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';

const PostTypeSelector = () => {
  const [postType, setPostType] = useState('question');

  return (
    <div className="post-type-selector">
      <h2>Create a New Post</h2>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
          />
          Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
          />
          Article
        </label>
      </div>
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default PostTypeSelector;
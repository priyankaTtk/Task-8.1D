// src/components/ArticleForm.jsx
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `articles/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const articleData = {
        title,
        abstract,
        articleText,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'articles'), articleData);
      console.log('Article submitted successfully');
      // Reset form fields
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="form-title">
      <h2 id="form-title" className="visually-hidden">Article Form</h2>
      <p className="info-text" id="form-description">
        What do you want to ask or share?
      </p>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
          required
          aria-describedby="title-help"
        />
        <small id="title-help" className="help-text">Enter a clear and concise title for your article</small>
      </div>
      <div className="form-group">
        <label htmlFor="abstract">Abstract</label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Enter a 1-paragraph abstract"
          required
          aria-describedby="abstract-help"
        ></textarea>
        <small id="abstract-help" className="help-text">Provide a brief summary of your article in one paragraph</small>
      </div>
      <div className="form-group">
        <label htmlFor="articleText">Article Text</label>
        <textarea
          id="articleText"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Enter your article content"
          required
          aria-describedby="article-text-help"
        ></textarea>
        <small id="article-text-help" className="help-text">Write your full article content here</small>
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="tags-input"
          placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
          aria-describedby="tags-help"
        />
        <small id="tags-help" className="help-text">Add up to 3 tags, separated by commas, to describe your article (e.g., Java, Programming, Web Development)</small>
      </div>
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          aria-describedby="image-help"
        />
        <small id="image-help" className="help-text">Upload an image for your article (optional)</small>
      </div>
      <button type="submit" className="submit-button">Post Article</button>
    </form>
  );
};

export default ArticleForm;

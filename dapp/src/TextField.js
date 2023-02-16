import React, { useState } from 'react';
import './App.css'

const TextField = () => {
  const [text, setText] = useState('My Collection (Click to change)');
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div onClick={handleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <h2>
          {text} <i className="fa fa-pencil"></i>
        </h2>
      )}
    </div>
  );
};

export default TextField;
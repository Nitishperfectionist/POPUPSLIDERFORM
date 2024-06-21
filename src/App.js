import React, { useState } from 'react';
import FormPopup from './components/FormPopup';
import styled from 'styled-components';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={toggleForm}>Open Form</Button>
      <FormPopup isOpen={isOpen} toggleForm={toggleForm} />
    </div>
  );
};

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default App;

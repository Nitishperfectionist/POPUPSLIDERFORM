import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormPopup = ({ isOpen, toggleForm }) => {
  const [formData, setFormData] = useState({});
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ENTITY_ID = 'e-b66bca24-f6ce-4489-b2e9-e24a90e04877';
  const CAMPAIGN_ID = 'c-14d4f959-5999-4308-af48-37549b89eec7';

  useEffect(() => {
    if (isOpen) {
      fetchFormData();
    }
  }, [isOpen]);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.questprotocol.xyz/api/v2/entities/${ENTITY_ID}/campaigns/${CAMPAIGN_ID}`, {
        headers: {
          'API_KEY': 'k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6ImUtYjY2YmNhMjQtZjZjZS00NDg5LWIyZTktZTI0YTkwZTA0ODc3IiwiaWF0IjoxNzE4ODcyODg0fQ.O0DEB_S-dirK4MMa2nm0yqwDhdCtdvTySPGpmCGAqqU`
        }
      });
      setFormData(response.data);
    } catch (error) {
      setError('Failed to fetch form data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formInput.name || !formInput.email) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`https://staging.questprotocol.xyz/api/v2/entities/${ENTITY_ID}/campaigns/${CAMPAIGN_ID}/verify`, formInput, {
        headers: {
          'API_KEY': 'k-8f7aa4ea-a0c7-42ac-a821-a342d21887fe',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6ImUtYjY2YmNhMjQtZjZjZS00NDg5LWIyZTktZTI0YTkwZTA0ODc3IiwiaWF0IjoxNzE4ODcyODg0fQ.O0DEB_S-dirK4MMa2nm0yqwDhdCtdvTySPGpmCGAqqU`
        }
      });
      alert('Form submitted successfully!');
    } catch (error) {
      setError('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay $isOpen={isOpen}>
      <FormContainer $isOpen={isOpen}>
        <CloseButton onClick={toggleForm}>&times;</CloseButton>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>{formData.title || 'Form'}</h2>
            <label>
              Name:
              <input type="text" name="name" value={formInput.name || ''} onChange={handleInputChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formInput.email || ''} onChange={handleInputChange} required />
            </label>
            {/* Populate form fields dynamically based on formData */}
            {formData.fields && formData.fields.map((field) => (
              <label key={field.id}>
                {field.label}:
                <input 
                  type={field.type} 
                  name={field.name} 
                  value={formInput[field.name] || ''} 
                  onChange={handleInputChange} 
                  required={field.required}
                />
              </label>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </FormContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  transition: display 0.5s ease-in-out;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

export default FormPopup;

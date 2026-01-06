import React, { useState } from 'react';

const JobAlert = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setMessage(null);

    try {
      // Get token from localStorage (Check if you use 'token' or 'userToken')
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:5000/api/alerts/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keywords: [keyword] }) // Backend expects an array
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Success! You'll be notified for " + keyword + " jobs.");
        setKeyword(''); // Clear input
      } else {
        setMessage("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server Error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>🔔 Get Notified for New Jobs</h3>
      <p style={styles.subtext}>Don't miss out. Enter a skill (e.g., "React") to get email alerts.</p>
      
      <form onSubmit={handleSubscribe} style={styles.form}>
        <input 
          type="text" 
          placeholder="Enter Skill (e.g. Java, Design)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Subscribing...' : 'Notify Me'}
        </button>
      </form>
      
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Simple CSS Styles (You can replace this with CSS classes or Tailwind)
const styles = {
  container: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '20px auto'
  },
  heading: { margin: '0 0 10px 0', color: '#0369a1' },
  subtext: { margin: '0 0 15px 0', color: '#555' },
  form: { display: 'flex', justifyContent: 'center', gap: '10px' },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '60%'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0284c7',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  message: { marginTop: '10px', fontWeight: 'bold' }
};

export default JobAlert;
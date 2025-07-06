import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    bod: '',
    gender: 'Male',
    address: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const leafContainer = document.getElementById('leaf-container');
    const leaves = ['🍃', '🌿', '🍀', '🌾'];

    function createLeaf() {
      const leaf = document.createElement('div');
      leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
      leaf.style.position = 'absolute';
      leaf.style.top = '-50px';
      leaf.style.left = `${Math.random() * 100}vw`;
      leaf.style.fontSize = `${20 + Math.random() * 15}px`;
      leaf.style.opacity = 0.8;
      leaf.style.pointerEvents = 'none';
      leaf.style.animation = `floatLeaf ${8 + Math.random() * 5}s linear forwards`;
      leafContainer.appendChild(leaf);
      leaf.addEventListener('animationend', () => leaf.remove());
    }

    const interval = setInterval(createLeaf, 1000);

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatLeaf {
        from { transform: translateY(-60px) rotate(0deg); opacity: 0.5; }
        to { transform: translateY(110vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('🌿 Registered successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Registration failed. Server error.');
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #d0f1e0 0%, #a4e4b3 30%, #fcb6c4 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '20px',
      position: 'relative',
    }}>
      <div id="leaf-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '35px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        zIndex: 2,
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #16a34a, #059669)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🌿 Start Planting
        </div>
        <form onSubmit={handleRegister}>
          <Input label="Username" name="username" value={form.username} onChange={handleChange} placeholder="Create a username" />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Your email address" />
          <Input label="Password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" type="password" />
          <Input label="Birthdate" name="bod" value={form.bod} onChange={handleChange} type="date" />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} placeholder="Your location" />
          <Select label="Role" name="role" value={form.role} onChange={handleChange} options={['user', 'admin']} />

          <button type="submit" style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(22, 163, 74, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Register
          </button>

          {message && (
            <div style={{
              textAlign: 'center',
              marginTop: '10px',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '14px',
              background: message.includes('successfully') ? '#dcfce7' : '#fee2e2',
              color: message.includes('successfully') ? '#166534' : '#b91c1c',
            }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
function Input({ label, name, value, onChange, placeholder = '', type = 'text' }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

// Reusable Select Component
function Select({ label, name, value, onChange, options }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={labelStyle}>{label}</label>
      <select name={name} value={value} onChange={onChange} style={inputStyle}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// Styles
const labelStyle = {
  display: 'block',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  paddingRight: '0.1px',
  border: '2px solid #d1fae5',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #fff, #f0fdf4)',
  fontSize: '15px',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  border: 'none',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #16a34a, #059669)',
  color: 'white',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.3s',
};

export default Register;

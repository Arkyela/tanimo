import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    // Add floatLeaf animation CSS
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
try {
  const res = await fetch('http://localhost:4000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await res.json();

  localStorage.setItem('token', data.token);

  console.log('User data:', data.user);
  console.log('User type:', data.user.userType);

  setMessage('✅ Logged in successfully! Redirecting...');
  setTimeout(() => {
    if (data.user.userType === 'admin') {
      navigate('/adminDashboard');
    } else {
      navigate('/userDashboard');
    }
  }, 1000);

} catch (err) {
  setMessage('Login failed. Server error.');
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '60px',
        maxWidth: '1100px',
        width: '100%',
        flexWrap: 'wrap',
        zIndex: 2,
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src="/logo.png" alt="Tanimo Logo" style={{ maxWidth: '400px', width: '300%', marginBottom: '15px' }} />
          <h1 style={{ fontSize: '36px', color: '#065f46', marginBottom: '10px' }}>Tanimo</h1>
          <p style={{ color: '#333', fontSize: '16px' }}>Your Smart Gardening Companion</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '35px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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
            🌱 Welcome Back
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email or Username
              </label>
              <input
                type="text"
                placeholder="Enter your details"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  paddingRight: '0.1px',
                  border: '2px solid #d1fae5',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #fff, #f0fdf4)',
                  fontSize: '15px',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Your garden key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  paddingRight: '0.1px',
                  border: '2px solid #d1fae5',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #fff, #f0fdf4)',
                  fontSize: '15px',
                }}
              />
            </div>
            <button type="submit" style={{
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
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(22, 163, 74, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Login
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
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [weatherData, setWeatherData] = useState(null);
  const [userData, setUserData] = useState({
    name: 'Juan Dela Cruz',
    avatar: '👨‍🌾'
  });

  useEffect(() => {
    const fetchWeather = async () => {
      setTimeout(() => {
        setWeatherData({
          temp: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          rainChance: 20,
          icon: '⛅'
        });
      }, 800);
    };
    fetchWeather();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Falling leaves effect
  useEffect(() => {
    const sidebarLeafContainer = document.getElementById('leaf-container-sidebar');
    const leafEmojis = ['🍃', '🌿', '🍂', '🍁', '🌱', '🌾', '🌻', '🌸'];
    
    const createLeaf = () => {
      const leaf = document.createElement('div');
      leaf.className = 'leaf-sidebar';
      leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.fontSize = (14 + Math.random() * 10) + 'px';
      leaf.style.opacity = 0.7 + Math.random() * 0.3;
      
      const animationType = Math.random();
      if (animationType > 0.7) {
        leaf.style.animationName = 'fallLeafSlowSpin';
        leaf.style.animationDuration = (12 + Math.random() * 6) + 's';
      } else if (animationType > 0.4) {
        leaf.style.animationName = 'fallLeafWithSway';
        leaf.style.animationDuration = (8 + Math.random() * 4) + 's';
      } else {
        leaf.style.animationName = 'fallLeafStraight';
        leaf.style.animationDuration = (6 + Math.random() * 3) + 's';
      }
      
      sidebarLeafContainer.appendChild(leaf);
      leaf.addEventListener('animationend', () => leaf.remove());
    };

    const interval = setInterval(createLeaf, sidebarCollapsed ? 1500 : 800);
    return () => clearInterval(interval);
  }, [sidebarCollapsed]);

  const navItems = [
    { icon: '📊', label: 'Dashboard', id: 'dashboard' },
    { icon: '🪴', label: 'My Garden', id: 'garden' },
    { icon: '📷', label: 'Growth Monitor', id: 'monitor' },
    { icon: '📦', label: 'Inventory', id: 'inventory' },
    { icon: '🛒', label: 'Market Connect', id: 'market' },
    { icon: '📅', label: 'Planting Calendar', id: 'calendar' },
    { icon: '🌍', label: 'Grow Circles', id: 'circles' },
    { 
      icon: '⚙️', 
      label: 'Settings', 
      id: 'settings',
      subItems: [
        { icon: '🚪', label: 'Logout', id: 'logout', action: handleLogout }
      ]
    }
  ];

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: 'linear-gradient(135deg, #f4fff7 0%, #e8f5e8 100%)',
      display: 'flex',
      minHeight: '100vh'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? '80px' : '260px',
        background: 'linear-gradient(to bottom, #1b5e20 0%, #2e7d32 100%)',
        color: 'white',
        padding: sidebarCollapsed ? '20px 10px' : '30px 20px',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        zIndex: 100,
        overflow: 'hidden'
      }}>
        {/* Logo and Collapse Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          {!sidebarCollapsed ? (
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', fontWeight: 'bold' }}>
              <span>🌱</span>
              Tanimo
            </h2>
          ) : (
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>🌱</h2>
          )}
          <button onClick={toggleSidebar} style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            {sidebarCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        {/* User Profile */}
        <div style={{
          display: 'flex',
          flexDirection: sidebarCollapsed ? 'column' : 'row',
          alignItems: 'center',
          gap: '15px',
          padding: sidebarCollapsed ? '10px 0' : '15px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          marginBottom: '25px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            width: sidebarCollapsed ? '40px' : '50px',
            height: sidebarCollapsed ? '40px' : '50px',
            background: '#4caf50',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: sidebarCollapsed ? '20px' : '24px'
          }}>
            {userData.avatar}
          </div>
          {!sidebarCollapsed && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>{userData.name.split(' ')[0]}</h3>
              <p style={{ fontSize: '12px', opacity: 0.8 }}>Farmer</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ 
          flex: 1,
          marginTop: sidebarCollapsed ? '0' : '10px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: activeTab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: sidebarCollapsed ? '50%' : '10px',
                  color: 'white',
                  padding: sidebarCollapsed ? '10px 0' : '10px 15px',
                  margin: '4px 0',
                  width: '100%',
                  textAlign: sidebarCollapsed ? 'center' : 'left',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <span>{item.icon}</span>
                {!sidebarCollapsed && item.label}
                {activeTab === item.id && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: '#fff',
                    borderRadius: '0 4px 4px 0'
                  }}></div>
                )}
              </button>

              {/* Always visible logout button under Settings */}
              {!sidebarCollapsed && item.id === 'settings' && item.subItems && (
                <div style={{ 
                  marginLeft: '20px',
                  borderLeft: '2px solid rgba(255,255,255,0.1)',
                  paddingLeft: '10px'
                }}>
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={subItem.action}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '8px 15px',
                        margin: '4px 0',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        opacity: 0.9,
                        ':hover': {
                          background: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      <span>{subItem.icon}</span>
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Leaves Container */}
        <div id="leaf-container-sidebar" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -1
        }}></div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarCollapsed ? '100px' : '280px',
        padding: '40px 50px',
        flex: 1,
        maxWidth: `calc(100vw - ${sidebarCollapsed ? '100px' : '280px'})`,
        transition: 'all 0.3s ease',
        position: 'relative'
      }}>
        {/* Weather Widget */}
        {weatherData && (
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '50px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '12px',
            padding: '12px 15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10
          }}>
            <div style={{ fontSize: '22px' }}>{weatherData.icon}</div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{weatherData.temp}°C</div>
              <div style={{ fontSize: '13px', color: '#666' }}>{weatherData.condition}</div>
            </div>
          </div>
        )}

        <h1 style={{ fontSize: '32px', color: '#2e7d32', marginBottom: '30px', paddingRight: '180px' }}>
          🌾 Welcome back, {userData.name.split(' ')[0]}!
        </h1>
        
        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {["Garden Summary", "Growth Monitor", "Inventory Overview", "Vendor Activity", "Planting Calendar", "Grow Circle"].map((title, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
              position: 'relative'
            }}>
              <div style={{ height: '4px', background: '#4caf50', position: 'absolute', top: 0, left: 0, right: 0 }}></div>
              <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px' }}>📌 {title}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Sample content for {title.toLowerCase()}.</p>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', padding: '30px 20px', color: '#999', fontSize: '13px', borderTop: '1px solid #e0e0e0', marginTop: '50px' }}>
          © 2025 Tanimo: Smart Gardening App · Growing Together, One Plant at a Time 🌱
        </div>
      </div>

      <style>{`
        .leaf-sidebar {
          position: absolute;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
          will-change: transform;
        }
        
        @keyframes fallLeafStraight {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
        }
        
        @keyframes fallLeafWithSway {
          0% { transform: translateY(-50px) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; transform: translateY(20vh) translateX(5px) rotate(10deg); }
          40% { transform: translateY(40vh) translateX(-5px) rotate(20deg); }
          60% { transform: translateY(60vh) translateX(3px) rotate(30deg); }
          80% { transform: translateY(80vh) translateX(-3px) rotate(40deg); }
          100% { transform: translateY(100vh) translateX(0) rotate(50deg); opacity: 0; }
        }
        
        @keyframes fallLeafSlowSpin {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('monthly');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [userData] = useState({
    name: 'Admin User',
    role: 'System Administrator',
    location: 'Head Office',
    joinDate: '2023'
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC+08:00',
    dataPrivacy: 'standard',
    twoFactorAuth: false,
    activityLogs: true
  });

  // Mock data
  const [vegetables, setVegetables] = useState([
    { id: 1, name: 'Tomato', timesBought: 245, farmer: 'Juan Dela Cruz', category: 'Fruit' },
    { id: 2, name: 'Kangkong', timesBought: 189, farmer: 'Maria Santos', category: 'Leafy' },
    { id: 3, name: 'Eggplant', timesBought: 156, farmer: 'Pedro Reyes', category: 'Fruit' },
    { id: 4, name: 'Pechay', timesBought: 132, farmer: 'Lorna Tolentino', category: 'Leafy' },
    { id: 5, name: 'Squash', timesBought: 98, farmer: 'Carlos Gomez', category: 'Vine' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'Farmer', dateRegistered: '2023-01-15', status: 'active', rating: 4.8 },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Farmer', dateRegistered: '2023-02-20', status: 'active', rating: 4.9 },
    { id: 3, name: 'Pedro Reyes', email: 'pedro@example.com', role: 'Vendor', dateRegistered: '2023-03-10', status: 'active', rating: 4.5 },
    { id: 4, name: 'Lorna Tolentino', email: 'lorna@example.com', role: 'Farmer', dateRegistered: '2023-04-05', status: 'deactivated', rating: 4.2 },
    { id: 5, name: 'Carlos Gomez', email: 'carlos@example.com', role: 'Vendor', dateRegistered: '2023-05-12', status: 'active', rating: 4.7 },
  ]);

  const [stockData] = useState({
    totalVegetables: 584,
    reserved: 124,
    sold: 245,
    available: 215
  });

  // Mock data for plant-care leaderboard
  const [plantCareLeaderboard, setPlantCareLeaderboard] = useState([
    { farmerId: 1, farmerName: 'Juan Dela Cruz', plantsBeingCaredFor: 42, lastActivity: '2023-06-15T14:30:00' },
    { farmerId: 2, farmerName: 'Maria Santos', plantsBeingCaredFor: 38, lastActivity: '2023-06-15T12:45:00' },
    { farmerId: 4, farmerName: 'Lorna Tolentino', plantsBeingCaredFor: 25, lastActivity: '2023-06-14T09:15:00' },
    { farmerId: 6, farmerName: 'Antonio Banderas', plantsBeingCaredFor: 18, lastActivity: '2023-06-15T08:20:00' },
    { farmerId: 7, farmerName: 'Sofia Vergara', plantsBeingCaredFor: 15, lastActivity: '2023-06-13T16:10:00' },
  ]);

  // Mock data for most planted seeds
  const [mostPlantedSeeds, setMostPlantedSeeds] = useState([
    { id: 1, name: 'Tomato', plantedCount: 1245, farmerCount: 42, image: '🍅' },
    { id: 2, name: 'Eggplant', plantedCount: 987, farmerCount: 38, image: '🍆' },
    { id: 3, name: 'Kangkong', plantedCount: 876, farmerCount: 35, image: '🌿' },
    { id: 4, name: 'Pechay', plantedCount: 765, farmerCount: 28, image: '🥬' },
    { id: 5, name: 'Squash', plantedCount: 654, farmerCount: 22, image: '🎃' },
  ]);

  // Report data state - ADDED SECTION
  const [reportData] = useState({
    sales: {
      monthly: [
        { month: 'Jan', sales: 12500, transactions: 84 },
        { month: 'Feb', sales: 15800, transactions: 92 },
        { month: 'Mar', sales: 14200, transactions: 88 },
        { month: 'Apr', sales: 18900, transactions: 104 },
        { month: 'May', sales: 21000, transactions: 115 },
        { month: 'Jun', sales: 24500, transactions: 128 },
        { month: 'Jul', sales: 23100, transactions: 121 },
        { month: 'Aug', sales: 19800, transactions: 108 },
        { month: 'Sep', sales: 22400, transactions: 117 },
        { month: 'Oct', sales: 26700, transactions: 135 },
        { month: 'Nov', sales: 28900, transactions: 142 },
        { month: 'Dec', sales: 31200, transactions: 152 }
      ],
      weekly: [
        { week: 'Week 1', sales: 5800, transactions: 42 },
        { week: 'Week 2', sales: 7200, transactions: 51 },
        { week: 'Week 3', sales: 6500, transactions: 48 },
        { week: 'Week 4', sales: 8100, transactions: 56 }
      ],
      daily: [
        { day: 'Mon', sales: 2100, transactions: 18 },
        { day: 'Tue', sales: 2400, transactions: 21 },
        { day: 'Wed', sales: 1950, transactions: 16 },
        { day: 'Thu', sales: 2800, transactions: 24 },
        { day: 'Fri', sales: 3200, transactions: 28 },
        { day: 'Sat', sales: 3800, transactions: 32 },
        { day: 'Sun', sales: 2900, transactions: 25 }
      ]
    },
    userGrowth: [
      { month: 'Jan', farmers: 12, vendors: 8 },
      { month: 'Feb', farmers: 18, vendors: 10 },
      { month: 'Mar', farmers: 24, vendors: 14 },
      { month: 'Apr', farmers: 32, vendors: 18 },
      { month: 'May', farmers: 41, vendors: 22 },
      { month: 'Jun', farmers: 53, vendors: 27 },
      { month: 'Jul', farmers: 62, vendors: 32 },
      { month: 'Aug', farmers: 74, vendors: 38 },
      { month: 'Sep', farmers: 85, vendors: 43 },
      { month: 'Oct', farmers: 97, vendors: 49 },
      { month: 'Nov', farmers: 112, vendors: 54 },
      { month: 'Dec', farmers: 128, vendors: 61 }
    ],
    popularCategories: [
      { category: 'Leafy Greens', sales: 42, revenue: 18900 },
      { category: 'Fruiting Vegetables', sales: 38, revenue: 16700 },
      { category: 'Root Crops', sales: 25, revenue: 11200 },
      { category: 'Herbs', sales: 18, revenue: 8100 },
      { category: 'Vine Crops', sales: 15, revenue: 6800 }
    ],
    regionalPerformance: [
      { region: 'Northern Luzon', sales: 28900, target: 25000, progress: 115 },
      { region: 'Central Luzon', sales: 24500, target: 22000, progress: 111 },
      { region: 'Southern Luzon', sales: 26700, target: 24000, progress: 111 },
      { region: 'Visayas', sales: 19800, target: 20000, progress: 99 },
      { region: 'Mindanao', sales: 22400, target: 23000, progress: 97 }
    ]
  });

  const totalVendors = users.filter(u => u.role === 'Vendor').length;
  const totalFarmers = users.filter(u => u.role === 'Farmer').length;
  const totalActiveUsers = users.filter(u => u.status === 'active').length;
  const totalDeactivatedUsers = users.filter(u => u.status === 'deactivated').length;

  // Get top rated farmers
  const topRatedFarmers = users
    .filter(u => u.role === 'Farmer')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Format last activity time
  const formatLastActivity = (dateString) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const minutes = Math.floor((now - activityDate) / (1000 * 60));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'deactivated' : 'active' } 
        : user
    ));
  };

  const filteredVegetables = () => {
    return vegetables.sort((a, b) => b.timesBought - a.timesBought);
  };

  const filteredUsers = () => {
    if (userStatusFilter === 'all') return users;
    return users.filter(user => user.status === userStatusFilter);
  };

  const handleSettingChange = (settingName, value) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: value
    }));
  };

  const saveSettings = () => {
    // In a real app, you would send this to your backend
    alert('Settings saved successfully!');
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.card, .data-table');
    setTimeout(() => {
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 100);
  }, [activeTab]);

  // Create falling leaves effect
  useEffect(() => {
    const leafContainer = document.getElementById('leaf-container-sidebar');
    const leafEmojis = ['🍃', '🌿', '🍂', '🍁'];

    const spawnLeaf = () => {
      const leaf = document.createElement('div');
      leaf.className = 'leaf-sidebar';
      leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      leaf.style.left = Math.random() * 80 + '%';
      leaf.style.fontSize = 16 + Math.random() * 8 + 'px';
      leaf.style.animationDuration = 8 + Math.random() * 4 + 's';
      if (leafContainer) leafContainer.appendChild(leaf);

      leaf.addEventListener('animationend', () => {
        leaf.remove();
      });
    };

    const leafInterval = setInterval(spawnLeaf, 1200);
    return () => clearInterval(leafInterval);
  }, []);

  const adminCards = [
    { icon: '👥', title: 'User Accounts', description: `${totalActiveUsers} active · ${totalDeactivatedUsers} pending`, color: '#4caf50', onClick: () => handleNavClick('users') },
    { icon: '📦', title: 'Product Management', description: `${vegetables.length} items`, color: '#ff9800', onClick: () => handleNavClick('products') },
    { icon: '💰', title: 'Sales Overview', description: '₱45,000 this month', color: '#2196f3' },
    { icon: '👨‍🌾', title: 'Farmers', description: `${totalFarmers} registered`, color: '#8bc34a' },
    { icon: '👩‍💼', title: 'Vendors', description: `${totalVendors} registered`, color: '#3f51b5' },
    { icon: '🛠', title: 'System Logs', description: '1,203 entries · Last: 2h ago', color: '#9c27b0' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <div className="cards">
              {adminCards.map((card, index) => (
                <div 
                  key={index} 
                  className="card"
                  onClick={card.onClick}
                  style={{ cursor: card.onClick ? 'pointer' : 'default' }}
                >
                  <h3><span>{card.icon}</span> {card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>

            {/* Total Count Summary Section */}
            <div className="data-table" style={{ marginTop: '30px' }}>
              <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                👨‍🌾👩‍🌾 Total Count Summary
              </h2>
              
              <div className="cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                <div className="card">
                  <h3>👩‍💼 Total Vendors</h3>
                  <p>{totalVendors} registered vendors</p>
                </div>
                <div className="card">
                  <h3>👨‍🌾 Total Farmers</h3>
                  <p>{totalFarmers} registered farmers</p>
                </div>
                <div className="card">
                  <h3>✅ Total Active Users</h3>
                  <p>{totalActiveUsers} active accounts</p>
                </div>
                <div className="card">
                  <h3>❌ Total Deactivated Users</h3>
                  <p>{totalDeactivatedUsers} deactivated accounts</p>
                </div>
              </div>
            </div>

            {/* Farmer Plant-Care Leaderboard Section */}
            <div className="data-table" style={{ marginTop: '30px' }}>
              <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🌿 Farmer Plant-Care Leaderboard
              </h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Rank</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Farmer Name</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Plants Being Cared For</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plantCareLeaderboard
                      .sort((a, b) => b.plantsBeingCaredFor - a.plantsBeingCaredFor)
                      .map((farmer, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #eee', '&:hover': { background: '#f9f9f9' } }}>
                          <td style={{ padding: '12px 15px' }}>#{index + 1}</td>
                          <td style={{ padding: '12px 15px' }}>{farmer.farmerName}</td>
                          <td style={{ padding: '12px 15px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              background: '#e8f5e9',
                              color: '#2e7d32',
                              fontWeight: '500'
                            }}>
                              {farmer.plantsBeingCaredFor} plants
                            </span>
                          </td>
                          <td style={{ padding: '12px 15px' }}>{formatLastActivity(farmer.lastActivity)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="data-table">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '10px' }}>
                👥 User Management
              </h2>
              <select 
                value={userStatusFilter} 
                onChange={(e) => setUserStatusFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: 'white'
                }}
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Name</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Email</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Role</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Date Registered</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Status</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers().map((user, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee', '&:hover': { background: '#f9f9f9' } }}>
                      <td style={{ padding: '12px 15px' }}>{user.name}</td>
                      <td style={{ padding: '12px 15px' }}>{user.email}</td>
                      <td style={{ padding: '12px 15px' }}>{user.role}</td>
                      <td style={{ padding: '12px 15px' }}>{user.dateRegistered}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          background: user.status === 'active' ? '#e8f5e9' : '#ffebee',
                          color: user.status === 'active' ? '#2e7d32' : '#c62828',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {user.status === 'active' ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <button 
                          onClick={() => toggleUserStatus(user.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: user.status === 'active' ? '#ffebee' : '#e8f5e9',
                            color: user.status === 'active' ? '#c62828' : '#2e7d32',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="data-table">
            <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📦 Stock Monitoring
            </h2>
            
            <div className="cards" style={{ marginBottom: '30px' }}>
              <div className="card">
                <h3>🌱 Total Vegetables</h3>
                <p>{stockData.totalVegetables} items in system</p>
              </div>
              <div className="card">
                <h3>📦 Reserved</h3>
                <p>{stockData.reserved} items reserved</p>
              </div>
              <div className="card">
                <h3>💰 Sold</h3>
                <p>{stockData.sold} items sold</p>
              </div>
              <div className="card">
                <h3>🛒 Available</h3>
                <p>{stockData.available} items available</p>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Vegetable</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Times Bought</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Farmer/Seller</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {vegetables.map((veg, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee', '&:hover': { background: '#f9f9f9' } }}>
                      <td style={{ padding: '12px 15px' }}>{veg.name}</td>
                      <td style={{ padding: '12px 15px' }}>{veg.timesBought}</td>
                      <td style={{ padding: '12px 15px' }}>{veg.farmer}</td>
                      <td style={{ padding: '12px 15px' }}>{veg.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'most-planted':
        return (
          <div className="data-table">
            <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🌱 Most Planted Seeds
            </h2>
            
            <div className="cards" style={{ marginBottom: '30px' }}>
              {mostPlantedSeeds.slice(0, 4).map((seed, index) => (
                <div className="card" key={index}>
                  <h3>
                    <span style={{ fontSize: '24px', marginRight: '10px' }}>{seed.image}</span>
                    {seed.name}
                  </h3>
                  <p>Planted {seed.plantedCount} times by {seed.farmerCount} farmers</p>
                </div>
              ))}
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Rank</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Seed</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Times Planted</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Farmers Growing</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Popularity</th>
                  </tr>
                </thead>
                <tbody>
                  {mostPlantedSeeds.map((seed, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee', '&:hover': { background: '#f9f9f9' } }}>
                      <td style={{ padding: '12px 15px' }}>#{index + 1}</td>
                      <td style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{seed.image}</span>
                        {seed.name}
                      </td>
                      <td style={{ padding: '12px 15px' }}>{seed.plantedCount}</td>
                      <td style={{ padding: '12px 15px' }}>{seed.farmerCount}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <div style={{
                          height: '8px',
                          background: '#e0e0e0',
                          borderRadius: '4px',
                          width: '100%',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(seed.plantedCount / mostPlantedSeeds[0].plantedCount) * 100}%`,
                            background: 'linear-gradient(90deg, #4caf50, #81c784)',
                            borderRadius: '4px'
                          }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'top-farmers':
        return (
          <div className="data-table">
            <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🌟 Top Rated Farmers
            </h2>
            
            <div className="cards" style={{ marginBottom: '30px' }}>
              {topRatedFarmers.slice(0, 4).map((farmer, index) => (
                <div className="card" key={index}>
                  <h3>
                    <span style={{ fontSize: '24px', marginRight: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🌟'}</span>
                    {farmer.name}
                  </h3>
                  <p>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      background: '#fff8e1',
                      color: '#ff8f00',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ⭐ {farmer.rating}/5.0
                    </span>
                  </p>
                </div>
              ))}
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Rank</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Farmer Name</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Email</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Rating</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '500', color: '#666' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topRatedFarmers.map((farmer, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee', '&:hover': { background: '#f9f9f9' } }}>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#e0e0e0',
                          textAlign: 'center',
                          lineHeight: '24px',
                          fontWeight: 'bold',
                          color: index < 3 ? '#fff' : '#333'
                        }}>
                          {index + 1}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>{farmer.name}</td>
                      <td style={{ padding: '12px 15px' }}>{farmer.email}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span>⭐ {farmer.rating}</span>
                          <div style={{
                            height: '8px',
                            background: '#e0e0e0',
                            borderRadius: '4px',
                            width: '100px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${(farmer.rating / 5) * 100}%`,
                              background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                              borderRadius: '4px'
                            }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          background: farmer.status === 'active' ? '#e8f5e9' : '#ffebee',
                          color: farmer.status === 'active' ? '#2e7d32' : '#c62828',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {farmer.status === 'active' ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="data-table">
            <h2 style={{ fontSize: '20px', color: '#2e7d32', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ⚙️ System Settings
            </h2>
            
            <div className="settings-grid">
              {/* Account Settings */}
              <div className="settings-section">
                <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  👤 Account Settings
                </h3>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Dark Mode</span>
                    <span className="setting-description">Enable dark theme for the dashboard</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.darkMode}
                      onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Two-Factor Authentication</span>
                    <span className="setting-description">Add an extra layer of security to your account</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Language</span>
                    <span className="setting-description">Interface language</span>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="setting-select"
                  >
                    <option value="en">English</option>
                    <option value="tl">Tagalog</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>
              
              {/* Notifications */}
              <div className="settings-section">
                <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🔔 Notifications
                </h3>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>System Notifications</span>
                    <span className="setting-description">Receive system alerts and updates</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Email Alerts</span>
                    <span className="setting-description">Get important notifications via email</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.emailAlerts}
                      onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Activity Logs</span>
                    <span className="setting-description">Record all system activities</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.activityLogs}
                      onChange={(e) => handleSettingChange('activityLogs', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              {/* System Preferences */}
              <div className="settings-section">
                <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🖥️ System Preferences
                </h3>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Timezone</span>
                    <span className="setting-description">Set your local timezone</span>
                  </div>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    className="setting-select"
                  >
                    <option value="UTC+08:00">(UTC+08:00) Philippine Time</option>
                    <option value="UTC+00:00">(UTC+00:00) GMT</option>
                    <option value="UTC-05:00">(UTC-05:00) Eastern Time</option>
                  </select>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Data Privacy Level</span>
                    <span className="setting-description">Control how your data is handled</span>
                  </div>
                  <select
                    value={settings.dataPrivacy}
                    onChange={(e) => handleSettingChange('dataPrivacy', e.target.value)}
                    className="setting-select"
                  >
                    <option value="standard">Standard Protection</option>
                    <option value="enhanced">Enhanced Protection</option>
                    <option value="strict">Strict Protection</option>
                  </select>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="settings-section danger-zone">
                <h3 style={{ fontSize: '18px', color: '#c62828', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ⚠️ Danger Zone
                </h3>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Clear All Data</span>
                    <span className="setting-description">Permanently delete all data (irreversible)</span>
                  </div>
                  <button className="danger-button">
                    Clear Data
                  </button>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Deactivate Account</span>
                    <span className="setting-description">Temporarily disable your admin account</span>
                  </div>
                  <button className="danger-button">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
              <button 
                onClick={saveSettings}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#2e7d32',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                Save Settings
              </button>
            </div>
          </div>
        );

      // ADDED REPORTS SECTION
      case 'reports':
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header with Filter */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          color: '#2e7d32', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          margin: 0
        }}>
          📈 Reports & Analytics
        </h2>
        <select 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: 'white',
            minWidth: '150px'
          }}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Sales Performance - Now in a grid layout */}
      <div className="data-table" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px' }}>
          💰 Sales Performance
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '15px',
          width: '100%'
        }}>
          {reportData.sales[dateFilter].map((period, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderTop: '4px solid #4caf50'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                {period.month || period.week || period.day}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>
                ₱{(period.sales).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {period.transactions} transactions
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Growth - Simplified to fit */}
      <div className="data-table" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px' }}>
          📊 User Growth (Last 6 Months)
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {reportData.userGrowth.slice(-6).map((month, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '16px', color: '#2e7d32', marginBottom: '10px' }}>
                {month.month}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>Farmers:</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32' }}>
                  {month.farmers}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#666' }}>Vendors:</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2196f3' }}>
                  {month.vendors}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="data-table" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px' }}>
          🏆 Popular Categories
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '15px'
        }}>
          {reportData.popularCategories.map((category, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>{category.category}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{category.sales}% of sales</div>
              </div>
              <div style={{
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                marginBottom: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${category.sales}%`,
                  background: 'linear-gradient(90deg, #4caf50, #81c784)',
                  borderRadius: '4px'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>Revenue:</div>
                <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>₱{category.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Performance - Simplified */}
      <div className="data-table">
        <h3 style={{ fontSize: '18px', color: '#2e7d32', marginBottom: '15px' }}>
          🌏 Regional Performance
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px'
        }}>
          {reportData.regionalPerformance.map((region, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>{region.region}</div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: region.progress >= 100 ? '#e8f5e9' : '#fff3e0',
                  color: region.progress >= 100 ? '#2e7d32' : '#ef6c00',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {region.progress >= 100 ? '✓ Achieved' : `${region.progress}%`}
                </span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>Sales:</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  ₱{region.sales.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#666' }}>Target:</div>
                <div style={{ fontSize: '16px' }}>
                  ₱{region.target.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div style={{ 
        marginTop: '30px', 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button style={{
          padding: '10px 20px',
          background: '#2e7d32',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          📄 Export as PDF
        </button>
        <button style={{
          padding: '10px 20px',
          background: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          📊 Export as Excel
        </button>
      </div>
    </div>
  );
      
      default:
        return (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>⚙️</div>
            <h2 style={{ fontSize: '24px', color: '#2e7d32', marginBottom: '10px' }}>Under Construction</h2>
            <p style={{ color: '#666' }}>This section is currently being developed. Check back soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo with text */}
        <h2 className="logo-text">
          <img 
            src="logo.png" 
            alt="Tanimo Logo" 
            style={{ 
              width: '30px', 
              height: '30px', 
              marginRight: '10px',
            }}
          />
          Tanimo Admin
        </h2>
        
        <nav>
          <a 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => handleNavClick('dashboard')}
          >
            📊 Dashboard
          </a>
          <a 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => handleNavClick('users')}
          >
            👥 User Management
          </a>
          <a 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => handleNavClick('products')}
          >
            📦 Product Management
          </a>
          <a 
            className={activeTab === 'most-planted' ? 'active' : ''} 
            onClick={() => handleNavClick('most-planted')}
          >
            🌱 Most Planted Seed
          </a>
          <a 
            className={activeTab === 'top-farmers' ? 'active' : ''} 
            onClick={() => handleNavClick('top-farmers')}
          >
            🌟 Most High Rated Farmers
          </a>
          <a 
            className={activeTab === 'reports' ? 'active' : ''} 
            onClick={() => handleNavClick('reports')}
          >
            📈 Reports
          </a>
          <a 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => handleNavClick('settings')}
          >
            ⚙️ Settings
          </a>
          <a onClick={handleLogout}>🚪 Logout</a>
        </nav>

        <div id="leaf-container-sidebar"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>
          {activeTab === 'dashboard' && '🌾 Welcome back, '}
          {activeTab === 'users' && '👥 User Management'}
          {activeTab === 'products' && '📦 Product Management'}
          {activeTab === 'most-planted' && '🌱 Most Planted Seed'}
          {activeTab === 'top-farmers' && '🌟 Top Rated Farmers'}
          {activeTab === 'reports' && '📈 Reports'}
          {activeTab === 'settings' && '⚙️ Settings'}
          {activeTab === 'dashboard' && userData.name.split(' ')[0] + '!'}
        </h1>

        {renderTabContent()}

        <div className="footer">
          © 2025 Tanimo Admin Panel · Growing Together, One Plant at a Time 🌱
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          font-family: 'Georgia', serif;
          background: linear-gradient(135deg, #f4fff7 0%, #e8f5e8 100%);
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 240px;
          background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
          color: white;
          padding: 30px 20px;
          height: 100vh;
          position: fixed;
          overflow: hidden;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .logo-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
          font-size: 24px;
          font-weight: bold;
        }

        .sidebar a {
          display: block;
          color: white;
          text-decoration: none;
          margin: 15px 0;
          padding: 12px 15px;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          font-size: 15px;
          cursor: pointer;
        }

        .sidebar a:hover {
                    background: rgba(255,255,255,0.2);
          transform: translateX(5px);
        }

        .sidebar a.active {
          background: rgba(255,255,255,0.25);
          border-left: 4px solid #81c784;
        }

        .main-content {
          margin-left: 260px;
          padding: 30px 40px;
          flex: 1;
          max-width: calc(100vw - 260px);
        }

        .main-content h1 {
          font-size: 32px;
          color: #2e7d32;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.15);
          border-color: #81c784;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4caf50, #81c784, #a5d6a7);
        }

        .card h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #2e7d32;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card p {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        .data-table {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.08);
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .data-table:hover {
          box-shadow: 0 12px 35px rgba(0,0,0,0.15);
        }

        table {
          width: 100%;
          borderCollapse: collapse;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          font-weight: 500;
          color: #666;
          background: #f9f9f9;
        }

        tr:hover {
          background: #f9f9f9 !important;
        }

        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 14px;
          padding: 20px;
        }

        /* Settings specific styles */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
        }

        .settings-section {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e0e0e0;
        }

        .settings-section.danger-zone {
          border: 1px solid #ffcdd2;
          background: #ffebee;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          margin-right: 20px;
        }

        .setting-label span:first-child {
          font-weight: 500;
          color: #333;
        }

        .setting-description {
          font-size: 13px;
          color: #666;
        }

        /* Switch styles */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #4caf50;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        /* Select styles */
        .setting-select {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background: white;
          min-width: 200px;
          font-family: inherit;
        }

        /* Danger button styles */
        .danger-button {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #c62828;
          background: white;
          color: #c62828;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .danger-button:hover {
          background: #c62828;
          color: white;
        }

        /* Leaf animation styles */
        .leaf-sidebar {
          position: absolute;
          top: -20px;
          z-index: 0;
          animation: fall-sidebar linear infinite;
          opacity: 0.7;
        }

        @keyframes fall-sidebar {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .admin-dashboard {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            padding: 20px;
          }
          
          .main-content {
            margin-left: 0;
            max-width: 100%;
            padding: 20px;
          }
          
          .cards {
            grid-template-columns: 1fr;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .setting-label {
            margin-right: 0;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 15px;
          }

          .main-content h1 {
            font-size: 24px;
          }

          .card {
            padding: 15px;
          }

          .data-table {
            padding: 15px;
          }

          th, td {
            padding: 8px 10px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
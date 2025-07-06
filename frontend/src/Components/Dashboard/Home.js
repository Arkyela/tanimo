import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [visibleSection, setVisibleSection] = useState('home');
  const [currentFacts, setCurrentFacts] = useState([]);
  const [factIndex, setFactIndex] = useState(0);
  const sections = ['home', 'features', 'funfacts', 'about', 'team'];

  const allFacts = [
    ["🍅 Tomato Genes", "Tomatoes have over 31,000 genes — more than humans!"],
    ["🥕 Purple Carrots", "The first carrots were purple before orange became popular!"],
    ["🥬 Lettuce Power", "Ancient Egyptians worshipped lettuce as a symbol of fertility."],
    ["🧄 Glowing Garlic", "Garlic can fluoresce under UV light — it can glow!"],
    ["🌽 Ancient Corn", "Corn was first domesticated over 9,000 years ago in Mexico."],
    ["🦛 Pea Code", "Peas were used in early Morse code experiments in the UK army!"],
    ["🍆 Eggplant is a Berry", "Eggplants are classified as berries. Shocking but true!"],
    ["🥔 Space Potato", "Potatoes were the first vegetable grown in space by NASA."],
    ["🍀 Onion Layers", "Onions have sulfur that can make you cry when chopped."],
    ["🥜 Celery Crunch", "Celery is 95% water and burns more calories to chew than it gives!"],
    ["🥒 Cucumber Cool", "Cucumbers are 96% water and can be up to 20°F cooler inside!"],
    ["🌶️ Spicy Heat", "Capsaicin in peppers can't be tasted by birds — only mammals!"],
    ["🥦 Broccoli Trees", "Broccoli is actually a flower that we eat before it blooms!"],
    ["🫑 Bell Pepper Colors", "Red, yellow, and green bell peppers are the same plant at different stages!"],
    ["🥬 Cabbage Family", "Cabbage, broccoli, cauliflower, and kale are all the same species!"],
    ["🫐 Blueberry Myth", "Blueberries aren't actually blue inside — they're green!"],
    ["🧅 Onion Tears", "Chilling an onion before cutting reduces the tears it causes!"],
    ["🥕 Carrot Vision", "The 'carrots improve eyesight' myth was WWII British propaganda!"],
    ["🍅 Tomato Fruit", "Tomatoes are legally vegetables in the US but botanically fruits!"],
    ["🥔 Potato Poison", "Green potatoes contain solanine, a natural toxin that can be harmful!"],
    ["🌽 Corn Silk", "Each corn silk strand connects to a single kernel on the cob!"],
    ["🥬 Lettuce Opium", "Wild lettuce contains lactucarium, once called 'lettuce opium'!"],
    ["🫛 Pea Flowers", "Pea flowers are edible and taste like sweet peas!"],
    ["🍆 Eggplant Nickname", "Eggplants were called 'mad apples' because people thought they caused insanity!"],
    ["🥒 Pickle Power", "Pickles have been around for over 4,000 years!"],
    ["🌶️ Carolina Reaper", "The Carolina Reaper pepper is 200x hotter than a jalapeño!"],
    ["🥦 Broccoli Sprouts", "Broccoli sprouts contain 50x more cancer-fighting compounds than mature broccoli!"],
    ["🧄 Garlic Breath", "Garlic breath can last up to 24 hours after eating!"],
    ["🥕 Baby Carrots", "Baby carrots are just regular carrots cut and shaped!"],
    ["🥔 Potato Chips", "Potato chips were invented in 1853 by accident!"],
    ["🌽 Popcorn Ancient", "Popcorn was first popped by Native Americans 5,000 years ago!"],
    ["🍅 Tomato Sauce", "Americans consume 3 billion pounds of tomato sauce annually!"],
    ["🥬 Iceberg Lettuce", "Iceberg lettuce is 95% water with very little nutritional value!"],
    ["🫑 Pepper Seeds", "The spiciest part of a pepper is actually the white membrane, not the seeds!"],
    ["🥒 Cucumber Family", "Cucumbers belong to the same family as melons and squash!"],
    ["🧅 Onion Varieties", "There are over 300 varieties of onions grown worldwide!"],
    ["🥦 Cauliflower Colors", "Cauliflower comes in purple, orange, and green varieties too!"],
    ["🍆 Eggplant Water", "Eggplants are 92% water despite their dense appearance!"],
    ["🥔 Potato Eyes", "Potato 'eyes' are actually buds that can grow into new plants!"],
    ["🌽 Corn Kernels", "An average ear of corn has 800 kernels in 16 rows!"],
    ["🥕 Carrot Storage", "Carrots can be stored in sand for months without refrigeration!"],
    ["🍅 Tomato Leaves", "Tomato leaves are toxic to humans but smell amazing!"],
    ["🫛 Pea Protein", "Peas are one of the highest protein vegetables!"],
    ["🥬 Spinach Iron", "Spinach contains oxalates that actually block iron absorption!"],
    ["🌶️ Pepper Spray", "Pepper spray is made from the same compound that makes peppers hot!"],
    ["🧄 Garlic Bulbs", "What we call garlic cloves are actually individual bulbs!"],
    ["🥒 Cucumber Burps", "Burpless cucumbers were bred to be easier to digest!"],
    ["🥦 Broccoli Name", "Broccoli's name comes from Italian meaning 'little shoots'!"],
    ["🧅 Onion Layers", "Onions have between 8-16 layers depending on variety!"],
    ["🥔 Potato Flowers", "Potato plants produce small white or purple flowers!"],
    ["🌽 Sweet Corn", "Sweet corn loses half its sugar within 24 hours of being picked!"],
    ["🍅 Tomato Varieties", "There are over 10,000 varieties of tomatoes worldwide!"],
    ["🥕 Carrot Beta-Carotene", "Carrots get their orange color from beta-carotene!"],
    ["🫑 Pepper Vitamin C", "Red bell peppers have 3x more vitamin C than oranges!"],
    ["🥬 Lettuce Varieties", "There are hundreds of lettuce varieties beyond iceberg!"],
    ["🍆 Eggplant Gender", "Eggplants can be identified as 'male' or 'female' by their bottom dimples!"],
    ["🥒 Cucumber Cooling", "The phrase 'cool as a cucumber' is scientifically accurate!"],
    ["🌶️ Scoville Scale", "The Scoville scale measures pepper heat from 0 to 3+ million units!"],
    ["🧄 Garlic Antibiotic", "Garlic has natural antibiotic properties and can fight bacteria!"],
    ["🥦 Broccoli Kids", "Children have more taste buds than adults, making broccoli taste more bitter!"],
    ["🥔 Potato Starch", "Potato starch can be used to make biodegradable plastic!"],
    ["🌽 Corn Maze", "Corn mazes became popular in the 1990s and now exist worldwide!"],
    ["🍅 Tomato Umami", "Tomatoes are rich in umami, the fifth taste alongside sweet, sour, salty, and bitter!"],
    ["🥕 Carrot Juice", "Drinking too much carrot juice can turn your skin orange!"],
    ["🫛 Pea Shoots", "Pea shoots are the young leaves and tendrils of pea plants!"],
    ["🥬 Kale Chips", "Kale becomes crispy when baked because it loses its water content!"],
    ["🧅 Onion Storage", "Onions should be stored away from potatoes to prevent sprouting!"],
    ["🍆 Eggplant Sponge", "Eggplants act like sponges and absorb flavors from other ingredients!"],
    ["🥒 Cucumber Seeds", "Cucumber seeds are edible and contain healthy fats!"],
    ["🌶️ Pepper Pollination", "Peppers are self-pollinating but can cross-pollinate with other varieties!"],
    ["🥦 Broccoli Harvest", "Broccoli must be harvested before the flowers open or it becomes bitter!"],
    ["🧄 Elephant Garlic", "Elephant garlic is actually more closely related to leeks than garlic!"],
    ["🥔 Potato Vodka", "Some vodkas are made from potatoes instead of grains!"],
    ["🌽 Corn Ethanol", "Corn is used to make ethanol fuel for cars!"],
    ["🍅 Green Tomatoes", "Green tomatoes are unripe red tomatoes, not a different variety!"],
    ["🥕 Carrot Cake", "Carrot cake was originally made as a substitute for expensive sugar!"],
    ["🫑 Pepper Origins", "All peppers originally came from Central and South America!"],
    ["🥬 Lettuce Wraps", "Butter lettuce is perfect for wraps because of its flexible leaves!"],
    ["🍆 Eggplant Parmesan", "Eggplant Parmesan originated in Southern Italy, not Parma!"],
    ["🥒 Pickle Juice", "Pickle juice can help prevent muscle cramps due to its electrolytes!"],
    ["🌶️ Ghost Pepper", "Ghost peppers are 400x hotter than Tabasco sauce!"],
    ["🧄 Garlic Festival", "Gilroy, California hosts the world's largest garlic festival annually!"],
    ["🥦 Broccoli Superfood", "Broccoli contains more protein per calorie than steak!"],
    ["🥔 Sweet Potato", "Sweet potatoes and regular potatoes are completely different plants!"],
    ["🌽 Corn Syrup", "High fructose corn syrup is made from corn starch!"],
    ["🍅 Tomato Hornworm", "Tomato hornworms can eat entire tomato plants but become beautiful moths!"],
    ["🥕 Carrot Fiber", "Carrots are high in fiber, which helps with digestion!"],
    ["🫛 Pea Pods", "Snow pea pods are completely edible and sweet!"],
    ["🥬 Spinach Popeye", "Popeye's spinach strength was based on a decimal point error in iron content!"],
    ["🧅 Onion Breath", "Eating raw parsley can help neutralize onion breath!"],
    ["🍆 Eggplant Emoji", "The eggplant emoji is one of the most used vegetable emojis!"],
    ["🥒 Cucumber Spa", "Cucumber slices on eyes reduce puffiness due to their cooling effect!"],
    ["🌶️ Pepper Preservation", "Hot peppers were nature's way of preserving food before refrigeration!"],
    ["🥦 Broccoli Calcium", "Broccoli contains more calcium per serving than milk!"],
    ["🧄 Garlic Varieties", "There are over 600 varieties of garlic grown worldwide!"],
    ["🥔 Potato Famine", "The Irish Potato Famine happened because they relied on just one potato variety!"],
    ["🌽 Corn Starch", "Corn starch is used in everything from food to cosmetics to paper!"],
    ["🍅 Tomato Lycopene", "Cooking tomatoes increases their lycopene content, making them healthier!"],
    ["🥕 Carrot Records", "The longest carrot on record was over 20 feet long!"],
    ["🫑 Pepper Stuffing", "Bell peppers are hollow inside, making them perfect for stuffing!"],
    ["🥬 Lettuce Lactuca", "Lettuce's scientific name 'Lactuca' means 'milk' in Latin!"],
    ["🍆 Eggplant Preparation", "Salting eggplant before cooking removes bitterness and excess moisture!"],
    ["🥒 Cucumber Growth", "Cucumbers can grow up to an inch per day in ideal conditions!"],
    ["🌶️ Pepper Birds", "Birds spread pepper seeds because they can't taste the heat!"],
    ["🧄 Garlic Sprouting", "Green sprouts in garlic are edible but have a bitter taste!"],
    ["🥦 Romanesco Broccoli", "Romanesco broccoli has a natural fractal spiral pattern!"],
    ["🥔 Potato Battery", "Potatoes can generate electricity and power small LED lights!"],
    ["🌽 Corn Oil", "Corn oil comes from the germ of the corn kernel!"],
    ["🍅 Tomato Ketchup", "It takes about 7 pounds of tomatoes to make 1 pound of ketchup!"],
    ["🥕 Carrot Tops", "Carrot greens are edible and taste like parsley!"],
    ["🫛 Sugar Snap Peas", "Sugar snap peas were developed in the 1970s by crossing snow peas and garden peas!"],
    ["🥬 Brussels Sprouts", "Brussels sprouts grow on stalks that can reach 3 feet tall!"]
  ];

  useEffect(() => {
    // Initial shuffle and display
    const shuffled = [...allFacts].sort(() => 0.5 - Math.random());
    setCurrentFacts(shuffled.slice(0, 9));
    
    // Leaf animation effect
    const leafContainer = document.getElementById('leaf-container');
    const leaves = ['🍃', '🌿', '🍀', '🌾'];

    const createLeaf = () => {
      const leaf = document.createElement('div');
      leaf.className = 'floating-leaf';
      leaf.setAttribute('aria-hidden', 'true');
      leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
      leaf.style.left = Math.random() * 100 + 'vw';
      leaf.style.animationDuration = 8 + Math.random() * 5 + 's';
      leaf.style.fontSize = (20 + Math.random() * 15) + 'px';
      if (leafContainer) {
        leafContainer.appendChild(leaf);
        leaf.addEventListener('animationend', () => {
          if (leafContainer.contains(leaf)) {
            leafContainer.removeChild(leaf);
          }
        });
      }
    };
    

    const leafInterval = setInterval(createLeaf, 1000);
    
    return () => {
      clearInterval(leafInterval);
      if (leafContainer) {
        while (leafContainer.firstChild) {
          leafContainer.removeChild(leafContainer.firstChild);
        }
      }
    };
  }, [factIndex]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setVisibleSection(section);
  };

  const shuffleFacts = () => {
    const shuffled = [...allFacts].sort(() => 0.5 - Math.random());
    setCurrentFacts(shuffled.slice(0, 9));
    setFactIndex(0);
  };

  return (
    <div className="tanimo-app">
      <div id="leaf-container" aria-hidden="true"></div>

      <header>
        <nav>
          <div className="logo">
            <img 
              src={`${process.env.PUBLIC_URL}/logo.png`} 
              alt="Tanimo Logo" 
              style={{ height: '30px' }} 
            />
            <span>Tanimo</span>
          </div>
          <ul>
            {sections.map(sec => (
              <li key={sec}>
                <a 
                  href={`#${sec}`} 
                  className={visibleSection === sec ? 'active' : ''} 
                  onClick={(e) => handleNavClick(e, sec)}
                  aria-current={visibleSection === sec ? 'page' : undefined}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </a>
              </li>
            ))}
            <li><Link to="/login" className="login-btn">Login</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {visibleSection === 'home' && (
          <section id="home" className="hero">
            <img 
              src={`${process.env.PUBLIC_URL}/logo.png`} 
              alt="Tanimo Logo" 
              width="200" 
              height="200"
            />
            <h1>Welcome to Tanimo</h1>
            <p>Your smart gardening companion to monitor your plants, receive growth tips, and connect with local markets.</p>
            <Link to="/login" className="cta">Get Started</Link>
          </section>
        )}

        {visibleSection === 'features' && (
          <section id="features" className="features">
            <h2>🌟 Features</h2>
            <div className="grid">
              <div><h3>🌱 Growth Monitoring</h3><p>Track plant health using smart image analysis.</p></div>
              <div><h3>🌿 Personalized Tips</h3><p>Tailored advice for different vegetable types.</p></div>
              <div><h3>🍅 Market Access</h3><p>Connect to local stalls to sell your produce.</p></div>
            </div>
          </section>
        )}

        {visibleSection === 'funfacts' && (
          <section id="funfacts" className="funfacts">
            <h2>🥦 Vegetable Fun Facts</h2>
            <p className="facts-intro">Discover amazing facts about your favorite vegetables!</p>
            
            <div className="facts-controls">
              <button className="shuffle-btn" onClick={shuffleFacts}>
                🔀 Shuffle Facts
              </button>
            </div>

            <div className="flashcards">
              {currentFacts.map(([front, back], i) => (
                <div className="flashcard" key={`${front}-${i}`}>
                  <div className="card-inner">
                    <div className="card-front">
                      <span className="emoji">{front.split(' ')[0]}</span>
                      <h3 className="fact-title">{front.split(' ').slice(1).join(' ')}</h3>
                    </div>
                    <div className="card-back">
                      <p>{back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {visibleSection === 'about' && (
          <section id="about" className="about">
            <h2>🌾 Why We Created Tanimo</h2>
            <p>
              In every backyard, barangay garden, or small farm, there is a quiet hope — to grow something meaningful. To turn seeds into sustenance, to support a family, and to contribute to a healthier, self-reliant community. But for many local growers, that journey is not easy.
            </p>
            <p>
              Many face the same problems: no proper way to track their crops’ health, uncertainty about harvest times, and no direct access to stable buyers. Some watch their vegetables wither due to pests or poor timing. Others harvest too early or too late, unsure if their produce is market-ready.
            </p>
            <p>
              That’s where <strong>Tanimo</strong> comes in — a smart gardening companion designed to guide, support, and connect. By simply uploading a photo, farmers get AI-powered insights into plant health, maturity, and care. It’s like having a digital agronomist in their pocket.
            </p>
            <p>
              More than monitoring, Tanimo builds bridges. It links growers directly to <strong>palengke</strong> vendors through a built-in marketplace system — allowing them to sell harvest-ready vegetables instantly, fairly, and without middlemen. Real-time reservations, chat features, and delivery tracking make transactions simple and transparent.
            </p>
            <p>
              Tanimo also brings structure to planting through smart calendars synced with climate data and planting cycles. It sends care reminders, provides disease alerts, and tracks growth using photo timelines — giving farmers both confidence and control over their harvests.
            </p>
            <p>
              And because farming is stronger together, Tanimo creates <strong>Grow Circles</strong> — small communities based on location or crop type where growers can exchange knowledge, swap seeds, and collaborate with vendors to keep local supply chains strong.
            </p>
            <p>
              We didn’t just build an app — we built a platform rooted in purpose. A system designed to help communities grow smarter, sell better, and waste less. A space where technology and tradition work hand-in-hand for food security, livelihood, and resilience.
            </p>
            <p class="tagline">
              🌱 With Tanimo, we’re planting the seeds of a greener, more connected future — one leaf, one photo, one harvest at a time.
            </p>          
          </section>
        )}

        {visibleSection === 'team' && (
          <section id="team" className="team">
            <h2>👩‍🌾 Meet the Team</h2>
            <div className="grid">
              <div className="member">
                <img src={`${process.env.PUBLIC_URL}tan.png`} alt="Batan" />
                <h3>Batan, Bryan James B.</h3>
              </div>
              <div className="member">
                <img src={`${process.env.PUBLIC_URL}ela.jpg`} alt="Dayag" />
                <h3>Dayag, Daniela G.</h3>
              </div>
              <div className="member">
                <img src={`${process.env.PUBLIC_URL}riell.jpg`} alt="Rana" />
                <h3>Rana, John Riell V.</h3>
              </div>
              <div className="member">
                <img src={`${process.env.PUBLIC_URL}chan.jpg`} alt="Salagubang" />
                <h3>Salagubang, Christian D.</h3>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>© 2025 Tanimo. All rights reserved.</p>
      </footer>

      <style>{`
        html {
          overflow: hidden;
          height: 100%;
        }
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #d0f1e0, #a4e4b3, #fcb6c4);
          min-height: 100vh;
          color: #065f46;
          overflow-y: auto;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          height: 100%;
        }
        body::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        .tanimo-app {
          position: relative;
          overflow-x: hidden;
          height: 100vh;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .tanimo-app::-webkit-scrollbar {
          display: none;
        }
        header nav { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 1rem 2rem; 
          background: rgba(255, 255, 255, 0.8); 
          backdrop-filter: blur(10px); 
          position: sticky; 
          top: 0; 
          z-index: 100; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        nav .logo { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          font-weight: bold;
          font-size: 1.2rem;
        }
        nav ul { 
          display: flex; 
          gap: 20px; 
          list-style: none; 
          margin: 0;
          padding: 0;
        }
        nav ul li a, .login-btn { 
          text-decoration: none; 
          color: #065f46; 
          font-weight: 600; 
          transition: color 0.2s;
          padding: 8px 12px;
          border-radius: 8px;
        }
        nav ul li a.active {
          color: #059669;
          background: rgba(5, 150, 105, 0.1);
        }
        nav ul li a:hover {
          color: #059669;
        }
        .login-btn { 
          background: linear-gradient(135deg, #16a34a, #059669); 
          color: #fff; 
          padding: 8px 16px; 
          border-radius: 8px; 
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        main {
          min-height: calc(100vh - 120px);
          padding-bottom: 40px;
        }
        section { 
          padding: 80px 20px; 
          text-align: center; 
          max-width: 1200px; 
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hero img { 
          max-width: 200px; 
          margin-bottom: 20px;
        }
        .cta { 
          background: #059669; 
          color: #fff; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 10px; 
          display: inline-block; 
          margin-top: 20px; 
          font-weight: bold;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .grid { 
          display: flex; 
          gap: 20px; 
          flex-wrap: wrap; 
          justify-content: center; 
          margin-top: 30px;
        }
        .grid > div { 
          background: rgba(255, 255, 255, 0.9); 
          padding: 20px; 
          border-radius: 15px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
          width: 200px; 
          transition: transform 0.2s;
        }
        .grid > div:hover {
          transform: translateY(-5px);
        }
        
        /* Fun Facts Section Styles */
        .funfacts {
          padding: 60px 20px;
        }
        .facts-intro {
          max-width: 800px;
          margin: 0 auto 30px;
          font-size: 1.1rem;
        }
        .facts-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 800px;
          margin: 0 auto 30px;
        }
        .shuffle-btn {
          background: #059669;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .shuffle-btn:hover {
          background: #047857;
          transform: translateY(-2px);
        }
        .facts-counter {
          color: #065f46;
          font-style: italic;
        }
        .flashcards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 30px auto;
          max-width: 1000px;
        }
        .flashcard {
          perspective: 1000px;
          height: 200px;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
          cursor: pointer;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .flashcard:hover .card-inner {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          border-radius: 15px;
        }
        .card-front {
          background: #e6f4ea;
          color: #065f46;
        }
        .card-back {
          background: #a7f3d0;
          color: #065f46;
          transform: rotateY(180deg);
          text-align: center;
        }
        .emoji {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .fact-title {
          font-weight: bold;
          font-size: 1.1rem;
          text-align: center;
        }
        
        /* All Facts Grid */
        .all-facts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 50px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 15px;
        }
        .fact-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .fact-item:hover {
          transform: translateY(-3px);
        }
        .fact-emoji {
          font-size: 2rem;
          flex-shrink: 0;
        }
        .fact-content h4 {
          margin: 0 0 8px 0;
          color: #065f46;
        }
        .fact-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #334155;
        }
        
        /* Team Section */
        .team .member {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 20px; 
          box-shadow: 0 6px 15px rgba(0,0,0,0.1); 
          width: 280px; 
          transition: all 0.3s ease; 
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team .member:hover {
          transform: translateY(-10px); 
          box-shadow: 0 12px 20px rgba(0,0,0,0.15); 
        }
        .team img {
          width: 150px; /* Larger image */
          height: 150px; /* Larger image */
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #a7f3d0; /* Thicker border */
          margin-bottom: 20px; /* More space below image */
        }
        .team h3 {
          margin: 10px 0 5px;
        }
        .team p {
          margin: 0;
          font-size: 0.9rem;
          color: #64748b;
        }
        
        /* Footer */
        footer {
          text-align: center;
          padding: 5px 5px;
          background: rgba(255, 255, 255, 0.8);
          color: #065f46;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 15px;
        }
        .footer-links a {
          color: #065f46;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #059669;
          text-decoration: underline;
        }
        
        /* Floating Leaves Animation */
        .floating-leaf {
          position: absolute;
          top: -50px;
          font-size: 24px;
          opacity: 0.8;
          animation: floatLeaf linear forwards;
          z-index: 0;
          pointer-events: none;
        }
        @keyframes floatLeaf {
          from {
            transform: translateY(-60px) rotate(0deg);
            opacity: 0.5;
          }
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          header nav {
            flex-direction: column;
            padding: 1rem;
          }
          nav ul {
            margin-top: 15px;
            flex-wrap: wrap;
            justify-content: center;
          }
          section {
            padding: 40px 15px;
          }
          .grid > div {
            width: 100%;
            max-width: 300px;
          }
          .flashcards {
            grid-template-columns: 1fr;
          }
          .flashcard {
            height: 150px;
          }
          .facts-controls {
            flex-direction: column;
            gap: 15px;
          }
          .all-facts-grid {
            grid-template-columns: 1fr;
          }
        }
          
      `}</style>
    </div>
  );
}

export default Home;
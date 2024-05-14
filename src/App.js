import React, { useState, useEffect } from 'react';
import './App.css';
import BotCollection from './components/BotCollection';
import BotDetails from './components/BotDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SortBar from './components/SortBar';
import BotArmy from './components/BotArmy';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch bots');
        }
        return response.json();
      })
      .then(data => setBots(data))
      .catch(error => console.error('Error fetching bots:', error));
  }, []);

  const handleAddToArmy = (bot) => {
    setArmy(prevArmy => [...prevArmy, bot]);
  };

  const handleReleaseFromArmy = (bot) => {
    setArmy(prevArmy => prevArmy.filter(item => item.id !== bot.id));
  };

  const deleteBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setArmy(prevArmy => prevArmy.filter(item => item.id !== bot.id));
      setBots(prevBots => prevBots.filter(item => item.id !== bot.id));
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error deleting bot:', error));
  };

  const sortBots = (property) => {
    const sortedBots = [...bots]; 
    sortedBots.sort((a, b) => a[property] - b[property]); 
    setBots(sortedBots); 
  };

  return (
    <div className="App">
      <Router>
        <SortBar sortBots={sortBots} />
        <BotArmy army={army} handleReleaseFromArmy={handleReleaseFromArmy} deleteBot={deleteBot} />
        <h1 className='app-head'>Bot Army</h1>
        <Routes>
          <Route path='/' element={<BotCollection bots={bots} />} />
          <Route path='/bots/:id' element={<BotDetails handleAddToArmy={handleAddToArmy} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

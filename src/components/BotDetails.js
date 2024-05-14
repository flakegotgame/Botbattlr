import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BotDetails({ handleAddToArmy }) {
  const { id } = useParams(); 
  const [bot, setBot] = useState(null);
  const [addedToArmy, setAddedToArmy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/bots/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch bot');
        }
        return response.json();
      })
      .then(data => {
        setBot(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bot details:', error);
        setLoading(false);
      });
  }, [id]); 

  const addToArmy = () => {
    if (!addedToArmy) {
      handleAddToArmy(bot);
      setAddedToArmy(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!bot) {
    return <p>Bot not found</p>;
  }

  return (
    <div className="bot-detail">
      <h2 className="bot-detail-head">Bot Details</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>Class: {bot.bot_class}</p>
      <p>Catchphrase: {bot.catchphrase}</p>
      <p>Time Created: {bot.created_at}</p>
      <p>Time Updated: {bot.updated_at}</p>
      <p>❤️: {bot.health}</p>
      <p>💀: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      
      <Link to="/" className="back-link">Back</Link>
      <button onClick={addToArmy} disabled={addedToArmy}>
        {addedToArmy ? "Checked Out" : "Add To Army"}
      </button>
    </div>
  );
}

export default BotDetails;

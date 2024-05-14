import React from 'react';
import BotCard from './BotCard';
import { Link } from 'react-router-dom';

function BotCollection({ bots }) {
  const botCards = bots.map(bot => (
    < Link to={`/bots/${bot.id}`} key={bot.id}>
      <BotCard bot={bot} />
    </Link>
  ));

  return (
    <div className="bot-collection">
      {botCards}
    </div>
  );
}

export default BotCollection;

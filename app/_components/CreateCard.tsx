"use client";
import { useState } from "react";

type Card = {
  id: number
  name: string
  description: string
};

const ItemRow = ({ id, name, description }: Card) => {
  return (
    <div>
      <h1>{id} {name}</h1>
      <p>{description}</p>
    </div>
  );
}

export default function CreateCard() {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = () => {
    setCards(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: `Card ${prev.length + 1}`,
        description: "Write a description here",
      }
    ]);
  };

  return (
    <div>
      <button onClick={addCard}>Click to add a new item</button>
      {cards.map(c => (
        <ItemRow
          key={c.id}
          id={c.id}
          name={c.name}
          description={c.description}
        />
      ))}
    </div>
  );
}

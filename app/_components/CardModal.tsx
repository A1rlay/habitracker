"use client";
import { useState, useEffect } from "react";

type Card = {
  id: number;
  name: string;
  description: string;
};

function ItemRow({ id, name, description, onEdit }: Card & { onEdit: () => void }) {
  return (
    <div className="bg-[#656d4a] text-[#f9f9f9] py-4 px-8 rounded-2xl mb-8 min-w-64 max-w-3/4 m-auto">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl">
          {id}. {name}
        </h3>
        <button onClick={onEdit}>Edit</button>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default function CreateCard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setIsOpen(true);
  }

  const openEditModal = (card: Card) => {
    setEditingId(card.id);
    setName(card.name);
    setDescription(card.description);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
  }

  const saveCard = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) return;

    setCards(prev => {
      if (editingId === null) {
        return [
          ...prev,
          {
            id: prev.length + 1,
            name: trimmedName,
            description: trimmedDescription,
          },
        ];
      }

      return prev.map(c => c.id === editingId ? { ...c, name: trimmedName, description: trimmedDescription } : c);
    });

    closeModal();
  };

  useEffect(() => {
    const savedCards = localStorage.getItem("cards");

    if (!savedCards) return;

    try {
      const parsed: Card[] = JSON.parse(savedCards);
      setCards(parsed);
    } catch {
      localStorage.removeItem("cards");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="mt-20">
      {cards.map(c => (
        <ItemRow key={c.id} id={c.id} name={c.name} description={c.description} onEdit={() => openEditModal(c)} />
      ))}

      <button
        onClick={openModal}
        className="block mt-12 mb-24 bg-[#656d4a] px-12 py-3 rounded-4xl text-[#f9f9f9] m-auto font-semibold text-2xl">
        Add card
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-[480] bg-[#7f5539] text-[#f9f9f9] rounded-xl p-16"
          >
            <h2 className="m-0 text-3xl font-semibold">
              Create card
            </h2>

            <label className="block mt-4 text-xl">
              Title
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 mt-2 bg-[#a68a64] text-base rounded text-black font-semibold"
                placeholder="FundMiner"
              />
            </label>

            <label className="block mt-4 text-xl">
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 mt-2 bg-[#a68a64] text-base rounded text-black font-semibold min-h-12 max-h-80"
                placeholder="Complete FUN-1392"
              />
            </label>

            <div className="flex gap-6 justify-end mt-12">
              <button onClick={closeModal} className="hover:cursor-pointer bg-[#c1121f] px-4 py-2 rounded-2xl">
                Cancel
              </button>
              <button onClick={saveCard} disabled={!name.trim() || !description.trim()}
                className="hover:cursor-pointer bg-[#606c38] px-4 py-2 rounded-2xl">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

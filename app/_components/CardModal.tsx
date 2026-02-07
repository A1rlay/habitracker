"use client";
import { useState } from "react";

type Card = {
  id: number;
  name: string;
  description: string;
};

function ItemRow({ id, name, description }: Card) {
  return (
    <div>
      <h3>
        {id}. {name}
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default function CreateCard() {
  const [items, setItems] = useState<Card[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setName("");
    setDescription("");
    setIsOpen(true);
  }

  const closeModal = () => setIsOpen(false);

  const saveCard = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) return;

    setItems(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: trimmedName,
        description: trimmedDescription,
      },
    ]);

    closeModal();
  };

  return (
    <div className="mt-24">
      {items.map(c => (
        <ItemRow key={c.id} id={c.id} name={c.name} description={c.description} />
      ))}

      <button onClick={openModal} className="block mt-16">Add card</button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-[480] bg-[#7f5539] text-[#f9f9f9] rounded-xl p-16"
          >
            <h2 className="m-0 text-[1.25em]">Create card</h2>

            <label className="block mt-4">
              Title
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 mt-6 bg-[#a68a64]"
                placeholder="MVP for personal project"
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 mt-6 bg-[#a68a64]"
                placeholder="What is this card about?"
              />
            </label>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={saveCard} disabled={!name.trim() || !description.trim()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

type Card = {
  id: number;
  name: string;
  description: string;
};

function ItemRow({ id, name, description }: Card) {
  return (
    <div className="bg-[#656d4a] text-[#f9f9f9] py-4 px-8 rounded-2xl mb-8">
      <h3 className="font-bold text-xl">
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

      <button onClick={openModal} className="block mt-16 mb-24 bg-[#656d4a] px-6 py-2 rounded-2xl text-[#f9f9f9] m-auto">Add card</button>

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
            <h2 className="m-0 text-[1.25em] font-semibold">Create card</h2>

            <label className="block mt-4">
              Title
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 mt-2 bg-[#a68a64] text-sm"
                placeholder="FundMiner"
              />
            </label>

            <label className="block mt-4">
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 mt-2 bg-[#a68a64] text-sm"
                placeholder="Complete FUN-1392"
              />
            </label>

            <div className="flex gap-8 justify-end mt-8">
              <button onClick={closeModal} className="hover:cursor-pointer">Cancel</button>
              <button onClick={saveCard} disabled={!name.trim() || !description.trim()} className="hover:cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

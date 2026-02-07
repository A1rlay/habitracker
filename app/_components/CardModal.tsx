import { useState } from "react";

export default function CardModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: string) => {
    setTitle(event.target.value);
  };
};

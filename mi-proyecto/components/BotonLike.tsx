"use client"; // este necesita JS en el cliente porque es interactivo
import { useState } from "react";

export default function BotonLike() {
  const [likes, setLikes] = useState(0);

  return (
    <button 
      onClick={() => setLikes(likes + 1)} 
       className="px-3 py-2 border border-gray-400 rounded-lg hover:bg-gray-700"
    >
      👍 {likes}
    </button>
  );
}

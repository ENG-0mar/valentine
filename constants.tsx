
import React from 'react';
import { Memory } from './types';

// Heart icon component used across the application
export const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// Memory collection for the gallery component
export const MEMORIES: Memory[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop",
    caption: "Our first date, the moment I knew you were special.",
    date: "Jan 15, 2024"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000&auto=format&fit=crop",
    caption: "Walking under the stars, just you and me.",
    date: "Feb 1, 2024"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1516589174184-c6848b11674c?q=80&w=1000&auto=format&fit=crop",
    caption: "Every laugh we shared is a treasure I keep forever.",
    date: "Dec 25, 2023"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=1000&auto=format&fit=crop",
    caption: "The way you look at me makes the whole world vanish.",
    date: "Nov 12, 2023"
  }
];

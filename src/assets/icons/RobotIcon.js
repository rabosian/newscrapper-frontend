import React from 'react';

function RobotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
    >
      {/* Head */}
      <rect x="8" y="10" width="48" height="44" rx="8" fill="#6EC1E4" />
      {/* Eyes */}
      <circle cx="20" cy="28" r="6" fill="#FFF" />
      <circle cx="44" cy="28" r="6" fill="#FFF" />
      <circle cx="20" cy="28" r="3" fill="#333" />
      <circle cx="44" cy="28" r="3" fill="#333" />
      {/* Mouth */}
      <path
        d="M16 42c4 3 16 3 16 0s8 3 16 0"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Antenna */}
      <line x1="32" y1="6" x2="32" y2="2" stroke="#333" strokeWidth="2" />
      <circle cx="32" cy="2" r="2" fill="#333" />
      {/* Gears (for a robotic feel) */}
      <circle cx="12" cy="18" r="4" fill="#FFF" stroke="#333" strokeWidth="2" />
      <circle cx="52" cy="18" r="4" fill="#FFF" stroke="#333" strokeWidth="2" />
      <circle cx="12" cy="18" r="2" fill="#333" />
      <circle cx="52" cy="18" r="2" fill="#333" />
    </svg>
  );
}

export default RobotIcon;

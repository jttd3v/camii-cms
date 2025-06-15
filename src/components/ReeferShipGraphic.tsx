
import React from 'react';

const ReeferShipGraphic = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Reefer Ship Graphic"
  >
    {/* Hull */}
    <path d="M 10 70 L 190 70 L 175 85 L 25 85 Z" fill="currentColor" opacity="0.4" />
    <path d="M 10 70 L 190 70 L 170 50 L 30 50 Z" fill="currentColor" opacity="0.2" />
    
    {/* Superstructure */}
    <path d="M 150 50 H 170 L 170 35 H 150 Z" fill="currentColor" opacity="0.6" />

    {/* Containers */}
    <rect x="30" y="40" width="25" height="10" fill="currentColor" opacity="0.7" rx="2" />
    <rect x="60" y="40" width="25" height="10" fill="currentColor" opacity="0.6" rx="2" />
    <rect x="90" y="40" width="25" height="10" fill="currentColor" opacity="0.7" rx="2" />
    <rect x="120" y="40" width="25" height="10" fill="currentColor" opacity="0.6" rx="2" />

    {/* Waves */}
    <path
      d="M 0 90 C 40 80, 60 100, 100 90 S 160 80, 200 90"
      stroke="currentColor"
      opacity="0.8"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
     <path
      d="M 0 95 C 30 85, 70 105, 100 95 S 170 85, 200 95"
      stroke="currentColor"
      opacity="0.5"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default ReeferShipGraphic;

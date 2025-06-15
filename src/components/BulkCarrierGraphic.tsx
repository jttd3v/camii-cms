
import React from 'react';

const BulkCarrierGraphic = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Bulk Carrier Graphic"
  >
    {/* Hull */}
    <path d="M 10 70 L 190 70 L 175 85 L 25 85 Z" fill="currentColor" opacity="0.4" />
    <path d="M 10 70 L 190 70 L 170 50 L 30 50 Z" fill="currentColor" opacity="0.2" />

    {/* Superstructure */}
    <path d="M 130 50 H 160 L 170 35 H 130 Z" fill="currentColor" opacity="0.6" />
    <path d="M 40 50 H 60 L 50 35 Z" fill="currentColor" opacity="0.5" />

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

export default BulkCarrierGraphic;

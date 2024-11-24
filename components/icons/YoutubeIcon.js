import React from 'react';

const YoutubeIcon = ({ color = 'currentColor', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M23.498 6.186a3.001 3.001 0 0 0-2.106-2.106C19.5 4 12 4 12 4s-7.5 0-9.392.08A3.001 3.001 0 0 0 .502 6.186 30.002 30.002 0 0 0 0 12c0 1.5.12 2.814.502 5.814a3.001 3.001 0 0 0 2.106 2.106C4.5 20 12 20 12 20s7.5 0 9.392-.08a3.001 3.001 0 0 0 2.106-2.106C23.88 14.814 24 13.5 24 12c0-1.5-.12-2.814-.502-5.814zM9.545 15.537V8.463l6.454 3.537-6.454 3.537z" />
  </svg>
);

export default YoutubeIcon;

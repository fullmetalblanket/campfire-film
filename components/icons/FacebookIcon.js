import React from 'react';

const FacebookIcon = ({ color = 'currentColor', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24h21.35C23.4 24 24 23.4 24 22.675v-21.35C24 .6 23.4 0 22.675 0zm-2.675 12h-4v10h-4v-10h-2v-4h2v-2.5c0-2.5 1.5-4 4-4h3v4h-2c-.5 0-1 .5-1 1v2h4l-1 4z" />
  </svg>
);

export default FacebookIcon;

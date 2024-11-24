import React from 'react';
import Image from 'next/image';
import socialMediaLinks from '@/lib/social_media_links.json';

const SocialMediaLinks = () => {
  return (
    <div className="flex space-x-4">
      {socialMediaLinks.social.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center opacity-75 hover:opacity-100">
          <Image src={link.icon} alt={`${link.url} icon`} width={56} height={56} className="w-14 h-14" />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;

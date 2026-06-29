'use client';

import React from 'react';

// Disabled GSAP FullPageScroll as it conflicts with Next.js HMR and Lenis, creating dead scroll zones.
export default function FullPageScroll({ children }) {
  return (
    <div className="full-page-scroll-manager w-full overflow-x-hidden">
      {children}
    </div>
  );
}

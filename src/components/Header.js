'use client';

import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <AnnouncementBar />
      <Navbar style={{ position: 'relative', top: 'auto', left: 'auto' }} />
    </header>
  );
}

import React, { useState } from 'react';

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`} style={{ zIndex: 1000 }}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={toggleDrawer} />
      <div className="drawer-content z-0">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleDrawer}></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const InstructorLayout = () => (
  <div>
    <header>
      <nav>
        <ul style={{
          display: 'flex',
          justifyContent: 'space-around',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          backgroundColor: '#f1f1f1'
        }}>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/instructor/cursurile-mele-create" style={{ textDecoration: 'none', color: '#333' }}>Cursurile Mele Create</Link>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/instructor/adauga-curs-nou" style={{ textDecoration: 'none', color: '#333' }}>Adaugă Curs Nou</Link>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/instructor/module-management" style={{ textDecoration: 'none', color: '#333' }}>Gestionare Module</Link>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default InstructorLayout;

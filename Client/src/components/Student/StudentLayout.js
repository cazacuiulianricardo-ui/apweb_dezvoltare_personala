import React from 'react';
import { Link } from 'react-router-dom';

const StudentLayout = ({ children }) => (
  <div>
    <header>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0, margin: 0, backgroundColor: '#f1f1f1' }}>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/cursurile-mele" style={{ textDecoration: 'none', color: '#333' }}>Cursurile Mele</Link>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <Link to="/abonamente2" style={{ textDecoration: 'none', color: '#333' }}>Abonament</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      {children}
    </main>
  </div>
);

export default StudentLayout;

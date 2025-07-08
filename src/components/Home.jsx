// src/components/Home.jsx
import React from 'react';

function Home() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return (
      <div className="container mt-5">
        <h3>{"{ \"message\": \"You are not authorized\" }"}</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Información de sesión</h3>
      <pre>
        {JSON.stringify({ user, token }, null, 2)}
      </pre>
    </div>
  );
}

export default Home;
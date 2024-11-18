import React from 'react';
import { useNavigate } from 'react-router-dom'; // Si tu utilises React Router pour la navigation

const Admin = () => {
  const navigate = useNavigate(); // Permet la navigation programmatique si tu utilises React Router

  // Fonction de déconnexion
  const handleLogout = () => {
    // Ici, tu peux ajouter la logique de déconnexion (par exemple, supprimer le token)
    console.log('Déconnexion...');
    // Redirection vers la page de connexion après déconnexion
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img 
          src={require('./images/justLogo.png')} 
          alt="Mon Logo" 
          style={{ width: '30%', height: 'auto' }} 
        />
      </div>
      
      <nav style={styles.nav}>
        <button onClick={() => navigate('/clients')} style={styles.button}>Clients</button>
        <button onClick={() => navigate('/demandes')} style={styles.button}>Demandes</button>
        <button onClick={() => navigate('/comptes')} style={styles.button}>Comptes</button>
        <button onClick={() => navigate('/agences')} style={styles.button}>Agences</button>
        <button onClick={() => navigate('/finances')} style={styles.button}>Finances</button>
      </nav>
      
      <button onClick={handleLogout} style={styles.logoutButton}>Déconnexion</button>
    </header>
  );
};

// Styles pour la mise en page
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#000',
    color: 'white',
  },
  logo: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  button: {
    backgroundColor: '#000',
    fontSize: '1.5rem',
    color: '#4CAF50',
    
    
  },
  logoutButton: {
    backgroundColor: '#f44336',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    borderRadius: '5px',
  },
};

export default Admin;

import { useAuth } from './context/useAuth';

function App() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Clothing E-Commerce</h1>

      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default App;

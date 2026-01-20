import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '2rem', height: '200vh' }}>
        <h1>Welcome to Luminary</h1>
        <p>Scroll down to test the sticky navbar.</p>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
// import About from './routes/About';
import './index.css'; // Ensure your styles are imported

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/" className="p-2">Home</Link>
        <Link to="/about" className="p-2">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
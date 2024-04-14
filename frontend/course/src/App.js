import logo from './logo.svg';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Pricing from './Components/Pricing.js';
import Login from './Components/Admin/Login.js';
import UpdatePricing from './Components/Admin/UpdatePricing.js';

// const theme = createTheme({
//   colors: {
//     demo: [
//       '#FF0000',
//       '#FF3333',
//       '#FF6666',
//       '#FF9999',
//       '#FFCCCC',
//       '#FFEEEE',
//       '#FFFAFA',
//       '#FFF5F5',
//       '#FFF0F0',
//       '#FFEBEB',
//     ],
//   },
// });

function App() {
  return (
    <MantineProvider>
      <Router>
        <div>
        {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={ <><Navbar /> <Pricing /></> } />
            <Route path="/updatePricing" element={<UpdatePricing />} />
            <Route path="/courses" />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" />
            <Route path="/contact" />
          </Routes>
          {/* <Login /> */}
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;

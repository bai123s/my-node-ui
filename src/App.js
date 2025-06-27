import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Desktop1 from './Desktop1';
import Desktop2 from './Desktop2';
import ScrollToTop from "./ScrollToTop";
import DemoPage from './DemoPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Desktop1 />} />
        <Route path="/desktop2" element={<Desktop2 />} />
        <Route path="/demopage" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

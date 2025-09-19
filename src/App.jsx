import {BrowserRouter, Route, Routes} from "react-router-dom";
import Graphics from "./pages/Graphics.jsx";
import Tables from "./pages/Tables.jsx";
import Menu from "./components/menu.jsx";

function App() {

  return (
      <BrowserRouter>
          <Menu />
          <Routes>
              <Route path="/" element={<Graphics />} />
              <Route path="/table" element={<Tables />} />
          </Routes>
      </BrowserRouter>
      )
}

export default App

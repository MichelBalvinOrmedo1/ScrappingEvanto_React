import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";

import Home from "./components/Home.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  );
}

export default App;

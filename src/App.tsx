import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./components/Home.tsx";
import All_Items from "./components/All_Items.tsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/all_items/:keyword" element={<All_Items />} />
      </Routes>
    </>
  );
}

export default App;

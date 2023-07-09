import { Routes, Route } from "react-router-dom";

const Home = (): JSX.Element => <h1> Home</h1>;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  );
}

export default App;

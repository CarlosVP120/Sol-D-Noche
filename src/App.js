import "./App.css";
import ScrollableContent from "./Components/ScrollableContent";
import Home from "./Pages/Home";
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
      <ScrollableContent />
      <Home />
      <About />
    </div>
  );
}

export default App;

import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import CustomerLove from "./Pages/CustomerLove";
import Contact from "./Pages/Contact";
import Footer from "./Pages/Footer";

function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <CustomerLove />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

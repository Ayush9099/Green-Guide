import Login from "./feature/Login"
import Signup from "./feature/Signup"
import NotFound from "./Pages/NotFound"
import './index.css';
// import Home from "./Layout/Home";
import Register from "./feature/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plant from "./feature/Plant";
import Blog from "./feature/Blog";
import Garden from "./feature/Garden";
import About from "./feature/About";
import Calender from "./feature/Calender";
import PlantDetailed from "./feature/plantDetail";
import GardenDetail from "./feature/garden-detail"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Garden />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/gardens" element={<Garden />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/plants/:id" element={<PlantDetailed />} />
          <Route path="/garden/:id" element={<GardenDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
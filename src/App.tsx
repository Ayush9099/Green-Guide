import Login from "./feature/Login"
import Signup from "./feature/Signup"
import NotFound from "./Pages/NotFound"
import './index.css';
// import Home from "./Layout/Home";
import Register from "./feature/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plant from "./feature/Plant";
import Post from "./feature/Post";
import Garden from "./feature/Garden";
import About from "./feature/About";
import Calender from "./feature/Calender";
import PlantDetailed from "./feature/plantDetail";
import GardenDetail from "./feature/garden-detail"
import Home from "./feature/Home";
import ContactUs from "./feature/ContactUs";
import AdminLogin from "./feature/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import AddPlant from "./Admin/AddPlant";
import ListOfPlants from "./Admin/ListOfPlants";
import EditPlant from "./Admin/EditPlant";
import Blog from "./feature/Blog";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/gardens" element={<Garden />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/plants/:id" element={<PlantDetailed />} />
          <Route path="/garden/:id" element={<GardenDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/listofplants" element={<ListOfPlants />} />
          <Route path="/admin/addplant" element={<AddPlant />} />
          <Route path="/admin/editplant" element={<EditPlant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
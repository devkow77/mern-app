import "./App.css";
import { Routes, Route } from "react-router";
import {
  Home,
  Profile,
  Faq,
  Contact,
  BlogPost,
  BlogAuthors,
  BlogAuthor,
} from "./pages/index";
import { ModeToggle } from "./components";
import { Toaster } from "./components/ui/toaster";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="relative text-gray-800 dark:bg-zinc-900 dark:text-white">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/authors" element={<BlogAuthors />} />
        <Route path="/blog/authors/:slug" element={<BlogAuthor />} />
      </Routes>
      <ModeToggle />
      <Toaster />
    </div>
  );
}
export default App;

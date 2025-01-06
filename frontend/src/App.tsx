import "./App.css";
import { Routes, Route } from "react-router";
import {
  Home,
  Account,
  Faq,
  Contact,
  BlogPost,
  BlogAuthors,
  BlogAuthor,
  NotFound,
  PlaceForm,
  Booking,
  Places,
  Place,
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
        <Route path="/account" element={<Account />} />
        <Route path="/account/:section" element={<Account />} />{" "}
        {/* edit, places, bookings */}
        <Route path="/account/places/new" element={<PlaceForm />} />
        <Route path="/account/places/:id" element={<PlaceForm />} />
        <Route path="/account/bookings/:id" element={<Booking />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<Place />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/authors" element={<BlogAuthors />} />
        <Route path="/blog/authors/:slug" element={<BlogAuthor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ModeToggle />
      <Toaster />
    </div>
  );
}
export default App;

import "./App.css";
import { Routes, Route } from "react-router";
import {
  Home,
  Faq,
  Contact,
  BlogPost,
  BlogAuthors,
  BlogAuthor,
  NotFound,
  Account,
  NewService,
  ServiceDetails,
  EditService,
  Services,
  ReservationDetails,
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
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/authors" element={<BlogAuthors />} />
        <Route path="/blog/authors/:slug" element={<BlogAuthor />} />
        <Route path="/account/:section?" element={<Account />} />
        <Route path="/account/services/new" element={<NewService />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/services/:id/edit" element={<EditService />} />
        <Route path="/reservations/:id" element={<ReservationDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ModeToggle />
      <Toaster />
    </div>
  );
}
export default App;

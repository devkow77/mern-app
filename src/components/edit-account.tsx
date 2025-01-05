import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";

const UserEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
          {
            withCredentials: true,
          },
        );
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          password: "",
        });
      } catch (err) {
        setError("Nie udało się pobrać danych użytkownika.");
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/update`,
        { ...formData },
        { withCredentials: true },
      );
      setSuccess("Twoje dane konta zostały zaktualizowane!");
    } catch (err) {
      if (err.response?.data?.error === "Email is already in use!") {
        setError("Ten email jest już w użyciu!");
      } else if (
        err.response?.data?.error === "Phone number is already in use!"
      ) {
        setError("Ten numer telefonu jest już zajęty!");
      } else {
        setError(
          err.response?.data?.error || "Nie udało się zaktualizować danych.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <section className="rounded-2xl border-2 border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 sm:w-2/3">
      <h2 className="mb-4 text-lg font-bold text-white md:text-xl">
        Edytuj dane konta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
        <div>
          <label className="mb-2 block text-white">Imię</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded bg-zinc-700 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded bg-zinc-700 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-white">Numer telefonu</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full rounded bg-zinc-700 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-white">Nowe hasło</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded bg-zinc-700 p-2 text-white"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button variant="success" type="submit" disabled={loading}>
            {loading ? "Aktualizowanie..." : "Zapisz zmiany"}
          </Button>
          {error && <p className="font-semibold text-red-500">{error}</p>}
          {success && (
            <p className="font-semibold text-green-500">
              Twoje dane zostały zaktualizowane
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default UserEdit;

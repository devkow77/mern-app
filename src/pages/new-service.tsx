import { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Container } from "../components/index";
import { Service } from "../lib/utils";

const NewService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Service>({
    name: "",
    address: "",
    phoneNumber: "",
    photos: [],
    category: "Inne",
    price: "",
    workingHours: {
      Monday: "ZAMKNIĘTE",
      Tuesday: "ZAMKNIĘTE",
      Wednesday: "ZAMKNIĘTE",
      Thursday: "ZAMKNIĘTE",
      Friday: "ZAMKNIĘTE",
      Saturday: "ZAMKNIĘTE",
      Sunday: "ZAMKNIĘTE",
    },
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWorkingHoursChange = (day: string, value: string) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/services/create`,
        formData,
        { withCredentials: true },
      );
      navigate("/account");
    } catch (err) {
      setError("Nie udało się dodać usługi. Spróbuj ponownie.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <h2 className="mb-4 text-base font-bold md:text-xl">
          Dodaj nową usługę
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Nazwa
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
              required
              placeholder="Nazwa uslugi"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold"
            >
              Adres
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
              required
              placeholder="Adres"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-semibold"
            >
              Numer telefonu
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
              required
              placeholder="Numer telefonu"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Kategoria
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
            >
              <option value="Fryzjer">Fryzjer</option>
              <option value="Barber">Barber</option>
              <option value="Salon kosmetyczny">Salon kosmetyczny</option>
              <option value="Paznokcie">Paznokcie</option>
              <option value="Brwi i rzęsy">Brwi i rzęsy</option>
              <option value="Masaż">Masaż</option>
              <option value="Fizjoterapia">Fizjoterapia</option>
              <option value="Inne">Inne</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-semibold">
              Cena
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
              required
              placeholder="Cena usługi"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Godziny pracy (muszą być pełne godziny)
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.keys(formData.workingHours).map((day) => (
                <div key={day}>
                  <label className="mb-2 block text-sm font-semibold">
                    {day}
                  </label>
                  <input
                    type="text"
                    value={formData.workingHours[day]}
                    onChange={(e) =>
                      handleWorkingHoursChange(day, e.target.value)
                    }
                    className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700 dark:text-white"
                    placeholder="np. 9:00-18:00"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? "Ładowanie..." : "Dodaj usługę"}
            </Button>
            <Button type="reset" variant="destructive" disabled={loading}>
              {loading ? "Ładowanie..." : "Wyczyść formularz"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </Container>
    </section>
  );
};

export default NewService;

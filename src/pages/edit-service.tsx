import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import axios from "axios";
import { Button } from "../components/ui/button";
import { UserContext } from "../context/user-context";
import { Container } from "../components/index";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    category: "",
    price: "",
    workingHours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/services/${id}`,
        );
        setService(response.data);
        setFormData(response.data);
        if (user?._id !== response.data.owner) {
          alert("Nie masz uprawnien do edycji tego serwisu.");
          navigate("/account");
        }
      } catch (err) {
        setError("Nie udało się pobrać danych serwisu.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes("workingHours.")) {
      const day = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        workingHours: {
          ...prevState.workingHours,
          [day]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/services/${id}/edit`,
        formData,
      );
      navigate(`/services/${id}`);
    } catch (err) {
      setError("Nie udało się zaktualizować danych serwisu.");
      console.log(err);
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <h2 className="mb-4 text-base font-bold md:text-xl">Edytuj usługę</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Nazwa
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
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
              onChange={handleInputChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
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
              onChange={handleInputChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Kategoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
            />
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
              onChange={handleInputChange}
              className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
            />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Godziny pracy</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(formData.workingHours).map(([day, hours]) => (
                <div key={day}>
                  <label
                    htmlFor={`workingHours.${day}`}
                    className="mb-2 block text-sm font-semibold"
                  >
                    {day}
                  </label>
                  <input
                    type="text"
                    id={`workingHours.${day}`}
                    name={`workingHours.${day}`}
                    value={hours}
                    onChange={handleInputChange}
                    placeholder="np. 08:00 - 16:00"
                    className="w-full rounded-lg px-2 py-1 dark:bg-zinc-700"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="success" type="submit">
              Zapisz zmiany
            </Button>
            <Link to="/account">
              <Button variant="destructive">Anuluj</Button>
            </Link>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default EditService;

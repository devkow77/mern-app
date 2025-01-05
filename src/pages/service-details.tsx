import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router";
import { Container } from "../components/index";
import { UserContext } from "../context/user-context";
import { Service } from "../lib/utils";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservationData, setReservationData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/services/${id}`,
        );
        setService(response.data);
        setReservationData({
          name: user?.name || "",
          phoneNumber: user?.phoneNumber || "",
          date: "",
          time: "",
        });
      } catch (err) {
        setError("Nie udało się pobrać danych o serwisie.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Pobieranie godzin dostępnych po wybraniu daty
    if (name === "date") {
      fetchAvailableTimes(value);
    }
  };

  const fetchAvailableTimes = async (selectedDate: string) => {
    console.log("Wysyłam zapytanie do API z danymi:", {
      id,
      date: selectedDate,
    });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/services/${id}/available-times`,
        {
          params: { date: selectedDate },
        },
      );
      console.log("Otrzymane dostępne godziny:", response.data);
      setAvailableTimes(response.data.times);
    } catch (err) {
      setAvailableTimes([]);
      console.error("Nie udało się pobrać dostępnych godzin:", err);
    }
  };

  const handleReservationSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setFormError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/services/${id}/reserve`,
        reservationData,
        { withCredentials: true },
      );
      alert("Rezerwacja została pomyślnie złożona!");
      navigate(`/account`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setFormError(err.response.data.error);
      } else {
        setFormError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.");
      }
    }
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!service) return <p>Serwis nie został znaleziony.</p>;

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          <div className="col-span-2 h-40 rounded-2xl bg-zinc-700 md:h-80"></div>
          <div className="h-20 rounded-2xl bg-zinc-800 md:h-40"></div>
          <div className="h-20 rounded-2xl bg-zinc-800 md:h-40"></div>
          <div className="h-20 rounded-2xl bg-zinc-800 md:h-40"></div>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full text-sm md:text-base lg:w-2/3">
            <div className="mb-4">
              <h2 className="mb-1 text-xl font-bold lg:text-3xl">
                {service.name}
              </h2>
              <h3>{service.address}</h3>
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="text-base font-semibold md:text-lg">
                  Numer telefonu
                </h3>
                <p>{service.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold md:text-lg">
                  Kategoria
                </h3>
                <p>{service.category}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold md:text-lg">Cena</h3>
                <p>{service.price} PLN</p>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold md:text-lg">
                  Godziny pracy
                </h3>
                <ul className="space-y-2">
                  {Object.entries(service.workingHours).map(([day, hours]) => (
                    <li key={day}>
                      <strong>{day}:</strong> {hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {user?._id !== service.owner && (
            <div className="w-full lg:w-1/3">
              <h3 className="mb-2 text-base font-semibold md:text-lg">
                Zarezerwuj usługę
              </h3>
              <form
                onSubmit={handleReservationSubmit}
                className="space-y-4 text-sm md:text-base"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={reservationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg bg-zinc-700 p-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="mb-2 block">
                    Numer telefonu
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={reservationData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-zinc-700 p-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="mb-2 block">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={reservationData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg bg-zinc-700 p-2 text-white"
                  />
                </div>

                {/* Wyświetlanie dostępnych godzin */}
                {availableTimes.length > 0 ? (
                  <div>
                    <label htmlFor="time" className="block">
                      Wybierz godzinę
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={reservationData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-zinc-900 p-2 text-white"
                    >
                      <option value="" disabled>
                        Wybierz godzinę
                      </option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <h3 className="text-red-500">
                    Brak dostępnych godzin w wybranym dniu
                  </h3>
                )}

                {formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}

                <Button variant="success" type="submit">
                  Zarezerwuj
                </Button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetails;

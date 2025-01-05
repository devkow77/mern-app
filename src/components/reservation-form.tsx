import { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Ładujemy dostępne usługi dla zalogowanego użytkownika
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/services/user", {
          withCredentials: true,
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services", err);
        setError("Error loading services");
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const reservationData = {
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
      };

      const response = await axios.post("/api/reservations", reservationData, {
        withCredentials: true, // Aby wysłać token JWT z ciasteczkami
      });

      // Po udanej rezerwacji, przekierowanie użytkownika na stronę rezerwacji
      window.location.replace(`/reservation/${response.data._id}`);
    } catch (err) {
      console.error("Error making reservation", err);
      setError("Error making reservation");
    }
  };

  return (
    <div>
      <h2>Reserve a Service</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Select Service:</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service, index: number) => (
              <option key={index} value={service._id}>
                {service.name} - {service.price} PLN
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="time">Select Time:</label>
          <input
            type="time"
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;

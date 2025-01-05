import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router"; // Używamy `useParams` do pobrania ID z URL
import { Container } from "../components/index";

const ReservationDetails = () => {
  const { id } = useParams(); // Pobieramy ID rezerwacji z URL
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Funkcja do pobierania szczegółów rezerwacji
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/reservations/user/${id}`, // Pobieramy szczegóły rezerwacji z backendu
          {
            withCredentials: true,
          },
        );
        setReservation(response.data); // Zapisujemy dane rezerwacji w stanie
      } catch (err) {
        setError("Nie udało się pobrać szczegółów rezerwacji.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  // Jeżeli dane są w trakcie ładowania
  if (loading) return <p>Ładowanie...</p>;

  // Jeżeli wystąpił błąd
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Jeżeli rezerwacja nie została znaleziona
  if (!reservation) return <p>Rezerwacja nie została znaleziona.</p>;

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <h2 className="mb-4 text-xl font-bold">Szczegóły rezerwacji</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Szczegóły rezerwacji */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Imię i nazwisko</h3>
            <p>{reservation.name}</p>

            <h3 className="text-lg font-semibold">Numer telefonu</h3>
            <p>{reservation.phoneNumber}</p>

            <h3 className="text-lg font-semibold">Data</h3>
            <p>{new Date(reservation.date).toLocaleDateString()}</p>

            <h3 className="text-lg font-semibold">Godzina</h3>
            <p>{reservation.time}</p>

            <h3 className="text-lg font-semibold">Status rezerwacji</h3>
            <p>{reservation.status}</p>

            <h3 className="text-lg font-semibold">Usługa</h3>
            <p>{reservation.service?.name}</p>
            <p>{reservation.service?.address}</p>
            <p>{reservation.service?.category}</p>
          </div>

          {/* Przycisk do powrotu do listy rezerwacji */}
          <div className="flex items-center gap-4">
            <Button
              variant="success"
              onClick={() => navigate("/account/reservations")}
            >
              Powrót do moich rezerwacji
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReservationDetails;

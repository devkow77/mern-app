import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { useToast } from "../hooks/use-toast";
import { Service } from "../lib/utils";

const MyServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/services/user`,
          {
            withCredentials: true,
          },
        );
        setServices(response.data);
      } catch (err: unknown) {
        setError("Nie udało się załadować usług");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDeleteService = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/services/${id}`);
      toast({
        title: "Serwis został pomyślnie usunięty!",
        description: "Serwis został usunięty z Twojej listy.",
        variant: "success",
      });
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      console.error("Błąd podczas usuwania serwisu:", err);
      alert("Nie udało się usunąć serwisu.");
    }
  };

  return (
    <section className="sm:w-1/2">
      {services.length ? (
        <ServicesList
          services={services}
          handleDeleteService={handleDeleteService}
        />
      ) : (
        <NoServices />
      )}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Ładowanie...</p>}
    </section>
  );
};

const ServicesList = ({
  services,
  handleDeleteService,
}: {
  services: Service[];
  handleDeleteService: (id: string) => void;
}) => {
  return (
    <div>
      <h2 className="mb-2 text-base font-bold md:text-xl">
        {`Moje usługi w ilości: ${services.length}`}
      </h2>
      <div className="mb-6 grid w-full grid-cols-1 gap-4">
        {services.map((service: Service) => (
          <div
            key={service._id}
            className="relative flex min-h-40 flex-col justify-end rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 p-4"
          >
            <Link to={`/services/${service._id}`}>
              <h3 className="text-xl font-bold hover:text-sky-200">
                {service.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <p>{service.address}</p>
                <p className="rounded-2xl bg-sky-500 px-4 py-1 text-xs font-medium">
                  {service.category}
                </p>
              </div>
            </Link>
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <div
                onClick={() => handleDeleteService(service._id as string)}
                className="cursor-pointer duration-200 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
              <Link
                to={`/services/${service._id}/edit`}
                className="duration-200 hover:text-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/account/services/new">
        <Button className="text-white dark:bg-sky-500 dark:text-white dark:hover:bg-sky-700">
          Dodaj
        </Button>
      </Link>
    </div>
  );
};

const NoServices = () => {
  return (
    <div>
      <img src="/service.png" alt="service" className="w-1/2" />
      <h2 className="mb-2 text-base font-bold md:text-xl">
        Brak aktualnie usług
      </h2>
      <p className="mb-4">
        Aby dodać swoją pierwszą usługę, kliknij w zielony przycisk "Dodaj"
        poniżej
      </p>
      <Link to="/account/services/new">
        <Button variant={"success"}>Dodaj teraz</Button>
      </Link>
    </div>
  );
};

export default MyServices;

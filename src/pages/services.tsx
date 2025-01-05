import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "../components";
import { Service } from "../lib/utils";
import { Link } from "react-router";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/services`,
        );
        setServices(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((service: Service) => service.category)),
        ];
        setCategories(uniqueCategories as string[]);
      } catch (err) {
        setError("Nie udało się pobrać danych serwisów.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  if (loading) return <p>Ładowanie...</p>;

  if (error) return <p className="font-semibold text-red-500">{error}</p>;

  return (
    <section className="py-8 lg:py-16">
      <Container>
        <h2 className="mb-4 text-xl font-bold">Wszystkie usługi</h2>
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <ServicesList filteredServices={filteredServices} />
      </Container>
    </section>
  );
};

const Categories = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="mr-2 font-semibold">
        Wybierz kategorię:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="rounded-md bg-zinc-800 p-2 text-white"
      >
        <option value="">Wszystkie</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

const ServicesList = ({
  filteredServices,
}: {
  filteredServices: Service[];
}) => {
  const getToday = (): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    return daysOfWeek[today.getDay()]; // Zwraca dzień tygodnia
  };

  if (!filteredServices.length) {
    return (
      <div className="space-y-4">
        <p>Brak usług w wybranej kategorii.</p>
      </div>
    );
  }
  if (filteredServices.length) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service: Service) => (
          <Link
            to={`/services/${service._id}`}
            key={service._id}
            className="relative min-h-40 rounded-2xl bg-zinc-800 p-4 duration-200 hover:bg-zinc-700"
          >
            <div className="flex h-full flex-col flex-wrap justify-end gap-4 text-sm">
              <div>
                <h3 className="text-base font-bold md:text-xl">
                  {service.name}
                </h3>
                <div className="flex flex-wrap items-center gap-1">
                  <p>{service.address}</p>
                  <p className="font-semibold">({service.price} PLN)</p>
                </div>
              </div>
              <div className="w-28 rounded-2xl bg-red-500 py-1 text-center text-xs font-medium">
                {service.workingHours[getToday()]}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default Services;

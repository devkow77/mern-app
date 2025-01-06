import { useEffect, useState } from "react";
import axios from "axios";
import { ImagesUploader, Perks, Container } from "../components/index";
import { Navigate, useParams } from "react-router";

const PlaceForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const savePlace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/api/places/edit", { id, ...placeData });
      setRedirect(true);
    } else {
      await axios.post("/api/places/create", placeData);
      setRedirect(true);
    }
  };

  if (redirect) return <Navigate to={"/account"} />;

  return (
    <main>
      <Container className="py-12">
        <h2 className="mb-4 text-lg font-bold">
          {id ? "Edytuj miejsce" : "Dodaj nowe miejsce"}
        </h2>
        <section>
          <form onSubmit={savePlace}>
            <h2>Tytuł</h2>
            <p>tytuł twojego miejsca</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, for example: My lovely apt"
            />
            <h2>Adres</h2>
            <p>Twoj adres</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
            />
            <h2>Zdjecia</h2>
            <ImagesUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            <h2>Opis</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2>Udogodnienia</h2>
            <p>Twoje udogodnienia</p>
            <Perks selected={perks} onChange={setPerks} />
            <h2>Dodatkowe info</h2>
            <p>Dodatkowe informacje</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2>Czas wejscia i wyjscia oraz liczba gosci</h2>
            <p>Czas wejscia i wyjscia oraz liczba gosci</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="-mb-1 mt-2">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="-mb-1 mt-2">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="11:00"
                />
              </div>
              <div>
                <h3 className="-mb-1 mt-2">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(Number(e.target.value))}
                />
              </div>
              <div>
                <h3 className="-mb-1 mt-2">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </section>
      </Container>
    </main>
  );
};

export default PlaceForm;

import { Container } from "../components/index";
import { useState } from "react";
import { faqLinks } from "../lib/utils";

const Contact = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <main className="relative lg:py-16">
      <Container>
        <div className="justify-between lg:flex">
          <aside className="top-0 z-10 h-full border-r lg:sticky lg:w-1/4">
            <ul>
              {faqLinks.map((link: string, index: number) => (
                <li
                  onClick={() => setPage(index + 1)}
                  key={index}
                  className={`${page === index + 1 ? "bg-yellow-500 text-white" : ""} ${index === faqLinks.length - 1 ? "border-none" : ""} cursor-pointer border-b p-6 font-semibold`}
                >
                  {link}
                </li>
              ))}
            </ul>
          </aside>
          <article className="lg:w-3/4 lg:px-8">
            {page === 1 && <My />}
            {page == 2 && <Regulamin />}
            {page == 3 && <PolitykaPrywatnosci />}
            {page == 4 && <Kontakt />}
            {page == 5 && <InformacjePrawne />}
            {page == 6 && <ProjektyUnijne />}
            {page == 7 && <Bezpieczenstwo />}
          </article>
        </div>
      </Container>
    </main>
  );
};

const My = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">O NAS</h2>
      <div>
        <h3 className="mb-4 font-semibold">1. Wstęp</h3>
        <p>
          1.1. Witamy na stronie Przykładowej Firmy! Jesteśmy dynamicznie
          rozwijającą się organizacją, która stawia na innowacyjność, jakość i
          satysfakcję naszych klientów.
        </p>
        <p>
          1.2. Nasza misja to dostarczanie najwyższej jakości produktów i usług,
          które wspierają naszych klientów w osiąganiu ich celów. Dążymy do
          ciągłego rozwoju i wprowadzania nowoczesnych rozwiązań, które
          odpowiadają na potrzeby współczesnego rynku.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">2. Nasza misja</h3>
        <p>
          Naszym celem jest dostarczanie rozwiązań, które zmieniają rynek.
          Chcemy oferować produkty, które mają realny wpływ na życie naszych
          klientów i partnerów.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">3. Nasze wartości</h3>
        <ul>
          <li>
            <strong>Innowacyjność:</strong> Stawiamy na nowoczesne technologie,
            które zmieniają rynek.
          </li>
          <li>
            <strong>Jakość:</strong> Dbamy o najwyższą jakość naszych produktów
            i usług.
          </li>
          <li>
            <strong>Zaangażowanie:</strong> Angażujemy się w każdy projekt,
            traktując go z pasją i odpowiedzialnością.
          </li>
          <li>
            <strong>Szacunek:</strong> Wspieramy otwartą komunikację i
            współpracę z naszymi klientami oraz partnerami biznesowymi.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">4. Historia firmy</h3>
        <p>
          Przykładowa Firma została założona w 2010 roku przez grupę pasjonatów
          z różnych branż. Od samego początku naszą filozofią była chęć
          tworzenia produktów, które mają realny wpływ na życie naszych
          klientów.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">5. Dlaczego warto nas wybrać?</h3>
        <p>Oferujemy:</p>
        <ul>
          <li>Profesjonalne doradztwo i wsparcie.</li>
          <li>Produkty dopasowane do indywidualnych potrzeb.</li>
          <li>Gwarancję satysfakcji i wszechstronną pomoc po zakupie.</li>
          <li>Bezpieczeństwo i niezawodność naszych usług.</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">6. Kontakt z nami</h3>
        <p>
          Jeśli masz pytania lub chcesz dowiedzieć się więcej o naszej ofercie,
          skontaktuj się z nami poprzez formularz kontaktowy lub bezpośrednio
          pod adresem e-mail:
          <a
            href="mailto:kontakt@przykladowafirma.pl"
            className="text-byellow-500 hover:underline"
          >
            booking@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

const Regulamin = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">
        REGULAMIN APLIKACJI BOOKING DLA KLIENTÓW
      </h2>
      <div>
        <h3 className="mb-4 font-semibold">1. Wstęp </h3>
        <p>
          1.1. Witryna internetowa "Booking" jest udostępniana przez Przykładową
          Firmę, z siedzibą w Przykładowym Mieście, ul. Przykładowa 1.
          Korzystanie ze Strony jest równoznaczne z akceptacją niniejszego
          regulaminu.
        </p>
        <p>
          1.2. Regulamin ten określa zasady korzystania z usług świadczonych
          przez Stronę, w tym dostęp do treści, korzystanie z formularzy,
          zamówień, subskrypcji newslettera oraz innych funkcji dostępnych na
          Stronie.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">
          2. Rejestracja i konto użytkownika
        </h3>
        <p>
          2.1. Aby korzystać z pełnej funkcjonalności Strony, użytkownik może
          zostać poproszony o założenie konta. Rejestracja jest dobrowolna, ale
          konieczna do korzystania z niektórych usług Strony.
        </p>
        <p>
          2.2. Użytkownik zobowiązuje się do podania prawdziwych i kompletnych
          informacji w formularzu rejestracyjnym oraz do ich aktualizacji, jeśli
          zajdzie taka potrzeba.
        </p>
        <p>
          2.3. Użytkownik odpowiada za bezpieczeństwo swojego hasła i
          zobowiązuje się do nieudostępniania go osobom trzecim.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">
          3. Korzystanie z treści i materiałów na Stronie{" "}
        </h3>
        <p>
          3.1. Wszystkie treści dostępne na Stronie, w tym teksty, grafiki,
          zdjęcia, filmy, logotypy, są własnością Przykładowej Firmy lub jej
          partnerów i są chronione prawami autorskimi.
        </p>
        <p>
          3.2. Użytkownik ma prawo do korzystania z treści wyłącznie w ramach
          osobistego, niekomercyjnego użytku. Jakiekolwiek inne wykorzystanie
          treści wymaga zgody właściciela Strony.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold"> 4. Odpowiedzialność</h3>
        <p>
          4.1. Strona jest dostępna "tak jak jest", a Przykładowa Firma nie
          ponosi odpowiedzialności za ewentualne błędy, awarie, utratę danych
          lub przerwy w dostępności usługi.
        </p>
        <p>
          4.2. Użytkownik ponosi odpowiedzialność za wszelkie działania podjęte
          w ramach swojego konta, w tym za publikowanie treści oraz dokonywanie
          zakupów.
        </p>
        <p>
          4.3. Przykładowa Firma nie odpowiada za treści publikowane przez
          użytkowników w ramach komentarzy, opinii czy innych interakcji na
          Stronie.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">5. Polityka prywatności </h3>
        <p>
          5.1. Przykładowa Firma zobowiązuje się do ochrony prywatności
          użytkowników Strony. Szczegóły dotyczące przetwarzania danych
          osobowych zawarte są w Polityce Prywatności, która stanowi integralną
          część niniejszego regulaminu.
        </p>
        <p>
          5.2. Użytkownik ma prawo do dostępu do swoich danych osobowych oraz do
          ich poprawiania lub usunięcia, zgodnie z obowiązującymi przepisami
          prawa.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">6. Zmiany w regulaminie </h3>
        <p>
          6.1. Przykładowa Firma zastrzega sobie prawo do zmiany niniejszego
          regulaminu w dowolnym czasie. Zmiany wchodzą w życie w momencie ich
          opublikowania na Stronie.
        </p>
        <p>
          6.2. Użytkownicy zostaną poinformowani o zmianach regulaminu poprzez
          stosowną informację na Stronie lub za pośrednictwem e-maila, jeśli
          posiadają zarejestrowane konto.
        </p>
      </div>
      <div>
        <h3 className="mb-4 font-semibold">7. Postanowienia końcowe</h3>
        <p>
          7.1. Regulamin obowiązuje od dnia jego publikacji na Stronie.
          Korzystając z Strony, użytkownik potwierdza, że zapoznał się z treścią
          regulaminu i akceptuje jego warunki.
        </p>
        <p>
          7.2. Wszelkie spory związane z korzystaniem z Strony będą rozstrzygane
          przez sąd właściwy dla siedziby Przykładowej Firmy.
        </p>
        <p>
          7.3. Regulamin dostępny jest na Stronie w każdej chwili. Kontakt: W
          razie pytań lub wątpliwości prosimy o kontakt na adres e-mail:
          booking@gmail.pl. Pamiętaj, że powyższy regulamin jest przykładowy i
          ma charakter fikcyjny. Jeśli tworzysz rzeczywistą stronę internetową,
          zawsze warto skonsultować regulamin z prawnikiem, aby był zgodny z
          obowiązującymi przepisami prawa i odpowiednio chronił Twoje interesy.
        </p>
      </div>
    </section>
  );
};

const PolitykaPrywatnosci = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">Polityka Prywatności</h2>

      <div>
        <h3 className="mb-4 font-semibold">1. Wstęp</h3>
        <p>
          1.1. Niniejsza Polityka Prywatności określa zasady przetwarzania i
          ochrony danych osobowych użytkowników naszej strony internetowej oraz
          aplikacji ("Strona").
        </p>
        <p>
          1.2. Przykładowa Firma, z siedzibą w Przykładowym Mieście, ul.
          Przykładowa 1, jest administratorem danych osobowych użytkowników
          Strony.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">2. Rodzaje zbieranych danych</h3>
        <p>
          2.1. Podczas korzystania ze Strony możemy zbierać dane osobowe, takie
          jak:
        </p>
        <ul>
          <li>Imię i nazwisko</li>
          <li>Adres e-mail</li>
          <li>Numer telefonu</li>
          <li>
            Adres IP oraz dane dotyczące aktywności użytkownika na Stronie (np.
            cookies)
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">3. Cele przetwarzania danych</h3>
        <p>3.1. Zebrane dane osobowe będą wykorzystywane w celu:</p>
        <ul>
          <li>
            Świadczenia usług dostępnych na Stronie, takich jak rejestracja
            konta, zamówienia, subskrypcje itp.
          </li>
          <li>
            Komunikacji z użytkownikami (np. odpowiadanie na zapytania,
            wysyłanie newsletterów)
          </li>
          <li>Analizy zachowań użytkowników w celu poprawy jakości usług</li>
          <li>
            Spełnienia obowiązków prawnych związanych z działalnością Strony
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">4. Udostępnianie danych</h3>
        <p>
          4.1. Przykładowa Firma nie udostępnia danych osobowych użytkowników
          osobom trzecim, chyba że:
        </p>
        <ul>
          <li>
            Jest to niezbędne do realizacji usług (np. przesyłanie zamówionych
            produktów)
          </li>
          <li>Wymaga tego obowiązujące prawo lub decyzja sądu</li>
          <li>Użytkownik wyrazi na to zgodę</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">5. Cookies</h3>
        <p>
          5.1. Strona korzysta z plików cookies w celu zapewnienia prawidłowego
          działania witryny, analizy ruchu oraz personalizacji treści.
        </p>
        <p>
          5.2. Użytkownik może zmienić ustawienia cookies w swojej przeglądarce,
          jednakże niektóre funkcje Strony mogą nie działać poprawnie, jeśli
          cookies zostaną wyłączone.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">6. Bezpieczeństwo danych</h3>
        <p>
          6.1. Przykładowa Firma stosuje odpowiednie środki techniczne i
          organizacyjne w celu ochrony danych osobowych przed nieautoryzowanym
          dostępem, ujawnieniem, zmianą lub zniszczeniem.
        </p>
        <p>
          6.2. Mimo stosowania zabezpieczeń, należy pamiętać, że żadne systemy
          informatyczne nie są w pełni bezpieczne.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">7. Prawa użytkowników</h3>
        <p>7.1. Użytkownicy mają prawo do:</p>
        <ul>
          <li>Dostępu do swoich danych osobowych</li>
          <li>Poprawiania swoich danych osobowych</li>
          <li>Usuwania danych osobowych (w określonych sytuacjach)</li>
          <li>Ograniczenia przetwarzania danych osobowych</li>
          <li>Przenoszenia danych osobowych</li>
          <li>Wniesienia sprzeciwu wobec przetwarzania danych</li>
        </ul>
        <p>
          7.2. Aby skorzystać z powyższych praw, użytkownik może skontaktować
          się z nami, wysyłając odpowiednią prośbę na adres e-mail:
          <a
            href="mailto:kontakt@przykladowafirma.pl"
            className="text-byellow-500 hover:underline"
          >
            kontakt@przykladowafirma.pl
          </a>
          .
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">8. Zmiany w Polityce Prywatności</h3>
        <p>
          8.1. Przykładowa Firma zastrzega sobie prawo do wprowadzenia zmian w
          Polityce Prywatności. Zmiany wchodzą w życie w momencie ich
          opublikowania na Stronie.
        </p>
        <p>
          8.2. Użytkownicy zostaną poinformowani o istotnych zmianach w Polityce
          Prywatności za pośrednictwem Strony lub drogą mailową.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">9. Kontakt</h3>
        <p>
          9.1. W razie jakichkolwiek pytań dotyczących Polityki Prywatności
          prosimy o kontakt na adres e-mail:
          <a
            href="mailto:kontakt@przykladowafirma.pl"
            className="text-byellow-500 hover:underline"
          >
            kontakt@przykladowafirma.pl
          </a>
          .
        </p>
      </div>
    </section>
  );
};

const Kontakt = () => {
  return <section></section>;
};

const InformacjePrawne = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">Informacje Prawne</h2>

      <div>
        <h3 className="mb-4 font-semibold">1. Własność intelektualna</h3>
        <p>
          1.1. Wszystkie treści znajdujące się na stronie internetowej
          "Przykładowa Firma" (w tym teksty, obrazy, logo, grafiki, materiały
          wideo oraz inne elementy) są chronione prawem autorskim. Wszelkie
          prawa do tych treści należą do Przykładowej Firmy lub jej
          licencjodawców.
        </p>
        <p>
          1.2. Użytkownicy mają prawo do korzystania z materiałów dostępnych na
          stronie wyłącznie do celów osobistych i niekomercyjnych. Jakiekolwiek
          inne wykorzystanie tych materiałów wymaga uprzedniej zgody właściciela
          praw autorskich.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">2. Ochrona prywatności</h3>
        <p>
          2.1. Przykładowa Firma szanuje prywatność swoich użytkowników i
          zapewnia, że wszelkie dane osobowe są zbierane zgodnie z
          obowiązującymi przepisami prawa, w tym z RODO (Rozporządzenie o
          Ochronie Danych Osobowych).
        </p>
        <p>
          2.2. Szczegółowe informacje na temat przetwarzania danych osobowych, w
          tym celów zbierania danych, podstaw prawnych i okresu przechowywania
          danych, znajdują się w naszej{" "}
          <a
            href="/polityka-prywatnosci"
            className="text-byellow-500 hover:underline"
          >
            Polityce Prywatności
          </a>
          .
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          3. Ograniczenie odpowiedzialności
        </h3>
        <p>
          3.1. Przykładowa Firma nie ponosi odpowiedzialności za jakiekolwiek
          szkody wynikłe z użytkowania strony internetowej, w tym za utratę
          danych, uszkodzenie urządzeń, czy straty finansowe. Korzystanie z
          usług i treści oferowanych przez stronę odbywa się na własne ryzyko
          użytkownika.
        </p>
        <p>
          3.2. Firma dokłada wszelkich starań, aby zapewnić prawidłowe działanie
          strony, ale nie gwarantuje, że strona będzie dostępna bez przerw ani
          wolna od błędów.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">4. Zmiany w informacji prawnej</h3>
        <p>
          4.1. Przykładowa Firma zastrzega sobie prawo do wprowadzania zmian w
          niniejszych informacjach prawnych. Zmiany wchodzą w życie w momencie
          ich opublikowania na stronie.
        </p>
        <p>
          4.2. Użytkownicy zostaną poinformowani o wszelkich zmianach poprzez
          stosowną informację na stronie lub w inny sposób, jeśli wymagają tego
          przepisy prawa.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          5. Prawo właściwe i rozstrzyganie sporów
        </h3>
        <p>
          5.1. Korzystanie ze strony oraz wszelkie związane z nią kwestie prawne
          regulowane są przez prawo polskie.
        </p>
        <p>
          5.2. W przypadku sporów wynikających z korzystania z usług strony,
          strony zobowiązują się do ich rozstrzygania w drodze negocjacji. Jeśli
          negocjacje nie przyniosą rozwiązania, spór będzie rozstrzygany przez
          sąd właściwy dla siedziby Przykładowej Firmy.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">6. Kontakt</h3>
        <p>
          6.1. W przypadku jakichkolwiek pytań dotyczących powyższych informacji
          prawnych, prosimy o kontakt z nami za pośrednictwem e-maila:{" "}
          <a
            href="mailto:kontakt@przykladowafirma.pl"
            className="text-byellow-500 hover:underline"
          >
            kontakt@przykladowafirma.pl
          </a>
          .
        </p>
      </div>
    </section>
  );
};

const ProjektyUnijne = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">Projekty Unijne</h2>

      <div>
        <h3 className="mb-4 font-semibold">1. Wprowadzenie</h3>
        <p>
          Nasza firma aktywnie bierze udział w różnych projektach finansowanych
          z funduszy unijnych. Projekty te mają na celu wspieranie
          innowacyjności, rozwoju technologicznego oraz zrównoważonego rozwoju.
          Poniżej przedstawiamy szczegóły naszych projektów, w których
          uczestniczymy lub które realizujemy.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          2. Projekt 1: Rozwój nowych technologii
        </h3>
        <p>2.1. Tytuł projektu: "Innowacyjne rozwiązania w branży IT"</p>
        <p>
          2.2. Opis: Projekt ma na celu opracowanie nowych narzędzi i rozwiązań
          w dziedzinie IT, które będą wspierać rozwój cyfryzacji w polskich
          przedsiębiorstwach. Główne cele projektu to rozwój nowych
          oprogramowań, automatyzacja procesów biznesowych i poprawa
          efektywności operacyjnej.
        </p>
        <p>
          2.3. Finansowanie: Projekt jest finansowany przez Europejski Fundusz
          Rozwoju Regionalnego, w ramach Programu Operacyjnego Inteligentny
          Rozwój.
        </p>
        <p>2.4. Czas trwania: 01.01.2023 - 31.12.2024</p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          3. Projekt 2: Zrównoważony rozwój
        </h3>
        <p>3.1. Tytuł projektu: "Eko-Innowacje w przemyśle"</p>
        <p>
          3.2. Opis: Projekt ma na celu opracowanie nowych, ekologicznych
          technologii w przemyśle w celu redukcji emisji CO2 oraz zwiększenia
          efektywności energetycznej. W ramach projektu realizowane będą badania
          nad alternatywnymi źródłami energii i odzyskiem ciepła.
        </p>
        <p>
          3.3. Finansowanie: Projekt jest finansowany przez Fundusz Spójności, w
          ramach Programu Operacyjnego Infrastruktura i Środowisko.
        </p>
        <p>3.4. Czas trwania: 01.06.2022 - 31.05.2025</p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          4. Projekt 3: Edukacja i rozwój kompetencji
        </h3>
        <p>4.1. Tytuł projektu: "Edukacja cyfrowa dla przyszłości"</p>
        <p>
          4.2. Opis: Projekt ma na celu wprowadzenie innowacyjnych metod
          nauczania z wykorzystaniem nowoczesnych technologii, takich jak
          e-learning, sztuczna inteligencja i wirtualna rzeczywistość. Projekt
          skierowany jest do uczniów szkół średnich oraz osób dorosłych, które
          chcą podnieść swoje kwalifikacje zawodowe.
        </p>
        <p>
          4.3. Finansowanie: Projekt jest finansowany przez Europejski Fundusz
          Społeczny, w ramach Programu Operacyjnego Wiedza Edukacja Rozwój.
        </p>
        <p>4.4. Czas trwania: 01.09.2023 - 31.08.2026</p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          5. Korzyści z uczestnictwa w projektach unijnych
        </h3>
        <ul className="list-disc pl-6">
          <li>Wzrost innowacyjności i konkurencyjności firmy.</li>
          <li>Udoskonalenie procesów technologicznych i operacyjnych.</li>
          <li>
            Zwiększenie efektywności energetycznej i redukcja wpływu na
            środowisko.
          </li>
          <li>
            Wzrost kwalifikacji pracowników i rozwój ich kompetencji zawodowych.
          </li>
          <li>Dostęp do unikalnych źródeł finansowania i wsparcia.</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          6. Jak aplikować do projektów unijnych?
        </h3>
        <p>
          Jeśli chcesz dowiedzieć się więcej o możliwościach aplikowania do
          projektów unijnych lub chcesz skorzystać z naszych usług doradczych,
          skontaktuj się z nami. Pomożemy Ci w przygotowaniu dokumentacji
          aplikacyjnej i przeprowadzeniu całego procesu.
        </p>
        <p>
          Skontaktuj się z nami pod adresem e-mail:{" "}
          <a
            href="mailto:projekty@przykladowafirma.pl"
            className="text-byellow-500 hover:underline"
          >
            projekty@przykladowafirma.pl
          </a>
          .
        </p>
      </div>
    </section>
  );
};

const Bezpieczenstwo = () => {
  return (
    <section className="lg:space-y-6">
      <h2 className="mb-8 text-3xl font-bold">Bezpieczeństwo</h2>

      <div>
        <h3 className="mb-4 font-semibold">1. Ochrona danych osobowych</h3>
        <p>
          1.1. Przykładowa Firma dokłada wszelkich starań, aby zapewnić
          bezpieczeństwo danych osobowych swoich użytkowników. Wszystkie dane
          osobowe są przechowywane i przetwarzane zgodnie z obowiązującymi
          przepisami prawa, w tym z Rozporządzeniem o Ochronie Danych Osobowych
          (RODO).
        </p>
        <p>
          1.2. Użytkownicy mają prawo do dostępu do swoich danych osobowych oraz
          ich poprawiania lub usunięcia. Firma stosuje odpowiednie środki
          techniczne i organizacyjne w celu ochrony danych przed nieuprawnionym
          dostępem, utratą, zniszczeniem lub uszkodzeniem.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          2. Bezpieczeństwo transakcji online
        </h3>
        <p>
          2.1. Wszystkie transakcje przeprowadzane na naszej stronie są
          zabezpieczone za pomocą nowoczesnych technologii szyfrowania (SSL).
          Dzięki temu dane osobowe i finansowe użytkowników są chronione podczas
          procesu płatności.
        </p>
        <p>
          2.2. Przykładowa Firma współpracuje wyłącznie z renomowanymi
          operatorami płatności, którzy stosują najwyższe standardy
          bezpieczeństwa, zapewniając pełną ochronę transakcji.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          3. Zabezpieczenia przed cyberzagrożeniami
        </h3>
        <p>
          3.1. Strona internetowa jest regularnie monitorowana pod kątem
          potencjalnych zagrożeń związanych z cyberbezpieczeństwem. Stosujemy
          zaawansowane oprogramowanie ochrony przed atakami typu DDoS, malware i
          innymi zagrożeniami.
        </p>
        <p>
          3.2. Regularnie aktualizujemy oprogramowanie oraz przeprowadzamy
          audyty bezpieczeństwa, aby zapewnić użytkownikom maksymalną ochronę
          przed nieuprawnionym dostępem do ich danych.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          4. Zabezpieczenie konta użytkownika
        </h3>
        <p>
          4.1. Użytkownicy są odpowiedzialni za bezpieczeństwo swojego konta.
          Zalecamy stosowanie silnych haseł oraz regularną ich zmianę. Ponadto,
          dla zwiększenia bezpieczeństwa, użytkownicy mogą skorzystać z opcji
          uwierzytelniania dwuetapowego (2FA), jeśli jest ona dostępna.
        </p>
        <p>
          4.2. W przypadku zauważenia jakiejkolwiek nieautoryzowanej aktywności
          na swoim koncie, użytkownicy powinni natychmiast skontaktować się z
          obsługą klienta.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          5. Środki zapobiegawcze przeciwko oszustwom
        </h3>
        <p>
          5.1. Firma podejmuje wszelkie kroki w celu zapobiegania oszustwom i
          nadużyciom. Wszelkie podejrzane transakcje są natychmiastowo
          analizowane, a podejrzani użytkownicy mogą zostać zablokowani lub ich
          konta zablokowane.
        </p>
        <p>
          5.2. Użytkownicy są również zobowiązani do zgłaszania wszelkich
          podejrzanych działań na stronie, aby pomóc w utrzymaniu bezpieczeństwa
          platformy.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">
          6. Kontakt w sprawach bezpieczeństwa
        </h3>
        <p>
          6.1. W przypadku jakichkolwiek pytań dotyczących bezpieczeństwa lub
          jeśli użytkownik zauważył jakiekolwiek niepokojące działanie, może
          skontaktować się z nami:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Telefon:</strong>{" "}
            <a
              href="tel:+48000000000"
              className="text-byellow-500 hover:underline"
            >
              +48 000 000 000
            </a>
          </li>
          <li>
            <strong>E-mail:</strong>{" "}
            <a
              href="mailto:bezpieczenstwo@przykladowafirma.pl"
              className="text-byellow-500 hover:underline"
            >
              bezpieczenstwo@przykladowafirma.pl
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;

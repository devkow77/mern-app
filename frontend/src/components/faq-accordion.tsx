import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Jak mogę zarezerwować usługę?</AccordionTrigger>
        <AccordionContent>
          Rezerwacja jest prosta! Wystarczy przejść do sekcji „Rezerwacje” na
          naszej stronie, wybrać usługę, termin oraz godzinę, a następnie
          wypełnić krótki formularz rezerwacyjny. Po zatwierdzeniu otrzymasz
          potwierdzenie rezerwacji na e-mail.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Czy mogę anulować lub zmienić termin rezerwacji?
        </AccordionTrigger>
        <AccordionContent>
          Tak, możesz anulować lub zmienić termin rezerwacji. Wystarczy
          skontaktować się z nami telefonicznie lub mailowo co najmniej 24
          godziny przed planowaną usługą, aby uniknąć dodatkowych opłat.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Czy oferujecie zniżki przy rezerwacji większej liczby usług?
        </AccordionTrigger>
        <AccordionContent>
          Tak, oferujemy specjalne zniżki dla klientów, którzy rezerwują kilka
          usług jednocześnie. Skontaktuj się z nami, aby uzyskać więcej
          informacji i indywidualną wycenę.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Czy istnieje możliwość rezerwacji dla grup?
        </AccordionTrigger>
        <AccordionContent>
          Tak, możemy zorganizować usługi dla grup, np. dla firm, szkół czy
          innych zorganizowanych grup. Skontaktuj się z nami z wyprzedzeniem,
          aby omówić szczegóły i uzyskać ofertę specjalnie dopasowaną do Twoich
          potrzeb.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Jakie są dostępne metody płatności?</AccordionTrigger>
        <AccordionContent>
          Akceptujemy płatności kartą, przelewem oraz BLIK. W przypadku
          płatności na miejscu możliwa jest także płatność gotówką.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Czy otrzymam potwierdzenie rezerwacji?
        </AccordionTrigger>
        <AccordionContent>
          Tak, po dokonaniu rezerwacji otrzymasz potwierdzenie na podany adres
          e-mail wraz z wszelkimi szczegółami oraz wytycznymi dotyczącymi
          przygotowania do usługi.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FaqAccordion;

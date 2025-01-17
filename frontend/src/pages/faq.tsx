import { Container, FaqAccordion } from "../components/index";

const Faq = () => {
  return (
    <main className="py-8 md:py-16">
      <Container className="space-y-4 md:space-y-8">
        <h2 className="text-xl font-semibold lg:text-3xl">Faq</h2>
        <p className="text-sm leading-6 lg:text-base lg:leading-8">
          Cieszymy się, że jesteś zainteresowany naszymi usługami! Wiemy, że
          proces rezerwacji może budzić pytania, dlatego przygotowaliśmy
          odpowiedzi na najczęściej zadawane pytania. Jeśli nie znajdziesz tu
          potrzebnych informacji, skontaktuj się z nami – chętnie pomożemy i
          rozwiejemy wszelkie wątpliwości.
        </p>
        <div className="mx-auto aspect-video max-w-md">
          <img src="/faq.png" alt="faq" />
        </div>
        <FaqAccordion />
      </Container>
    </main>
  );
};

export default Faq;

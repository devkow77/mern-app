import { Container, Header } from "../components/index";
import { GraphQLClient } from "graphql-request";
import { Author } from "../lib/utils";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_KEY as string,
);

const query = `
 query getAuthors {
  authors {
    slug
    name
    image {
      url
    }
  }
}
`;

const BlogAuthors = () => {
  return (
    <main>
      <Header />
      <Content />
    </main>
  );
};

const Content = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const getAuthors = async () => {
    const { authors }: { authors: Author[] } = await hygraph.request(query);
    setAuthors(authors);
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <section>
      <Container className="lg:py-12">
        <h2 className="text-2xl font-extrabold lg:mb-8">Autorzy Blogów</h2>
        <div className="grid grid-cols-5 gap-8">
          {authors.map(
            ({ slug, name, image: { url } }: Author, index: number) => (
              <Link to={`/blog/authors/${slug}`} key={index}>
                <div className="relative mb-4 aspect-square rounded-full">
                  <img
                    src={url}
                    alt={`${name} profile`}
                    className="absolute h-full w-full rounded-full object-cover object-center"
                  />
                </div>
                <h2 className="text-center font-bold">{name}</h2>
              </Link>
            ),
          )}
        </div>
      </Container>
    </section>
  );
};

export default BlogAuthors;

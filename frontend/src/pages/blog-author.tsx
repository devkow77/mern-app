import { Header, Container } from "../components/index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import { Link, useParams } from "react-router";
import { GraphQLClient } from "graphql-request";
import { Post } from "../lib/utils";
import { useEffect, useState } from "react";

const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_KEY as string,
);

interface Result {
  posts: Post[];
}

const BlogAuthor = () => {
  return (
    <main>
      <Header />
      <Content />
    </main>
  );
};

const Content = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { slug } = useParams();

  const query: string = `
    query getPosts{
        posts(
        where: { 
        author: { 
          slug: "${slug}" 
        }
      }
    ){
    slug
    title
    image {
      url
    }
    createdAt
    author {
      name
      image {
        url
      }
      description
    }
  }
}
`;

  const getPosts = async () => {
    const { posts }: Result = await hygraph.request(query);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="lg:py-6">
      <Container className="flex flex-col justify-center space-y-8">
        <div className="mx-auto text-center">
          <div className="relative mb-4 aspect-square h-56 w-56 rounded-full lg:h-64 lg:w-64">
            <img
              src={posts[0]?.author.image.url}
              alt={posts[0]?.author.name}
              className="absolute h-full w-full rounded-full object-cover object-center"
            />
          </div>
          <h2 className="font-bold">{posts[0]?.author.name}</h2>
          <h3>Liczba postów: {posts.length}</h3>
        </div>
        <p className="text-sm leading-7 lg:text-base lg:leading-8">
          {posts[0]?.author.description}
        </p>
        <Posts posts={posts} />
      </Container>
    </section>
  );
};

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-xl font-semibold lg:text-3xl">Dodane posty</h2>
      <Carousel>
        <CarouselContent>
          {posts.length > 0 &&
            posts.map(({ slug, title, createdAt, image: { url } }: Post) => (
              <CarouselItem
                key={slug}
                className="relative h-[300px] w-full rounded-xl md:h-[250px] lg:basis-1/3"
              >
                <Link to={`/blog/${slug}`}>
                  <div className="relative h-2/3 w-full rounded-xl rounded-b-none">
                    <img
                      src={url}
                      alt={title}
                      className="absolute h-full w-full rounded-xl rounded-b-none object-cover object-center"
                    />
                  </div>
                  <div className="flex h-1/3 flex-col justify-center rounded-xl rounded-t-none px-4">
                    <h3 className="text-md font-semibold">{title}</h3>
                    <p className="text-sm opacity-80">
                      Data utworzenia:{" "}
                      <span className="font-semibold">
                        {new Date(createdAt).toLocaleDateString("pl-PL", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BlogAuthor;

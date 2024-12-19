import { Header, Container } from "../components/index";
import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { Post } from "../lib/utils";
import { useParams, Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

const hygraph = new GraphQLClient(
  import.meta.env.VITE_HYGRAPH_API_KEY as string,
);

interface Result {
  post: Post;
  posts: Post[];
}

const BlogPost = () => {
  return (
    <main>
      <Header />
      <BlogContent />
    </main>
  );
};

export const BlogContent = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [similiarPosts, setSimiliarPosts] = useState<Post[]>([]);

  const { slug } = useParams();

  const query = `
    query getPosts{
      post(
        where: {slug: "${slug}"}
      ){
        slug,
        image {
          url
        },
        title,
        content {
          html
        }
        createdAt,
        createdBy {
          name
          picture
        }
        author {
          slug
          name
          image {
            url
          }
        }
      }
      posts(
        where: {slug_not: "${slug}"}
      ){
        slug,
        image {
          url
        },
        title,
        createdAt
      }
    }
  `;

  const getPost = async () => {
    const { post, posts: similarPosts }: Result = await hygraph.request(query);
    setPost(post);
    setSimiliarPosts(similarPosts);
  };

  useEffect(() => {
    getPost();
  }, [slug]);

  return (
    <article>
      <Container>
        <PostContent post={post} />
        <SimiliarPosts similiarPosts={similiarPosts} />
      </Container>
    </article>
  );
};

const PostContent = ({ post }: { post: Post | null }) => {
  return (
    <div className="lg:mb-24 lg:flex lg:justify-between">
      <section className="top-[120px] h-full space-y-4 lg:sticky lg:w-2/5">
        <img
          src={post?.image.url}
          alt={post?.title}
          className="relative aspect-video rounded-2xl object-cover object-center"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold">{post?.title}</h2>
          <h3 className="font-semibold">
            Post upublikowano: 📆{" "}
            {new Date(post?.createdAt as string).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h3>
          <Link
            to={`/blog/authors/${post?.author.slug}`}
            className="flex cursor-pointer items-center gap-2 font-semibold underline duration-200 hover:text-sky-500"
          >
            <div className="relative h-9 w-9 rounded-full">
              <img
                src={post?.author.image.url}
                className="object-coverobject-center absolute h-full w-full rounded-full"
                alt={post?.author.name}
              />
            </div>
            {post?.author.name}
          </Link>
        </div>
      </section>
      <section
        className="lg:w-3/5 lg:px-8"
        dangerouslySetInnerHTML={{ __html: post?.content.html as string }}
      />
    </div>
  );
};
const SimiliarPosts = ({ similiarPosts }: { similiarPosts: Post[] }) => {
  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-xl font-semibold lg:text-3xl">Polecane dla Ciebie</h2>
      <Carousel>
        <CarouselContent>
          {similiarPosts.length > 0 &&
            similiarPosts.map(
              ({ slug, title, createdAt, image: { url } }: Post) => (
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
              ),
            )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BlogPost;

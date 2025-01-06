"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useParams } from "react-router";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Nazwa musi zawierać minimum 4 znaki.",
  }),
  address: z.string().min(6, {
    message: "Adres musi zawierać minimum 6 znaków",
  }),
  photos: z.array(z.string()),
  photoslink: z.string(),
  description: z.string().min(30, {
    message: "Opis musi zawierać minimum 30 znaków.",
  }),
  price: z.number(),
});

const ServiceForm = () => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      photos: [],
      photoslink: "",
      description: "",
      price: 10,
    },
  });

  const saveService = async (data: z.infer<typeof formSchema>) => {
    if (id) {
      console.log("UPDATE");
    } else {
      console.log("CREATE");
    }
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveService)} className="lg:space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700"
                  placeholder="Nazwa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700"
                  placeholder="adres"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center gap-2">
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zdjęcia</FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-zinc-700"
                    placeholder="Zdjecia"
                    {...field}
                    type="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoslink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL zdjęć</FormLabel>
                <FormControl>
                  <Input
                    className="dark:bg-zinc-700"
                    placeholder="Wklej adres URL zdjecia"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700"
                  placeholder="Opis"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700"
                  placeholder="Cena"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-green-500 text-white duration-200 hover:bg-green-700 dark:bg-green-500 dark:text-white dark:hover:bg-green-700"
        >
          Zapisz dane
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;

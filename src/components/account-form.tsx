"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import axios from "axios";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Nazwa użytkownika musi mieć co najmniej 5 znaków",
  }),
  email: z.string().refine((email) => isValidEmail(email), {
    message: "E-mail jest niepoprawny!",
  }),
});

const AccountForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/edit`, data);
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nazwa użytkownika"
                  className="dark:bg-neutral-800 dark:placeholder:text-opacity-60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nowyemail@gmail.com"
                  className="dark:bg-neutral-800 dark:placeholder:text-opacity-60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"success"}
          disabled={form.formState.isSubmitting}
        >
          Zapisz zmiany
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;

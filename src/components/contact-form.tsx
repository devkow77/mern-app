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
import { Textarea } from "../components/ui/textarea";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formSchema = z.object({
  email: z.string().refine((email) => isValidEmail(email), {
    message: "Invalid email address",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // const formData = JSON.parse(JSON.stringify(data));
    try {
      console.log("send messgae", data);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="przykladowyemail@gmail.com"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wiadomość</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Napisz wiadomość..."
                  className="resize-none text-sm dark:placeholder:text-opacity-60 lg:text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-500 text-white dark:bg-green-500 dark:text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Wysyłanie..." : "Wyślij"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;

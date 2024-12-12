import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router";

const checkEmailFormSchema = z.object({
  email: z.string().email({
    message: "E-mail jest niepoprawny!",
  }),
});

const loginFormSchema = z.object({
  password: z.string().min(8, {
    message: "Hasło jest za krótkie!",
  }),
});

const createAccountFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nazwa użytkownika jest za krótka!",
    })
    .max(15, {
      message: "Nazwa użytkownika jest za długa!",
    }),
  email: z.string().email({
    message: "E-mail jest niepoprawny!",
  }),
  password: z.string().min(8, {
    message: "Hasło jest za krótkie!",
  }),
  phoneNumber: z
    .string()
    .min(9, {
      message: "Numer telefonu musi zawierać 9 cyfr!",
    })
    .max(9, {
      message: "Numer telefonu musi zawierać 9 cyfr!",
    }),
  role: z.string(),
});

const AuthForm = () => {
  const [state, setState] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <DialogContent>
      {state === 0 && (
        <CheckUserExistForm
          state={state}
          setState={setState}
          setEmail={setEmail}
        />
      )}
      {state === 1 && (
        <LoginForm state={state} setState={setState} email={email} />
      )}
      {state == 2 && (
        <CreateAccountForm state={state} setState={setState} email={email} />
      )}
    </DialogContent>
  );
};

export const CheckUserExistForm = ({
  state,
  setState,
  setEmail,
}: {
  state: number;
  setState: (state: number) => void;
  setEmail: (state: string) => void;
}) => {
  const checkEmailForm = useForm<z.infer<typeof checkEmailFormSchema>>({
    resolver: zodResolver(checkEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const checkEmail = async (values: z.infer<typeof checkEmailFormSchema>) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/check`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status !== 200) {
        console.log(res);
      }

      setState(res.data);
      setEmail(values.email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DialogHeader className="flex flex-col items-center justify-center">
        <DialogTitle className="text-2xl">Zacznij korzystać</DialogTitle>
        <DialogDescription>
          Utwórz konto lub zaloguj się, aby wygodnie rezerwować wizyty.
        </DialogDescription>
      </DialogHeader>
      <Form {...checkEmailForm} key={state}>
        <form
          onSubmit={checkEmailForm.handleSubmit(checkEmail)}
          className="space-y-8"
          name="checkEmail"
        >
          <FormField
            control={checkEmailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700"
            disabled={!checkEmailForm.formState.isValid}
          >
            Dalej
          </Button>
        </form>
      </Form>
    </>
  );
};

export const LoginForm = ({
  state,
  setState,
  email,
}: {
  state: number;
  setState: (state: number) => void;
  email: string;
}) => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const loginUser = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        {
          email,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setState(0);
      navigate("/profile");
    } catch (err) {
      toast({
        title: "Błędne dane!",
        description: "Podane hasło jest niepoprawne.",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  return (
    <>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-2xl">Witamy ponownie</DialogTitle>
          <DialogDescription>
            Wpisz haslo i zaloguj sie jako{" "}
            <span className="font-semibold">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...loginForm} key={state}>
          <form
            onSubmit={loginForm.handleSubmit(loginUser)}
            className="space-y-8"
            name="signIn"
          >
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Haslo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-sky-500 hover:bg-sky-700"
              disabled={!loginForm.formState.isValid}
            >
              Zaloguj się
            </Button>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export const CreateAccountForm = ({
  state,
  setState,
  email,
}: {
  state: number;
  setState: (state: number) => void;
  email: string;
}) => {
  const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      name: "",
      email: email,
      password: "",
      phoneNumber: "",
      role: "USER",
    },
  });

  const { toast } = useToast();

  const createAccount = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/create`,
        {
          email,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast({
        title: "Pomyślnie utworzono nowego użytkownika!",
        description: "Zaloguj się, aby wygodnie rezerwować wizyty.",
        variant: "success",
      });
      createAccountForm.reset();
      setState(1);
    } catch (err) {
      toast({
        title: "Nazwa użytkownika albo numer telefonu",
        description: "Spróbuj ponownie!",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  return (
    <>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-2xl">Utworz konto</DialogTitle>
          <DialogDescription>
            Wpisz email i haslo aby utworzyc konto
          </DialogDescription>
        </DialogHeader>
        <Form {...createAccountForm} key={state}>
          <form
            onSubmit={createAccountForm.handleSubmit(createAccount)}
            className="space-y-8"
            name="createAccount"
          >
            <FormField
              control={createAccountForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createAccountForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nazwa uzytkownika" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createAccountForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Hasło" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createAccountForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Numer telefonu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-sky-500 hover:bg-sky-700"
              disabled={!createAccountForm.formState.isValid}
            >
              Utwórz konto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export default AuthForm;

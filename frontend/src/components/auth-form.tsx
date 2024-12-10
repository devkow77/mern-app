import {
  Dialog,
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

const checkEmailFormSchema = z.object({
  email: z.string().email({
    message: "E-mail jest niepoprawny!",
  }),
});

const signInFormSchema = z.object({
  password: z.string().min(8, {
    message: "Hasło jest za krótkie!",
  }),
});

const createAccountFormSchema = z.object({
  username: z
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
      {state == 2 && <CreateAccountForm state={state} />}
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

  const checkEmail = () => {
    setEmail("kowalsky429@gmail.com");
    setState(1);
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
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const signIn = () => {
    setState(2);
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
        <Form {...signInForm} key={state}>
          <form
            onSubmit={signInForm.handleSubmit(signIn)}
            className="space-y-8"
            name="signIn"
          >
            <FormField
              control={signInForm.control}
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
              onClick={() => console.log(signInForm.getValues())}
              disabled={!signInForm.formState.isValid}
            >
              Zaloguj się
            </Button>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export const CreateAccountForm = ({ state }: { state: number }) => {
  const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const createAccount = () => {};

  return (
    <Dialog>
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
              name="username"
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
    </Dialog>
  );
};

export default AuthForm;

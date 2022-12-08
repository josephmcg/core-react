import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "~/components/controls/Button";
import { Input } from "~/components/controls/Input";
import { Switch } from "~/components/controls/Switch";
import { DefaultLayout } from "~/components/layout/Default";
import { useAuth } from "~/contexts/auth";

const IndexPage = () => {
  const { setAuth } = useAuth();
  const { history } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = () => {
    setAuth(true);
    history.push("/chat");
  };

  return (
    <DefaultLayout>
      <form
        className="w-xs mt-8 flex w-[320px] flex-col space-y-6"
        onSubmit={handleSubmit(handleLogin)}
        method="POST"
      >
        <Input
          label="password"
          error={errors.password}
          type="password"
          showLabel
          autoFocus
          formProps={register("password", {
            validate: {
              message: (v) => {
                if (!v) return "password required";
                if (v.length < 4) return "needs to be 4+ chars";
              },
            },
          })}
        />
        <Switch label="save pin" />
        <Button type="submit">Login</Button>
      </form>
    </DefaultLayout>
  );
};

export { IndexPage };

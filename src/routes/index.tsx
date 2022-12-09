import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/controls/Button";
import { Input } from "~/components/controls/Input";
import { Switch } from "~/components/controls/Switch";
import { DefaultLayout } from "~/components/layout/Default";
import { useAuth } from "~/contexts/auth";

const IndexPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = () => {
    setAuth(true);
    navigate("/chat");
  };

  return (
    <DefaultLayout>
      <form
        className="w-xs flex w-[320px] flex-col gap-6"
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

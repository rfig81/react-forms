import Input from "./Input";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const isEmailValid = (value: string) => isEmail(value) && isNotEmpty(value);
  const isPasswordValid = (value: string) =>
    hasMinLength(value, 6) && isNotEmpty(value);

  const email = useInput("", isEmailValid);
  const password = useInput("", isPasswordValid);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email.value, password.value);

    if (email.hasError || password.hasError) return;

    console.log("Sending HTTP request...");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>State Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          label="email"
          onBlur={email.handleInputBlur}
          onChange={email.handleInputChange}
          value={email.value}
          error={email.hasError && "Please enter a valid email address."}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="password"
          onBlur={password.handleInputBlur}
          onChange={password.handleInputChange}
          value={password.value}
          error={password.hasError && "Please enter a valid password."}
          required
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

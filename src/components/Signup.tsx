import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualsToOtherValue,
  hasMinLength,
} from "../util/validation";

const initialState = {
  errors: null,
  enteredValues: {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "",
    terms: false,
    acquisitionChannel: [] as string[],
  },
};

function signupAction(state: { errors: string[] | null }, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const role = formData.get("role") as string;
  const terms = formData.get("terms") === "on";
  const acquisitionChannel = formData.getAll("acquisition") as string[];

  const enteredValues = {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    role,
    terms,
    acquisitionChannel,
  };

  console.log(enteredValues);

  const errors: string[] = [];

  if (!isEmail(email)) errors.push("Invalid email address.");
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("You must provide a password with at least six characters.");
  }
  if (!isEqualsToOtherValue(password, confirmPassword)) {
    errors.push("Passwords don't match.");
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide both your first and last name.");
  }
  if (!isNotEmpty(role)) errors.push("Please select a role.");
  if (acquisitionChannel.length === 0) {
    errors.push("Please select one acquisition channel.");
  }
  if (!terms) errors.push("You must agree to the terms and conditions.");

  if (errors.length > 0) {
    return { errors, enteredValues };
  }

  return initialState;
}

export default function Signup() {
  const [formState, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
          {/* <div className="control-error">
            {arePasswordsNotEqual && <p>Passwords must match.</p>}
          </div> */}
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((e: string) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

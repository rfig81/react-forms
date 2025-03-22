import { useState } from "react";

type UseInputReturn = {
  value: string;
  state: { isDirty: boolean; isTouched: boolean };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  hasError: boolean;
};

export function useInput(
  defaultValue: string,
  validationFn: (value: string) => boolean
): UseInputReturn {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setIsDirty(true);
    setIsTouched(false);
  }

  function handleInputBlur() {
    setIsTouched(true);
  }

  return {
    value: enteredValue,
    state: { isDirty, isTouched },
    handleInputChange,
    handleInputBlur,
    hasError: isDirty && isTouched && !valueIsValid,
  };
}

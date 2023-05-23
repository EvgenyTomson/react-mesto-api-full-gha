import { useCallback, useState } from "react";

// во все формах, кроме EditProfilePopup defaultFormValidity будет false, а в EditProfilePopup - true
export function useFormWithValidation(defaultFormValidity = false) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  // состояние валидности каждого инпута позволяет подсветить их, согласно макету из ранних работ
  const [inputVilidities, setInputVilidities] = useState({});
  const [isValid, setIsValid] = useState(defaultFormValidity);

  const handleChange = ({target}) => {
    const { name, value, validationMessage, validity, form } = target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage});
    setInputVilidities({...inputVilidities, [name]: validity.valid});
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    // во все формах, кроме EditProfilePopup newIsValid будет false, а в EditProfilePopup - true
    (newIsValid = false, newValues = {}, newErrors = {}, newInputVilidities = {}) => {
      setValues(newValues);
      setErrors(newErrors);
      setInputVilidities(newInputVilidities);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, setInputVilidities]
  );

  return { values, handleChange, errors, isValid, resetForm, inputVilidities };
};

import clsx from "clsx";
import type { Gender } from "../../../types/Gender";
import cl from "./GenderSelector.module.scss";

interface GenderSelectorProps {
  value: Gender | "";
  onChange: (gender: Gender) => void;
  error?: string;
}

const options: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const GenderSelector = ({ value, onChange, error }: GenderSelectorProps) => {
  return (
    <fieldset className={cl.gender}>
      <legend className={cl.gender__label}>Gender*</legend>
      <div className={cl.gender__options}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              cl.gender__option,
              value === option.value && cl.gender__option_selected
            )}
          >
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={cl.gender__error}>{error}</span>}
    </fieldset>
  );
};

export default GenderSelector;
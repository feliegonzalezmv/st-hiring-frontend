import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  checked,
  label,
  onChange,
}) => (
  <FormControlLabel
    control={<Checkbox name={name} checked={checked} onChange={onChange} />}
    label={label}
  />
);

interface FilterRadioOption {
  name: string;
  className: string;
  id: string;
  onKeyDown: (e: any) => void;
  onChange: () => void;
  checked: boolean;
}
const FilterRadioOption = ({
  name,
  className,
  id,
  onKeyDown,
  onChange,
  checked,
}: FilterRadioOption) => {
  return (
    <label
      className={className}
      htmlFor={id}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onKeyDown(e);
        }
      }}
    >
      <input
        id={id}
        name={name}
        type="radio"
        onChange={onChange}
        checked={checked}
      />
      <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
    </label>
  );
};

export default FilterRadioOption;

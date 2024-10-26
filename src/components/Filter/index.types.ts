export interface FilterProps {
  id: string;
  label: string;
  items: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

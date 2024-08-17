export interface FieldListProps {
  title: string;
  description: string;
}

export interface FieldItemProps {
  id: number;
  name: string;
  image: string;
  date?: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
}

export interface SearchbarProps {
  onSearch: (searchField: string) => void;
}

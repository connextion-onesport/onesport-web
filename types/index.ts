declare global {
  interface Window {
    snap: {
      embed: (
        token: string,
        options: {
          embedId: string;
        }
      ) => void;
    };
  }
}

export interface FieldListProps {
  title: string;
  description: string;
}

export interface FieldItemProps {
  id: number;
  name: string;
  image: string;
  date?: string;
  ratingAvg: number;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
  category?: string;
}

export interface SearchbarProps {
  onSearch: (searchField: string) => void;
}

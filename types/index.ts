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

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  venueId: number;
}

export interface FieldItemProps {
  id: number;
  name: string;
  thumbnail: string; 
  ratingAvg: number;
  price_per_hour?: number; 
  is_indoor?: boolean; 
  locations: Location[]; 
  category?: string;
}

// The root structure of the data you're receiving
export interface PagesData {
  data: FieldItemProps[];
}


export interface SearchbarProps {
  onSearch: (searchField: string) => void;
}

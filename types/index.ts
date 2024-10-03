

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

export interface Fields {
  name: string;
}

export interface FieldItemProps {
  id: number;
  name: string;
  images?: Array<{image: string}>;
  openHours: string;
  minPrice: number;
  ratingAvg: number;
  reviewCount: number;
  isIndoor: string;
  location?: {
    subDistrict: string;
    city: string;
  };
  category?: string;
}

// The root structure of the data you're receiving
export interface PagesData {
  data: FieldItemProps[];
}

export interface SearchbarProps {
  onSearch: (searchField: string) => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            nonce: string;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };

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

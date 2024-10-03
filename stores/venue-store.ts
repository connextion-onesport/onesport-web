import {create} from 'zustand';

export type VenueState = {
  showImages: boolean;
  showDetails: boolean;
  dayOfWeek: number;
  bookingDate: Date;
  currentSection: string | null;
};

export type VenueActions = {
  setShowImages: (showImages: boolean) => void;
  setShowDetails: (showDetails: boolean) => void;
  setDayOfWeek: (dayOfWeek: number) => void;
  setBookingDate: (bookingDate: Date) => void;
  scrollToSection: (id: string) => void;
};

export type VenueStore = VenueState & VenueActions;

export const defaultInitState: VenueState = {
  showImages: false,
  showDetails: false,
  dayOfWeek: 0,
  bookingDate: new Date(),
  currentSection: null,
};

export const createVenueStore = (initState: VenueState = defaultInitState) => {
  return create<VenueStore>()(set => ({
    ...initState,
    setShowImages: showImages => set(() => ({showImages})),
    setShowDetails: showDetails => set(() => ({showDetails})),
    setDayOfWeek: dayOfWeek => set(() => ({dayOfWeek})),
    setBookingDate: bookingDate => set(() => ({bookingDate})),
    scrollToSection: (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        window.scrollBy(0, -72);

        set(() => ({currentSection: id}));
      }
    },
  }));
};

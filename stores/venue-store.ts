import {create} from 'zustand';

export type VenueState = {
  categoryBooking: string;
  categoryNearby: string;
  categoryRating: string;
  categoryAll: string;
  showImages: boolean;
  showDetails: boolean;
  dayOfWeek: number;
  bookingDate: Date;
  currentSection: string | null;
};

export type VenueActions = {
  setCategoryBooking: (categoryBooking: string) => void;
  setCategoryNearby: (categoryNearby: string) => void;
  setCategoryRating: (categoryRating: string) => void;
  setCategoryAll: (categoryAll: string) => void;
  setShowImages: (showImages: boolean) => void;
  setShowDetails: (showDetails: boolean) => void;
  setDayOfWeek: (dayOfWeek: number) => void;
  setBookingDate: (bookingDate: Date) => void;
  scrollToSection: (id: string) => void;
};

export type VenueStore = VenueState & VenueActions;

export const defaultInitState: VenueState = {
  categoryBooking: 'Semua',
  categoryNearby: 'Futsal',
  categoryRating: 'Futsal',
  categoryAll: 'Futsal',
  showImages: false,
  showDetails: false,
  dayOfWeek: 0,
  bookingDate: new Date(),
  currentSection: null,
};

export const createVenueStore = (initState: VenueState = defaultInitState) => {
  return create<VenueStore>()(set => ({
    ...initState,
    setCategoryBooking: categoryBooking => set(() => ({categoryBooking})),
    setCategoryNearby: categoryNearby => set(() => ({categoryNearby})),
    setCategoryRating: categoryRating => set(() => ({categoryRating})),
    setCategoryAll: categoryAll => set(() => ({categoryAll})),
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

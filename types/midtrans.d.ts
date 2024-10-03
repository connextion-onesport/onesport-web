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

export {};
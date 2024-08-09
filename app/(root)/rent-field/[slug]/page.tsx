export default function BookingPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col p-4 sm:p-8">
      <div className="rounded-lg border p-2">
        <h1 className="text-3xl font-bold">Gelora Bung Karno</h1>
        <div className="flex gap-2">
          <p className="w-fit rounded-full bg-[#65558F] px-2 text-lg font-semibold text-white">
            4.8km
          </p>
          <p className="text-lg font-semibold text-muted-foreground">
            Kuningan, Jakarta Barat
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Open 04.00 - 20.00</p>
        <p className="w-fit rounded-full bg-muted p-1 px-2 text-sm text-muted-foreground">
          Soccer
        </p>
      </div>
    </div>
  );
}

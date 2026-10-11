import DotsRing from "@/app/components/DotsRing";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 dark:from-slate-950 dark:to-indigo-950">
      <div className="flex flex-col items-center gap-4">
        <DotsRing />
        <p className="text-sm font-medium text-white">
          Loading weather data...
        </p>
      </div>
    </main>
  );
}

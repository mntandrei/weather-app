'use client';

import SearchInput from "./components/SearchInput";
import SearchButton from "./components/SearchButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSearch(e: React.BaseSyntheticEvent) {
    e.preventDefault(); 

    const formData = new FormData(e.currentTarget);
    const rawCity = formData.get("city") as string;

    if (!rawCity || rawCity.trim() === "") return;

    const cleanCity = rawCity.trim();
    const safeCityURL = encodeURIComponent(cleanCity);
    router.push(`/weather/${safeCityURL}`);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center bg-white/5 border border-white/20 rounded-3xl p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white hover:scale-102 transition">Weather App ⛅</h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-3 items-center justify-center w-full max-w-sm">
          <SearchInput />
          <SearchButton />
        </form> 
      </div>
    </main>
  );
}

import InputDeCautare from "./coponente/InputDeCautare";
import ButonDeCautare from "./coponente/ButonDeCautare";
import {redirect} from "next/navigation";

export default function Home() {

  async function handleCautare(formData: FormData) {
    'use server';
    const oras = formData.get("oras");

    if (!oras || typeof oras !== "string") {
      redirect('/');
      return;
    }

    redirect(`/vreme/${oras}`);
}

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center bg-white/5 border border-white/20 rounded-3xl p-10 shadow-2xl backdrop-blur-md">
      <h1 className="text-4xl font-bold text-white hover:scale-102 transition">Weather App ⛅</h1>
      <form action={handleCautare} className="flex flex-col gap-3 items-center justify-center w-full max-w-sm">
        <InputDeCautare />
        <ButonDeCautare />
      </form> 
      </div>
    </main>
  )
};
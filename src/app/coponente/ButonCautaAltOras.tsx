import {redirect} from "next/navigation";

export default function ButonCautaAltOras() {
    async function handleInapoi() {
    'use server';
    redirect('/');
}
  return (
    <form action={handleInapoi}>
        <button
        type="submit" 
        className="min-w-full p-2 px-6 w-full rounded-2xl border-2 border-indigo-400 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold transition cursor-pointer hover:scale-105 transition"
        >
        Caută alt oraș
        </button>
    </form>
  );
}

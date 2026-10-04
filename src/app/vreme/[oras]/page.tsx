import VremeaInstanta from "@/app/coponente/VremeaInstanta";
import Vremea5zile from "@/app/coponente/Vremea5zile";
import ButonCautaAltOras from "@/app/coponente/ButonCautaAltOras";
import { Suspense } from "react";
import DotsRing from "@/app/coponente/DotsRing";

type ParamsProp = {
    params: Promise<{oras: string}>;
};

export default async function PaginaMeteo({params}: ParamsProp) {
    
    const { oras } = await params;

    const orasCurat = decodeURIComponent(oras).trim();
    const apiLinkInstant = `https://api.openweathermap.org/data/2.5/weather?q=${orasCurat}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ro`;
    const resInstant = await fetch(apiLinkInstant);
    const dateVreme = await resInstant.json();

    console.log("=== REZULTAT API ===");
    console.log("Status HTTP:", resInstant.status);
    console.log("Ce zice OpenWeather:", dateVreme);
    console.log("===================="); 

    const apiLink5zile = `https://api.openweathermap.org/data/2.5/forecast?q=${orasCurat}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ro`;
    const res5zile = await fetch(apiLink5zile);
    const dateVreme5zile = await res5zile.json();

    console.log("=== REZULTAT API ===");
    console.log("Status HTTP:", res5zile.status);
    console.log("Ce zice OpenWeather:", dateVreme5zile);
    console.log("====================");    

    const prognozaLaPranz = dateVreme5zile.list.filter((item: any) => 
        item.dt_txt.includes("12:00:00")
    );

    const ZileTrige = prognozaLaPranz.map((item: any) => {
        const dataObiect = new Date(item.dt * 1000);

        return {
            zi: dataObiect.toLocaleDateString("ro-RO", { weekday: "short" }),
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
        };
    });
    if (!resInstant.ok || dateVreme.cod === "404") {
        throw new Error("Orasul nu a fost gasit"); 
    }
    
    return (
        <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 p-4">
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/20 rounded-3xl p-5 shadow-2xl backdrop-blur-md gap-3 w-full max-w-md text-white">
                <h1 className="text-4xl font-black text-white drop-shadow-sm mb-4 hover:scale-105 transition">Vremea</h1>
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-6 gap-2">
                        <DotsRing />
                        <p className="text-xs text-indigo-300 animate-pulse">Se încarcă datele live...</p>
                    </div>
                }>
                    <VremeaInstanta date={dateVreme}/>
                </Suspense>
                <Suspense fallback={
                     <div className="flex flex-col items-center justify-center py-6 gap-2">
                        <DotsRing />
                        <p className="text-xs text-indigo-300 animate-pulse">Se încarcă datele live...</p>
                    </div>
                }>
                    <Vremea5zile datePrognoza={ZileTrige} />
                </Suspense>
                
                <ButonCautaAltOras />
            </div>
        </main>
    );
}

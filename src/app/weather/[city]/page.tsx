import WeatherInstant from "@/app/components/WeatherInstant";
import Weather5Days from "@/app/components/Weather5Days";
import ButtonSearchAnotherCity from "@/app/components/ButtonSearchAnotherCity";
import { Suspense } from "react";
import DotsRing from "@/app/components/DotsRing";

type ParamsProp = {
    params: Promise<{ city: string }>;
};

export default async function WeatherPage({ params }: ParamsProp) {  
    const { city } = await params;
    const cleanCity = decodeURIComponent(city).trim();
    
    const currentApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=en`;
    const resInstant = await fetch(currentApiLink, { next: { revalidate: 900 } });
    const meteoData = await resInstant.json();

    console.log("=== API RESULT ===");
    console.log("HTTP Status:", resInstant.status);
    console.log("What OpenWeather says:", meteoData);
    console.log("===================="); 

    const forecastApiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${cleanCity}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=en`;
    const res5days = await fetch(forecastApiLink, { next: { revalidate: 900 } });
    const meteoData5days = await res5days.json();

    console.log("=== API RESULT ===");
    console.log("HTTP Status:", res5days.status);
    console.log("What OpenWeather says:", meteoData5days);
    console.log("====================");    

    const forecastmiddle = meteoData5days.list.filter((item: any) => 
        item.dt_txt.includes("12:00:00")
    );

    const formattedDays = forecastmiddle.map((item: any) => {
        const dateObject = new Date(item.dt * 1000);

        return {
            day: dateObject.toLocaleDateString("en-US", { weekday: "short" }), 
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
        };
    });

    if (!resInstant.ok || meteoData.cod === "404") {
        throw new Error("City not found"); 
    }
    
    return (
        <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 p-4">
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/20 rounded-3xl p-5 shadow-2xl backdrop-blur-md gap-3 w-full max-w-md text-white">
                <h1 className="text-4xl font-black text-white drop-shadow-sm mb-4 hover:scale-105 transition">Weather</h1>
                
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-6 gap-2">
                        <DotsRing />
                        <p className="text-xs text-indigo-300 animate-pulse">Loading live data...</p>
                    </div>
                }>
                    <WeatherInstant data={meteoData}/>
                </Suspense>
                
                <Suspense fallback={
                     <div className="flex flex-col items-center justify-center py-6 gap-2">
                        <DotsRing />
                        <p className="text-xs text-indigo-300 animate-pulse">Loading live data...</p>
                    </div>
                }>
                    <Weather5Days forecastData={formattedDays} />
                </Suspense>
                
                <ButtonSearchAnotherCity />
            </div>
        </main>
    );
}

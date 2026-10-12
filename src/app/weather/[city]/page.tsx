import WeatherInstant from "@/app/components/WeatherInstant";
import Weather5Days from "@/app/components/Weather5Days";
import ButtonSearchAnotherCity from "@/app/components/ButtonSearchAnotherCity";
import ThemeToggle from "@/app/components/ThemeToggle";
import DotsRing from "@/app/components/DotsRing";
import { Suspense, type ComponentProps } from "react";

type ParamsProp = {
  params: Promise<{ city: string }>;
};

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
};

type ForecastResponse = {
  list: ForecastItem[];
};

async function WeatherContent({ city }: { city: string }) {
  const currentApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=en`;
  const forecastApiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=en`;

  const [resInstant, res5days] = await Promise.all([ 
    fetch(currentApiLink, {
      next: { revalidate: 900 },
    }),
    fetch(forecastApiLink, {
      next: { revalidate: 900 },
    }).catch(() => null),
  ]);

  console.log("City received:", city);
  console.log("Weather API status:", resInstant.status);

  if (!resInstant.ok) {
    return (
      <p role="alert" className="text-center text-sm text-white">
        {resInstant.status === 404
          ? "City not found. Please try another city."
          : "Current weather is temporarily unavailable."}
      </p>
    );
  }

  const weatherData = (await resInstant.json()) as ComponentProps<
    typeof WeatherInstant
  >["data"];

  const forecastData: ForecastResponse | null = res5days?.ok
    ? ((await res5days.json().catch(() => null)) as ForecastResponse | null)
    : null;

  const forecastList: ForecastItem[] = Array.isArray(forecastData?.list)
    ? forecastData.list
    : [];

  const forecastMiddle = forecastList.filter(
    (item) =>
      typeof item?.dt === "number" &&
      typeof item?.dt_txt === "string" &&
      typeof item?.main?.temp === "number" &&
      typeof item?.weather?.[0]?.icon === "string" &&
      item.dt_txt.includes("12:00:00")
  );

  const formattedDays = forecastMiddle.map((item) => {
    const dateObject = new Date(item.dt * 1000);

    return {
      day: dateObject.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    };
  });

  const hasForecast = formattedDays.length > 0;

  return (
    <>
      <WeatherInstant data={weatherData} />

      {hasForecast ? (
        <Weather5Days forecastData={formattedDays} />
      ) : (
        <p className="mb-10 text-center text-sm text-indigo-200">
          Forecast temporarily unavailable
        </p>
      )}
    </>
  );
}

export default async function WeatherPage({ params }: ParamsProp) {
  const { city } = await params;
  const cleanCity = city.trim();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-slate-200 to-indigo-500 p-4 transition-colors duration-500 dark:from-slate-950 dark:to-indigo-950">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-3xl border border-white/20 bg-white/5 p-5 text-white shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/30">
        <h1 className="mb-4 text-4xl font-black text-white drop-shadow-sm transition hover:scale-105">
          Weather
        </h1>
        <Suspense
          fallback={
            <div
              role="status"
              className="flex flex-col items-center justify-center gap-3 py-6"
            >
              <DotsRing />
              <p className="animate-pulse text-xs text-indigo-200">
                Loading weather data...
              </p>
            </div>
          }
        >
          <WeatherContent city={cleanCity} />
        </Suspense>
        <ButtonSearchAnotherCity />
      </div>
    </main>
  );
}

type WeatherInstantProps = {
  data: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      icon: string; 
    }[]; 
  };
};


export default function CurrentWeather({ data }: WeatherInstantProps) {
  if (!data) return <p className="text-white">No data available.</p>;

  return (
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/20 w-full max-w-sm backdrop-blur-md shadow-2xl mb-2">
            <div className="text-center mb-6 w-full flex flex-col items-center">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest hover:scale-120 transition">
                    Now in {data?.name || "Unknown City"}
                </p>
                <div className="w-4/5 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-3 select-none"/>
                <div className="mt-4 bg-white/10 px-6 py-2 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm mb-1 hover:scale-106 transition flex items-center gap-3 justify-center select-none">
                  <p className="text-7xl font-black text-white drop-shadow-sm tracking-tighter">
                    {Math.round(data?.main?.temp ?? 0)}°C
                  </p>
                  {data?.weather?.[0]?.icon && (
                    <img 
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                      alt={data?.weather?.[0]?.description || "weather"} 
                      className="w-16 h-16 drop-shadow-md select-none text-white" 
                    />
                  )}
                </div>
                <p className="text-sm font-bold text-white mt-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-sm backdrop-blur-sm hover:scale-115 transition">
                    Feels like <span className="text-white font-extrabold ">{Math.round(data?.main?.feels_like ?? 0)}°C</span>
                </p>
            </div>
            <div className="w-4/5 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent select-none" />
            <div className="flex gap-4 items-center justify-center text-white/90 text-xs font-medium pt-4 w-full hover:scale-102 transition">
                <p className="font-bold text-white">
                    {data?.weather?.[0]?.description
                    ? data.weather[0].description.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    : "Weather Unavailable"}
                </p>
                <span className="text-white/50">•</span> 
                <p>Humidity: <span className="font-bold text-white">{data?.main?.humidity || 0}%</span></p>
                <span className="text-white/50">•</span>
                <p>Wind: <span className="font-bold text-white">{Math.round((data?.wind?.speed || 0) * 3.6)} km/h</span></p>
            </div>
        </div>
    );
}

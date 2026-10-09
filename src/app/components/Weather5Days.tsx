type Weather5DaysProps = {
    forecastData: {
        day: string;
        temp: number;
        icon: string;
    }[]
}

export default function Weather5Days({forecastData}: Weather5DaysProps) {
    if (!forecastData || forecastData.length === 0) {
        return <p className="text-white">No data available.</p>;
    }
    
    return (
        <div className="p-5 bg-white/10 rounded-2xl border border-white/30 w-full max-w-sm backdrop-blur-md shadow-2xl flex flex-col items-center">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest text-center select-none hover:scale-115 transition">
                Next 5 days forecast
            </p>
            <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent mt-3 mb-4 select-none" />
            <div className="flex gap-2 justify-between items-center w-full">
                {forecastData.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer"
                    >
                        <span className="text-[10px] text-white font-black uppercase tracking-wider select-none capitalize">
                            {item.day}
                        </span>
                        <img 
                            src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                            alt="weather" 
                            className="w-8 h-8 select-none my-0.5"
                        />
                        <span className="text-sm font-black text-white mt-0.5 select-none">
                            {item.temp}°
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

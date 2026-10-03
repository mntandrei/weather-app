export default async function Vremea5zile({oras}: {oras: string}) {
    return (
        <div className="p-5 bg-white/10 rounded-2xl border border-white/30 w-full max-w-sm backdrop-blur-md shadow-2xl flex flex-col items-center">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest text-center select-none hover:scale-115 transition">
                Prognoză următoarele 5 zile
            </p>
            <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-3 mb-4 select-none" />
            <div className="flex gap-2 justify-between items-center w-full">
                
                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer">
                    <span className="text-[10px] font-black text-indigo-200 uppercase text-white">Lun</span>
                    <span className="text-sm font-medium mt-1 select-none">🌤️</span> {/* Aici va veni pictograma */}
                    <span className="text-sm font-black text-white mt-1">25°</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer">
                    <span className="text-[10px] font-black text-indigo-200 uppercase text-white">Mar</span>
                    <span className="text-sm font-medium mt-1 select-none">🌧️</span>
                    <span className="text-sm font-black text-white mt-1">22°</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer">
                    <span className="text-[10px] font-black text-indigo-200 uppercase text-white">Mie</span>
                    <span className="text-sm font-medium mt-1 select-none">☀️</span>
                    <span className="text-sm font-black text-white mt-1">26°</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer">
                    <span className="text-[10px] font-black text-indigo-200 uppercase text-white">Joi</span>
                    <span className="text-sm font-medium mt-1 select-none">☁️</span>
                    <span className="text-sm font-black text-white mt-1">20°</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-14 h-20 p-2 shadow-lg backdrop-blur-sm transition hover:scale-115 cursor-pointer">
                    <span className="text-[10px] font-black text-indigo-200 uppercase text-white">Vin</span>
                    <span className="text-sm font-medium mt-1 select-none">🌙</span>
                    <span className="text-sm font-black text-white mt-1">19°</span>
                </div>

            </div>
        </div>
    );
}
export default function SearchInput() {
    return (
        <input
            name="city"
            type="text"
            placeholder="Search for a city"
            autoComplete="off"
            className="min-w-full p-2 rounded-2xl border-1 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-slate-300 text-white bg-transparent placeholder:text-gray-600 focus:placeholder:text-gray-500 transition ease-in-out duration-300 hover:scale-105 transition"
        ></input>
    )
}
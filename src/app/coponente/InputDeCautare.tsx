export default function InputDeCautare() {
    return (
        <div>
        <input
            name="oras"
            type="text"
            placeholder="Introduceti orasul"
            autoComplete="off"
            className="min-w-full p-2 rounded-2xl border-1 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-slate-300 text-white bg-transparent placeholder:text-gray-600 focus:placeholder:text-gray-500 transition ease-in-out duration-300 hover:scale-105 transition"
        ></input>
        </div>
    )
}
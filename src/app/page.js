"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await res.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };
    fetchMakes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  return (
    <section className="flex flex-col items-center justify-center h-dvh">
      <div className="p-4 max-w-lg flex flex-col gap-5">
        <h1 className="text-5xl font-bold text-center text-black">
          Car Dealer App<span className="text-orange-500">.</span>
        </h1>
        <div className="mt-4 flex flex-col gap-2">
          <select
            id="make"
            className="p-3 w-full bg-black outline-none rounded-md hover:cursor-pointer text-neutral-500 font-medium"
            value={selectedMakeId}
            onChange={(e) => setSelectedMakeId(e.target.value)}
          >
            <option value="">Select a Make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <select
            id="year"
            className="p-3 w-full bg-black outline-none rounded-md hover:cursor-pointer text-neutral-500 font-medium"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Link
          className="mt-4 px-4 py-2 bg-[#ff5d00] text-lg font-semibold text-white disabled:bg-[#ff5e0020] text-center rounded-md hover:cursor-pointer hover:bg-white hover:text-[#ff5d00] hover:border-solid border-2 border-[#ff5d00] transition-all" 
          disabled={!selectedMakeId || !selectedYear}
          href={`/result/${selectedMakeId}/${selectedYear}`}
        >
          Next
        </Link>
      </div>
    </section>
  );
}

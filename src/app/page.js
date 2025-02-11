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
        console.log(data);
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
            {makes.map((make, i) => (
              <option key={i} value={make.MakeId}>
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
          className={`py-2 bg-[#ff5d00] text-lg font-semibold text-center rounded-md hover:cursor-pointer hover:bg-white hover:text-[#ff5d00] hover:border-solid border-2 border-[#ff5d00] transition-all text-white ${
            !selectedMakeId || !selectedYear
              ? "opacity-50 cursor-not-allowed border-[#ff5d00] text-[#ff5d00] hover:border-solid hover:bg-[#ff5d00] hover:text-white" 
              : ""
          }`}
          href={
            selectedMakeId && selectedYear
              ? `/result/${selectedMakeId}/${selectedYear}`
              : "#"
          }
          onClick={(e) => {
            if (!selectedMakeId || !selectedYear) {
              e.preventDefault(); // Prevenimos el clic si no hay valores seleccionados
            }
          }}
        >
          Next
        </Link>
      </div>
    </section>
  );
}

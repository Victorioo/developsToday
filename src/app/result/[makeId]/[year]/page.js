import { Suspense } from "react";
import Link from 'next/link'
async function fetchModels(makeId, year) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }
  const data = await res.json();
  return data.Results;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;
  const models = await fetchModels(makeId, year);

  return (
    <section className="flex items-center justify-center w-full h-dvh">
      <Link href={'/'} className="absolute top-10 left-10">{'<'} Go Back</Link>
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold">
          Models for Make <span className="text-[#ff5d00]">ID {makeId}</span> in <span className="text-[#ff5d00]">Year {year}</span>
        </h1>
        <ul className="w-full">
          {models.map((model) => (
            <li key={model.Model_ID} className="p-2 my-2 text-lg font-medium">
              - {model.Model_Name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

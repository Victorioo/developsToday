import React, { Suspense } from 'react';
import Link from 'next/link';

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

// Componente para manejar el estado de carga
async function ModelsList({ makeId, year }) {
  const models = await fetchModels(makeId, year);

  return (
    <ul className="w-full">
      {models.length >= 1 ? models.map((model, i) => (
        // Usar el índice como key porque la API no proporciona IDs únicos
        <li key={i} className="p-2 my-2 text-lg font-medium leading-3">
          - {model.Model_Name}
        </li>
      )) : <p>No models found</p>}
    </ul>
  );
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <section className="flex items-center justify-center w-full min-h-dvh pt-12">
      <Link href={'/'} className="absolute top-10 left-10">{'<'} Go Back</Link>
      <div className="max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold">
          Models for Make <span className="text-[#ff5d00]">ID {makeId}</span> in <span className="text-[#ff5d00]">Year {year}</span>
        </h1>
        
        {/* Suspense para mostrar estado de carga mientras se obtienen los modelos */}
        <Suspense fallback={<p>Loading models...</p>}>
          <ModelsList makeId={makeId} year={year} />
        </Suspense>
      </div>
    </section>
  );
}

'use client'

function CarComponent({ name, id, type  }) {
  return (
    <>
    <div className="bg-white p-4">
      <h1>{name}</h1>
      <p>Id: {id}</p>
      <p>Type: {type}</p>
    </div>
    </>
  )
}

export default car
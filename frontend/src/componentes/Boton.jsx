export default function Btn () {
  function handleClick () {
    alert('representando al genero masculino, femenino y los 39 tipos de gey.')
  }

  return (
        <div className="shadow-lg bg-fuchsia-700">
            <button onClick={handleClick}>BOTON 2</button>
        </div>
  )
}

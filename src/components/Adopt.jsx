import CardAnimal from './CardAnimal'

const Adopt = () => {
  return (
    <div>
        <div>
            <button>Colocar para adoção</button>
            <button>Filtrar</button>
        </div>
        <h1>Bichos para adotar</h1>
        <ul>
            <li><CardAnimal /></li>
            <li><CardAnimal /></li>
            <li><CardAnimal /></li>
            <li><CardAnimal /></li>
            <li><CardAnimal /></li>
        </ul>
    </div>
  )
}

export default Adopt
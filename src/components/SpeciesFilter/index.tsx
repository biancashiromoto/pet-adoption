import { useContext } from "react";
import { Context } from "../../context";

const SpeciesFilter = () => {
  const {
    species,
    setSpecies
  } = useContext(Context);
  
  return (
    <section className='filters__species'>
        <label htmlFor='cats'>
          <input
            checked={species === 'cats'}
            id="cats"
            type='radio'
            name='species'
            onChange={() => setSpecies('cats')}
          />
          Cats
        </label>
        <label htmlFor='dogs'>
          <input
            checked={species === 'dogs'}
            id="dogs"
            type='radio'
            name='species'
            onChange={() => setSpecies('dogs')}
          />
          Dogs
        </label>
      </section>
  )
}

export default SpeciesFilter
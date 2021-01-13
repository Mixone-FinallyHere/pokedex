import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PokemonCard = ({ pokemon, url }) => {
  const [sprite, setSprite] = useState('')

  const fetchSprites = async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
      .then (res => {
        setSprite(res.data.sprites.front_default)
      })
  }

  useEffect(() => {
    fetchSprites()
  }, [pokemon])

  // const name = this.props.name;
  console.log(pokemon)
  return (
    <div className='col-md-3 col-sm-6 mb-5'>
      <div className='card'>
        <div className='card-header'>
          <center>
            <h6>{pokemon}</h6>
            <br />
            <img src={sprite} alt='Pokémon Sprite' />
          </center>
        </div>
      </div>
    </div>
  )
  
}

export default PokemonCard

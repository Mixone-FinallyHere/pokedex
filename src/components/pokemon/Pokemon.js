import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gif from '../../loading-wheel.gif';

const type_colors = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

const Pokemon = (props) => {
  const { match } = props
  const { params } = match
  const { indexNum } = params
  
  const [pokemon, setPokemon] = useState(undefined)
  const [bio, setBio] = useState()
  const [genderRatioMale, setGenderRatioMale] = useState()
  const [genderRatioFemale, setGenderRatioFemale] = useState()
  const [catchRate, setCatchRate] = useState()
  const [eggGroups, setEggGroups] = useState()
  const [hatchSteps, setHatchSteps] = useState()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${indexNum}/`)
      .then (res => {
        const { data } = res
        console.log(data)
        setPokemon(data)
      })
      .catch(err => {
        setPokemon(false)
      })
  }, [indexNum])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${indexNum}/`)
      .then(res => {
        const { data } = res
        let description = '';
        console.log(data)
        data.flavor_text_entries
          .some(flavor => {
            const { flavor_text, language } = flavor
            const { name } = language
            if (name === 'en') {
              description = flavor_text
              console.log(description)
              setBio(description)
              return description;
            }
          })

        const femaleRate = data.gender_rate
        setGenderRatioFemale(12.5 * femaleRate)
        setGenderRatioMale(12.5 * (8 - femaleRate))

        setCatchRate(data.capture_rate)

        setEggGroups(data.egg_groups)

        setHatchSteps(255 * (data.hatch_counter) + 1)
      })
  }, [indexNum])

  const loadPokemonJsx = () => {
    const { 
      name, 
      id, 
      abilities, 
      species, 
      height, 
      weight, 
      // eggGroup, 
      // genderRatioMale, 
      // genderRatioFemale,  
      // hatchSteps, 
      types, 
      stats, 
      sprites
    } = pokemon

    const { front_default } = sprites
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

    let [
      hp, 
      attack, 
      defense, 
      speed, 
      specialAttack, 
      specialDefense
    ] = ''

    stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          console.log(`HP: ${hp}`)
          break;
        case 'attack':
          attack = stat['base_stat'];
          console.log(`ATK: ${attack}`)
          break;
        case 'defense':
          defense = stat['base_stat'];
          console.log(`DEF: ${defense}`)
          break;
        case 'speed':
          speed = stat['base_stat'];
          console.log(`SPEED: ${speed}`)
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          console.log(`SP. ATK: ${specialAttack}`)
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          console.log(`SP. DEF: ${specialDefense}`)
          break;
        default:
          break;
      }
    })

    return (
      <>
        <div className='col'>
          <div className='card'>
            <div className='card-header'>
              <div className='row'>
                <div className='col-5'>
                  <h5>{`Pokémon Index #${indexNum}`}</h5>
                </div>
                <div className='col-7'>
                  <div className='float-right'>
                    { types.map(typeInfo => {
                      const { type } = typeInfo;
                      const { name } = type;
                      return <span 
                        key={name}
                        className='badge badge-primary badge-pill mr-1'
                        style={{
                          backgroundColor: `#${type_colors[name]}`,
                          color: 'white'
                        }}
                      >
                        {`${name
                            .toLowerCase()
                            .split(' ')
                            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                            .join(' ')
                          }`
                        }
                      </span>
                    }) }
                  </div>
                </div>
              </div>
            </div>
            <div className='card-body'>
              <div className='row align-items-center'>
                <div className='col-md-3'>
                  <img
                    src={ fullImageUrl }
                    alt='Pokémon Large Pic' 
                    className='card-img-top rounded mx-auto mt-2'
                  />  
                </div>
                <div className='col-md-9'>
                  <h5 className='mx-auto'>
                    { name
                      .toLowerCase()
                      .split(' ')
                      .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                      .join(' ')
                    }
                    <img
                      src={ front_default }
                      alt='Pokémon Sprite' 
                    />
                  </h5>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>HP</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${hp}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Attack</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${attack}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Sp. Attack</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${specialAttack}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Defense</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${defense}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Sp. Defense</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${specialDefense}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-12 col-md-3'>Speed</div>
                    <div className='col-12 col-md-9'>
                      <div className='progress'>
                        <div 
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${speed}%`
                          }}
                          aria-valuenow='25'
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          <small>{speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col'>
                    <p className='p-2'>{ bio }</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='card-body'>
              <div className='card-title text-center'>
                Profile
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <> 
      {pokemon === undefined && 
        <img 
          src={gif}
          alt='Loading'
        />
      }
      {pokemon !== undefined && pokemon && loadPokemonJsx(pokemon)}
      {pokemon === false && <h1> Pokémon Not Found</h1>} 
    </>
  )
}

export default Pokemon

// { `${id}. ` }

// <br />
// {/* { `${height} Decimeters` } */}
// { '~ ' + 
//   (Math.round((height * 0.328084 + 0.0001) * 100) / 100) + ' ft / ' + 
//   (Math.round((height * 10.006 + 0.0001) * 100) / 100) + ' cm' 
// }
// <br />
// <br />
// {/* { `${weight} Hectograms` } */}
// { '~ ' + 
//   (Math.round((weight * 0.220462 + 0.0001) * 100) / 100) + ' lbs / ' +
//   (Math.round((weight * 0.10001 + 0.0001) * 100) / 100) + ' kg' 
// }
// <br />
// <br />

// <br />
// <br />
// { abilities.map(abilityInfo => {
//   const { ability } = abilityInfo;
//   const { name } = ability;
//   return `${name
//     .toLowerCase()
//     .split('-')
//     .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
//     .join('-')
//   }`
// }).join(', ') }
// <br />
// <br />
// { stats.filter(stat => {
//   if (stat.effort > 0) {
//     return true;
//   }
//   return false;
// }) 
// .map(statInfo => {
//   const { effort, stat } = statInfo
//   const { name } = stat

//   return `${effort} ${name
//     .toLowerCase()
//     .split(' ')
//     .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
//     .join(' ')
//   }`
// }).join(', ') }
// <br />
// <br />

// <br />
// <br />
// { `Catch Rate: ${catchRate}%` }
// <br />
// <br />
// { eggGroups.map(group => {
//   const { name } = group
//   return `${name
//     .toLowerCase()
//     .split(' ')
//     .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
//     .join(' ')
//   }`
// }).join(', ') }
// <br />
// <br />
// { `Hatch Steps: ${hatchSteps}`}
// <br />
// <br />

// <br />
// <br />

import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount() {
    fetch('/api/pets')
    .then(res => res.json())
    // .then(pets => console.log(pets))
    .then(pets => this.setState({pets: pets}))
  }

  onChangeType = (e) => {
    // console.log(e.target.value)
    this.setState({
      filters: {type: e.target.value}
    })
  }

  onFindPetsClick = (e) => {
    console.log(e)
    let currentFilter = ''

    if (this.state.filters.type !== 'all')
      currentFilter = `?type=${this.state.filters.type}`

    fetch('/api/pets' + currentFilter)
    .then(res => res.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = (id) => {
    // console.log(id)
    let updatedPets = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
        return pet
      } else {
        return pet
      }
    })

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    // console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

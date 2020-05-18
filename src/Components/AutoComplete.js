import React, {Component} from 'react';
import pokemonDataSet from '../../data/pokemon.json'
import ListItem from './ListItem'
/**
 * AutoComplete component , load pokemon list from mock API and suggest options
 */
class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      pokemonList : [],
      showMenu:true
    };
  }
  
  /**
   * calls this.getPokemons with searchTerm and updates state with new list
   */
   handleInputChange = async (event) => {
    event.preventDefault()
    let searchTerm = event.target.value
     searchTerm = searchTerm.toLowerCase()
     this.setState({ searchTerm , showMenu:true})
    if(searchTerm){
      const filteredPokemonList = await this.getPokemons(searchTerm)
      this.setState({pokemonList:filteredPokemonList})
    }
  }

  /**
   * get pokemon from mock API
   */
  getPokemons = async (searchTerm) => {
    if (!searchTerm) {
      return new Promise(resolve => resolve(pokemonDataSet))
    } else {
      const matching = pokemonDataSet.filter((pokemon) => pokemon.toLowerCase().includes(searchTerm))
      return new Promise(resolve => resolve(matching))
    }
  }
  
  /**
   * on listItem clicked will set searchbar to selection and hide options menu
   */
  handleItemClick = (selection) =>{
    this.setState({searchTerm:selection, showMenu: false})
  }

  /**
   * loads pokemon list from mock API call
   */
  async componentDidMount(){
    const pokemonList = await this.getPokemons()
    this.setState({pokemonList})
  }

  
  render() {
    return (
      <div className='main'>
      <form>
          <input type="search" className='input' placeholder='Search Pokemon' autoFocus onChange={this.handleInputChange} value={this.state.searchTerm}/>
        </form>
        {this.state.searchTerm && this.state.showMenu &&
          (this.state.pokemonList.length ? 
          <div className='menu'> 
          {this.state.pokemonList.map((pokemon, i) => <ListItem text={pokemon} searchTerm={this.state.searchTerm} key={i} handleItemClick={this.handleItemClick}/>)}
          </div>
          : <div className='no-results'>No Results...</div>)}
      </div>
    );
  }
}
export default AutoComplete;

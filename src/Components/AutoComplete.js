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
      showMenu:true,
      selected : ''
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
      try{
      const filteredPokemonList = await this.getPokemons(searchTerm)
        this.setState({ pokemonList: filteredPokemonList })
      } catch(error){
        console.error(error)
        this.setState({error:true})
      }
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
    try{
    const pokemonList = await this.getPokemons()
    this.setState({pokemonList})
    } catch(error){
      console.error(error)
      this.setState({error:true})
    }
  }
  renderOptionsMenu = (error, pokemonList, searchTerm, showMenu) =>{
    if(error){
      return (<h1> Sorry, An error has occurred. Please try to refresh the page.</h1>)
    } else{
      return (
      <React.Fragment>
          {searchTerm && showMenu &&
        (pokemonList.length ?
          <div className='menu'>
            {pokemonList.map((pokemon, i) => <ListItem text={pokemon} searchTerm={searchTerm} key={i} handleItemClick={this.handleItemClick} />)}
          </div>
          : <div className='no-results'>No Results...</div>)
      }
        { !showMenu ? `You've selected ${searchTerm}!` : ''}
        </React.Fragment>)
  }}
  
  render() {
    const { error, pokemonList, searchTerm, showMenu } = this.state
    return (
      <div className='main'>
      <form>
          <input type="search" className='input' placeholder='Search Pokemon' autoFocus onChange={this.handleInputChange} value={searchTerm}/>
        </form>
        {this.renderOptionsMenu(error, pokemonList, searchTerm, showMenu)}
      </div>
    );
  }
}
export default AutoComplete;

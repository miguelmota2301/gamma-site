import React, { useState } from 'react';
import './App.css';
import PDFViewer from './PDF';

const items = [
  "Introdução",
  "Aprendizado Estatístico",
  "Regressão Linear",
  "Classificação",
  "Métodos de Reamostragem",
  "Seleção de Modelo Linear e Regularização",
  "Indo além da Linearidade",
  "Métodos baseados em Árvore"
];

function SideBar() {
  const [toggled, setToggled] = useState(false);

  const handleToggledSideBar = () => {
    setToggled(!toggled);
  };

  return (
    <div className={`sidebar ${toggled ? "toggled" : ""}`}>
      <button
        className='toggle-button'
        onClick={handleToggledSideBar}
      >
        {toggled ? <img className='sidebar-img-open' src='src/imgs/bars-1.png' alt='Sidebar Icon Open'/> : <img className='sidebar-img-closed' src='src/imgs/bars-1.png' alt='Sidebar Icon Closed'/>}
      </button>

      <nav>
        <ul>
          <li><a href="#" className='button-sideBar'>Introdução</a></li>
          <li><a href="#" className='button-sideBar'>Aprendizado Estatístico</a></li>
          <li><a href="#" className='button-sideBar'>Regressão Linear</a></li>
          <li><a href="#" className='button-sideBar'>Classificação</a></li>
          <li><a href="#" className='button-sideBar'>Métodos de Reamostragem</a></li>
          <li><a href="#" className='button-sideBar'>Seleção de Modelo Linear e Regularização</a></li>
          <li><a href="#" className='button-sideBar'>Indo além da Linearidade</a></li>
          <li><a href="#" className='button-sideBar'>Métodos baseados em Árvore</a></li>
        </ul>
      </nav>
    </div>
  );
}

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputValueChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filteredSuggestions = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  // Função que deixa em negrito a parte original do input na sugestão
  const Negrito = (suggestion, input) => {
    const lowerCasedInputValue = input.toLocaleLowerCase();
    const lowerCasedsuggestion = suggestion.toLocaleLowerCase();
    const inputIndex = lowerCasedsuggestion.indexOf(lowerCasedInputValue);
    if (inputIndex === -1) {return suggestion};
    const antes = suggestion.slice(0, inputIndex);
    const keyword = suggestion.slice(inputIndex, inputIndex + input.length);
    const depois = suggestion.slice(inputIndex + input.length);

    return (
      <>
        {antes}
        <strong>{keyword}</strong>
        {depois}
      </>
    );
  };  

  return (
    <div className='nav-pesquisar-father'>
      <div className='nav-pesquisar-child'>
        <input
          type="search"
          id='autoCompletar'
          value={inputValue}
          onChange={handleInputValueChange}
          placeholder="Pesquise"
        />

        {suggestions.length > 0 && (
          <ul className='lista-suggestion'>
            {suggestions.map((suggestion, index) => (
              <li
              className='suggestion'
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              >
                {Negrito(suggestion, inputValue)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className='nav-pesquisar-button'>
        Buscar
      </button>

    </div>

  );
};

function NavBar() {
  return (
    <nav className="navbar">
      <ul className='nav-ul'>
        <li className='nav-li'>
          <a href="">Home</a>
        </li>
        <li className='nav-li'>
          <a href="">Resumos</a>
        </li>
        <li className='nav-li'>
          <a href="">Estudos de Caso</a>
        </li>
        <li className='nav-li'>
          <a href="">Sobre</a>
        </li>
        <li className='nav-li'>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <SideBar />
      <NavBar />
      <div className="content">
        <h1>Visualizador de PDF</h1>
        <PDFViewer src="src/resumos/completo.pdf" />
      </div>
    </div>
  );
}

export default App;

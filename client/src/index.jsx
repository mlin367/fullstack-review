import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.fetch();
  }

  search (term) {
    let query = {username: term};

    $.ajax({
      url: '/repos',
      method: 'POST',
      data: query,
      success: (data) => {
        console.log(data)
        console.log(`${term} was searched`);
      },
      error: (jqXHR, error) => {
        console.log(jqXHR.responseText);
      }
    })
  }

  fetch () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      data: '',
      success: (data) => {
        this.setState({
          repos: data
        })
      },
      error: (xhr, status, error) => {
        console.error(xhr.responseText)
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
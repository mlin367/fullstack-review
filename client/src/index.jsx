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
    this.search = this.search.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  search (term) {
    let query = {username: term};
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: JSON.stringify(query),
      contentType: 'application/json',
    })
    .done((data) => {
      console.log('success')
      this.fetchRepos();
    })
    .fail((xhr, status, error) => {
      console.error('ERROR ', xhr.responseText);
    })
  }

  fetchRepos () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      data: '',
      contentType: 'application/json',
    })
    .done((data) => {
      console.log(data)
      this.setState({
        repos: data
      })
    })
    .fail((xhr, status, error) => {
      console.error(xhr.responseText)
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
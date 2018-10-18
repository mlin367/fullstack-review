import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ol>
      {props.repos.map((repo, index) => (
        <Repo key={index} repo={repo} />)
      )}
    </ol>
  </div>
)

export default RepoList;
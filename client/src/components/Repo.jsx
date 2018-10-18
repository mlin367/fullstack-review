import React from 'react';

const Repo = (props) => (
  <div>
    <li> <a href={props.repo.url}> {props.repo.repo_name}</a> {props.repo.size} mb </li>
  </div>
);

export default Repo;
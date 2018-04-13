import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({
  onEditClick,
  onDeleteClick,
  onClick,
  id,
  name,
  ingredient_list,
  instruction_list,
  user_id,
  votes,
}) => (
  <div className="row" onClick={onClick}>
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <h2>Author: {user_id}</h2>
          <p>Name: {name}</p>
          <p>Ingredient List: {ingredient_list}</p>
          <p>Instruction List: {instruction_list}</p>
          <p>Votes: {votes}</p>
        </div>
        <div className="card-action">
          <Link to={`/recipes/${id}/delete`}>Delete this recipe?</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Recipe;

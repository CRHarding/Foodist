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
  <li onClick={onClick}>
    <div className="single-recipe">
      <h2>Author: {user_id}</h2>
      <p>Name: {name}</p>
      <p>Ingredient List: {ingredient_list}</p>
      <p>Instruction List: {instruction_list}</p>
      <p>Votes: {votes}</p>
      <Link to={`/recipes/${id}/edit`}>Edit this recipe?</Link>
      {' | '}
      <Link to={`/recipes/${id}/delete`}>Delete this recipe?</Link>
    </div>
  </li>
);

export default Recipe;

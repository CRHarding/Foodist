import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
  <p>
    Show: <FilterLink filter={'all'}>All</FilterLink>
    {', '}
    <FilterLink filter={'favorite'}>Favorites</FilterLink>
    {', '}
    <FilterLink filter={'nonfavorite'}>Not Favorites</FilterLink>
  </p>
);

export default Footer;

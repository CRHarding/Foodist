import React from 'react';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
  <p>
    Show: <FilterLink filter={'SHOW_ALL'}>All</FilterLink>
    {', '}
    <FilterLink filter={'SHOW_FAVORITE'}>Favorites</FilterLink>
    {', '}
    <FilterLink filter={'SHOW_NONFAVORITE'}>Not Favorites</FilterLink>
  </p>
);

export default Footer;

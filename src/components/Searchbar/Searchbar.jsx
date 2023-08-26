import { useState } from 'react';

import { GoSearch } from 'react-icons/go';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const inputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    onSubmit(query);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSearch}>
        <SearchFormButton type="submit">
          <GoSearch size="20" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={inputChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

import { Component } from 'react';
import { GoSearch } from 'react-icons/go';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  inputChange = event => {
    this.setState({ query: event.target.value });
  };
  handleSearch = event => {
    event.preventDefault();
    if (!this.state.query.trim()) {
      return;
    }
    this.props.onSubmit(this.state.query);
  };
  render() {
    const { query } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSearch}>
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
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

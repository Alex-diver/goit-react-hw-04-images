import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';

import { AppStyled, Error } from './App.styled';
import { AllImages } from '../api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery, scaleHits } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  abortControllerRef;
  state = {
    images: [],
    query: '',
    currentPage: 1,
    error: null,
    isLoading: false,
    isLastPage: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }
  getImages = async () => {
    const { query, currentPage } = this.state;
    if (this.abortControllerRef) {
      this.abortControllerRef.abort();
    }
    this.abortControllerRef = new AbortController();
    try {
      this.setState({ isLoading: true });
      const data = await AllImages(
        query,
        currentPage,
        this.abortControllerRef.signal
      );
      if (data.hits.length === 0) {
        return toast.info(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else if (currentPage === 1) {
        toast.success('We found some images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success('We found some more images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      const scaledHits = scaleHits(data.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...scaledHits],
        isLastPage:
          prevState.images.length + scaledHits.length >= data.totalHits,
        error: null,
      }));
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        this.setState({ error: error.message });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query,
      currentPage: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };
  render() {
    const { images, isLoading, error, isLastPage } = this.state;
    return (
      <AppStyled>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {error && <Error>Error: {error}</Error>}
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.loadMore} />
        )}
      </AppStyled>
    );
  }
}

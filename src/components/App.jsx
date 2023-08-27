import { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyled, Error } from './App.styled';
import { AllImages } from '../api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery, scaleHits } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const abortControllerRef = useRef();
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      if (query.trim() === '') return;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        setIsLoading(true);

        const data = await AllImages(
          query,
          currentPage,
          abortControllerRef.current.signal
        );

        if (data.hits.length === 0) {
          toast.info(
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

        setImages(prevImages => [...prevImages, ...scaledHits]);
        setIsLastPage(currentPage >= data.totalHits / 12);
        setError(null);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [currentPage, query]);

  const handleSearchSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }
    setCurrentPage(1);
    setImages([]);
    setQuery(newQuery);
    setError(null);
    setIsLastPage(false);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyled>
      <ToastContainer autoClose={1500} />
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <Error>Error: {error}</Error>}
      {isLoading && <Loader />}

      <ImageGallery images={images} />
      {!isLoading && images.length > 0 && !isLastPage && (
        <Button onClick={loadMore} />
      )}
    </AppStyled>
  );
};

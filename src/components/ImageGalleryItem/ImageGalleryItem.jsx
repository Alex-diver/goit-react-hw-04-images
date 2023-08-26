import { useState } from 'react';

import { Modal } from '../Modal/Mobal';

import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    image: { webformatURL, largeImageURL, tags },
  } = props;
  return (
    <>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

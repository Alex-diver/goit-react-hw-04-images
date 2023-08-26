import { useState } from 'react';

import { Modal } from '../Modal/Mobal';

import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

import React, { useState } from 'react';
import Modal from './Modal';
import PostForm from './PostForm';

const ModalButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
  

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div className="App p-3">
        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
          編集
        </button>
  
        <Modal isOpen={modalOpen} closeModal={closeModal}>
          <div>
            <PostForm />
            
          </div>
        </Modal>
      </div>
    );
}

export default ModalButton
import './DetailGroup.css';
import React from 'react';

function DetailGroup({ closeModal }) {
    return (
      <>
        <div
          onClick={closeModal}
          className="overlay"
        ></div>
        <div className="modal">
            <p>Here is the content</p>
            <button className="close-button" onClick={closeModal}>
                X
            </button>
        </div>
      </>
    );
}
export default DetailGroup;
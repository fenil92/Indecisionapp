import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal 
        isOpen = {!!props.selectedOption}
        contentLabel = "Selected Option"
        onRequestClose={props.handleClearSelection}
        closeTimeoutMS={200}
        className="modal"
        ariaHideApp={false} //“Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`” 
    >
    <h3>Selected Option</h3>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button className="button" onClick={props.handleClearSelection}>Okay</button>
    </Modal>
);

export default OptionModal;
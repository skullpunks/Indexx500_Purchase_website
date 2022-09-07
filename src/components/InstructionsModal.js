import { Button, Modal} from 'react-bootstrap';

const InstructionsModal = ({isOpen, closeModal}) => {
    return (
        <div>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>Index500 Instructions</Modal.Header>
                <Modal.Body>
                    <iframe width="1000" height="500" src="https://www.youtube.com/embed/o5m96GvGYpk?autoplay=1"
                                            title="YouTube video player" frameBorder="0"
                                            allow="autoplay; encrypted-media; gyroscope;"
                                            allowFullScreen/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default InstructionsModal;

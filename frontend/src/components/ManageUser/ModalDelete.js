import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const ModalDelete = (props) => {
    const {  handleClose, show ,confirmDelete,userDelete} = props
    return (
        <div>
            <>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure delete email = {userDelete.email}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={confirmDelete}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default ModalDelete

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { deleteUser, getAllUser } from '../../services/userService'
import ReactPaginate from 'react-paginate'
import ModalDelete from './ModalDelete'
import { toast } from 'react-toastify'
import ModalUser from './ModalUser'
import './User.scss'
const User = () => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [show, setShow] = useState(false)
    const [userDelete, setUserDelete] = useState({})
    const [showModalUser, setShowModalUser] = useState(false)
    const [action, setAction] = useState('CREATE')
    const [modalUser, setModalUser] = useState('')
    useEffect(() => {
        fetchData()
    }, [currentPage])
    const fetchData = async () => {
        let res = await getAllUser(currentPage, currentLimit)

        if (res && res.EC === 0) {
            setListUsers(res.DT.users)
            setTotalPages(res.DT.totalPages)
        }
    }

    const handlePageClick = (event) => {
        
        setCurrentPage(+event.selected + 1)
    }
    const handleDelete = async (item) => {
        setUserDelete(item)
        setShow(true)
    }
    const handleClose = () => {
        setUserDelete({})

        setShow(false)
    }
    const confirmDelete = async () => {
        let res = await deleteUser(userDelete)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            await fetchData()
            setShow(false)
        } else {
            toast.error(res.EC)
        }
    }
    const handleUserClose = async () => {
        setShowModalUser(false)
        setAction('CREATE')
        await fetchData()
    }
    const handleEdit = (item) => {
        setAction('UPDATE')
        setShowModalUser(true)
        setModalUser(item)
    }
    const handleRefresh = async()=>{
       
        
        await fetchData()
        
    }

    return (
        <Container>
            <div className='table-header '>
                <Row className='mt-3 mb-3'>
                    <Col>
                        <h2>Table Users : </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className='btn btn-success' onClick={() => handleRefresh()}>
                        <i className="fa fa-refresh px-2" ></i>Refresh</button>
                        <button
                            className='btn btn-primary '
                            style={{ marginLeft: '2px' }}
                            onClick={() => {
                                setShowModalUser(true)
                                setAction('CREATE')
                                setModalUser('')
                            }}
                        >
                           <i className="fa fa-plus px-2"></i> Add new user
                        </button>
                    </Col>
                </Row>
            </div>
            <div className='table-body mt-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Email</th>
                            <th>User</th>
                            <th>Group</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 ? (
                            <>
                                {listUsers.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>
                                                {(currentPage - 1) *
                                                    currentLimit +
                                                    index +
                                                    1}
                                            </td>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.Group
                                                    ? item.Group.name
                                                    : ''}
                                            </td>
                                            <td>
                                                <span
                                                    className='edit'
                                                    title="Edit"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    <i className='fa fa-pencil orange'></i>
                                                </span>
                                                <span
                                                    className='mx-2 delete'
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                <i className="fa fa-trash red" ></i>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        ) : (
                            <tr>
                                <td>Not users</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            {totalPages > 0 && (
                <ReactPaginate
                    nextLabel='next >'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel='< previous'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                    renderOnZeroPageCount={null}
                />
            )}
            <ModalDelete
                handleClose={handleClose}
                show={show}
                confirmDelete={confirmDelete}
                userDelete={userDelete}
            />
            <ModalUser
                handleUserClose={handleUserClose}
                show={showModalUser}
                action={action}
                modalUser={modalUser}
            />
        </Container>
    )
}

export default User

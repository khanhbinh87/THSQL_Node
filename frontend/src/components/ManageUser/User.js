import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { getAllUser } from '../../services/userService'
import ReactPaginate from 'react-paginate'
const User = () => {
    const [listUsers, setListUsers] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    useEffect(() => {
        fetchData()
    }, [currentPage])
    const fetchData = async () => {
        let res = await getAllUser(currentPage, currentLimit)
        if (res && res.data && res.data.EC === 0) {
            setListUsers(res.data.DT.users)
            setTotalPages(res.data.DT.totalPages)
           
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
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
                        <button className='btn btn-success'>Refresh</button>
                        <button
                            className='btn btn-primary '
                            style={{ marginLeft: '2px' }}
                        >
                            Add new user
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
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.Group
                                                    ? item.Group.name
                                                    : ''}
                                            </td>
                                            <td>
                                                <button className='btn btn-warning'>Edit</button>
                                                <button className='btn btn-danger mx-1'>Delete</button>
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
        </Container>
    )
}

export default User

import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
class Paging extends Component {
    render() {
        return (
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        )
    }
}
export default Paging;
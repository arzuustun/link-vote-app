import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { handleChangePage } from "../actions/links";
import { connect } from "react-redux";

class Paging extends Component {

    handlePageChange (page) {
        const { dispatch, activePage } = this.props
    
        let selectedPage = activePage

        if (page === 'prev') {
            selectedPage-- //bir önce ki sayfaya gider
        }  
        else if (page === 'next') {
            selectedPage++//bir sonra ki sayfaya gider
        } 
        else {
            selectedPage = page//secilen sayfaya gider
        }
    
        dispatch(handleChangePage(selectedPage))
      }
    
      createPageItems (activePage, pageCount) {
        let pagingItems = []
        for (let p = 1; p <= pageCount; p++) {  //ekrana sayfa numaralari bastirilir

          pagingItems.push(
            <Pagination.Item
                key={p}
                className={ activePage === p ? 'paging-active': 'paging-margin'}
                onClick={() => this.handlePageChange(p)}>
              {p}
            </Pagination.Item>
          )
        }
        return pagingItems
      }

    render() {
        const { pageCount, activePage } = this.props
        
        return (
            <Pagination>
                <Pagination.Prev  
                           className={ activePage === 1 ? 'prev-page-margin paging-disabled' : 'prev-page-margin paging-margin'}  
                           onClick={() => this.handlePageChange('prev')} />

                   { this.createPageItems(activePage, pageCount) }

                <Pagination.Next 
                         className={ activePage === pageCount ? 'paging-margin paging-disabled' : 'paging-margin'}  
                         onClick={() => this.handlePageChange('next')} />
            </Pagination>
        )
    }
}

function mapStateToProps ({ links, paging }) {
    return {
        pageCount: Math.ceil(Object.keys(links).length / 5),//ceil bir üste yuvarlar toplam sayfa sayısı
        activePage: paging.activePage //aktif sayfa
    }
}

export default connect(mapStateToProps)(Paging)
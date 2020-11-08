import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { products } from './data';
import Customer from './customer';
import CustomerModal from './customer_modal';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 3,
            currentPage: 0,
            customers: [],
            currentCustomerIndex: null,
            showModal: false,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(index) {
        this.setState({ showModal: true, currentCustomerIndex: index });
    }

    handleCloseModal() {
        this.setState({ showModal: false, currentCustomerIndex: null });
    }

    receivedData() {
        const data = products.slice();
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

        const postData = slice.map((pd, index) => {
            return (<Customer data={pd} onViewClick={() => this.handleOpenModal(index)}> </Customer>);
        });

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData: postData
        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState(
            {
                currentPage: selectedPage,
                offset: offset
            },
            () => {
                this.receivedData();
            }
        )
    }

    componentDidMount() {
        this.receivedData();
    }

    render() {
        let customers = products.slice();
        this.state.customers = customers;
        let data = this.state.showModal ? this.state.customers[this.state.currentCustomerIndex] : null;
        return (
            <div>
                <div className="container">
                    <div className="row customerHeader">
                        MY CUSTOMERS
                    </div>
                    {this.state.postData}
                    <div className="row customerFooter">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={this.state.pageCount}
                            onPageChange={this.handlePageClick}
                            breakLabel={""}
                            containerClassName={"pagination"}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={0}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
                <ReactModal id="modal" className="myModal" isOpen={this.state.showModal} contentLabel="Minimal Modal Example"
                    overlayClassName="overlay" closeTimeoutMS={200} onRequestClose={this.handleCloseModal}>
                    <CustomerModal data={data} onClick={this.handleCloseModal} />
                </ReactModal>

            </div>
        );
    }
}

export default Dashboard;
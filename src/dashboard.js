import React from 'react';
import Customer from './customer';
import { products, columns } from './data';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            currentCustomerIndex: null,
            showModal: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    toggleModal() {
        this.state.setIsOpen(!this.setState.isOpen);
    }


    handleOpenModal(index) {
        this.setState({ showModal: true, currentCustomerIndex: index });
    }

    handleCloseModal() {
        this.setState({ showModal: false, currentCustomerIndex: null });
    }

    render() {

        let customers = products.slice();
        // Improve Remove static state setting
        this.state.customers = customers;

        this.state.showModal = true;
        this.state.currentCustomerIndex = 0;

        for (let i = 0; i < customers.length; i++) {
            let currentProduct = products[i];
            currentProduct["button"] = <button onClick={() => this.handleOpenModal(i)}>View</button>
        }

        let data = this.state.showModal ? this.state.customers[this.state.currentCustomerIndex] : null;

        console.log("Data: ", data);

        // Improve Add Pagination
        return (
            <div>
                {/* <BootstrapTable striped bordered hover
                    keyField="city"
                    data={customers}
                    columns={columns}
                /> */}
                <ReactModal id="modal" className="myModal" isOpen={this.state.showModal} contentLabel="Minimal Modal Example"
                    overlayClassName="overlay" closeTimeoutMS={200} onRequestClose={this.handleCloseModal}>
                    <Customer data={data} onClick={this.handleCloseModal} />
                </ReactModal>
            </div>
        )

    }

}

export default Dashboard;
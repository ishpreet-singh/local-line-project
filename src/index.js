import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APICall from './util';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Customer extends React.Component {
    render() {
        return (
            <div className="customer">
                {/* {this.props.value} */}
                <button onClick={this.props.onClick}>VIEW</button>
                <button>X</button>
            </div>
        );
    }
}

class CustomerData extends React.Component {
    render() {
        return (
            <div className="customer-data">
                {this.props.data.city}
                <button onClick={this.props.onClick}>X</button>
            </div>
        );
    }
}

class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isModalActive: false,
            currentCustomerIndex: null,
        }
    }

    showCustomerModal(i) {
        console.log("i: ", i);
        this.setState({ isModalActive: true, currentCustomerIndex: i });
    }

    hideCustomerModal() {
        this.setState({ isModalActive: false, currentCustomerIndex: null });
    }

    renderCustomer(i) {
        return <Customer
            value={this.state.customers[i].business_name}
            onClick={() => this.showCustomerModal(i)}
        />;
    }

    renderCustomerData() {
        return <CustomerData
            data={this.state.customers[this.state.currentCustomerIndex]}
            onClick={() => this.hideCustomerModal()}
        />;
    }

    render() {

        let products = [
            {
                "province": "ON",
                "city": "Ottawa",
                "country": "Canada",
                "business_name": "Cole's Cappuccino"
            },
            {
                "province": "ON",
                "city": "Waterloo",
                "country": "Canada",
                "business_name": "Jen's Jello"
            },
            {
                "province": "ON",
                "city": "Kingston",
                "country": "Canada",
                "business_name": "Brock's Bakery"
            },
            {
                "province": "ON",
                "city": "Toronto",
                "country": "Canada",
                "business_name": "Matty's Mango"
            }
        ]
        // for (let i = 0; i < products.length; i++) {
        //     let currentProduct = products[i];
        //     currentProduct["view_button"] = <button>VIEW</button>;
        //     currentProduct["cross_button"] = <button>X</button>;
        // }

        let columns = [{
            dataField: 'province',
            text: 'Province'
        }, {
            dataField: 'city',
            text: 'City'
        }, {
            dataField: 'country',
            text: 'Country'
        }, {
            dataField: 'business_name',
            text: 'Business Name'
        }, {
            dataField: 'view_button',
            text: ''
        }];

        // return (
        //     <div>
        //         <BootstrapTable striped bordered hover
        //             keyField="city"
        //             data={products}
        //             columns={columns}
        //         />
        //     </div>
        // );

        // let customerItems = [];

        // APICall().then((data) => {
        //     this.setState({ customers: data });
        // });

        // if (this.state.isModalActive) {
        //     customerItems.push(this.renderCustomerData());
        // } else {
        //     for (let i = 0; i < this.state.customers.length; i++) {
        //         customerItems.push(this.renderCustomer(i));
        //     }
        //     if (this.state.customers.length > 0) {
        //         <BootstrapTable keyField='id'
        //             data={this.state.customers}
        //             columns={Array(this.state.customers.length).fill('Name')}
        //             pagination={paginationFactory()}
        //         />
        //     }
        // }
        // return (
        //     <div>
        //         {customerItems}
        //     </div>
        // );

        let customers = products.slice();
        // this.setState({ customers: customers });
        this.state.customers = customers;

        APICall().then((data) => {
            this.setState({ customers: data });
        });


        if (this.state.isModalActive) {

            let customers = this.renderCustomerData();
            return (
                <div>{customers}</div>
            )

        } else {
            for (let i = 0; i < customers.length; i++) {
                let currentProduct = products[i];
                currentProduct["view_button"] = <Customer onClick={() => this.showCustomerModal(i)} />;
            }

            return (
                <div>
                    <BootstrapTable striped bordered hover
                        keyField="city"
                        data={customers}
                        columns={columns}
                    />
                </div>
            );
        }


    }

}

ReactDOM.render(
    <Panel />,
    document.getElementById('root')
);
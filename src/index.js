import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APICall from './util';

class Customer extends React.Component {
    render() {
        return (
            <div className="customer">
                {this.props.value}
                <button onClick={this.props.onClick}>VIEW</button>
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
        this.setState({isModalActive: true, currentCustomerIndex: i});
    }

    hideCustomerModal() {
        this.setState({isModalActive: false, currentCustomerIndex: null});
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
        let customerItems = [];
        APICall().then((data) => {
            this.setState({customers: data})
        });
        if (this.state.isModalActive) {
            customerItems.push(this.renderCustomerData());
        } else {
            for (let i = 0; i < this.state.customers.length; i++) {
                customerItems.push(this.renderCustomer(i));
            }
        }
        return (
            <div>
                {customerItems}
            </div>
        );
    }

}

ReactDOM.render(
    <Panel />,
    document.getElementById('root')
);
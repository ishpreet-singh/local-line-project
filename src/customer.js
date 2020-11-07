import React from 'react';

class Customer extends React.Component {
    render() {
        if (!this.props.data) {
            return "";
        }
        let customerData = this.props.data;
        return (
            <div className="container">

                <div className="row" >
                    <div className="col-sm">
                        <h2>{customerData.business_name}</h2>
                    </div>
                    <div className="col-sm cancelButton">
                        <button onClick={this.props.onClick} >X</button>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm">
                        <p>Location: {customerData.city}, {customerData.province} </p>
                    </div>
                    <div className="col-sm">
                        <p>Phone Number: (123) 456-7890</p>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm">
                        <p>Product Catalog</p>
                    </div>
                    <div className="col-sm">
                        <p>Last Delivery: May 7, 2018</p>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm-6">
                        <button className = "btn btn-success catalogButton" >Send Catalog</button>
                    </div>
                    <div className="col-sm-6">
                        <button className = "btn btn-primary addNodeButton" >Add Note</button>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm">
                        <p>Avg Order: $0.01</p>
                    </div>
                    <div className="col-sm">
                        <p>May Orders: 1</p>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm">
                        <p>May Sales: $0.01</p>
                    </div>
                    <div className="col-sm">
                        <p>Total Sales: $0.01</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Customer;
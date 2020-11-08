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
                    <div className="col-6">
                        <h3 className="modalHeading">{customerData.business_name}</h3>
                    </div>
                    <div className="col-6">
                        <button className="modalCrossButton" onClick={this.props.onClick}>
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                        </button>
                    </div>
                </div>

                <hr class="modalTopLine"></hr>

                <div className="row columnContainer" >
                    <div className="col-6">

                        <div className="modalCol">
                            <h4>LOCATION</h4>
                            <hr class="modalMidLine"></hr>
                            <span >{customerData.city}, {customerData.province} </span>
                        </div>
                        <div className="modalCol">
                            <h4>PRODUCT CATALOG</h4>
                            <hr class="modalMidLine"></hr>
                            <select class="modalCatalog" defaultValue="Select a calalog">
                                <option>Select a calalog</option>
                            </select>
                        </div>
                        <div className="modalCol">
                            <button className="catalogButton" >SEND CATALOG</button>
                        </div>
                        <div className="modalCol">
                            <h4>AVERAGE ORDER</h4>
                            <hr class="modalMidLine"></hr>
                            <span>$0.01</span>
                        </div>
                        <div className="modalCol">
                            <h4>MAY ORDER</h4>
                            <hr class="modalMidLine"></hr>
                            <span>$0.01</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="modalCol">
                            <h4>PHONE NUMBER</h4>
                            <hr class="modalMidLine"></hr>
                            <span >(123) 456-7890</span>
                        </div>
                        <div className="modalCol">
                            <h4>LAST DELIVERY</h4>
                            <hr class="modalMidLine"></hr>
                            <span>May 7, 2018</span>
                        </div>
                        <div className="modalCol">
                            <button className="nodeButton" >ADD NOTE</button>
                        </div>
                        <div className="modalCol">
                            <h4>MAY ORDERS</h4>
                            <hr class="modalMidLine"></hr>
                            <span>1</span>
                        </div>
                        <div className="modalCol">
                            <h4>TOTAL SALES</h4>
                            <hr class="modalMidLine"></hr>
                            <span>$0.01</span>
                        </div>
                    </div>
                </div>
                <hr class="modalBottomLine"></hr>
            </div>
        );
    }
}

export default Customer;
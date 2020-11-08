import React from 'react';

function getMonth(deliveryDate) {
    const months = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", 
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const deliveryMonth = months[deliveryDate.getMonth()];
    return deliveryMonth;
}

class CustomerModal extends React.Component {
    render() {
        if (!this.props.data) {
            return "";
        }
        let customerData = this.props.data;
        let customerInfo = customerData.customer_info;
        let lastDeliveryDate = "-", deliveryMonth = "";
        if (customerInfo.last_delivery_date) {
            lastDeliveryDate = new Date(customerInfo.last_delivery_date).toDateString();
            deliveryMonth = getMonth(new Date(customerInfo.last_delivery_date));
        }
        let totalSales = customerInfo.orders_this_month * customerInfo.buyer_average_order;

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

                <hr className="modalTopLine"></hr>

                <div className="row columnContainer" >
                    <div className="col-6">

                        <div className="modalCol">
                            <h4>LOCATION</h4>
                            <hr className="modalMidLine"></hr>
                            <span >{customerData.city}, {customerData.province} </span>
                        </div>
                        <div className="modalCol">
                            <h4>PRODUCT CATALOG</h4>
                            <hr className="modalMidLine"></hr>
                            <select className="modalCatalog" defaultValue="Select a calalog">
                                <option>Select a calalog</option>
                            </select>
                        </div>
                        <div className="modalCol">
                            <button className="catalogButton" >SEND CATALOG</button>
                        </div>
                        <div className="modalCol">
                            <h4>AVERAGE ORDER</h4>
                            <hr className="modalMidLine"></hr>
                            <span>${customerInfo.buyer_average_order}</span>
                        </div>
                        <div className="modalCol">
                            <h4>{deliveryMonth} SALES</h4>
                            <hr className="modalMidLine"></hr>
                            <span>$0.01</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="modalCol">
                            <h4>PHONE NUMBER</h4>
                            <hr className="modalMidLine"></hr>
                            <span >(123) 456-7890</span>
                        </div>
                        <div className="modalCol">
                            <h4>LAST DELIVERY</h4>
                            <hr className="modalMidLine"></hr>
                            <span>{lastDeliveryDate}</span>
                        </div>
                        <div className="modalCol">
                            <button className="nodeButton" >ADD NOTE</button>
                        </div>
                        <div className="modalCol">
                            <h4>{deliveryMonth} ORDERS</h4>
                            <hr className="modalMidLine"></hr>
                            <span>{customerInfo.orders_this_month}</span>
                        </div>
                        <div className="modalCol">
                            <h4>TOTAL SALES</h4>
                            <hr className="modalMidLine"></hr>
                            <span>${totalSales}</span>
                        </div>
                    </div>
                </div>
                <hr className="modalBottomLine"></hr>
            </div>
        );
    }
}

export default CustomerModal;
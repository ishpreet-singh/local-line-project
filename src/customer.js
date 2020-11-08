import React from 'react';

class Customer extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const data = this.props.data;
        return (
            <div className="row customerRecord">
                <div className="col-6">
                    <h2>{data.business_name}</h2>
                    <span>{data.city}, {data.province}</span>
                </div>
                <div className="col-6">
                    <button className="customerViewButton" onClick={() => this.props.onViewClick()}>VIEW</button>
                    <button className="customerCrossButton">
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}

export default Customer;
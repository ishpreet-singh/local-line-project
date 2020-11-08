import React, { Component } from "react";
import ReactPaginate from "react-paginate";
// import { products } from './data';
import Customer from './customer';
import CustomerModal from './customer_modal';
import ReactModal from 'react-modal';
import APICall from './util';

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
        APICall().then((apiData) => {
            const data = apiData.slice();
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    
            const postData = slice.map((pd, index) => {
                return (<Customer data={pd} onViewClick={() => this.handleOpenModal(index)}> </Customer>);
            });
    
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                postData: postData,
                customers: data
            })
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
                    overlayClassName="overlay" onRequestClose={this.handleCloseModal}>
                    <CustomerModal data={data} onClick={this.handleCloseModal} />
                </ReactModal>

                <div class="footer">
                    <svg width="400" height="147" viewBox="0 0 765 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M74.2579 137.541C109.846 137.541 138.695 109.099 138.695 74.0147C138.695 38.9305 109.846 10.4883 74.2579 10.4883C38.6699 10.4883 9.82031 38.9305 9.82031 74.0147C9.82031 109.099 38.6699 137.541 74.2579 137.541Z" stroke="#00B284" stroke-width="7.05" />
                        <path d="M58.4211 104.518C57.8766 104.518 57.332 104.315 56.9144 103.903C56.0793 103.082 56.0793 101.752 56.9144 100.931L86.4659 71.8436C86.9988 71.3207 87.7726 71.1128 88.493 71.2899C91.2232 71.9612 94.4019 70.6809 97.4538 67.6772C100.004 65.1679 102.158 61.7675 103.213 58.5781C104.168 55.696 104.11 53.3544 103.056 52.3165C101.998 51.2785 99.6215 51.2221 96.6923 52.1605C93.4537 53.1985 89.9966 55.3203 87.4481 57.8297C84.3962 60.8321 83.0903 63.9651 83.7768 66.6512C83.9564 67.3699 83.7451 68.1271 83.2143 68.6469L55.1997 96.2218C54.4608 96.9498 54.6199 97.325 54.7193 97.5728C55.169 98.6466 54.6505 99.8744 53.5598 100.317C52.4662 100.761 51.221 100.243 50.7728 99.1737C49.907 97.101 50.4072 94.9982 52.1801 93.2552L79.3974 66.4477C78.9171 62.6183 80.6716 58.5484 84.4222 54.8526C87.4697 51.8547 91.4576 49.4121 95.3661 48.1633C99.99 46.683 103.788 47.0987 106.071 49.3438C108.353 51.5889 108.78 55.3322 107.271 59.8803C105.996 63.7261 103.521 67.6505 100.47 70.6501C96.7197 74.3412 92.5775 76.0723 88.692 75.5956L59.9294 103.903C59.5118 104.31 58.9672 104.518 58.4211 104.518Z" fill="#00B284" />
                        <path d="M69.7732 70.8286C69.2241 70.8286 68.6749 70.6207 68.2619 70.2091L65.276 67.2499C64.7498 66.7257 64.5387 65.9729 64.7177 65.2587C65.4045 62.5756 65.7777 61.0952 62.5547 57.9251L53.7805 49.2832C52.9437 48.4606 52.9437 47.1332 53.7805 46.3106C54.6157 45.4879 55.9648 45.4879 56.8001 46.3106L65.5758 54.9479C69.6554 58.9629 69.8145 61.9148 69.1369 65.1073L71.2906 67.2454C72.1212 68.0666 72.1168 69.3999 71.2815 70.2182C70.8639 70.6249 70.3193 70.8286 69.7732 70.8286Z" fill="#00B284" />
                        <path d="M92.2133 103.991C90.8244 103.991 89.5148 103.459 88.5283 102.489L78.3589 92.5026C77.5253 91.6815 77.5253 90.3529 78.356 89.5297C79.1868 88.7086 80.5403 88.7086 81.3754 89.5255L91.5492 99.5173C91.7915 99.756 92.0677 99.7902 92.2133 99.7902C92.3583 99.7902 92.6352 99.756 92.8724 99.5215L94.8029 97.6224C95.1671 97.2633 95.1671 96.6781 94.8029 96.319L84.6782 86.3671C83.8417 85.546 83.8417 84.216 84.6739 83.3949C85.5039 82.5717 86.8582 82.5717 87.6933 83.39L97.8273 93.3384C99.8588 95.3369 99.8588 98.5863 97.8273 100.586L95.8969 102.485C94.9118 103.455 93.6065 103.991 92.2133 103.991Z" fill="#00B284" />
                        <path d="M63.5 77.0023C62.9507 77.0023 62.4016 76.7944 61.9871 76.3835L59.8424 74.2541C56.6026 74.9163 53.6044 74.756 49.5325 70.7498L40.7491 62.1079C39.9139 61.2868 39.9139 59.9579 40.7491 59.1367C41.5842 58.3141 42.935 58.3141 43.7686 59.1367L52.549 67.7726C55.772 70.9445 57.2757 70.5728 60.0015 69.9019C60.7343 69.7237 61.5052 69.936 62.033 70.46L65.0174 73.4197C65.848 74.2422 65.8434 75.5757 65.0082 76.3919C64.586 76.7993 64.046 77.0023 63.5 77.0023Z" fill="#00B284" />
                        <path d="M60.0351 67.398C59.4905 67.398 58.946 67.1946 58.5284 66.7832L47.2639 55.6973C46.4287 54.8748 46.4287 53.5473 47.2639 52.7247C48.1006 51.9036 49.4498 51.9036 50.285 52.7247L61.5434 63.8106C62.3786 64.6332 62.3786 65.9607 61.5434 66.7832C61.1258 67.1901 60.5812 67.398 60.0351 67.398Z" fill="#00B284" />
                        <path d="M206.785 29V99.2468H235.594V119.001H182.757V29H206.785Z" fill="#00B284" />
                        <path d="M261.979 88.1788C261.979 90.2417 262.347 92.1457 263.083 93.8908C263.9 95.5568 264.922 97.0246 266.148 98.2937C267.455 99.5628 268.967 100.555 270.683 101.269C272.481 101.983 274.361 102.34 276.323 102.34C278.284 102.34 280.123 101.983 281.839 101.269C283.637 100.555 285.149 99.5628 286.375 98.2937C287.683 97.0246 288.705 95.5568 289.44 93.8908C290.257 92.1457 290.666 90.2809 290.666 88.2978C290.666 86.3938 290.257 84.6088 289.44 82.9428C288.705 81.1977 287.683 79.6899 286.375 78.4208C285.149 77.1517 283.637 76.1598 281.839 75.4458C280.123 74.7318 278.284 74.3748 276.323 74.3748C274.361 74.3748 272.481 74.7318 270.683 75.4458C268.967 76.1598 267.455 77.1517 266.148 78.4208C264.922 79.6899 263.9 81.1578 263.083 82.8238C262.347 84.4897 261.979 86.2748 261.979 88.1788ZM238.564 87.9407C238.564 83.4187 239.504 79.2138 241.384 75.3268C243.263 71.3599 245.879 67.9488 249.23 65.0929C252.58 62.1575 256.544 59.8569 261.121 58.1908C265.78 56.5249 270.846 55.6919 276.323 55.6919C281.717 55.6919 286.702 56.5249 291.279 58.1908C295.937 59.7775 299.942 62.0385 303.293 64.9738C306.726 67.8298 309.382 71.2808 311.262 75.3268C313.141 79.2936 314.081 83.6967 314.081 88.5357C314.081 93.3748 313.1 97.8177 311.139 101.864C309.259 105.831 306.643 109.282 303.293 112.217C299.942 115.073 295.896 117.294 291.156 118.881C286.498 120.468 281.43 121.261 275.955 121.261C270.561 121.261 265.575 120.468 260.999 118.881C256.422 117.294 252.458 115.033 249.107 112.098C245.838 109.163 243.263 105.672 241.384 101.626C239.504 97.5006 238.564 92.9387 238.564 87.9407Z" fill="#00B284" />
                        <path d="M369.394 77.7072C365.553 75.1683 361.671 73.8992 357.748 73.8992C355.623 73.8992 353.62 74.2562 351.741 74.9702C349.942 75.6842 348.349 76.7153 346.96 78.0642C345.57 79.3333 344.467 80.8803 343.65 82.7052C342.914 84.4503 342.546 86.4341 342.546 88.6552C342.546 90.7972 342.914 92.7803 343.65 94.6052C344.467 96.3503 345.529 97.8973 346.837 99.2462C348.226 100.515 349.861 101.507 351.741 102.221C353.62 102.935 355.623 103.292 357.748 103.292C361.916 103.292 365.798 101.904 369.394 99.1272V117.453C363.918 119.754 358.729 120.904 353.825 120.904C349.248 120.904 344.876 120.15 340.707 118.643C336.621 117.136 332.984 114.994 329.797 112.217C326.691 109.361 324.198 105.989 322.319 102.102C320.439 98.1353 319.499 93.7323 319.499 88.8932C319.499 84.0541 320.398 79.6511 322.196 75.6842C323.994 71.6382 326.446 68.1873 329.552 65.3313C332.657 62.396 336.335 60.135 340.585 58.5483C344.916 56.8823 349.534 56.0493 354.438 56.0493C359.832 56.0493 364.817 57.16 369.394 59.3813V77.7072Z" fill="#00B284" />
                        <path d="M397.742 88.2982C397.742 90.2813 398.11 92.1461 398.845 93.8912C399.581 95.5572 400.561 97.0251 401.787 98.2942C403.095 99.5633 404.607 100.555 406.323 101.269C408.121 101.983 410.041 102.34 412.085 102.34C414.047 102.34 415.886 101.983 417.602 101.269C419.4 100.555 420.912 99.5633 422.138 98.2942C423.445 97.0251 424.467 95.5572 425.203 93.8912C426.02 92.2252 426.428 90.4402 426.428 88.5362C426.428 86.6322 426.02 84.8472 425.203 83.1812C424.467 81.4361 423.445 79.9283 422.138 78.6592C420.912 77.3901 419.4 76.3982 417.602 75.6842C415.886 74.9702 414.047 74.6132 412.085 74.6132C410.041 74.6132 408.121 74.9702 406.323 75.6842C404.607 76.3982 403.095 77.3901 401.787 78.6592C400.561 79.9283 399.581 81.3962 398.845 83.0622C398.11 84.6491 397.742 86.3942 397.742 88.2982ZM425.693 57.9533H448.005V119H425.693V112.217C420.952 118.008 414.537 120.904 406.446 120.904C401.869 120.904 397.66 120.111 393.819 118.524C389.977 116.858 386.626 114.557 383.766 111.622C380.906 108.687 378.658 105.236 377.024 101.269C375.47 97.3023 374.694 92.9791 374.694 88.2982C374.694 83.9351 375.47 79.8093 377.024 75.9222C378.576 71.9553 380.742 68.5047 383.521 65.5693C386.3 62.634 389.61 60.3333 393.451 58.6673C397.292 56.922 401.542 56.0493 406.201 56.0493C414.047 56.0493 420.544 58.707 425.693 64.0224V57.9533Z" fill="#00B284" />
                        <path d="M480.39 29V118.999H458.201V29H480.39Z" fill="#00B284" />
                        <path d="M553.52 29V99.2468H582.329V119.001H529.492V29H553.52Z" fill="#00B284" />
                        <path d="M609.941 57.9543V119.001H587.751V57.9543H609.941ZM586.28 39.5113C586.28 37.8453 586.607 36.2984 587.261 34.8703C587.914 33.363 588.814 32.054 589.958 30.9433C591.102 29.8327 592.41 28.96 593.881 28.3254C595.434 27.6907 597.068 27.3733 598.785 27.3733C600.501 27.3733 602.095 27.6907 603.566 28.3254C605.118 28.96 606.467 29.8327 607.611 30.9433C608.755 32.054 609.654 33.363 610.308 34.8703C610.962 36.2984 611.289 37.8453 611.289 39.5113C611.289 41.1773 610.962 42.764 610.308 44.2713C609.654 45.6993 608.755 46.9687 607.611 48.0794C606.467 49.19 605.118 50.0627 603.566 50.6973C602.095 51.332 600.501 51.6493 598.785 51.6493C597.068 51.6493 595.434 51.332 593.881 50.6973C592.41 50.0627 591.102 49.19 589.958 48.0794C588.814 46.9687 587.914 45.6993 587.261 44.2713C586.607 42.764 586.28 41.1773 586.28 39.5113Z" fill="#00B284" />
                        <path d="M620.2 57.953H642.39V65.6881C645.413 62.118 648.478 59.738 651.584 58.548C654.689 57.2787 658.327 56.644 662.495 56.644C666.908 56.644 670.667 57.358 673.773 58.786C676.96 60.1347 679.657 62.0784 681.864 64.6171C683.662 66.6797 684.888 68.9804 685.542 71.519C686.195 74.0579 686.523 76.9531 686.523 80.206V119H664.333V88.179C664.333 85.1641 664.088 82.7449 663.598 80.92C663.189 79.016 662.413 77.5089 661.268 76.398C660.287 75.446 659.184 74.7719 657.958 74.375C656.732 73.9781 655.425 73.78 654.035 73.78C650.276 73.78 647.375 74.8909 645.331 77.112C643.37 79.254 642.39 82.348 642.39 86.394V119H620.2V57.953Z" fill="#00B284" />
                        <path d="M742.679 79.6108C741.944 76.5959 740.43 74.1767 738.144 72.3518C735.85 70.5269 733.074 69.6148 729.807 69.6148C726.375 69.6148 723.555 70.4877 721.348 72.2328C719.221 73.9779 717.873 76.4377 717.301 79.6108H742.679ZM716.688 92.1058C716.688 101.388 721.183 106.029 730.175 106.029C734.992 106.029 738.634 104.125 741.086 100.317H762.539C758.205 114.28 747.374 121.261 730.052 121.261C724.738 121.261 719.875 120.507 715.462 119C711.048 117.413 707.248 115.192 704.061 112.336C700.955 109.48 698.544 106.069 696.828 102.102C695.111 98.1349 694.253 93.6927 694.253 88.7738C694.253 83.6967 695.07 79.1348 696.705 75.0888C698.34 70.9637 700.669 67.4729 703.693 64.6169C706.717 61.7609 710.354 59.5792 714.604 58.0718C718.936 56.4852 723.8 55.6919 729.194 55.6919C734.502 55.6919 739.283 56.4852 743.538 58.0718C747.785 59.5792 751.384 61.8005 754.326 64.7358C757.268 67.6712 759.511 71.2808 761.068 75.5648C762.619 79.7697 763.398 84.5297 763.398 89.8448V92.1058H716.688Z" fill="#00B284" />
                    </svg>

                </div>

            </div>
        );
    }
}

export default Dashboard;
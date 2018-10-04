import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            total: 0,
            typeSortName: "desc",
            typeSortTotal: "desc"
        }
    };
    async onloadData() {
        if (this.props.user) {
            await axios.get("http://demo2.trieu.pro/carts/listsByUser", {
                params: {
                    user_id: this.props.user.id,
                }
            })
                .then((res) => {
                    let total = 0;
                    if (res.data.data) {
                        for (var order in res.data.data) {
                            total += res.data.data[order].product.price * res.data.data[order].quantity;
                        }
                        const carts = _.orderBy(res.data.data, [c => c.product.name], [this.state.typeSortName]);
                        this.setState({
                            carts: carts,
                            total: total
                        })
                    } else {
                        this.setState({
                            carts: [],
                            total: total
                        })
                    }
                }).catch(error => console.log(error));
        }
    }
    componentDidMount() {
        this.onloadData();
    }

    goToBack = () => {
        this.props.history.push('/');
    }

    onDeleteCarts = (carts_id) => async () => {
        await axios.delete("http://demo2.trieu.pro/carts/deleteByUser",
            {
                data: {
                    carts_id: carts_id,
                }
            })
            .then((res) => {
                console.log(res)
            }).catch(error => console.log(error));

        return this.onloadData();
    }
    onChange = (event) => {
        const carts = this.state.carts;
        carts.forEach(function (val, index) {
            if (val.id == parseInt(event.target.name)) {
                val.quantity = parseInt(event.target.value);
            }
        })
        return this.setState({ carts: carts });
    }
    updateCasts = async () => {
        if (this.state.carts.length > 0) {
            await axios.put("http://demo2.trieu.pro/carts/update", {
                carts: this.state.carts,
            }
            )
                .then(async (res) => {
                    console.log(res)
                }).catch(error => alert("fails"));
            await this.onloadData();
            this.props.history.push('/order');
        }else{
            this.props.history.push('/');
        }
    }
    sortByName = () => {
        let typeSortName = this.state.typeSortName;
        if(typeSortName == "desc"){
            typeSortName = "asc"
        }else{
            typeSortName = "desc"
        }
        let carts = this.state.carts;
        carts = _.orderBy(carts, [c => c.product.name], [typeSortName])
        return this.setState({ carts: carts ,typeSortName:typeSortName});
    }
    sortByTotal= ()=>{
        let typeSortTotal = this.state.typeSortTotal;
        if(typeSortTotal == "desc"){
            typeSortTotal = "asc"
        }else{
            typeSortTotal = "desc"
        }
        let carts = this.state.carts;
        carts = _.orderBy(carts, [c => c.product.price * c.quantity], [typeSortTotal])
        return this.setState({ carts: carts ,typeSortTotal:typeSortTotal});
    }
    render() {
        const carts = this.state.carts.map(cart => <tr key={cart.id}>
            <td>{cart.product.name}</td>
            <td>{cart.product.price}$</td>
            <td><input onChange={this.onChange} name={cart.id} type="number" min="1" value={cart.quantity}></input></td>
            <td>{cart.product.price * cart.quantity}</td>
            <td><button onClick={this.onDeleteCarts(cart.id)}>renmove</button></td>
        </tr>)
        return (
            <div className="wrapper">
                <div className="desc">
                    <h1> cart list</h1>
                    <button className="btn-login" onClick={this.goToBack}>Back</button>
                </div>
                <div className="content">
                    <table style={{ width: '100%' }}>
                        <caption>Monthly savings</caption>
                        <thead>
                            <tr>
                                <th onClick={this.sortByName}><a href="#"> Item</a></th>
                                <th>price</th>
                                <th>quatity</th>
                                <th onClick={this.sortByTotal}><a href="#"> total price</a></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts}
                        </tbody>
                    </table>
                    <div className="cart-total">
                        <h3>Total Amount: {this.state.total}$</h3>
                        <div className='submit'>
                            <button className="btn-login" onClick={this.updateCasts}>Submit</button>
                            <button className="btn-login" onClick={this.goToBack}>cancel</button>
                        </div>
                    </div>
                </div>
                <footer>
                    <a target="_blank" href="https://www.facebook.com/vanpn9x">@phamngocvan</a>
                </footer>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

// Get actions and pass them as props to to BlogContainer
//  > now BlogContainer has this.props.getAllBlog
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}
export default connect(mapStateToProps, null)(CartPage);

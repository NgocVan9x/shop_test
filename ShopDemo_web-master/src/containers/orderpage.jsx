import React, { Component } from 'react';
import axios from 'axios';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      total: 0,
      typeSortName: "desc",
      typeSortTotal: "desc"
    }
  };
  componentDidMount() {
    return axios.get("http://demo2.trieu.pro/order/lists")
      .then((res) => {
        if (res.data.data) {
          let total = 0;
          for (var order in res.data.data) {
            total += res.data.data[order].product.price * res.data.data[order].quantity;
          }
          const orders = _.orderBy(res.data.data, [c => c.product.name], [this.state.typeSortName]);
          this.setState({
            orders: orders,
            total: total
          })
        }

      }).catch(error => console.log(error));
  }
  goToBack = () => {
    this.props.history.push('/');
  }
  sortByName = () => {
    let typeSortName = this.state.typeSortName;
    if (typeSortName == "desc") {
      typeSortName = "asc"
    } else {
      typeSortName = "desc"
    }
    let orders = this.state.orders;
    orders = _.orderBy(orders, [c => c.product.name], [typeSortName])
    return this.setState({ orders: orders, typeSortName: typeSortName });
  }
  sortByTotal = () => {
    let typeSortTotal = this.state.typeSortTotal;
    if (typeSortTotal == "desc") {
      typeSortTotal = "asc"
    } else {
      typeSortTotal = "desc"
    }
    let orders = this.state.orders;
    orders = _.orderBy(orders, [c => c.product.price * c.quantity], [typeSortTotal])
    return this.setState({ orders: orders, typeSortTotal: typeSortTotal });
  }
  render() {
    const orders = this.state.orders.map(order => <tr key={order.id}>
      <td>{order.product.name}</td>
      <td>{order.product.price}$</td>
      <td>{order.quantity}</td>
      <td>{order.product.price * order.quantity}</td>
    </tr>)
    return (
      <div className="wrapper">
        <div className="desc">
          <h1>Order</h1>
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
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
          <div className="cart-total">
            <h3>Total Amount: {this.state.total}$</h3>
          </div>
        </div>

        <footer>
          <a target="_blank" href="https://www.facebook.com/vanpn9x">@phamngocvan</a>
        </footer>
      </div>
    );
  }
}
export default OrderPage;

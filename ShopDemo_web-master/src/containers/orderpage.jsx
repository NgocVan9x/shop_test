import React, { Component } from 'react';
import axios from 'axios';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      total: 0
    }
  };
  componentDidMount() {
    return axios.get("http://localhost:8001/order/lists")
      .then((res) => {
        if (res.data.data) {
          let total = 0;
          for(var order in res.data.data){
            total +=res.data.data[order].product.price* res.data.data[order].quantity;
          }
          this.setState({
            orders: res.data.data,
            total: total
          })
        }

      }).catch(error => console.log(error));
  }
  goToBack = () => {
    this.props.history.push('/');
  }
  render() {
    const orders = this.state.orders.map(order => <tr key={order.id}>
      <td>{order.product.name}</td>
      <td>{order.product.price}$</td>
      <td>{order.quantity}</td>
      <td>{order.product.price* order.quantity}</td>
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
                <th>Item</th>
                <th>price</th>
                <th>quantity</th>
                <th>total price</th>
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

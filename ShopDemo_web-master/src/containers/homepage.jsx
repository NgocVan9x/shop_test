import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  };
  componentDidMount() {
    axios.get("http://demo2.trieu.pro/products/lists")
      .then((res) => {
        if(res.data.data)
        this.setState({
          products: res.data.data
        })
      }).catch(error => console.log(error));
  }
  goToLogin = () => {
    this.props.history.push('/login');
  }
  goToOrder = () => {
    if(this.props.user){
      this.props.history.push('/order');
    }else{
      alert("please login first")
    }
  }
  goToCart = () => {
    if(this.props.user){
      this.props.history.push('/cart');
    }else{
      alert("please login first")
    }
  }

  addToCart = (products_id)=>() =>{
    if(this.props.user){
     return axios.post("http://demo2.trieu.pro/carts/create",{
        users_id: this.props.user.id,
        products_id:products_id
      })
      .then((res) => {
        console.log(res)
      }).catch(error => console.log(error));
    }
    else{
      alert("please login first")
    }
  }
  render() {
    const product = this.state.products.map(product =>
      <div key={product.id} className="product-grid__product-wrapper">
        <div className="product-grid__product">
          <span className="product-grid__title">{product.name}</span>
          <span className="product-grid__price">{product.price}$</span>
          <div className="product-grid__extend-wrapper">
            <div className="product-grid__extend">
              <p className="product-grid__description">{product.desctiption}</p>
              <button className="product-grid__btn product-grid__add-to-cart" onClick={this.addToCart(product.id)}><i className="fa fa-cart-arrow-down"></i> Add to cart</button>
              <span className="product-grid__btn product-grid__view"><i className="fa fa-eye"></i> View more</span>
            </div>
          </div>
        </div>
      </div>
    )
    return (
      <div className="wrapper">
        <div>
          <h1 className="desc"> product list</h1>
          {this.props.user ? <p>Login success</p> : <button className="btn-login" onClick={this.goToLogin}>login</button>}
          <button className="btn-login" onClick={this.goToCart}>cart</button>
          <button className="btn-login" onClick={this.goToOrder}>order</button>
        </div>
        <div className="content">
          <div className="product-grid product-grid--flexbox">
            <div className="product-grid__wrapper">
              {product}
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
export default connect(mapStateToProps, null)(HomePage);

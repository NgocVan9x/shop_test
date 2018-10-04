import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/login';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: "", password: "" } }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }

  onSave = async (event) =>{
    event.preventDefault();
    let rederic = false;
    await this.props.actions.login(this.state.credentials, function (err, res) {
      if (err) {
        console.error('loginUser: ', err);
      } else {
        rederic = true
      }
    });
    if(rederic){
      this.props.history.push('/');
    }
  }
  goToBack = () => {
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="wrapper">
        <div className="desc">
          <h1>Login</h1>
          <button className="btn-login" onClick={this.goToBack}>Back</button>
        </div>
        <div className="content">
          <form role="form" onSubmit={this.handleLogin} className="login">
            <div className="form-content ">
              <div className="form-group has-feedback">
                <input type="text" className="form-control input-underline" placeholder="email" name="email" defaultValue={this.state.credentials.email}
                  onChange={this.onChange} />
                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
              </div>
              <div className="form-group has-feedback">
                <input type="password" className="form-control input-underline" placeholder="Password" name="password" defaultValue={this.state.credentials.password}
                  onChange={this.onChange} />
                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block " onClick={this.onSave} style={{ "fontSize": "14px" }}>Sign In</button>
              </div>
            </div>
          </form>
        </div>

        <footer>
          <a target="_blank" href="https://www.facebook.com/vanpn9x">@phamngocvan</a>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    login: login,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

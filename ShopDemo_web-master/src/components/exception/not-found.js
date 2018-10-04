import React from 'react';

const NotFound = ({ location }) =>
  (<div>
    <section className="container" style={{ padding: '100px 10% 100px 10%', fontSize: '15px' }}>
      <div className="error-page">
        <h2 className="headline text-yellow">404</h2>
        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
          <p>
                        We could not find the page you were looking for <b> {location.pathname}</b>.
                        Meanwhile, you may <a href="/">return to home</a> or try using the search form.
          </p>
          <form className="search-form">
            <div className="input-group">
              <input type="text" name="search" className="form-control" placeholder="Search" />

              <div className="input-group-btn">
                <button type="submit" name="submit" className="btn btn-warning btn-flat"><i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>);
export default NotFound;

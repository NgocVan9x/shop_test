import React from 'react';

const LoadError = (props) =>
  (<div>
    <section className="container" style={{ padding: '100px 10% 100px 10%', fontSize: '15px' }}>
      <div className="error-page">
        <h2 className="headline text-red">500</h2>
        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow"></i> Oops! Something went wrong.</h3>
          <p>
                        We are working on this right away.
                        You may want to <a href="#" onClick={() => window.location.reload()}>retry</a>
          </p>
        </div>
      </div>
    </section>
   </div>);
export default LoadError;

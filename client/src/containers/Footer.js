import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Foodist</h5>
              <p className="grey-text text-lighten-4">
                We're glad that you visited!
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    About
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Help
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Site Rules
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2018 Casey R Harding</div>
        </div>
      </footer>
    );
  }
}

export default Footer;

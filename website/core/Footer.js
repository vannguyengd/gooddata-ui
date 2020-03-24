/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="nav-footer-links-wrapper">
          <div className="nav-footer-links">
            <span className="nav-footer-links-heading">GoodData resources:</span>
            <ul className="nav-footer-links-list">
              <li className="nav-footer-links-list-item">
                <a
                  href="https://developer.gooddata.com/"
                  id="developer-footer-documentation"
                  className="nav-footer-link"
                >
                  Documentation
                </a>
              </li>
              <li className="nav-footer-links-list-item">
                <a
                  href="https://developer.gooddata.com/platform-trial/"
                  id="developer-footer-platform-trial"
                  className="nav-footer-link"
                >
                  Platform trial
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-footer-links">
            <span className="nav-footer-links-heading">Follow the community:</span>
            <ul className="nav-footer-links-list">
              <li className="nav-footer-links-list-item">
                <a
                  href="https://stackoverflow.com/questions/tagged/gooddata"
                  id="developer-footer-stackoverflow"
                  className="nav-footer-link nav-footer-logo nav-footer-logo-stackoverflow"
                  target="_blank"
                />
              </li>
              <li className="nav-footer-links-list-item">
                <a
                  href="https://github.com/gooddata/"
                  id="developer-footer-github"
                  className="nav-footer-link nav-footer-logo nav-footer-logo-github"
                  target="_blank"
                />
              </li>
              <li className="nav-footer-links-list-item">
                <a
                  href="https://twitter.com/gooddata_dev"
                  id="developer-footer-twitter"
                  className="nav-footer-link nav-footer-logo nav-footer-logo-twitter"
                  target="_blank"
                />
              </li>
            </ul>
          </div>
        </section>
        <section className="nav-footer-copyright">Copyright&nbsp;©&nbsp;2007–{currentYear} GoodData&nbsp;Corporation. All&nbsp;Rights&nbsp;Reserved. Code licensed under a dual license - <a href="https://github.com/gooddata/gooddata-react-components/blob/master/LICENSE">CC&nbsp;BY&#8209;NC&nbsp;4.0 for trial&nbsp;experience and&nbsp;GoodData.UI&nbsp;EULA for&nbsp;commercial&nbsp;use</a></section>
      </footer>
    );
  }
}

module.exports = Footer;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');
const Container = CompLibrary.Container;

const CWD = process.cwd();

const siteConfig = require(CWD + '/siteConfig.js');

class NotFound extends React.Component {
  docUrl(doc) {
    const baseUrl = siteConfig.baseUrl;
    return baseUrl + 'docs/' + doc;
  }

  render() {
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <div>
              <header className="postHeader">
                <h3>404 Page</h3>
                <h1 style={styles.h1}>Ohh, there is nothing in here!</h1>
              </header>
              <h2>But you can try</h2>
              <ul>
                <li><a href={this.docUrl('about_gooddataui.html')}>About GoodData.UI</a></li>
                <li><a href={this.docUrl('quickstart.html')}>Start with GoodData.UI</a></li>
              </ul>
            </div>
            <div>
              <img style={styles.img} src="https://www.gooddata.com/img/pages/error/error-404_animation.svg" alt="Where did it go?" />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

NotFound.title = 'Page not found';

const styles = {
  img: {
    float: 'right',
  },
  h1: {
    marginTop: 5,
  }
};

module.exports = NotFound;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');
const Container = CompLibrary.Container;

const semverSatisfies = require("semver").satisfies;
const semverMinimal = require("semver").minSatisfying;
const semverMaximal = require("semver").maxSatisfying;
const semverParse = require("semver").parse;

const CWD = process.cwd();

const siteConfig = require(CWD + '/siteConfig.js');
const versions = require(CWD + '/versions.json');

// UPDATE THESE WHEN A NEW MAJOR IS RELEASED
const currentVersionSemver = ">=8.0.0";
const lastSupportedPrevious = semverMaximal(versions, "^7.0.0")

const sdkUiSemver = ">=8";
const apiReferenceSemver = ">=8.5.0";
const reactComponentsSemver = ">=5 <8";

function getLatestStable(versions) {
  return semverMaximal(versions, currentVersionSemver);
}

function getMajor(version) {
  return semverParse(version).major
}

class Versions extends React.Component {
  docUrl(doc, version) {
    const baseUrl = siteConfig.baseUrl;
    return baseUrl + 'docs/' + (version ? version + '/' : '') + doc;
  }

  renderChangelog(version) {
    const majorVersion = getMajor(version)
    if (majorVersion) {
      const versionForAnchor = version.replace(/\./g, "");

      if (semverSatisfies(version, sdkUiSemver)) {
        return (
          <td>
            <a href={`https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-all/CHANGELOG.md#${versionForAnchor}`}>Changelog</a>
          </td>
        );
      }

      if (semverSatisfies(version, reactComponentsSemver)) {
        return (
          <td>
            <a href={`https://github.com/gooddata/gooddata-react-components/blob/master/CHANGELOG.md#${versionForAnchor}`}>Changelog</a>
          </td>
        );
      }
    }

    return <td>&mdash;</td>;
  }

  renderApiReference(version) {
    if (!version) {
      return (
        <td>
          <a href="https://sdk.gooddata.com/gooddata-ui-apidocs/vNext/index.html">API Reference</a>
        </td>
      );
    }

    if (semverSatisfies(version, apiReferenceSemver)) {
      return (
        <td>
          <a href={`https://sdk.gooddata.com/gooddata-ui-apidocs/v${version}/index.html`}>API Reference</a>
        </td>
      );
    }

    return <td>&mdash;</td>;
  }

  renderMigrationGuide(version, prerelease) {
    const semver = semverParse(version);
    const majorVersion = semver.major;
    const minorVersion = semver.minor;
    const patchVersion = semver.patch;

    if (minorVersion === 0 && patchVersion === 0 && majorVersion > 4) {
      return (
        <td>
          <a href={this.docUrl(`migration_guide_${majorVersion}.html`, prerelease ? 'next' : '')}>Migration Guide</a>
        </td>
      );
    }

    return (<td>&mdash;</td>);
  }

  renderSupportStatus(version) {
    if (semverSatisfies(version, currentVersionSemver) || version === lastSupportedPrevious) {
      return <td>End of Development</td>
    }

    return <td>End of Support</td>
  }

  renderStableVersions() {
    const stableVersions = versions;
    const latestVersion = stableVersions[0];
    if (stableVersions.length > 1) {
      return (
        <div>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
              <tbody>
                {stableVersions.map(
                  (version, i) =>
                    version !== latestVersion && (
                      <tr key={i}>
                        <th>{version}</th>
                        <td>
                            <a href={this.docUrl('about_gooddataui.html', version)}>Documentation</a>
                        </td>
                        { this.renderChangelog(version) }
                        { this.renderMigrationGuide(version) }
                        { this.renderApiReference(version) }
                        { this.renderSupportStatus(version) }
                      </tr>
                    )
                )}
              </tbody>
            </table>
        </div>
      );
    }

    return null;
  }

  render() {
    const latestVersion = getLatestStable(versions);
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + ' Versions'}</h2>
            </header>
            <h3 id="latest">Current version (Stable)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <a href={this.docUrl('about_gooddataui.html')}>Documentation</a>
                  </td>
                  { this.renderChangelog(latestVersion) }
                  { this.renderMigrationGuide(latestVersion) }
                  { this.renderApiReference(latestVersion) }
                  <td>Generally available</td>
                </tr>
              </tbody>
            </table>
            <h3 id="latest">Next version (Pre-release)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>next</th>
                  <td>
                    <a href={this.docUrl('about_gooddataui.html', 'next')}>Documentation</a>
                  </td>
                  { this.renderMigrationGuide(semverMinimal(versions, currentVersionSemver), true) }
                  { this.renderApiReference() }
                </tr>
              </tbody>
            </table>
            {this.renderStableVersions()}
            <p>
              You can find past versions of this project{' '}
              <a href="https://github.com/gooddata/gooddata-react-components/releases"> on GitHub </a>.
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Versions;

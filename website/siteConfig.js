/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.gooddata.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'GoodData.UI' /* title for your website */,
  tagline: 'A powerful JavaScript library for building analytical applications',
  url: 'https://sdk.gooddata.com' /* your website url */,
  baseUrl: '/gooddata-ui/' /* base url for your project */,
  projectName: 'gooddata-ui',
  headerLinks: [
    // Breadcrumbs links
    {href: '/gooddata-ui/docs/about_gooddataui.html', label: 'GoodData.UI'},
    {href: 'https://www.gooddata.com/developers/cloud-native/doc/cloud/', label: 'Docs'},

    // Main nav links
    {href: 'https://university.gooddata.com/', label: 'University'},
    {href: 'https://community.gooddata.com/', label: 'Community'},
    {href: 'https://www.gooddata.com/developers/cloud-native/doc/cloud/', label: 'Documentation'},
    {href: 'https://support.gooddata.com/hc/en-us', label: 'Support'},

    // Secondary nav
    {href: '/gooddata-ui/docs/interactive_examples.html', label: 'Code samples', external: true},
    {href: 'https://gdui-examples.herokuapp.com/', label: 'Gallery', external: true},
    {href: 'https://github.com/gooddata/gooddata-ui-sdk/', label: 'GitHub', external: true},
    {href: '/gooddata-ui/docs/roadmap.html', label: 'Roadmap', external: true},
  ],
  onPageNav: 'separate',
  users,
  // specify old items to hide in newer versions, see https://v1.docusaurus.io/docs/en/site-config#deleteddocs-object
  deletedDocs: {
    "7.0.0": [
      "migration_guide_6",
      "table_totals_in_execution_object"
    ],
    "8.0.0": [
      "migration_guide_7",
      "clean_up_your_code",
      "data_layer",
      "execution_rest_api_and_result",
      "execute_component",
      "table_component"
    ],
    "8.10.0": [
      "dashboard_view_component"
    ],
    "8.11.0": [
      "attribute_element_option"
    ]
  },
  /* path to images for header/footer */
  headerIcon: 'img/gooddata.svg?v=2022',
  footerIcon: 'img/gooddata.svg?v=2022',
  favicon: 'img/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#ED26B7',
    secondaryColor: '#205C3B',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' GoodData',
  organizationName: 'gooddata',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    '/gooddata-ui/js/toggleNav.js',
    '/gooddata-ui/js/resizeRoadmap.js',
    'https://www.gooddata.com/js/vendors/jquery.min.js',
    'https://www.gooddata.com/learn-assets/js/footer-plugin.js',
    '/gooddata-ui/js/footer.js',
    '/gooddata-ui/js/scrollToSelected.js'
  ],
  stylesheets: [
    'https://www.gooddata.com/learn-assets/css/Footer.css'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/gooddata/gooddata-ui-sdk',
  gaTrackingId: 'GTM-5G49LK',
  gaGtag: true,
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
  algolia: {
    appId: 'WMJ16KLCLT',
    apiKey: 'e5b1637b413b99533ae0f13f3d9d1417',
    indexName: 'gooddata',
    algoliaOptions: {
      facetFilters: ['version:VERSION'],
    },
  },
  twitter: 'true',
  twitterImage: 'img/metaimage.png?v=2022',
  ogImage: 'img/metaimage.png?v=2022',
  disableHeaderTitle: true,
  markdownPlugins: [
    function disableLinkify(md) {
      /*
       * Linkify does not play well with the GoodData.CN name.. linkify "auto-magic" can convert this:
       *
       * `## Using @gooddata/catalog-export with GoodData.CN`
       *
       * So that the GoodData.CN will be hyperlink to `http://gooddata.cn`. This is unwanted behavior, we want just plaintext.
       *
       * Because the "auto-magic" is unknown and seems somewhat unpredictable, the code below completely disables
       * the `linkify` rule of the Remarkable lib. Last thing we need is to worry and go through all the docs and verify
       * and work-around the automagic so that there are no links.
       */
      md.core.ruler.disable(['linkify']);
    },
  ],
};

module.exports = siteConfig;

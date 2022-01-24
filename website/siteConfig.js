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
    {href: '/gooddata-ui/', label: 'GoodData.UI'},
    {href: 'https://www.gooddata.com/developers/cloud-native/doc/', label: 'Docs & APIs'},

    // Main nav links
    {href: 'https://www.gooddata.com/developers/', label: 'Developers'},
    {href: 'https://www.gooddata.com/developers/cloud-native/', label: 'GoodData.CN'},
    {href: '/gooddata-ui/', label: 'GoodData.UI'},
    {href: 'https://www.gooddata.com/developers/cloud-native/doc/', label: 'Docs & APIs'},

    // Main nav button
    {href: 'https://www.gooddata.com/developers/cloud-native-community-edition/', label: 'Get GoodData.CN Community Edition'},

    // Secondary nav
    {href: '/gooddata-ui/docs/interactive_examples.html', label: 'Code samples', external: true},
    {href: 'https://gdui-examples.herokuapp.com/', label: 'Gallery', external: true},
    {href: 'https://github.com/gooddata/gooddata-ui-sdk/', label: 'GitHub', external: true},
    {href: '/gooddata-ui/docs/roadmap.html', label: 'Roadmap', external: true},
  ],
  onPageNav: 'separate',
  users,
  /* path to images for header/footer */
  headerIcon: 'img/gooddata.svg?v=2022',
  footerIcon: 'img/gooddata.svg?v=2022',
  favicon: 'img/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#14B2E2',
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
    '/gooddata-ui/js/toggleNav.js'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/gooddata/gooddata-ui-sdk',
  gaTrackingId: 'GTM-5G49LK',
  gaGtag: true,
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
  algolia: {
    apiKey: '96c60b7fb8c45e6d7598a7e4469d175d',
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

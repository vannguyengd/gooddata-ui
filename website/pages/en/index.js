/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className={this.props.className || 'button'} href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const ResponsiveImage = props => (
  <div
    className={'responsiveImage ' + props.className}
    title={props.alt}
    style={{backgroundImage: 'url(' + props.src + ')'}}
  />
);

const SplashContainer = props => (
  <section className="homeContainer">
    <div className="wrapper homeWrapper">{props.children}</div>
  </section>
);

const ProjectTitle = props => (
  <h1 className="projectTitle">
    {siteConfig.title}
  </h1>
);

const ProjectDescription = props => (
  <p className="projectDescription">
    Component library for rapid <br className="noMobile" />
    development of interactive <br className="noMobile" />
    analytical user interfaces
  </p>
)

const SplashParallax = props => (
  <div id="splash-parallax" className="splash-parallax">
    {props.layers.map((layer, index) => (
      <img
        src={layer}
        key={`SplashParallaxLayer${index}`}
        className={`splash-parallax-layer splash-parallax-layer-${index}`}
      />
    ))}
  </div>
)

class HomeSplash extends React.Component {
  render() {
    return (
      <SplashContainer>
        <div className="left">
          <img src="./img/homepage/icon-gooddata-ui.svg" />
          <ProjectTitle />
          <ProjectDescription />
          <div className="buttonWrapper">
            <Button href={docUrl('create_new_application.html')} className="button button-dark">Get GoodData.UI</Button>
            <Button href={docUrl('about_gooddataui.html')} className="button">See documentation</Button>
          </div>
        </div>
        <div className="right">
          <SplashParallax
            layers={[
              "./img/homepage/splash-image-l1.svg",
              "./img/homepage/splash-image-l2.svg",
              "./img/homepage/splash-image-l3.svg",
              "./img/homepage/splash-image-l4.svg"
            ]}
          />
        </div>
      </SplashContainer>
    );
  }
}

const BackgroundBlock = props => (
  <div className={`backgroundBlock backgroundBlock-${props.background} ${props.stretch ? "backgroundBlock-stretch" : ""}`}>
    {props.children}
  </div>
)

const FeaturesBlock = props => (
  <div className={'wrapper featuresBlock featuresBlockText-'+ props.textPosition}>
    <div className="featuresText">
      <h2 className="featuresTitle">{props.title}</h2>
      {props.subtitle && <p className="featuresSubtitle">{props.subtitle}</p>}
      {props.content && props.content.map((content, index) => (<p className="featuresContent" key={props.title + index}>{content}</p>))}
      {props.linkTitle && <a href={props.linkUrl} className="featuresLink">{props.linkTitle}</a>}
      <div>{props.children}</div>
    </div>
    {props.example && (
      <div className="featuresExample">
        {props.example}
      </div>
    )}
  </div>
);

const FeaturesBlockGalleryLink = props => (
  <a href={props.href} className="featuresBlockGalleryLink button-link" target={props.target}>
    {props.text || 'Learn more'}
  </a>
)

const FeaturesBlockGallery = props => {
  const gallery = props.children.map((item, index) => (
    <li key={index} className={`featuresBlockGalleryItem${props.cards ? " card" : ""}`}>
      {item.image && (
        <div className="featuresBlockGalleryImage">
          <img src={item.image} className="featuresBlockGalleryImageImage" width={item.imageWidth} height={item.imageHeight} alt={item.title} />
          {item.imageHover &&
            <img src={item.imageHover}  className="featuresBlockGalleryImageImage featuresBlockGalleryImageHover" width={item.imageWidth} height={item.imageHeight} alt={item.title} />}
        </div>
      )}
      <h4 className="featuresBlockGalleryTitle">{item.title}</h4>
      {item.text && <p className="featuresBlockGalleryText">{item.text}</p>}
      {item.linkHref && <FeaturesBlockGalleryLink href={item.linkHref} text={item.linkText} target={item.linkTarget} />}
      {item.links && item.links.map((link) => (<FeaturesBlockGalleryLink key={link.linkHref} href={link.linkHref} text={link.linkText} target={link.linkTarget} />))}
    </li>
  ));

  return <ul className="featuresBlockGallery">{gallery}</ul>
}

const CodeExample1 = () => (
  <pre className="exampleCode">
    <code className="hljs highlighting">
      <span className="hljs-name">&lt;LineChart</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">measures=</span><span className="hljs-string">&#123;[Md.Volume]&#125;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">trendBy=</span><span className="hljs-string">&#123;Md.DateMonth.Short&#125;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">config=</span><span className="hljs-string">&#123;&#123;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">colors:</span> [<span className="hljs-string">&#39;#14b2e2&#39;</span>, <span className="hljs-string">&#39;#02C18E&#39;</span>]<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-string">&#125;&#125;</span><br/>
      <span className="hljs-name">/&gt;</span>
    </code>
  </pre>
);

const CodeExample2 = () => (
  <pre className="exampleCode">
    <code className="hljs highlighting">
      <span className="hljs-name">&lt;Execute</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">seriesBy=</span><span className="hljs-string">&#123;&lt;[Md.Revenue]&gt;&#125;</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">slicesBy=</span><span className="hljs-string">&#123;&lt;[Md.LocationCity]&gt;&#125;</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">filters=</span><span className="hljs-string">&#123;&lt;filters&gt;&#125;</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">onLoadingChanged=</span><span className="hljs-string">&#123;function&#125;</span>&nbsp;
      <span className="hljs-attr">onError=</span><span className="hljs-string">&#123;function&#125;</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">children=</span><span className="hljs-string">&#123;<span className="hljs-comment">/* your visualization component */</span>&#125;&gt;</span><br/>
      <span className="hljs-name">&lt;/Execute&gt;</span>
    </code>
  </pre>
);

const InstallationExample1 =  (
  <pre className="exampleCode" key="InstallationExample1">
    <code className="hljs highlighting">
      <span className="hljs-comment">// bootstrap and configure your new application</span><br/>
      $ npx @gooddata/create-gooddata-react-app my-app<br/>
    </code>
  </pre>
);

const InstallationExample2 = () => (
  <pre className="exampleCode">
    <code className="hljs highlighting">
      $ cd my-app<br/>
      $ yarn start
    </code>
  </pre>
);

const InstallationExample3 = () => (
  <pre className="exampleCode">
    <code className="hljs highlighting">
      <span className="hljs-name">import</span> <span className="hljs-string">"@gooddata/sdk-ui-charts/styles/css/main.css"</span>;<br/>
      <span className="hljs-name">import</span> <span className="hljs-literal">&#123; LineChart &#125;</span> from <span className="hljs-string">&#39;@gooddata/sdk-ui-charts&#39;</span>;<br/><br/>
      <span className="hljs-name">&lt;LineChart</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">measures=</span><span className="hljs-string">&#123;[Md.Volume]&#125;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">trendBy=</span><span className="hljs-string">&#123;Md.DateMonth.Short&#125;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">config=</span><span className="hljs-string">&#123;&#123;</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-attr">colors:</span> [<span className="hljs-string">&#39;#14b2e2&#39;</span>]<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="hljs-string">&#125;&#125;</span><br/>
      <span className="hljs-name">/&gt;</span>
    </code>
  </pre>
);

const ExampleImage = props => (
  <div className="exampleImage">
    <img src={props.src} alt={props.alt} className="exampleImageImage" />
  </div>
)

const Features = props => (
  <section className="features">
    <BackgroundBlock background="white">
      <FeaturesBlock
        title="What it is for?"
        subtitle={<span>GoodData.UI was designed to help application developers quickly create <br className="noMobile" />and evolve interactive data analytics applications that are tailored to the <br className="noMobile" />needs of your users.</span>}
        example={<FeaturesBlockGallery>
          {[{
            title: 'Productivity',
            image: './img/homepage/productivity.svg',
            text: <span>With pre-built components that connect directly to <br className="noMobile" />the GoodData platform and query engine, your <br className="noMobile" />productivity isn’t impacted by waiting on your <br className="noMobile" />back-end engineers.</span>
          },{
            title: 'Free, open and extensible',
            image: './img/homepage/free-open-extensible.svg',
            text: <span>Free (both as in “freedom” and “free beer”) and <br className="noMobile" />extensible, the open-source library makes it easy to <br className="noMobile" />get started with the Free tier of the GoodData <br className="noMobile" />cloud platform.</span>
          },{
            title: 'Developer friendly',
            image: './img/homepage/developer-friendly.svg',
            text: <span>Get up and running quickly with a set of React.js <br className="noMobile" />components with Typescript types, granular <br className="noMobile" />packaging, detailed documentation, and interactive <br className="noMobile" />code samples.</span>,
          }]}
        </FeaturesBlockGallery>}
        textPosition="center"
        background="gray"
      />
    </BackgroundBlock>
    <BackgroundBlock background="gray">
      <FeaturesBlock
        title="Productivity"
        subtitle="Designed with productivity in mind"
        content={[
          <span>Put pre-built components like Lego bricks together without worrying about writing any <br className="noMobile" />backend code; the GoodData analytics platform takes care of all queries and APIs calls for you.</span>,
          "How does it work? Check out our interactive code examples at CodeSandbox."
        ]}
        example={[
          <FeaturesBlockGallery cards>
            {[{
              title: 'Headline',
              image: './img/homepage/headline.png',
              imageHover: './img/homepage/headline-code.jpg',
              text: "A simple headline report in action.",
              linkText: "Open in Code Sandbox",
              linkHref: "https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-headline?file=/src/App/index.js",
              linkTarget: "_blank"
            },{
              title: 'Combo Chart',
              image: './img/homepage/combo-chart.png',
              imageHover: './img/homepage/combo-chart-code.jpg',
              text: "Try to uncomment a line to add the second series.",
              linkText: "Open in Code Sandbox",
              linkHref: "https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-combochart?file=/src/App/index.js",
              linkTarget: "_blank"
            },{
              title: 'Treemap',
              image: './img/homepage/treemap.png',
              imageHover: './img/homepage/treemap-code.jpg',
              text: "Another simple visualization.",
              linkText: "Open in Code Sandbox",
              linkHref: "https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-chartconfig?file=/src/App/index.js",
              linkTarget: "_blank"
            },{
              title: 'Interactivity',
              image: './img/homepage/interactivity.png',
              imageHover: './img/homepage/interactivity-code.jpg',
              text: "A simple granularity control in action.",
              linkText: "Open in Code Sandbox",
              linkHref: "https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-granularity?file=/src/App/index.js",
              linkTarget: "_blank"
            }]}
          </FeaturesBlockGallery>,
          <Button href={docUrl("interactive_examples.html")} className="button">Find more interactive examples</Button>
        ]}
        textPosition="center"
        background="gray"
      >
      </FeaturesBlock>
    </BackgroundBlock>
    <BackgroundBlock background="white">
      <FeaturesBlock
        title="Developer friendliness"
        subtitle="By developers for developers"
        content={[
          <span>We value simplicity, effectiveness, and good documentation, tutorials, and <br className="noMobile" />code samples. We don’t like surprises either, so our API Maturity <br className="noMobile" />annotations indicate the stability of individual APIs.</span>,
          <span>If you are ready to get started, we recommend following our tutorial or just <br className="noMobile" />scrolling down for more information.</span>,
          <FeaturesBlockGallery cards>
            {[{
              title: 'Tutorial 1',
              text: "Get started with the accelerator toolkit",
              linkText: "Try it yourself",
              linkHref: docUrl("create_new_application.html ")
            },{
              title: 'Tutorial 2',
              text: "Get started with create-react-app",
              links: [
                {
                  linkText: "GoodData platform",
                  linkHref: docUrl("platform_integration.html")
                },
                {
                  linkText: "GoodData.CN",
                  linkHref: docUrl("cloudnative_integration.html")
                }
              ]
            }]}
          </FeaturesBlockGallery>
        ]}
        example={[
          <CodeExample1 key="1" />,
          <ExampleImage src="./img/homepage/example_1.png" alt="Example 1" key="2" />
        ]}
        textPosition="left"
        background="gray"
      />
      {/*<VisualizationsSection />*/}
    </BackgroundBlock>

    <BackgroundBlock background="gray">
      <FeaturesBlock
        title="Flexibility"
        subtitle="Plug it any way you need."
        content={[
          <span>The core part of GoodData.UI is available under the MIT license and is ready to use <br className="noMobile" />with the <a href="https://www.gooddata.com/free">free tier of the GoodData cloud analytics platform</a>.</span>,
          <span>It can be used with our pre-packaged filter components and Highcharts visualizations <br className="noMobile" />or with any of the thousands of controls and charting libraries available via npm.</span>
        ]}
        example={[
          <CodeExample2 key="1" />,
          <ExampleImage src="./img/homepage/example_2.png" alt="Example 2" key="2" />
        ]}
        textPosition="right"
        background="white"
      >
        <ResponsiveImage src="./img/homepage/d3_logo.png" alt="D3.js" className="charting-lib-logo d3-logo" />
        <ResponsiveImage src="./img/homepage/highcharts_logo.png" alt="Highcharts" className="charting-lib-logo highcharts-logo" />
        <ResponsiveImage src="./img/homepage/chartjs_logo.png" alt="Chart.js" className="charting-lib-logo chartjs-logo" />
        <Button href="https://www.npmjs.com/search?q=charts" target="_blank" className="button-more-charts">more charts</Button>
      </FeaturesBlock>
    </BackgroundBlock>
    <BackgroundBlock background="image" stretch>
      <FeaturesBlock
        title="Examples Gallery"
        subtitle={<span>A comprehensive collection of visual GoodData.UI examples, <br className="noMobile" />from simple charts to interactive analytical mini-apps.</span>}
        textPosition="center"
      >
        <Button href="https://gdui-examples.herokuapp.com/" className="button button-inverted">See the gallery</Button>
      </FeaturesBlock>
    </BackgroundBlock>
  </section>
);

const FeatureCalloutBlock = props => (
  <div className="productShowcaseBlock">
    <label>
      <input
        type="radio"
        name="productShowcaseSwitch"
        className="productShowcaseSwitch"
        checked={props.checked}
        readOnly
      />
      <div className="productShowcaseTitle">
        <h4>{props.title}</h4>
      </div>
      <div className="productShowcaseExample">{props.example}</div>
    </label>
  </div>
);

const FeatureCallout = props => (
  <section className="productShowcaseSection">
    <h2>Code your first application</h2>
    <div className="productShowcase wrapper">
      <div className="productShowcaseInner">
        <FeatureCalloutBlock
          title="Bootstrap your application"
          example={[
            InstallationExample1
          ]}
          checked={true}
        />
        <FeatureCalloutBlock
          title="Preview generated app"
          example={[
            <InstallationExample2 key="1" />
          ]}
        />
        <FeatureCalloutBlock
          title="Add a visual component"
          example={[
            <InstallationExample3 key="1" />
          ]}
        />
      </div>
    </div>
  </section>
);

const GetStarted = props => (
  <section className="getStartedSection">
    <BackgroundBlock background="gray">
      <FeaturesBlock
        title="Get started"
        textPosition="center"
        background="gray"
      >
        <FeaturesBlockGallery>
            {[{
              title: 'Documentation',
              image: 'https://www.gooddata.com/learn-assets/img/icon-documentation-c.svg',
              imageHeight: 64,
              text: <span>Find all the details about <br className="noMobile" />GoodData.UI</span>,
              linkText: "See documentation",
              linkHref: docUrl("why_gdui.html")
            },{
              title: 'Interactive Code Samples',
              image: './img/homepage/interactive-code-samples.svg',
              text: <span>Try it yourself and play with our <br className="noMobile" />code samples</span>,
              linkText: "Try interactive code samples",
              linkHref: docUrl("interactive_examples.html")
            },{
              title: 'Examples Gallery',
              image: './img/homepage/examples-gallery.svg',
              text: <span>Browse our huge library full of live <br className="noMobile" />visualisation examples</span>,
              linkText: "Browse gallery",
              linkHref: "https://gdui-examples.herokuapp.com/"
            },{
              title: 'Community',
              image: 'https://www.gooddata.com/learn-assets/img/icon-community-c.svg',
              imageHeight: 66,
              text: <span>Discuss, ask and learn from our <br className="noMobile" />community</span>,
              linkText: "View community",
              linkHref: "https://community.gooddata.com/"
            }]}
          </FeaturesBlockGallery>
      </FeaturesBlock>
    </BackgroundBlock>
  </section>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="homeContainer">
          <Features />
          <FeatureCallout />
          <GetStarted />
        </div>
        <script src="js/parallax.js" />
        <script src="js/gaEvents.js" />
      </div>
    );
  }
}

module.exports = Index;

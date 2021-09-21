import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Swipeable from 'react-swipeable';
import Transition from '../components/transition';
import moment from 'moment';
import ParticleBackground from 'react-particle-backgrounds';

import './index.css';

const settings = {
  canvas: {
    canvasFillSpace: true,
    useBouncyWalls: true,
  },
  particle: {
    particleCount: 55,
    color: '#FF00E3',
    minSize: 1,
    maxSize: 20,
  },
  velocity: {
    minSpeed: 0.1,
    maxSpeed: 0.6,
  },
  opacity: {
    minOpacity: 0,
    maxOpacity: 0.2,
    opacityTransitionTime: 20000,
  },
};

const Header = ({ name, title, date }) => (
  <header>
    <Link to="/1">
      <span>{name}</span>
      <br></br>
      {title}
    </Link>
    <time>{date}</time>
  </header>
);

const date = moment().format('DD/MM/YYYY');
class TemplateWrapper extends Component {
  NEXT = [13, 32, 39];
  PREV = 37;

  swipeLeft = () => {
    this.navigate({ keyCode: this.NEXT[0] });
  };

  swipeRight = () => {
    this.navigate({ keyCode: this.PREV });
  };

  navigate = ({ keyCode }) => {
    const now = this.props.data.slide.index;
    const slidesLength = this.props.slidesLength;

    if (now) {
      if (keyCode === this.PREV && now === 1) {
        return false;
      } else if (this.NEXT.indexOf(keyCode) !== -1 && now === slidesLength) {
        return false;
      } else if (this.NEXT.indexOf(keyCode) !== -1) {
        navigate(`/${now + 1}`);
      } else if (keyCode === this.PREV) {
        navigate(`/${now - 1}`);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.navigate);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.navigate);
  }

  render() {
    const { location, children, site } = this.props;

    return (
      <div>

        <p
          style={{
            fontSize: '10pt',
            marginLeft: '25px',
            position: 'absolute',
            left: '0',
            bottom: '0',
          }}
        >
          arrow keys to navigate
        </p>
        <Helmet
          title={`${site.siteMetadata.title} — ${site.siteMetadata.name}`}
        />
        <Header
          name={site.siteMetadata.name}
          title={site.siteMetadata.title}
          date={date}
        />

        <Swipeable
          onSwipedLeft={this.swipeLeft}
          onSwipedRight={this.swipeRight}
        >
          <Transition location={location}>
            <div id="slide" style={{ width: '100%', zIndex:'999', position:'absolute' }}>
              {children}
            </div>
            
          </Transition>

        </Swipeable>
        <ParticleBackground settings={settings} style={{zIndex:'1'}} />
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            name
            title
            date
          }
        }
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
    render={data => (
      <TemplateWrapper
        site={data.site}
        slidesLength={data.allSlide.edges.length}
        {...props}
      />
    )}
  />
);

import React from 'react';
import { graphql } from 'gatsby';
import ParticleBackground from 'react-particle-backgrounds'

const settings = {
  particle: {
    particleCount: 35,
    color: "#fff",
    minSize: 1,
    maxSize: 4
  },
  velocity: {
    minSpeed: 0.2,
    maxSpeed: 0.4
  },
  opacity: {
    minOpacity: 0,
    maxOpacity: 0.6,
    opacityTransitionTime: 10000
  }
}

export default ({ data, transition }) => (

  

  <div style={{'width': '100%'}}>


    <div
      style={transition && transition.style}
      dangerouslySetInnerHTML={{ __html: data.slide.html }}
    ></div>


  </div>

);

export const query = graphql`
  query SlideQuery($index: Int!) {
    slide(index: { eq: $index }) {
      html
      index
    }
  }
`;

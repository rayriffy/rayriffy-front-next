import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import {createGlobalStyle} from 'styled-components'
import {TypographyStyle} from 'react-typography'
import typography from '../utils/typography'

const GlobalStyle = createGlobalStyle`
  body, html, #__next {
    height: 100%;
    margin: 0;
  }
`

const App = props => {
  const {children} = props

  return (
    <>
      <Helmet
        title="rayriffy"
        titleTemplate="%s · The front frontier of rayriffy.com"
        htmlAttributes={{lang: 'en'}}
        meta={[
          {
            content: 'Phumrapee Limpianchop · Curriculum Vitae',
            name: 'name',
          },
          {
            content: "Hi! I'm Phumrapee Limpianchop, Nice to meet you here.",
            name: 'description',
          },
          {
            content: '#212121',
            name: 'theme-color',
          },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400&font-display=swap',
          },
          {
            rel: 'shortcut icon',
            href: '/static/favicon.png',
          },
          {
            rel: 'apple-touch-icon-precomposed',
            href: '/static/favicon.png',
          },
          {
            rel: 'preconnect',
            href: 'https://blog.rayriffy.com',
          },
          {
            rel: 'preconnect',
            href: 'https://h.rayriffy.com',
          },
          {
            rel: 'preconnect',
            href: 'https://cv.rayriffy.com',
          },
          {
            rel: 'preconnect',
            href: 'https://github.com',
          },
          {
            rel: 'preconnect',
            href: 'https://twitter.com',
          },
          {
            rel: 'preconnect',
            href: 'https://instagram.com',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://blog.rayriffy.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://h.rayriffy.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://cv.rayriffy.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://github.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://twitter.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://instagram.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://fonts.googleapis.com',
          },
        ]}
      />
      <GlobalStyle />
      <TypographyStyle typography={typography} />
      {children}
    </>
  )
}

export default App

App.propTypes = {
  children: PropTypes.node,
}

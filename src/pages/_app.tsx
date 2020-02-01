import React from 'react'

import App from 'next/app'
import Head from 'next/head'

import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import { css, Global } from '@emotion/core'

class NextApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>rayriffy · The front frontier of rayriffy.com</title>
        </Head>
        <ThemeProvider>
          <CSSReset />
          <Global
            styles={css`
              html,
              body,
              #__next {
                height: 100%;
              }

              body {
                background-image: url(/static/main.jpg);
                background-size: cover;
                backdrop-filter: brightness(40%) blur(10px);
              }
            `}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default NextApp

import React from 'react'

import App from 'next/app'
import Head from 'next/head'

import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import { css, Global } from '@emotion/core'

class NextApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <React.StrictMode>
        <Head>
          <title>rayriffy · The front frontier of rayriffy.com</title>
          <meta name='theme-color' content='#2d3748' />
          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='shortcut icon' href='/favicon.png' />
          <link rel='apple-touch-icon' href='/favicon.png' />
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
            `}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.StrictMode>
    )
  }
}

export default NextApp

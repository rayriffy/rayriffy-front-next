import React from 'react'

import App from 'next/app'
import Head from 'next/head'

import AppShell from '../components/app'

class NextApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <AppShell>
        <Head>
          <title>rayriffy · The front frontier of rayriffy.com</title>
          <meta
            name='name'
            content='rayriffy · The front frontier of rayriffy.com'
          />
          <meta
            name='description'
            content="Hi! I'm Phumrapee Limpianchop, Nice to meet you here."
          />
          <meta name='theme-color' content='#212121' />
        </Head>
        <Component {...pageProps} />
      </AppShell>
    )
  }
}

export default NextApp

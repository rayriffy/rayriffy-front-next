import React from 'react'

import Document, { Head, Html, Main, NextScript } from 'next/document'

class NextDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  public render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400&font-display=swap'
          />
          <link rel='shortcut icon' href='/static/favicon.png' />
          <link rel='apple-touch-icon-precomposed' href='/static/favicon.png' />
          <link rel='preconnect' href='https://blog.rayriffy.com' />
          <link rel='preconnect' href='https://h.rayriffy.com' />
          <link rel='preconnect' href='https://cv.rayriffy.com' />
          <link rel='preconnect' href='https://github.com' />
          <link rel='preconnect' href='https://twitter.com' />
          <link rel='preconnect' href='https://instagram.com' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='dns-prefetch' href='https://blog.rayriffy.com' />
          <link rel='dns-prefetch' href='https://h.rayriffy.com' />
          <link rel='dns-prefetch' href='https://cv.rayriffy.com' />
          <link rel='dns-prefetch' href='https://github.com' />
          <link rel='dns-prefetch' href='https://twitter.com' />
          <link rel='dns-prefetch' href='https://instagram.com' />
          <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextDocument

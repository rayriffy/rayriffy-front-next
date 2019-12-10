import React from 'react'

import { css, Global } from '@emotion/core'

import { TypographyStyle } from 'react-typography'
import typography from '../utils/typography'

const App: React.FC = props => {
  const { children } = props

  return (
    <React.Fragment>
      <Global
        styles={css`
          body,
          html,
          #__next {
            height: 100%;
            margin: 0;
          }
        `}
      />
      <TypographyStyle typography={typography} />
      {children}
    </React.Fragment>
  )
}

export default App

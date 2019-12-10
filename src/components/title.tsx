import _ from 'lodash'
import React, { useEffect, useState } from 'react'

import Gamepad, { Button } from 'react-gamepad'

import styled from '@emotion/styled'
import { Box, Flex } from 'rebass'

import Content from './content'

interface IContainer {
  direction: string[]
}

const Cover = styled(Flex)`
  height: 70%;
`

const Container = styled(Box)<IContainer>`
  display: block;
  background-color: transparent;
  text-align: center;
  transition: 150ms;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  ${(props: IContainer) =>
    props.direction.includes('ArrowLeft')
      ? `transform: rotateY(-10deg);`
      : props.direction.includes('ArrowUp')
      ? `transform: rotateX(10deg);`
      : props.direction.includes('ArrowRight')
      ? `transform: rotateY(10deg);`
      : props.direction.includes('ArrowDown')
      ? `transform: rotateX(-10deg);`
      : _.intersection(props.direction, [
          'ArrowLeft',
          'ArrowUp',
          'ArrowRight',
          'ArrowDown',
        ]).length < props.direction.length
      ? `transform: translateZ(-50px);`
      : null}
`

const Logo = styled.svg`
  opacity: 1;
  max-width: 35%;
  border: 0;
`

const Title: React.FC = () => {
  // Init state
  const [key, setKey] = useState<string[]>([])

  const gamepadUpHandler = (e: Button) => {
    if (e === 'DPadUp') {
      setKey(prev => _.filter(prev, o => o !== 'ArrowUp'))
    } else if (e === 'DPadDown') {
      setKey(prev => _.filter(prev, o => o !== 'ArrowDown'))
    } else if (e === 'DPadLeft') {
      setKey(prev => _.filter(prev, o => o !== 'ArrowLeft'))
    } else if (e === 'DPadRight') {
      setKey(prev => _.filter(prev, o => o !== 'ArrowRight'))
    } else {
      setKey(prev => _.filter(prev, o => o !== e))
    }
  }

  const gamepadDownHandler = (e: Button) => {
    if (e === 'DPadUp') {
      setKey(prev => _.union(prev, ['ArrowUp']))
    } else if (e === 'DPadDown') {
      setKey(prev => _.union(prev, ['ArrowDown']))
    } else if (e === 'DPadLeft') {
      setKey(prev => _.union(prev, ['ArrowLeft']))
    } else if (e === 'DPadRight') {
      setKey(prev => _.union(prev, ['ArrowRight']))
    } else {
      setKey(prev => _.union(prev, [e]))
    }
  }

  const keyDownHandler = (e: KeyboardEvent) => {
    // CSS Animation handler
    setKey(prev => _.union(prev, [e.code]))
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    // CSS Animation handler
    setKey(prev => _.filter(prev, o => o !== e.code))
  }

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler)
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <Cover justifyContent='center' alignItems='center'>
      <Gamepad onButtonDown={gamepadDownHandler} onButtonUp={gamepadUpHandler}>
        <React.Fragment />
      </Gamepad>
      <Container direction={key} width={[1, 2 / 3, 3 / 5, 3 / 7]}>
        <Logo
          className='site-title-image'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 370.1 512'>
          <path
            fill='#fff'
            d='M320.61,295.5,447.15,512H329.39L208,303.54H180.18V512H77V0H251.12C365.23,0,425.94,54.13,425.94,145.55,425.94,227.47,389.37,277.21,320.61,295.5ZM180.18,87V216.5h70.94c48.28,0,71.69-15.36,71.69-68,0-36.57-23.41-61.44-71.69-61.44Z'
            transform='translate(-77.04)'
          />
        </Logo>
        <Content />
      </Container>
    </Cover>
  )
}

export default Title

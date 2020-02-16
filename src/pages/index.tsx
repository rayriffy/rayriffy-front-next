import React, { useEffect, useState } from 'react'

import { NextPage } from 'next'

import Img, { FluidObject } from 'gatsby-image'
import {
  FaAddressCard,
  FaExclamationCircle,
  FaFacebook,
  FaGithub,
  FaNewspaper,
  FaTwitter,
} from 'react-icons/fa'

import { Box, Flex, Heading, Link, Slide } from '@chakra-ui/core'

import { Nav } from '../core/components/nav'

interface IProps {
  bg: FluidObject
}

const IndexPage: NextPage<IProps> = props => {
  const { 0: showMenu, 1: setShowMenu } = useState<boolean>(false)
  const { 0: showHead, 1: setShowHead } = useState<boolean>(false)
  const { 0: showH, 1: setShowH } = useState<boolean>(false)

  useEffect(() => {
    setShowHead(true)
    setTimeout(() => {
      setShowMenu(true)
    }, 1000)

    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  let hCount = 0

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 32) {
      hCount++
    }

    if (hCount % 10 === 0 && hCount !== 0) {
      hCount = 0
      setShowH(prev => !prev)
    }
  }

  const leftNav = [
    {
      name: 'blog',
      href: 'https://blog.rayriffy.com',
      icon: FaNewspaper,
    },
    {
      name: 'cv',
      href: 'https://cv.rayriffy.com',
      icon: FaAddressCard,
    },
  ]

  const rightNav = [
    {
      name: 'github',
      href: 'https://github.com/rayriffy',
      icon: FaGithub,
    },
    {
      name: 'facebook',
      href: 'https://facebook.com/rayriffy',
      icon: FaFacebook,
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/rayriffy',
      icon: FaTwitter,
    },
  ]

  return (
    <React.Fragment>
      <Box
        zIndex={-1}
        width='100%'
        height='100%'
        position='absolute'
        overflow='hidden'
        objectFit='cover'>
        <Img
          fluid={props.bg}
          style={{
            height: '100%',
            filter: 'brightness(30%) blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      </Box>
      <Flex
        overflow='hidden'
        height='100%'
        justify='center'
        align='center'
        wrap={['wrap', 'wrap', 'initial']}>
        <Nav transition={showMenu} from='left' items={leftNav}>
          <Slide in={showH} from='left' items={[true]} duration={600}>
            {(styles: any) => {
              const component = (
                <Box
                  px={[4, 4, 2]}
                  py={[2, 2, 4]}
                  transform={styles.transform}
                  opacity={styles.opacity}>
                  <Link href='https://h.rayriffy.com' isExternal>
                    <Box as={FaExclamationCircle} size='32px' color='white' />
                  </Link>
                </Box>
              ) as any

              return component
            }}
          </Slide>
        </Nav>
        <Slide in={showHead} items={[true]} duration={1000} from='bottom'>
          {(styles: any) => {
            const component = (
              <Box px={6} opacity={styles.opacity} transform={styles.transform}>
                <Heading
                  size='md'
                  letterSpacing='0.175em'
                  color='gray.300'
                  textAlign={['left', 'right']}>
                  FULL-STACK DEVELOPER
                </Heading>
                <Heading size='xl' color='white' py={2}>
                  Phumrapee Limpianchop
                </Heading>
                <Heading size='md' letterSpacing='0.175em' color='gray.300'>
                  リッフィー レー
                </Heading>
              </Box>
            ) as any

            return component
          }}
        </Slide>
        <Nav transition={showMenu} from='right' items={rightNav} />
      </Flex>
    </React.Fragment>
  )
}

IndexPage.getInitialProps = async () => {
  const generateFluid = (
    src: string,
    sizes: string = '(max-width: 500px) 100vw, 500px'
  ) => {
    const resizedOriginal = require(`../../assets/${src}?resize&size=500`)
    const images = require(`../../assets/${src}?resize&sizes[]=200&sizes[]=350&sizes[]=500`)
    const webP = require(`../../assets/${src}?webp`)
    const trace = require(`../../assets/${src}?trace`).trace
    const tiny = require(`../../assets/${src}?lqip`)

    const res: FluidObject = {
      base64: tiny,
      src: resizedOriginal.src,
      srcSet: images.srcSet,
      srcWebp: webP,
      srcSetWebp: webP,
      tracedSVG: trace,
      aspectRatio: images.width / images.height,
      sizes,
    }

    return res
  }

  return {
    bg: generateFluid('main.jpg'),
  }
}

export default IndexPage

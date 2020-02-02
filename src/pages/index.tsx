import React from 'react'

import Img, { FluidObject } from 'gatsby-image'
import {
  FaAddressCard,
  FaFacebook,
  FaGithub,
  FaNewspaper,
  FaTwitter,
} from 'react-icons/fa'

import { NextPage } from 'next'

import { Box, Flex, Heading, Link } from '@chakra-ui/core'

interface IProps {
  bg: FluidObject
}

const IndexPage: NextPage<IProps> = props => {
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
            filter: 'brightness(40%) blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      </Box>
      <Flex
        height='100%'
        justify='center'
        align='center'
        wrap={['wrap', 'initial']}>
        <Flex
          width={['100%', 'auto']}
          direction={['row', 'column']}
          justify='center'
          px={12}>
          <Box px={[4, 2]} py={[2, 4]}>
            <Link href='https://blog.rayriffy.com'>
              <Box as={FaNewspaper} size='32px' color='white' />
            </Link>
          </Box>
          <Box px={[4, 2]} py={[2, 4]}>
            <Link href='https://cv.rayriffy.com'>
              <Box as={FaAddressCard} size='32px' color='white' />
            </Link>
          </Box>
        </Flex>
        <Box px={6}>
          <Heading
            size='md'
            letterSpacing='0.175em'
            color='gray.300'
            textAlign={['left', 'right']}>
            FULL-STACK DEVELOPER
          </Heading>
          <Heading size='2xl' color='white' py={2}>
            Phumrapee Limpianchop
          </Heading>
          <Heading size='md' letterSpacing='0.175em' color='gray.300'>
            リッフィー レー
          </Heading>
        </Box>
        <Flex
          width={['100%', 'auto']}
          direction={['row', 'column']}
          justify='center'
          px={12}>
          <Box px={[4, 2]} py={[2, 4]}>
            <Link href='https://github.com/rayriffy'>
              <Box as={FaGithub} size='32px' color='white' />
            </Link>
          </Box>
          <Box px={[4, 2]} py={[2, 4]}>
            <Link href='https://facebook.com/rayriffy'>
              <Box as={FaFacebook} size='32px' color='white' />
            </Link>
          </Box>
          <Box px={[4, 2]} py={[2, 4]}>
            <Link href='https://twitter.com/rayriffy'>
              <Box as={FaTwitter} size='32px' color='white' />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

IndexPage.getInitialProps = async () => {
  const generateFluid = (
    src: string,
    sizes: string = '(max-width: 500px) 100vw, 500px'
  ) => {
    const resizedOriginal = require(`../../assets/${src}?resize&size=550`)
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

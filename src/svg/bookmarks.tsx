import * as React from 'react'

import Svg, { Path } from 'react-native-svg'
import { SvgProps } from 'react-native-svg'

function BookmarksIcon(props: SvgProps) {
  return (
    <Svg
      width={13}
      height={17}
      viewBox="0 0 12.9961 16.752"
      fill="none"
      {...props}
    >
      <Path
        d="M0 16.752L0 1.81055C0 1.30664 0.173828 0.878906 0.521484 0.527344C0.873047 0.175781 1.30078 0 1.80469 0L11.1914 0C11.6953 0 12.1211 0.175781 12.4688 0.527344C12.8203 0.878906 12.9961 1.30664 12.9961 1.81055L12.9961 16.752L6.49805 13.9629L0 16.752ZM1.5 14.4492L6.49805 12.3047L11.4961 14.4492L11.4961 1.81055C11.4961 1.73242 11.4648 1.66211 11.4023 1.59961C11.3398 1.5332 11.2695 1.5 11.1914 1.5L1.80469 1.5C1.72656 1.5 1.65625 1.5332 1.59375 1.59961C1.53125 1.66211 1.5 1.73242 1.5 1.81055L1.5 14.4492ZM1.5 1.5L1.59375 1.5L1.80469 1.5L11.1914 1.5L11.4023 1.5L11.4961 1.5L6.49805 1.5L1.5 1.5Z"
        fillRule="nonzero"
        fill={props.fill || props.color || 'currentColor'}
      />
    </Svg>
  )
}

export default BookmarksIcon

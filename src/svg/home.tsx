import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

function HomeIcon(props: SvgProps) {
  return (
    <Svg
      width={15}
      height={16.9043}
      viewBox="0 0 15 16.9043"
      fill="none"
      {...props}
    >
      <Path
        d="M0 16.9043L0 5.6543L7.5 0L15 5.6543L15 16.9043L9.39844 16.9043L9.39844 10.2012L5.60156 10.2012L5.60156 16.9043L0 16.9043Z"
        fillRule="nonzero"
        fill={props.fill || props.color || 'currentColor'}
      />
    </Svg>
  );
}

export default HomeIcon;

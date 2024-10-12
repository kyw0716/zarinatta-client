import { CSSProperties, ReactNode } from 'react';
import { ColorType, color } from './Color';

type TextType =
  | 'regular-12'
  | 'regular-13'
  | 'regular-14'
  | 'regular-16'
  | 'regular-20'
  | 'medium-13'
  | 'medium-16'
  | 'medium-20'
  | 'semiBold-16'
  | 'semiBold-20'
  | 'semiBold-24'
  | 'semiBold-32'
  | 'bold-20'
  | 'bold-24'
  | 'bold-32';

interface TextProps {
  children: ReactNode;
  type?: TextType;
  colorType?: ColorType | 'white';
  style?: CSSProperties;
  onClick?: () => void;
}

const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

export default function Text({
  type = 'regular-14',
  children,
  colorType = 'gray950',
  style,
  onClick,
}: TextProps) {
  const [weight, size] = type.split('-');

  return (
    <span
      style={{
        fontWeight: FONT_WEIGHT[weight as keyof typeof FONT_WEIGHT],
        fontSize: `${size}px`,
        color: colorType === 'white' ? 'white' : color[colorType],
        lineHeight: '150%',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

import Image from 'next/image';

const DEFAULT_SIZE = 20;

interface LogoProps {
   width?: number;
   height?: number;
}

export const Logo = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE }: LogoProps) => {
   return (
      <Image src="/android-chrome-512x512.png" alt="Pokéflou Logo" width={width} height={height} />
   );
};

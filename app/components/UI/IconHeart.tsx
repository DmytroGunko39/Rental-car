interface IconHeartProps {
  active: boolean;
  size?: number;
}

export default function IconHeart({ active, size = 16 }: IconHeartProps) {
  const src = active ? '/heart-filled.svg' : '/heart-outline.svg';

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="heart"
      className="pointer-events-none"
    />
  );
}

interface MarginProps {
  vertical?: boolean;
  horizontal?: boolean;
  size: number;
}

export default function Margin({ vertical, horizontal, size }: MarginProps) {
  return <div style={{ marginTop: vertical ? size : 0, marginRight: horizontal ? size : 0 }} />;
}

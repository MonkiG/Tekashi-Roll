export default function LocationIcon ({
  width = 800,
  height = 800,
  fill = 'none',
  strokeWidth = 2,
  stroke = '#000'
}) {
  return (

        <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
  )
}

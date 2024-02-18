export default function CircleFilled ({
  width = 25,
  height = 25,
  color = 'enable',
  strokeWidth = 2,
  stroke = '#fff'
}): JSX.Element {
  const colors: Record<string, { stroke: string, fill: string }> = {
    enable: {
      stroke: '#004d00',
      fill: '#33cc33'
    },
    disable: {
      stroke: '#990000',
      fill: '#ff3333'
    }
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill={colors[color].fill}></path> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={colors[color].stroke} strokeWidth="1.5"></path> </g></svg>
  )
}

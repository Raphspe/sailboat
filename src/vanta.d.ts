/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vanta/dist/vanta.waves.min' {
  const WAVES: (opts: Record<string, any>) => { destroy: () => void }
  export default WAVES
}

declare module 'three' {
  const THREE: any
  export default THREE
  export * from 'three'
}

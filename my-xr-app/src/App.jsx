import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'

const store = createXRStore()

function Scene() {
  return (
    <>
      <color attach="background" args={['#1e1e24']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1} />

      <mesh position={[0, 1.6, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#777" />
      </mesh>
    </>
  )
}

export default function App() {
  const [status, setStatus] = useState('XR: not started')

  return (
    <>
      {/* כפתור XR פשוט. כשיהיו משקפיים תוכל להיכנס ל-VR/AR מפה */}
      <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 8 }}>
        <button onClick={() => store.enterVR?.()} >Enter VR</button>
        <button onClick={() => store.enterAR?.()} >Enter AR</button>
        <span style={{ color: 'white', marginLeft: 8 }}>{status}</span>
      </div>

      <Canvas camera={{ position: [0, 1.6, 3], fov: 70 }} style={{ width: '100%', height: '100%' }}>
        <XR
          store={store}
          onSessionStart={() => setStatus('XR: session started')}
          onSessionEnd={() => setStatus('XR: session ended')}
        >
          <Scene />
        </XR>

        {/* כדי שתראה משהו במחשב בלי משקפיים */}
        <OrbitControls target={[0, 1.6, 0]} />
      </Canvas>
    </>
  )
}

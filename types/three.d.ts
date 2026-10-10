import type React from "react"

declare global {
  namespace THREE {
    interface Event {
      stopPropagation(): void
    }
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    primitive: {
      object: THREE.Object3D
      ref?: React.Ref<THREE.Group>
      scale?: [number, number, number] | number
      position?: [number, number, number]
      rotation?: [number, number, number]
      onPointerOver?: (event: THREE.Event) => void
      onPointerOut?: (event: THREE.Event) => void
      onClick?: (event: THREE.Event) => void
    }
  }
}

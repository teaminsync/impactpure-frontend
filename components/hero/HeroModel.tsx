"use client"

import { Suspense, useState, useRef, useEffect, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Plane } from "@react-three/drei"
import type * as THREE from "three"
import { motion as motion3D } from "framer-motion-3d"

// Define proper types for the GLTF models
interface GLTFResult {
  scene: THREE.Group
  nodes: { [name: string]: THREE.Object3D }
  materials: { [name: string]: THREE.Material }
}

interface HeroModelProps {
  onModelLoaded?: () => void
}

// Preload models immediately when module loads (not when component mounts)
useGLTF.preload("/Impactpure.glb")
useGLTF.preload("/all seprate.glb")

// Global cache to prevent reloading
const modelsCache: {
  assembled?: GLTFResult
  dismantled?: GLTFResult
  loaded?: boolean
} = {}

// Optimized model component with improved double-click handling
const Model = ({ onModelLoaded }: { onModelLoaded: () => void }) => {
  // Use cached models if available, otherwise load fresh
  const assembledModel = useGLTF("/Impactpure.glb") as GLTFResult
  const dismantledModel = useGLTF("/all seprate.glb") as GLTFResult

  const [isDismantled, setIsDismantled] = useState<boolean>(false)
  const [hovered, setHovered] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [modelsReady, setModelsReady] = useState(false)
  const modelRef = useRef<THREE.Group>(null)

  // Double-click detection state
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clickCountRef = useRef(0)

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Check if models are loaded and cache them
  useEffect(() => {
    if (assembledModel?.scene && dismantledModel?.scene && !modelsReady) {
      console.log("✅ Models loaded successfully")

      // Cache the models globally
      modelsCache.assembled = assembledModel
      modelsCache.dismantled = dismantledModel
      modelsCache.loaded = true

      setModelsReady(true)
      onModelLoaded()
    } else if (modelsCache.loaded && !modelsReady) {
      // Use cached models
      console.log("✅ Using cached models")
      setModelsReady(true)
      onModelLoaded()
    }
  }, [assembledModel, dismantledModel, modelsReady, onModelLoaded])

  // Apply transparency effects exactly like your original JSX
  useEffect(() => {
    const applyTransparency = (model: GLTFResult) => {
      model.scene.traverse((node: any) => {
        if (node.isMesh) {
          node.material.transparent = true
          node.material.opacity = hovered ? 0.4 : 1
          node.material.depthWrite = !hovered
          node.material.color.set(node.material.color.getHex())
        }
      })
    }

    if (modelsReady) {
      applyTransparency(assembledModel)
      applyTransparency(dismantledModel)
    }
  }, [hovered, isDismantled, assembledModel, dismantledModel, modelsReady])

  // Event handlers
  const handlePointerOver = useCallback(() => {
    if (!isMobile) setHovered(true)
  }, [isMobile])

  const handlePointerOut = useCallback(() => {
    if (!isMobile) setHovered(false)
  }, [isMobile])

  // Improved click handling with custom double-click detection
  const handleClick = useCallback(
    (event: any) => {
      // Prevent event bubbling
      event.stopPropagation()

      if (isMobile) {
        // On mobile, single click toggles
        setIsDismantled((prev) => !prev)
        return
      }

      // Desktop: Custom double-click detection
      clickCountRef.current += 1

      if (clickCountRef.current === 1) {
        // First click - start timer
        clickTimeoutRef.current = setTimeout(() => {
          // Single click timeout - reset counter
          clickCountRef.current = 0
        }, 300) // 300ms window for double-click
      } else if (clickCountRef.current === 2) {
        // Double click detected
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
          clickTimeoutRef.current = null
        }
        clickCountRef.current = 0

        // Toggle the model
        console.log("Double-click detected - toggling model")
        setIsDismantled((prev) => !prev)
      }
    },
    [isMobile],
  )

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [])

  if (!assembledModel?.scene || !dismantledModel?.scene) {
    return null
  }

  return (
    <motion3D.group
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: hovered ? 1.05 : 1,
        opacity: hovered ? 0.9 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <primitive
        ref={modelRef}
        object={isDismantled ? dismantledModel.scene : assembledModel.scene}
        scale={[0.09, 0.09, 0.09]}
        position={[0, 3.4, 0]}
        rotation={[Math.PI, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />

      {/* Subtle Shadow Plane - positioned lower and with proper rendering order */}
      <Plane args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
        <meshStandardMaterial
          attach="material"
          color="black"
          opacity={0.15}
          transparent
          depthWrite={false}
          renderOrder={-1}
        />
      </Plane>
    </motion3D.group>
  )
}

const HeroModel = ({ onModelLoaded }: HeroModelProps) => {
  const [loadingError, setLoadingError] = useState<string | null>(null)

  const handleModelLoaded = useCallback(() => {
    console.log("🎯 Model loaded callback triggered")
    onModelLoaded?.()
  }, [onModelLoaded])

  const handleCanvasCreated = useCallback(({ gl, camera }: any) => {
    // Make background transparent instead of white
    gl.setClearColor(0x000000, 0) // Set alpha to 0 for transparency
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.updateProjectionMatrix()
    console.log("🎨 Canvas created successfully")
  }, [])

  const handleError = useCallback((error: any) => {
    console.error("❌ Canvas error:", error)
    setLoadingError("Failed to initialize 3D canvas")
  }, [])

  if (loadingError) {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-neutral-500 mb-4">3D Model Unavailable</div>
          <div className="text-sm text-neutral-400">Please check your internet connection</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        shadows
        onCreated={handleCanvasCreated}
        onError={handleError}
        dpr={[0.8, 1.5]}
        performance={{ min: 0.3 }}
        gl={{
          antialias: true,
          alpha: true, // Enable alpha for transparency
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        {/* Removed the color background to allow transparency */}

        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <spotLight position={[10, 15, 10]} intensity={1.2} angle={0.4} penumbra={0.8} castShadow />

        {/* Studio Environment */}
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <motion3D.group>
            <Model onModelLoaded={handleModelLoaded} />
          </motion3D.group>
        </Suspense>

        {/* OrbitControls matching your original settings */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={1}
          autoRotate={true}
          autoRotateSpeed={1.5}
          enableDamping={true}
          dampingFactor={0.1}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

export default HeroModel

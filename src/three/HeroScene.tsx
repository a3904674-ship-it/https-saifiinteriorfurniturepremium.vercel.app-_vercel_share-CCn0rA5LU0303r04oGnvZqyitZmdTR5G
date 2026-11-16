import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { woodTexture } from "./wood";

/* ---------------------------------------------------------------- */
/* Small furniture builders                                          */
/* ---------------------------------------------------------------- */

function SlatWall({ position = [0, 0, 0] as [number, number, number] }) {
  const slats = useMemo(() => new Array(26).fill(0), []);
  const tex = useMemo(() => woodTexture("#5c3d26", "#412a18", 0.25, 3), []);
  return (
    <group position={position}>
      <mesh position={[1.02, 1.4, -0.02]}>
        <boxGeometry args={[2.18, 2.85, 0.04]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      {slats.map((_, i) => (
        <mesh key={i} position={[-0.03 + i * 0.085, 1.4, 0.02]}>
          <boxGeometry args={[0.055, 2.85, 0.055]} />
          <meshStandardMaterial map={tex} roughness={0.6} />
        </mesh>
      ))}
      {/* LED cove glow strip */}
      <mesh position={[1.02, 2.86, 0.08]}>
        <boxGeometry args={[2.2, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ffdba6"
          emissive="#ffc98a"
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[1.02, 2.7, 0.5]}
        color="#ffbe78"
        intensity={2.4}
        distance={4}
        decay={2}
      />
    </group>
  );
}

function Credenza({ position = [0, 0, 0] as [number, number, number] }) {
  const tex = useMemo(() => woodTexture("#7a5230", "#5a3a20", 2, 1), []);
  return (
    <group position={position}>
      {/* body */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[1.9, 0.46, 0.42]} />
        <meshStandardMaterial map={tex} roughness={0.5} />
      </mesh>
      {/* top slab */}
      <mesh position={[0, 0.875, 0]}>
        <boxGeometry args={[1.98, 0.03, 0.46]} />
        <meshStandardMaterial map={tex} roughness={0.42} />
      </mesh>
      {/* brass legs */}
      {[
        [-0.86, -0.16],
        [0.86, -0.16],
        [-0.86, 0.16],
        [0.86, 0.16],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 12]} />
          <meshStandardMaterial color="#b08954" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* door grooves */}
      {[-0.32, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0.62, 0.212]}>
          <boxGeometry args={[0.012, 0.42, 0.004]} />
          <meshStandardMaterial color="#31200f" roughness={0.8} />
        </mesh>
      ))}
      {/* decor: vase */}
      <mesh position={[-0.6, 1.0, 0]}>
        <cylinderGeometry args={[0.05, 0.085, 0.24, 24]} />
        <meshStandardMaterial color="#d8cfc0" roughness={0.5} />
      </mesh>
      <mesh position={[-0.6, 1.16, 0]} rotation={[0.22, 0, 0.12]}>
        <cylinderGeometry args={[0.004, 0.004, 0.5, 6]} />
        <meshStandardMaterial color="#8a6a48" roughness={0.9} />
      </mesh>
      {/* books */}
      {[
        [0.42, 0.905, 0, 0.28, 0.035, "#a34f33"],
        [0.42, 0.938, 0, 0.24, 0.03, "#22313e"],
        [0.42, 0.966, 0, 0.2, 0.026, "#caa96a"],
      ].map(([x, y, z, w, h, c], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[w as number, h as number, 0.18]} />
          <meshStandardMaterial color={c as string} roughness={0.75} />
        </mesh>
      ))}
      {/* bowl */}
      <mesh position={[0.78, 0.915, 0.02]} scale={[1, 0.45, 1]}>
        <sphereGeometry args={[0.09, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3f3a35" roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  );
}

function FloorLamp({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.04, 32]} />
        <meshStandardMaterial color="#2a2118" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 1.66, 12]} />
        <meshStandardMaterial color="#8a6a3c" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* glowing dome shade */}
      <mesh position={[0, 1.72, 0]} scale={[1, 0.72, 1]}>
        <sphereGeometry args={[0.17, 32, 24]} />
        <meshStandardMaterial
          color="#fff1d8"
          emissive="#ffcf94"
          emissiveIntensity={2.6}
          toneMapped={false}
          roughness={0.4}
        />
      </mesh>
      <pointLight
        position={[0, 1.72, 0]}
        color="#ffc689"
        intensity={3.4}
        distance={5.5}
        decay={2}
      />
    </group>
  );
}

function LoungeChair({ position = [0, 0, 0], rotationY = 0 }: {
  position?: [number, number, number];
  rotationY?: number;
}) {
  const fabric = "#e9e2d4";
  const boucle = { roughness: 0.95 };
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* seat */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.78, 0.22, 0.72]} />
        <meshStandardMaterial color={fabric} {...boucle} />
      </mesh>
      {/* back */}
      <mesh position={[0, 0.72, -0.28]} rotation={[-0.14, 0, 0]}>
        <boxGeometry args={[0.78, 0.72, 0.16]} />
        <meshStandardMaterial color={fabric} {...boucle} />
      </mesh>
      {/* arms */}
      {[-0.39, 0.39].map((x) => (
        <mesh key={x} position={[x, 0.52, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.72]} />
          <meshStandardMaterial color={fabric} {...boucle} />
        </mesh>
      ))}
      {/* cushion accent */}
      <mesh position={[0, 0.52, 0.06]} rotation={[0.1, 0.3, 0.04]}>
        <boxGeometry args={[0.4, 0.16, 0.34]} />
        <meshStandardMaterial color="#b5875a" roughness={0.9} />
      </mesh>
      {/* legs */}
      {[
        [-0.3, -0.26],
        [0.3, -0.26],
        [-0.3, 0.26],
        [0.3, 0.26],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.115, z]}>
          <cylinderGeometry args={[0.014, 0.014, 0.23, 10]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Rug() {
  return (
    <mesh position={[0.4, 0.012, 1.15]} rotation={[0, 0.25, 0]}>
      <cylinderGeometry args={[1.45, 1.45, 0.016, 64]} />
      <meshStandardMaterial color="#c8b294" roughness={1} />
    </mesh>
  );
}

function ArtFrame({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.72, 0.95, 0.035]} />
        <meshStandardMaterial color="#2b2117" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.62, 0.85]} />
        <meshStandardMaterial color="#c9b191" roughness={0.85} />
      </mesh>
      <mesh position={[0.02, -0.04, 0.025]}>
        <planeGeometry args={[0.3, 0.42]} />
        <meshStandardMaterial color="#8a5a38" roughness={0.85} />
      </mesh>
    </group>
  );
}

function SideTable({ position = [0, 0, 0] as [number, number, number] }) {
  const tex = useMemo(() => woodTexture("#5c3d26", "#412a18", 1, 0.4), []);
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.03, 40]} />
        <meshStandardMaterial map={tex} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.05, 0.48, 16]} />
        <meshStandardMaterial color="#b08954" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0.06, 0.55, 0.02]} scale={[1, 1.15, 1]}>
        <sphereGeometry args={[0.055, 20, 14]} />
        <meshStandardMaterial color="#8b6f4e" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(70 * 3);
    for (let i = 0; i < 70; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = 0.2 + Math.random() * 2.8;
      arr[i * 3 + 2] = -2 + Math.random() * 4.5;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.01;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.06;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffdfae"
        transparent
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Slow cinematic camera drift + mouse parallax */
function CameraRig() {
  const target = useRef(new THREE.Vector3(0.15, 1.15, 0));
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.elapsedTime;
    const drift = Math.sin(t * 0.12) * 0.22;
    const px = pointer.x * 0.55;
    const py = pointer.y * 0.28;
    camera.position.x += (0.1 + drift + px - camera.position.x) * 0.045;
    camera.position.y += (1.62 + py * -1 - camera.position.y) * 0.045;
    camera.position.z += (6.15 + Math.cos(t * 0.09) * 0.12 - camera.position.z) * 0.045;
    camera.lookAt(target.current);
  });
  return null;
}

function Room() {
  const floorTex = useMemo(() => woodTexture("#b08a5e", "#8a6842", 5, 5), []);
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial map={floorTex} roughness={0.75} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 2, -2.2]}>
        <planeGeometry args={[24, 5]} />
        <meshStandardMaterial color="#ece5d6" roughness={0.95} />
      </mesh>
      {/* left wall */}
      <mesh position={[-3.6, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[24, 5]} />
        <meshStandardMaterial color="#e4dcc9" roughness={0.95} />
      </mesh>

      <SlatWall position={[1.35, 0, -2.14]} />
      <ArtFrame position={[-2.15, 1.62, -2.16]} />
      <Credenza position={[-1.5, 0, -1.85]} />
      <FloorLamp position={[-2.85, 0, -1.55]} />
      <LoungeChair position={[0.85, 0, 0.9]} rotationY={-0.5} />
      <SideTable position={[1.85, 0, 0.55]} />
      <Rug />
      <Dust />

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.52}
        scale={11}
        blur={2.6}
        far={3.2}
        resolution={512}
        color="#2b1d10"
        frames={1}
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="canvas-in"
      dpr={[1, 1.8]}
      camera={{ position: [0.1, 1.62, 6.15], fov: 33, near: 0.1, far: 40 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <fog attach="fog" args={["#ddd3bf", 10, 20]} />
      <ambientLight intensity={0.5} color="#ffeedd" />
      <directionalLight position={[-5, 4.5, 3]} intensity={1.15} color="#fff2e0" />
      <directionalLight position={[6, 3, 4]} intensity={0.35} color="#ffe3c2" />
      <spotLight
        position={[0, 4.4, 1.2]}
        angle={0.75}
        penumbra={0.9}
        intensity={1.4}
        color="#ffe9cd"
        distance={10}
        decay={1.6}
      />
      <CameraRig />
      <Room />
    </Canvas>
  );
}

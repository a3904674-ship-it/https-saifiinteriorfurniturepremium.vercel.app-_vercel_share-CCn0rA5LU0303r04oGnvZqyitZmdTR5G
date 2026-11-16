import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { woodTexture } from "./wood";
import type { Finish } from "@/data/site";

export interface ConfigState {
  wood: Finish;
  laminate: Finish;
  wall: Finish;
  handle: "brass" | "black" | "none";
}

/* ---------------------------------------------------------------- */

function SlatPanel({ wood }: { wood: Finish }) {
  const tex = useMemo(
    () => woodTexture(wood.hex, wood.grain ?? "#3a2a1a", 0.3, 2.6),
    [wood]
  );
  return (
    <group position={[-0.25, 0, 0]}>
      <mesh position={[0, 1.62, 0]}>
        <boxGeometry args={[1.62, 2.72, 0.05]} />
        <meshStandardMaterial color="#241a10" roughness={0.9} />
      </mesh>
      {Array.from({ length: 17 }).map((_, i) => (
        <mesh key={i} position={[-0.77 + i * 0.096, 1.62, 0.045]}>
          <boxGeometry args={[0.062, 2.72, 0.05]} />
          <meshStandardMaterial map={tex} roughness={wood.roughness} />
        </mesh>
      ))}
      {/* cove LED along the top */}
      <mesh position={[0, 3.0, 0.06]}>
        <boxGeometry args={[1.64, 0.025, 0.025]} />
        <meshStandardMaterial
          color="#ffdba6"
          emissive="#ffc98a"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, 2.9, 0.45]}
        color="#ffbe78"
        intensity={1.9}
        distance={3.4}
        decay={2}
      />
    </group>
  );
}

function TvScreen() {
  return (
    <group position={[-0.25, 1.62, 0.11]}>
      <mesh>
        <boxGeometry args={[1.14, 0.66, 0.045]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[1.08, 0.6]} />
        <meshStandardMaterial
          color="#11161d"
          emissive="#1b2836"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
      {/* subtle screen horizon graphic */}
      <mesh position={[0, -0.08, 0.026]}>
        <planeGeometry args={[1.0, 0.28]} />
        <meshStandardMaterial
          color="#2c3d50"
          emissive="#31465e"
          emissiveIntensity={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Console({
  laminate,
  handle,
}: {
  laminate: Finish;
  handle: ConfigState["handle"];
}) {
  const fronts = [-0.8, 0, 0.8];
  return (
    <group position={[-0.25, 0.52, 0.28]}>
      <mesh>
        <boxGeometry args={[2.42, 0.34, 0.38]} />
        <meshStandardMaterial color="#17110b" roughness={0.7} />
      </mesh>
      {/* drawer fronts */}
      {fronts.map((x, i) => (
        <group key={i} position={[x, 0, 0.195]}>
          <mesh>
            <boxGeometry args={[0.77, 0.31, 0.02]} />
            <meshStandardMaterial
              color={laminate.hex}
              roughness={laminate.roughness}
            />
          </mesh>
          {handle === "brass" && (
            <group position={[0, 0.1, 0.03]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.008, 0.008, 0.2, 10]} />
                <meshStandardMaterial
                  color="#c39a5e"
                  metalness={0.9}
                  roughness={0.25}
                />
              </mesh>
              {[-0.08, 0.08].map((dx) => (
                <mesh key={dx} position={[dx, 0, -0.015]}>
                  <cylinderGeometry args={[0.004, 0.004, 0.03, 8]} />
                  <meshStandardMaterial
                    color="#c39a5e"
                    metalness={0.9}
                    roughness={0.25}
                  />
                </mesh>
              ))}
            </group>
          )}
          {handle === "black" && (
            <mesh position={[0, 0.145, 0.012]}>
              <boxGeometry args={[0.77, 0.02, 0.012]} />
              <meshStandardMaterial color="#0d0d0d" roughness={0.45} />
            </mesh>
          )}
        </group>
      ))}
      {/* under-glow */}
      <mesh position={[0, -0.185, 0.05]}>
        <boxGeometry args={[2.3, 0.02, 0.3]} />
        <meshStandardMaterial
          color="#ffd9a0"
          emissive="#ffc27e"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, -0.3, 0.35]}
        color="#ffbe78"
        intensity={1.1}
        distance={2.4}
        decay={2}
      />
    </group>
  );
}

function Shelves({ wood }: { wood: Finish }) {
  const tex = useMemo(
    () => woodTexture(wood.hex, wood.grain ?? "#3a2a1a", 1, 0.2),
    [wood]
  );
  return (
    <group position={[1.05, 0, 0.1]}>
      {[2.06, 2.42].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.6, 0.035, 0.24]} />
          <meshStandardMaterial map={tex} roughness={wood.roughness} />
        </mesh>
      ))}
      {/* brass ring sculpture */}
      <mesh position={[-0.12, 2.15, 0]}>
        <torusGeometry args={[0.055, 0.012, 12, 32]} />
        <meshStandardMaterial color="#c39a5e" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* books */}
      {[
        [0.14, 2.1, "#a34f33"],
        [0.14, 2.13, "#22313e"],
      ].map(([x, y, c], i) => (
        <mesh key={i} position={[x as number, y as number, 0]}>
          <boxGeometry args={[0.16, 0.028, 0.14]} />
          <meshStandardMaterial color={c as string} roughness={0.8} />
        </mesh>
      ))}
      {/* vase upper shelf */}
      <mesh position={[0.1, 2.51, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.16, 20]} />
        <meshStandardMaterial color="#d8cfc0" roughness={0.5} />
      </mesh>
      <mesh position={[0.1, 2.64, 0]} rotation={[0.16, 0, 0.1]}>
        <cylinderGeometry args={[0.003, 0.003, 0.3, 6]} />
        <meshStandardMaterial color="#8a6a48" roughness={0.9} />
      </mesh>
    </group>
  );
}

function FloorVase() {
  return (
    <group position={[-1.65, 0, 0.5]}>
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.11, 0.15, 0.62, 24]} />
        <meshStandardMaterial color="#3e3833" roughness={0.5} />
      </mesh>
      {[-0.25, 0.05, 0.3].map((r, i) => (
        <mesh key={i} position={[0, 0.85, 0]} rotation={[r * 0.3, 0, r]}>
          <cylinderGeometry args={[0.005, 0.005, 0.85, 6]} />
          <meshStandardMaterial color="#97795a" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function WallUnit({ config }: { config: ConfigState }) {
  const floorTex = useMemo(() => woodTexture("#b08a5e", "#8a6842", 4, 4), []);
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.9]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial map={floorTex} roughness={0.72} />
      </mesh>
      {/* painted wall */}
      <mesh position={[0, 1.85, -0.1]}>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color={config.wall.hex} roughness={0.94} />
      </mesh>
      {/* skirting */}
      <mesh position={[0, 0.045, -0.06]}>
        <boxGeometry args={[7, 0.09, 0.03]} />
        <meshStandardMaterial color="#efe9dd" roughness={0.7} />
      </mesh>

      <SlatPanel wood={config.wood} />
      <TvScreen />
      <Console laminate={config.laminate} handle={config.handle} />
      <Shelves wood={config.wood} />
      <FloorVase />

      <ContactShadows
        position={[0, 0.005, 0.9]}
        opacity={0.5}
        scale={7}
        blur={2.4}
        far={3}
        resolution={256}
        color="#26190d"
      />
    </group>
  );
}

export default function MediaWallConfigurator({
  config,
}: {
  config: ConfigState;
}) {
  return (
    <Canvas
      className="canvas-in"
      dpr={[1, 1.75]}
      camera={{ position: [2.6, 1.9, 4.0], fov: 34, near: 0.1, far: 40 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} color="#fff0e0" />
      <directionalLight position={[4, 5, 4]} intensity={1.15} color="#fff2e0" />
      <directionalLight position={[-4, 3, 2]} intensity={0.3} color="#e8f0ff" />
      <WallUnit config={config} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.55}
        enablePan={false}
        minDistance={2.4}
        maxDistance={6.4}
        minPolarAngle={0.55}
        maxPolarAngle={1.5}
        minAzimuthAngle={-1.15}
        maxAzimuthAngle={1.15}
        target={[-0.1, 1.35, 0]}
        makeDefault
      />
    </Canvas>
  );
}

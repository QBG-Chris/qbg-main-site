"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

type Position = [number, number, number];

const PINK = "#f85ab4";
const SOFT_PINK = "#ff9bd3";
const WHITE = "#f8edf5";
const MUTED = "#a58f9f";

const CORE: Position = [0, 0, 0];

const NODES = [
  {
    label: "Beauty Schools",
    position: [3.25, 1.75, 0] as Position,
    delay: 0,
  },
  {
    label: "Licensed Professionals",
    position: [3.3, -1.6, 0] as Position,
    delay: 0.28,
  },
  {
    label: "Educators",
    position: [-3.05, 1.7, 0] as Position,
    delay: 0.5,
  },
  {
    label: "Apprentices",
    position: [-3.1, -1.65, 0] as Position,
    delay: 0.72,
  },
];

/* =========================================================
   HEAD / BEAUTY FORM
========================================================= */

function BeautyForm() {
  const group = useRef<THREE.Group>(null);

  const outline = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.55, 2.1, 0),
      new THREE.Vector3(-1.15, 1.88, 0),
      new THREE.Vector3(-1.48, 1.35, 0),
      new THREE.Vector3(-1.52, 0.83, 0),

      // subtle face profile
      new THREE.Vector3(-1.33, 0.55, 0),
      new THREE.Vector3(-1.52, 0.3, 0),
      new THREE.Vector3(-1.3, 0.08, 0),
      new THREE.Vector3(-1.38, -0.28, 0),
      new THREE.Vector3(-1.16, -0.52, 0),

      // jaw / neck
      new THREE.Vector3(-0.9, -0.95, 0),
      new THREE.Vector3(-0.5, -1.35, 0),
      new THREE.Vector3(-0.15, -1.72, 0),

      // back of head / hair
      new THREE.Vector3(0.48, -1.5, 0),
      new THREE.Vector3(0.95, -1.05, 0),
      new THREE.Vector3(1.25, -0.4, 0),
      new THREE.Vector3(1.4, 0.45, 0),
      new THREE.Vector3(1.2, 1.15, 0),
      new THREE.Vector3(0.65, 1.78, 0),
      new THREE.Vector3(0.05, 2.05, 0),
      new THREE.Vector3(-0.55, 2.1, 0),
    ];

    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.2)
      .getPoints(100)
      .map((point) => [point.x, point.y, point.z] as Position);
  }, []);

  const hairStrands = useMemo(() => {
    const strandSets = [
      [
        [-0.3, 1.9, 0],
        [0.25, 1.45, 0],
        [0.55, 0.6, 0],
        [0.38, -0.7, 0],
        [0.05, -1.45, 0],
      ],
      [
        [0.18, 1.78, 0],
        [0.7, 1.25, 0],
        [0.9, 0.35, 0],
        [0.72, -0.65, 0],
        [0.35, -1.25, 0],
      ],
      [
        [-0.75, 1.7, 0],
        [-0.15, 1.3, 0],
        [0.15, 0.6, 0],
        [0.05, -0.4, 0],
        [-0.3, -1.15, 0],
      ],
    ];

    return strandSets.map((strand) => {
      const curve = new THREE.CatmullRomCurve3(
        strand.map(
          ([x, y, z]) => new THREE.Vector3(x, y, z)
        )
      );

      return curve
        .getPoints(50)
        .map((point) => [point.x, point.y, point.z] as Position);
    });
  }, []);

  useFrame(({ pointer }) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.08,
      0.035
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.045,
      0.035
    );
  });

  return (
    <group ref={group}>
      <Line
        points={outline}
        color={WHITE}
        lineWidth={1.25}
        transparent
        opacity={0.42}
      />

      {hairStrands.map((strand, index) => (
        <Line
          key={index}
          points={strand}
          color={index === 1 ? PINK : SOFT_PINK}
          lineWidth={0.75}
          transparent
          opacity={0.18}
        />
      ))}
    </group>
  );
}

/* =========================================================
   QBG CORE
========================================================= */

function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (outer.current) {
      outer.current.rotation.z = time * 0.07;
    }

    if (inner.current) {
      inner.current.rotation.z = -time * 0.12;

      const scale = 1 + Math.sin(time * 1.2) * 0.025;
      inner.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={CORE}>
      <mesh ref={outer}>
        <torusGeometry args={[0.68, 0.012, 8, 80]} />
        <meshBasicMaterial
          color={PINK}
          transparent
          opacity={0.34}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={inner}>
        <torusGeometry args={[0.5, 0.016, 8, 80]} />
        <meshBasicMaterial
          color={SOFT_PINK}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <circleGeometry args={[0.055, 24]} />
        <meshBasicMaterial color={PINK} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* =========================================================
   CONNECTIONS
========================================================= */

function Connection({
  target,
  delay,
}: {
  target: Position;
  delay: number;
}) {
  const pulse = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const end = new THREE.Vector3(...target);

    const direction = end.clone().normalize();

    const controlOne = direction
      .clone()
      .multiplyScalar(1.1)
      .add(
        new THREE.Vector3(
          target[1] > 0 ? 0.15 : -0.15,
          target[0] > 0 ? 0.2 : -0.2,
          0
        )
      );

    const controlTwo = end
      .clone()
      .multiplyScalar(0.72)
      .add(new THREE.Vector3(0, target[1] > 0 ? -0.15 : 0.15, 0));

    return new THREE.CubicBezierCurve3(
      new THREE.Vector3(...CORE),
      controlOne,
      controlTwo,
      end
    );
  }, [target]);

  const linePoints = useMemo(
    () =>
      curve
        .getPoints(60)
        .map((p) => [p.x, p.y, p.z] as Position),
    [curve]
  );

  useFrame(({ clock }) => {
    if (!pulse.current) return;

    const progress =
      (clock.getElapsedTime() * 0.12 + delay) % 1;

    const position = curve.getPointAt(progress);

    pulse.current.position.copy(position);

    const fade =
      Math.sin(progress * Math.PI) * 0.85 + 0.15;

    pulse.current.scale.setScalar(0.65 + fade * 0.4);
  });

  return (
    <>
      <Line
        points={linePoints}
        color={PINK}
        lineWidth={0.75}
        transparent
        opacity={0.16}
      />

      <mesh ref={pulse}>
        <planeGeometry args={[0.075, 0.075]} />
        <meshBasicMaterial
          color={PINK}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

/* =========================================================
   NODE MARKER
========================================================= */

function NodeMarker({ position }: { position: Position }) {
  return (
    <group position={position}>
      <mesh>
        <torusGeometry args={[0.11, 0.012, 8, 32]} />
        <meshBasicMaterial
          color={WHITE}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <circleGeometry args={[0.026, 16]} />
        <meshBasicMaterial
          color={PINK}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene() {
  return (
    <group>
      <Core />
      {NODES.map((node) => (
        <React.Fragment key={node.label}>
          <Connection
            target={node.position}
            delay={node.delay}
          />

          <NodeMarker position={node.position} />
        </React.Fragment>
      ))}
    </group>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function EducationEcosystemVisual() {
  return (
    <div className="relative h-117.5 w-full max-w-160 select-none lg:h-140">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-[15%] rounded-full" />

      <Canvas
        className="absolute inset-0"
        orthographic
        camera={{
          position: [0, 0, 10],
          zoom: 75,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <Scene />
      </Canvas>

      {/* QBG label */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-pink-400/20 bg-[#120c11]/80 backdrop-blur-md">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-white">
            QBG
          </span>
        </div>
      </div>

      {/* Audience labels */}

      <VisualLabel
        className="left-[6%] top-[16%]"
        eyebrow="Develop"
        title="Educators"
        align="left"
      />

      <VisualLabel
        className="right-[3%] top-[16%]"
        eyebrow="Partner"
        title="Beauty Schools"
        align="right"
      />

      <VisualLabel
        className="bottom-[13%] left-[5%]"
        eyebrow="Prepare"
        title="Apprentices"
        align="left"
      />

      <VisualLabel
        className="bottom-[13%] right-[1%]"
        eyebrow="Advance"
        title="Licensed Professionals"
        align="right"
      />
    </div>
  );
}

function VisualLabel({
  title,
  eyebrow,
  className,
  align,
}: {
  title: string;
  eyebrow: string;
  className?: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "pointer-events-none absolute z-10",
        align === "right" ? "text-right" : "text-left",
        className,
      ].join(" ")}
    >
      <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.22em] text-pink-400/60">
        {eyebrow}
      </p>

      <p className="max-w-[145px] text-xs font-medium tracking-wide text-white/70 sm:text-sm">
        {title}
      </p>
    </div>
  );
}
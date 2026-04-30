import React, { useMemo, forwardRef } from 'react';
import * as THREE from 'three';

// ─── EXACT BRAND LOGO GEOMETRY ───────────────────────────────────────────────

const createCenterLeftDrop = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-1.6, 0.5, -1.8, 2.5, -0.1, 3.2); 
  shape.bezierCurveTo(-0.7, 2.0, -0.8, 1.0, 0, 0);
  return shape;
};

const createCenterRightDrop = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(1.6, 0.5, 1.8, 2.5, 0.1, 3.2); 
  shape.bezierCurveTo(0.7, 2.0, 0.8, 1.0, 0, 0);
  return shape;
};

const createInnerLeftBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-2.0, 0.0, -3.2, 1.8, -2.0, 2.8); 
  shape.bezierCurveTo(-1.8, 1.2, -0.8, 0.2, 0, 0); 
  return shape;
};

const createMiddleLeftBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-2.3, -0.2, -3.7, 1.0, -2.8, 2.1);
  shape.bezierCurveTo(-2.0, 0.5, -1.2, 0.0, 0, 0);
  return shape;
};

const createOuterLeftBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-2.6, -0.6, -4.2, 0.2, -3.6, 1.2);
  shape.bezierCurveTo(-2.5, 0.0, -1.5, -0.2, 0, 0);
  return shape;
};

const createInnerRightBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(2.0, 0.0, 3.2, 1.8, 2.0, 2.8);
  shape.bezierCurveTo(1.8, 1.2, 0.8, 0.2, 0, 0);
  return shape;
};

const createMiddleRightBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(2.3, -0.2, 3.7, 1.0, 2.8, 2.1);
  shape.bezierCurveTo(2.0, 0.5, 1.2, 0.0, 0, 0);
  return shape;
};

const createOuterRightBlade = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(2.6, -0.6, 4.2, 0.2, 3.6, 1.2);
  shape.bezierCurveTo(2.5, 0.0, 1.5, -0.2, 0, 0);
  return shape;
};

// ─── EXTRUSION COMPONENT ───────────────────────────────────────────────

const ExtrudedShape = ({ shape, color, position, rotation, scale, isCenter }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    geo.translate(0, 0, -0.075);
    return geo;
  }, [shape]);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      {isCenter ? (
        // Ultra-High Gloss Obsidian / Polished Jet Black Stainless Steel
        <meshPhysicalMaterial 
          color="#000000"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={1.0}
          envMapIntensity={3.0}
        />
      ) : (
        // Polished Colored Stainless Steel / High-End Automotive Paint
        <meshPhysicalMaterial 
          color={color}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
          envMapIntensity={3.0}
        />
      )}
    </mesh>
  );
};

// ─── 3D LOGO ASSEMBLY ──────────────────────────────────────────────────

const BrandLogo3D = forwardRef((props, ref) => {
  const centerLeft = useMemo(createCenterLeftDrop, []);
  const centerRight = useMemo(createCenterRightDrop, []);
  
  const outerLeft = useMemo(createOuterLeftBlade, []);
  const middleLeft = useMemo(createMiddleLeftBlade, []);
  const innerLeft = useMemo(createInnerLeftBlade, []);

  const outerRight = useMemo(createOuterRightBlade, []);
  const middleRight = useMemo(createMiddleRightBlade, []);
  const innerRight = useMemo(createInnerRightBlade, []);

  return (
    <group ref={ref} {...props}>
      {/* Center Black Teardrops */}
      <ExtrudedShape shape={centerLeft} isCenter position={[0, 0, 0.0]} rotation={[0, 0, 0]} scale={1} />
      <ExtrudedShape shape={centerRight} isCenter position={[0, 0, 0.0]} rotation={[0, 0, 0]} scale={1} />

      {/* Left Petals (Navys and Teals) */}
      <ExtrudedShape shape={innerLeft} color="#4a8b3e" position={[0, 0, -0.05]} rotation={[0, 0, 0]} scale={1} />
      <ExtrudedShape shape={middleLeft} color="#1a686b" position={[0, 0, -0.10]} rotation={[0, 0, 0]} scale={1} />
      <ExtrudedShape shape={outerLeft} color="#183e6b" position={[0, 0, -0.15]} rotation={[0, 0, 0]} scale={1} />

      {/* Right Petals (Greens and Limes) */}
      <ExtrudedShape shape={innerRight} color="#68a63e" position={[0, 0, -0.05]} rotation={[0, 0, 0]} scale={1} />
      <ExtrudedShape shape={middleRight} color="#8bbf3b" position={[0, 0, -0.10]} rotation={[0, 0, 0]} scale={1} />
      <ExtrudedShape shape={outerRight} color="#a7d13b" position={[0, 0, -0.15]} rotation={[0, 0, 0]} scale={1} />
    </group>
  );
});

export default BrandLogo3D;

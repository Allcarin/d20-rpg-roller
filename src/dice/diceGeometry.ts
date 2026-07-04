import {
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  DodecahedronGeometry,
  IcosahedronGeometry,
  OctahedronGeometry,
  TetrahedronGeometry,
} from 'three';
import type { DiceSides } from './diceTypes';

export function createDiceGeometry(sides: DiceSides): BufferGeometry {
  if (sides === 4) return new TetrahedronGeometry(1.45, 0);
  if (sides === 6) return new BoxGeometry(2, 2, 2, 1, 1, 1);
  if (sides === 8) return new OctahedronGeometry(1.55, 0);
  if (sides === 12) return new DodecahedronGeometry(1.42, 0);
  if (sides === 20) return new IcosahedronGeometry(1.5, 0);

  // Temporary faceted stand-in for D10/D100 until numbered GLB/GLTF assets are added.
  return createPentagonalBipyramidGeometry();
}

export function getGeometryScale(sides: DiceSides): number {
  if (sides === 6) return 0.78;
  if (sides === 10 || sides === 100) return 0.96;
  return 1;
}

function createPentagonalBipyramidGeometry(): BufferGeometry {
  const geometry = new BufferGeometry();
  const sideCount = 5;
  const radius = 1.18;
  const height = 1.28;
  const top = [0, height, 0];
  const bottom = [0, -height, 0];
  const ring = Array.from({ length: sideCount }, (_, index) => {
    const angle = (index / sideCount) * Math.PI * 2 + Math.PI / 10;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });
  const positions: number[] = [];

  for (let index = 0; index < ring.length; index += 1) {
    const next = (index + 1) % ring.length;
    positions.push(...top, ...ring[next], ...ring[index]);
    positions.push(...bottom, ...ring[index], ...ring[next]);
  }

  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

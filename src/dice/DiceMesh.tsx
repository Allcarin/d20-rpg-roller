import {
  CanvasTexture,
  Color,
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from 'three';
import { createDiceGeometry, getGeometryScale } from './diceGeometry';
import type { DiceSides, DiceTone } from './diceTypes';

const TONE_COLORS: Record<DiceTone, { base: string; emissive: string; metalness: number; roughness: number }> = {
  amber: { base: '#d99a42', emissive: '#351c05', metalness: 0.18, roughness: 0.48 },
  steel: { base: '#8fb0c8', emissive: '#06141e', metalness: 0.35, roughness: 0.38 },
  verdant: { base: '#72bd83', emissive: '#071d0e', metalness: 0.12, roughness: 0.54 },
  ember: { base: '#e5664f', emissive: '#330905', metalness: 0.16, roughness: 0.45 },
  violet: { base: '#ad90df', emissive: '#170a2e', metalness: 0.2, roughness: 0.42 },
  gold: { base: '#eccd73', emissive: '#332507', metalness: 0.28, roughness: 0.36 },
  azure: { base: '#63c8de', emissive: '#041f28', metalness: 0.18, roughness: 0.4 },
};

const LABEL_FORWARD = new Vector3(0, 0, 1);

export type DiceFaceNormals = Record<string, Vector3>;

export function createDiceMesh(sides: DiceSides, tone: DiceTone): Group {
  const palette = TONE_COLORS[tone];
  const group = new Group();
  const geometry = createDiceGeometry(sides);
  const material = new MeshStandardMaterial({
    color: new Color(palette.base),
    emissive: new Color(palette.emissive),
    emissiveIntensity: 0.18,
    metalness: palette.metalness,
    roughness: palette.roughness,
    flatShading: true,
  });
  const mesh = new Mesh(geometry, material);
  const edgeMaterial = new LineBasicMaterial({
    color: '#171716',
    transparent: true,
    opacity: 0.28,
  });
  const edges = new LineSegments(new EdgesGeometry(geometry, 18), edgeMaterial);
  const placements = getFacePlacements(geometry, sides);
  const values = getFaceValues(sides, placements.length);
  const labels = createFaceLabels(placements, values, sides);
  const scale = getGeometryScale(sides);

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.scale.setScalar(scale);
  edges.scale.setScalar(scale * 1.002);
  labels.scale.setScalar(scale * 1.006);

  group.add(mesh, edges, labels);
  group.userData.faceNormals = createFaceNormalMap(placements, values);
  group.rotation.set(-0.38, 0.62, 0.18);
  return group;
}

function createFaceLabels(placements: FacePlacement[], values: string[], sides: DiceSides): Group {
  const group = new Group();
  const size = getLabelSize(sides);

  placements.forEach((placement, index) => {
    const label = values[index];
    if (!label) return;

    const texture = createNumberTexture(label);
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const numberPlane = new Mesh(new PlaneGeometry(size, size), material);

    numberPlane.position.copy(placement.center).addScaledVector(placement.normal, 0.024);
    numberPlane.quaternion.copy(new Quaternion().setFromUnitVectors(LABEL_FORWARD, placement.normal));
    group.add(numberPlane);
  });

  return group;
}

type FacePlacement = {
  center: Vector3;
  normal: Vector3;
};

function getFacePlacements(geometry: ReturnType<typeof createDiceGeometry>, sides: DiceSides): FacePlacement[] {
  if (sides === 12) return getDodecahedronFacePlacements(geometry);
  return getPlanarFacePlacements(geometry);
}

function getDodecahedronFacePlacements(geometry: ReturnType<typeof createDiceGeometry>): FacePlacement[] {
  const phi = (1 + Math.sqrt(5)) / 2;
  const normals = [
    [0, phi, 1],
    [0, phi, -1],
    [0, -phi, 1],
    [0, -phi, -1],
    [phi, 1, 0],
    [phi, -1, 0],
    [-phi, 1, 0],
    [-phi, -1, 0],
    [1, 0, phi],
    [-1, 0, phi],
    [1, 0, -phi],
    [-1, 0, -phi],
  ].map(([x, y, z]) => new Vector3(x, y, z).normalize());

  return normals
    .map((normal) => {
      const distance = getSupportDistance(geometry, normal);
      return {
        center: normal.clone().multiplyScalar(distance),
        normal,
      };
    })
    .sort((left, right) => {
      const vertical = right.normal.y - left.normal.y;
      if (Math.abs(vertical) > 0.001) return vertical;
      return Math.atan2(left.normal.z, left.normal.x) - Math.atan2(right.normal.z, right.normal.x);
    });
}

function getSupportDistance(geometry: ReturnType<typeof createDiceGeometry>, normal: Vector3): number {
  const position = geometry.getAttribute('position');
  const vertex = new Vector3();
  let distance = -Infinity;

  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index);
    distance = Math.max(distance, vertex.dot(normal));
  }

  return distance;
}

function getPlanarFacePlacements(geometry: ReturnType<typeof createDiceGeometry>): FacePlacement[] {
  const position = geometry.getAttribute('position');
  const index = geometry.index;
  const triangles: Array<{ center: Vector3; normal: Vector3; vertices: Vector3[] }> = [];
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  const ab = new Vector3();
  const ac = new Vector3();

  const triangleCount = (index?.count ?? position.count) / 3;
  for (let triangle = 0; triangle < triangleCount; triangle += 1) {
    const ia = index ? index.getX(triangle * 3) : triangle * 3;
    const ib = index ? index.getX(triangle * 3 + 1) : triangle * 3 + 1;
    const ic = index ? index.getX(triangle * 3 + 2) : triangle * 3 + 2;

    a.fromBufferAttribute(position, ia);
    b.fromBufferAttribute(position, ib);
    c.fromBufferAttribute(position, ic);

    const normal = ab.subVectors(b, a).cross(ac.subVectors(c, a)).normalize();
    const center = new Vector3().addVectors(a, b).add(c).multiplyScalar(1 / 3);
    if (normal.dot(center) < 0) normal.multiplyScalar(-1);

    triangles.push({
      center,
      normal: normal.clone(),
      vertices: [a.clone(), b.clone(), c.clone()],
    });
  }

  const planeGroups = new Map<string, typeof triangles>();
  triangles.forEach((triangle) => {
    const distance = triangle.normal.dot(triangle.center);
    const key = [
      triangle.normal.x.toFixed(3),
      triangle.normal.y.toFixed(3),
      triangle.normal.z.toFixed(3),
      distance.toFixed(3),
    ].join(':');
    planeGroups.set(key, [...(planeGroups.get(key) ?? []), triangle]);
  });

  return Array.from(planeGroups.values())
    .map((group) => {
      const uniqueVertices = new Map<string, Vector3>();
      group.forEach((triangle) => {
        triangle.vertices.forEach((vertex) => {
          uniqueVertices.set(`${vertex.x.toFixed(4)}:${vertex.y.toFixed(4)}:${vertex.z.toFixed(4)}`, vertex);
        });
      });

      const vertices = Array.from(uniqueVertices.values());
      const center = vertices.reduce((sum, vertex) => sum.add(vertex), new Vector3()).multiplyScalar(1 / vertices.length);
      const normal = group.reduce((sum, triangle) => sum.add(triangle.normal), new Vector3()).normalize();
      return { center, normal };
    })
    .sort((left, right) => {
      const vertical = right.normal.y - left.normal.y;
      if (Math.abs(vertical) > 0.001) return vertical;
      return Math.atan2(left.normal.z, left.normal.x) - Math.atan2(right.normal.z, right.normal.x);
    });
}

function createFaceNormalMap(placements: FacePlacement[], values: string[]): DiceFaceNormals {
  return placements.reduce<DiceFaceNormals>((normals, placement, index) => {
    const value = values[index];
    if (!normals[value]) normals[value] = placement.normal.clone();
    return normals;
  }, {});
}

function getFaceValues(sides: DiceSides, faceCount: number): string[] {
  if (sides === 100) {
    return Array.from({ length: faceCount }, (_, index) => String((index % 10) * 10).padStart(2, '0'));
  }

  if (sides === 10) {
    return Array.from({ length: faceCount }, (_, index) => String((index % 10) + 1));
  }

  return Array.from({ length: faceCount }, (_, index) => String((index % sides) + 1));
}

function getLabelSize(sides: DiceSides): number {
  if (sides === 6) return 0.92;
  if (sides === 12) return 0.58;
  if (sides === 20) return 0.74;
  if (sides === 10 || sides === 100) return 0.74;
  return 0.66;
}

function createNumberTexture(value: string): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new CanvasTexture(canvas);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width / 2, canvas.height / 2);
  context.font = `900 ${value.length > 2 ? 116 : 168}px "Trebuchet MS", "Segoe UI", sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.lineJoin = 'round';
  context.lineWidth = 12;
  context.strokeStyle = 'rgba(255, 242, 184, 0.72)';
  context.fillStyle = '#120f09';
  context.shadowColor = 'rgba(255, 246, 206, 0.58)';
  context.shadowBlur = 7;
  context.strokeText(value, 0, 8);
  context.fillText(value, 0, 8);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function disposeDiceMaterial(material: Material | Material[]) {
  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((entry) => {
    const mappedMaterial = entry as Material & { map?: { dispose: () => void } };
    mappedMaterial.map?.dispose();
    entry.dispose();
  });
}

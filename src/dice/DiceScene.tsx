import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Euler,
  Group,
  Material,
  Mesh,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { createDiceMesh, disposeDiceMaterial, type DiceFaceNormals } from './DiceMesh';
import { createSpinTarget, easeOutCubic } from './diceRoller';
import type { DiceDefinition } from './diceTypes';

type ActiveAnimation = {
  duration: number;
  elapsed: number;
  from: { x: number; y: number; z: number };
  to: { x: number; y: number; z: number };
};

export class DiceScene {
  private readonly camera: PerspectiveCamera;
  private readonly clock = new Clock();
  private readonly container: HTMLElement;
  private currentDie?: DiceDefinition;
  private dice?: Group;
  private frameId = 0;
  private readonly renderer: WebGLRenderer;
  private rollAnimation: ActiveAnimation | null = null;
  private readonly scene = new Scene();

  constructor(container: HTMLElement) {
    this.container = container;
    this.camera = new PerspectiveCamera(42, 1, 0.1, 100);
    this.camera.position.set(0, 2.15, 5.4);
    this.camera.lookAt(0, 0.45, 0);

    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.append(this.renderer.domElement);

    this.addLights();
    this.addGround();
    this.resize();
    this.animate();

    window.addEventListener('resize', this.resize);
  }

  dispose() {
    window.removeEventListener('resize', this.resize);
    window.cancelAnimationFrame(this.frameId);
    this.renderer.dispose();
  }

  rollTo(die: DiceDefinition, value: number) {
    this.setDie(die);
    if (!this.dice) return;

    const spin = createSpinTarget();
    const resultRotation = this.getResultRotation(value);
    this.rollAnimation = {
      duration: 980,
      elapsed: 0,
      from: {
        x: this.dice.rotation.x,
        y: this.dice.rotation.y,
        z: this.dice.rotation.z,
      },
      to: {
        x: resultRotation.x + spin.x,
        y: resultRotation.y + spin.y,
        z: resultRotation.z + spin.z,
      },
    };
  }

  setDie(die: DiceDefinition) {
    if (this.currentDie?.sides === die.sides && this.currentDie?.tone === die.tone) return;

    if (this.dice) {
      this.scene.remove(this.dice);
      this.disposeGroup(this.dice);
    }

    this.currentDie = die;
    this.dice = createDiceMesh(die.sides, die.tone);
    this.dice.position.y = 0.85;
    this.scene.add(this.dice);
  }

  private addGround() {
    const ground = new Mesh(
      new PlaneGeometry(7, 7),
      new ShadowMaterial({
        color: '#000000',
        opacity: 0.28,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.72;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private addLights() {
    const ambient = new AmbientLight('#f8edd3', 1.6);
    const key = new DirectionalLight('#fff3ca', 3.8);
    const rim = new DirectionalLight('#8fc8ff', 1.1);

    key.position.set(3.5, 5.2, 4.2);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 16;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;

    rim.position.set(-3.6, 2.8, -3.2);
    this.scene.add(ambient, key, rim);
  }

  private animate = () => {
    const delta = this.clock.getDelta() * 1000;
    this.updateRoll(delta);
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  private disposeGroup(group: Group) {
    group.traverse((object) => {
      const mesh = object as Mesh;
      mesh.geometry?.dispose();
      const material = mesh.material as Material | Material[] | undefined;

      if (material) disposeDiceMaterial(material);
    });
  }

  private getResultRotation(value: number): Euler {
    if (!this.dice) return new Euler(-0.38, 0.62, 0.18);

    const faceNormals = this.dice.userData.faceNormals as DiceFaceNormals | undefined;
    const resultNormal = faceNormals?.[String(value)];
    if (!resultNormal) return this.dice.rotation.clone();

    const viewDirection = this.camera.position
      .clone()
      .sub(new Vector3(this.dice.position.x, this.dice.position.y, this.dice.position.z))
      .normalize();
    const faceToCamera = new Quaternion().setFromUnitVectors(resultNormal.clone().normalize(), viewDirection);
    const readableTwist = new Quaternion().setFromAxisAngle(viewDirection, -0.12);
    const finalQuaternion = readableTwist.multiply(faceToCamera);

    return new Euler().setFromQuaternion(finalQuaternion, 'XYZ');
  }

  private resize = () => {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };

  private updateRoll(delta: number) {
    if (!this.dice || !this.rollAnimation) return;

    this.rollAnimation.elapsed += delta;
    const progress = Math.min(1, this.rollAnimation.elapsed / this.rollAnimation.duration);
    const eased = easeOutCubic(progress);
    const { from, to } = this.rollAnimation;

    this.dice.rotation.x = from.x + (to.x - from.x) * eased;
    this.dice.rotation.y = from.y + (to.y - from.y) * eased;
    this.dice.rotation.z = from.z + (to.z - from.z) * eased;
    this.dice.position.y = 0.85 + Math.sin(progress * Math.PI) * 0.38;

    if (progress >= 1) {
      this.dice.position.y = 0.85;
      this.rollAnimation = null;
    }
  }
}

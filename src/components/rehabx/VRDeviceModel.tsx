import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const ASSET_VERSION = '2026-05-09-aurora-rift';
const MODEL_PATH = `/models/vr-device/vr-device.fbx?v=${ASSET_VERSION}`;
const TEXTURE_PATH = `/models/vr-device/vr-device-texture.png?v=${ASSET_VERSION}`;
const NORMAL_PATH = `/models/vr-device/vr-device-normal.png?v=${ASSET_VERSION}`;
const ROUGHNESS_PATH = `/models/vr-device/vr-device-roughness.png?v=${ASSET_VERSION}`;
const METALLIC_PATH = `/models/vr-device/vr-device-metallic.png?v=${ASSET_VERSION}`;

export function VRDeviceModel() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let isMounted = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(-0.42, 0.72, 0);
    group.rotation.set(-0.05, -0.35, 0.03);
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3.5, 4, 5);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x8fb6ff, 1.8);
    rim.position.set(-4, 1.5, -2);
    scene.add(rim);

    const fill = new THREE.PointLight(0xb69cff, 2.2, 8);
    fill.position.set(-2, -1, 3);
    scene.add(fill);

    const textureLoader = new THREE.TextureLoader();
    const colorMap = textureLoader.load(TEXTURE_PATH);
    colorMap.colorSpace = THREE.SRGBColorSpace;
    let normalMap: THREE.Texture | null = null;
    let roughnessMap: THREE.Texture | null = null;
    let metalnessMap: THREE.Texture | null = null;

    const targetRotation = { x: group.rotation.x, y: group.rotation.y };
    const pointer = { x: 0, y: 0 };
    let model: THREE.Object3D | null = null;
    let frameId = 0;

    const loader = new FBXLoader();
    loader.load(MODEL_PATH, (object) => {
      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;

        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          map: colorMap,
          metalness: 0.45,
          roughness: 0.58,
        });
      });

      const bounds = new THREE.Box3().setFromObject(object);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const largestSide = Math.max(size.x, size.y, size.z) || 1;

      object.position.sub(center);
      object.scale.setScalar(2.45 / largestSide);
      object.rotation.set(0.02, Math.PI * 0.08, -0.02);
      group.add(object);
      model = object;
      if (isMounted) setIsModelReady(true);

      normalMap = textureLoader.load(NORMAL_PATH);
      roughnessMap = textureLoader.load(ROUGHNESS_PATH);
      metalnessMap = textureLoader.load(METALLIC_PATH);
      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const material = child.material;
        if (!(material instanceof THREE.MeshStandardMaterial)) return;

        material.normalMap = normalMap;
        material.roughnessMap = roughnessMap;
        material.metalnessMap = metalnessMap;
        material.needsUpdate = true;
      });
    });

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotation.y = -0.35 + pointer.x * 0.55;
      targetRotation.x = -0.05 - pointer.y * 0.28;
    };

    const onPointerLeave = () => {
      targetRotation.x = -0.05;
      targetRotation.y = -0.35;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    resize();

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      group.rotation.x += (targetRotation.x - group.rotation.x) * 0.075;
      group.rotation.y += (targetRotation.y - group.rotation.y) * 0.075;
      group.rotation.z = 0.025 * Math.sin(Date.now() * 0.001);

      if (model) {
        model.position.y = 0.08 * Math.sin(Date.now() * 0.0014);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      renderer.dispose();
      colorMap.dispose();
      normalMap?.dispose();
      roughnessMap?.dispose();
      metalnessMap?.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="relative h-[520px] w-full cursor-grab active:cursor-grabbing">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isModelReady ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative h-48 w-80 animate-pulse rounded-[4rem] bg-gradient-to-br from-white via-purple-100 to-blue-100 shadow-2xl shadow-purple-200/60 ring-1 ring-purple-200/70">
          <div className="absolute left-1/2 top-[-3.25rem] h-24 w-24 -translate-x-1/2 rounded-t-[3rem] border-[18px] border-b-0 border-gray-200/90" />
          <div className="absolute inset-x-8 bottom-6 h-8 rounded-full bg-purple-300/25 blur-xl" />
        </div>
      </div>
      <div
        ref={hostRef}
        aria-label="Interactive VR headset model"
        className={`relative h-full w-full transition-opacity duration-500 ${isModelReady ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

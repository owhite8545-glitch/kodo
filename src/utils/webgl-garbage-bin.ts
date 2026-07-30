import * as THREE from "three";

/**
 * KODŌ — Enterprise-grade recursive WebGL garbage disposal utility.
 * Explicitly targets standard texture maps to avoid risky dynamic
 * object key iteration. Prevents mobile VRAM leaks and browser
 * page termination on iOS Safari's strict 50MB VRAM floor.
 */

const TEXTURE_MAP_KEYS = [
  "map",
  "lightMap",
  "aoMap",
  "emissiveMap",
  "bumpMap",
  "normalMap",
  "displacementMap",
  "roughnessMap",
  "metalnessMap",
  "alphaMap",
  "envMap",
  "gradientMap",
  "specularMap",
  "clearcoatMap",
  "clearcoatNormalMap",
  "clearcoatRoughnessMap",
  "transmissionMap",
  "thicknessMap",
  "sheenColorMap",
  "sheenRoughnessMap",
] as const;

export function disposeSceneElement(object: THREE.Object3D | null): void {
  if (!object) return;

  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      // 1. Dispose Geometry
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      // 2. Dispose Material(s) cleanly
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => disposeMaterial(mat));
        } else {
          disposeMaterial(mesh.material);
        }
      }
    }
  });

  // Remove child references from parent to prevent reference leakage
  if (object.parent) {
    object.parent.remove(object);
  }
}

function disposeMaterial(material: THREE.Material): void {
  material.dispose();

  // Safely dispose textures associated with standard map keys
  TEXTURE_MAP_KEYS.forEach((key) => {
    const texture = (material as unknown as Record<string, unknown>)[key];
    if (texture && (texture as THREE.Texture).isTexture) {
      (texture as THREE.Texture).dispose();
    }
  });
}

/**
 * Full GPU context cleanup — call on complete canvas unmount.
 * Traverses all scene children and releases the renderer context.
 */
export function purgeGPUResources(
  scene: THREE.Scene | null,
  renderer: THREE.WebGLRenderer | null
): void {
  if (scene) {
    while (scene.children.length > 0) {
      disposeSceneElement(scene.children[0]);
    }
  }
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
}

<template></template>

<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);
// 添加轨道辅助器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 渲染函数
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
</script>

<style scoped></style>

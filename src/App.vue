<template>
  <button class="fullScreen-btn" @click="fullScreen">点击全屏</button>
</template>

<script lang="ts" setup>
// 导入three
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角(眼睛看到的角度范围)
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 最近可以看到
  1000 // 最远可以看到
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000f });
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 创建网格
const parentCube = new THREE.Mesh(geometry, parentMaterial);
const cube = new THREE.Mesh(geometry, material);
parentCube.add(cube);
parentCube.position.set(-3, 0, 0); // position是一个相对坐标，子元素相对于父元素的坐标

cube.position.set(2, 0, 0);
// 放大cube
cube.scale.set(2, 2, 2); // scale也是一个相对大小，如果放大父元素为两倍，子元素也会放大为之前的两倍

// 将物体添加到场景中
scene.add(parentCube);

// 设置相机的位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 5;
camera.lookAt(0, 0, 0); // 看向原点（默认）

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5); // 数字代表辅助线的长度
scene.add(axesHelper);

// 添加轨道控制器，不需要添加到场景中，只要绑定到相机上即可
const controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.01;
// 设置自动旋转
controls.autoRotate = true;

// 定义一个渲染函数
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 渲染出来
  renderer.render(scene, camera);
}
animate();

// 监听窗口的变化进行渲染
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 原生方式定义全屏按钮
function fullScreen() {
  renderer.domElement.requestFullscreen(); // 点击全屏显示
}

// 创建事件
const eventObj = {
  Fullscreen() {
    document.body.requestFullscreen();
  },
  exitFullscreen() {
    document.exitFullscreen(); // 退出全屏是针对整个文档：document
  },
};

// 创建GUI对象
const gui = new GUI();
// 添加按钮
gui.add(eventObj, "Fullscreen").name("全屏");
gui.add(eventObj, "exitFullscreen");
</script>
<style scoped>
.fullScreen-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999;
}
</style>

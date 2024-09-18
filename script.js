import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Tạo scene
const scene = new THREE.Scene();

// Tạo camera (Perspective Camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Tạo renderer và thêm vào body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Thêm ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Sử dụng GLTFLoader để load mô hình 3D
const loader = new GLTFLoader();
loader.load('./Steve.gltf', function (gltf) { 
    const model = gltf.scene;
    model.position.set(0, 0, 0);  // Điều chỉnh vị trí
    model.scale.set(1, 1, 1);     // Điều chỉnh tỷ lệ nếu cần
    scene.add(model);

}, undefined, function (error) {
    console.error('An error happened while loading the GLTF model:', error);
});

// Đặt sự kiện lắng nghe khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hàm animate để tạo chuyển động và render scene
function animate() {
    requestAnimationFrame(animate);

    // Cập nhật điều khiển (OrbitControls) nếu có
    controls.update();

    // Render scene với camera
    renderer.render(scene, camera);
}

// Thêm OrbitControls để điều khiển camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Bật hiệu ứng damping
controls.dampingFactor = 0.05;  // Độ trễ mượt mà

// Gọi hàm animate để bắt đầu chu kỳ animation
animate();

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Tạo scene
const scene = new THREE.Scene();

// Tạo camera (Perspective Camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Tạo renderer và thêm vào body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Thêm OrbitControls để người dùng có thể xoay và zoom camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Bật hiệu ứng damping
controls.dampingFactor = 0.05;  // Độ trễ mượt mà

// Tạo GLTFLoader và tải mô hình
const loader = new GLTFLoader();
loader.load(
    '/Steve.gltf',
    function (gltf) {
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);

// Đặt sự kiện lắng nghe khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hàm animate để tạo chuyển động và render scene
function animate() {
    requestAnimationFrame(animate);

    // Cập nhật điều khiển (OrbitControls)
    controls.update();

    // Render scene với camera
    renderer.render(scene, camera);
}

// Gọi hàm animate để bắt đầu chu kỳ animation
animate();

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
const loader = new THREE.GLTFLoader();
loader.load('Steve.gltf', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);  // Đặt vị trí của mô hình trong scene

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

    // Render scene với camera
    renderer.render(scene, camera);
}

// Gọi hàm animate để bắt đầu chu kỳ animation
animate();

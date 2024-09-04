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

// Tạo hình khối (BoxGeometry) và thêm vào scene
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // Hình học của cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // Vật liệu màu xanh lá
const cube = new THREE.Mesh(geometry, material); // Tạo Mesh từ hình học và vật liệu
scene.add(cube); // Thêm cube vào scene để hiển thị

// Thêm ánh sáng toàn cảnh (AmbientLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ánh sáng trắng với cường độ 0.5
scene.add(ambientLight);

// Thêm trục tọa độ (AxesHelper) để dễ hình dung
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Thêm OrbitControls để người dùng có thể xoay và zoom camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Bật hiệu ứng damping
controls.dampingFactor = 0.05;  // Độ trễ mượt mà

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
};

// Gọi hàm animate để bắt đầu chu kỳ animation
animate();

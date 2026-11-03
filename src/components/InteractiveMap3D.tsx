import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LOCATIONS_DATA, LocationData } from '../data/locations';
import { LocationBottomSheet } from './LocationBottomSheet';
import { 
  RotateCw, ZoomIn, ZoomOut, Layers, Eye, Sparkles, 
  Maximize2, Minimize2, Compass, Play, Pause, Navigation
} from 'lucide-react';

export const InteractiveMap3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [webglSupported, setWebglSupported] = useState(true);
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqAnimRef = useRef<number | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const pulseRingsRef = useRef<THREE.Mesh[]>([]);
  const trailBeadsRef = useRef<THREE.Mesh[]>([]);
  const autoRotateRef = useRef(true);

  // Orbit & Camera state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 3.3, radius: 28 });
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));

  // Sync autoRotateRef
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Fullscreen Listener
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!isFullscreen) {
      if (wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => setIsFullscreen(true));
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setViewMode('2d');
        return;
      }
    } catch {
      setWebglSupported(false);
      setViewMode('2d');
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene & Arabian Desert Atmospheric Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDFBD92); // Warm desert sand horizon
    scene.fog = new THREE.FogExp2(0xE5C7A2, 0.009); // Desert dust haze
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 600);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer with antialiasing and shadow support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Arabian Desert Sky Hemisphere Dome
    const skyGeo = new THREE.SphereGeometry(150, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x276692) },    // Azure Arabian sky
        middleColor: { value: new THREE.Color(0x8DB7D8) }, // Soft sky haze
        bottomColor: { value: new THREE.Color(0xF5DCB5) }, // Golden desert horizon glow
        offset: { value: 20 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          float f = max(pow(max(h, 0.0), exponent), 0.0);
          vec3 col = mix(bottomColor, mix(middleColor, topColor, f), f);
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // 5. Lights: Cinematic Warm Golden Arabian Sunlight
    const ambientLight = new THREE.AmbientLight(0xFFE8CA, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xA4CCE8, 0xD4A36E, 0.65);
    hemiLight.position.set(0, 60, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xFFF0D0, 1.55);
    sunLight.position.set(32, 42, 26);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 140;
    const d = 32;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // 6. Sculpted Arabian Desert Terrain (Dunes, Holy Valleys, and Hijaz Mountains)
    const terrainSize = 100;
    const terrainSegments = 90;
    const groundGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, terrainSegments, terrainSegments);
    const posAttr = groundGeo.attributes.position;
    const colors: number[] = [];

    const sandColor = new THREE.Color(0xE2C292);       // Main golden desert sand
    const sandCrestColor = new THREE.Color(0xF6DFB8);  // Sunlit dune crest
    const shadowSandColor = new THREE.Color(0xC79B63); // Warm shadow sand
    const mountainRock = new THREE.Color(0x7A4C36);    // Hijaz sandstone rock
    const darkMountain = new THREE.Color(0x563424);    // Rugged mountain granite

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const distFromCenter = Math.sqrt(vx * vx + vy * vy);

      // Undulating desert sand dunes across the holy corridor
      let vz = Math.sin(vx * 0.16) * Math.cos(vy * 0.14) * 0.7 
             + Math.sin(vx * 0.32 + vy * 0.22) * 0.35
             + Math.cos(vx * 0.08 - vy * 0.18) * 0.5;

      // Flatten the specific holy valleys slightly so stations sit beautifully
      // Makkah (-9, -2), Safa/Marwah (-4.5, -0.5), Mina (3, 3), Muzdalifah (0, -2.5), Arafah (9, -3.5), Jamarat (5, 0)
      const distToMakkah = Math.hypot(vx - (-9), vy - (-2));
      const distToArafah = Math.hypot(vx - 9, vy - (-3.5));
      const distToMina = Math.hypot(vx - 3, vy - 3);

      if (distToMakkah < 4.0) vz *= 0.3;
      if (distToMina < 4.0) vz *= 0.4;

      // Jabal Rahmah distinct rocky hill in Arafat plain
      if (distToArafah < 2.5) {
        const hillProfile = Math.max(0, 1 - distToArafah / 2.5);
        vz += Math.pow(hillProfile, 1.8) * 3.2;
      }

      // Towering Hijaz mountain range surrounding the valley perimeter
      if (distFromCenter > 22) {
        const mountainFactor = (distFromCenter - 22) / (terrainSize / 2 - 22);
        const jagged = Math.sin(vx * 0.5) * 1.8 + Math.cos(vy * 0.45) * 1.6 + Math.sin(vx * 1.2 + vy * 0.9) * 0.7;
        vz += Math.pow(mountainFactor, 1.7) * (7.5 + jagged);
      }

      posAttr.setZ(i, vz);

      // Calculate terrain vertex color based on height & slope
      if (vz > 4.5) {
        const t = Math.min(1, (vz - 4.5) / 5.0);
        const col = mountainRock.clone().lerp(darkMountain, t);
        colors.push(col.r, col.g, col.b);
      } else if (vz > 2.0) {
        const t = (vz - 2.0) / 2.5;
        const col = shadowSandColor.clone().lerp(mountainRock, t);
        colors.push(col.r, col.g, col.b);
      } else if (vz > 0.4) {
        const t = Math.min(1, vz / 2.0);
        const col = sandColor.clone().lerp(sandCrestColor, t);
        colors.push(col.r, col.g, col.b);
      } else {
        const col = sandColor.clone().lerp(shadowSandColor, 0.3);
        colors.push(col.r, col.g, col.b);
      }
    }

    groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.94,
      metalness: 0.02,
      flatShading: true
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 7. Date Palms (Pohon Kurma) Scattered in Valleys
    const palmLocations = [
      [-12, -4], [-11, 1], [-7, -5], [-6, 3],
      [-2, 1], [1, -4], [2, 6], [5, 5],
      [7, -1], [11, -6], [12, -2]
    ];

    const palmTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5C4033, roughness: 0.9 });
    const palmFrondMat = new THREE.MeshStandardMaterial({ color: 0x2E6B34, roughness: 0.6, flatShading: true });

    palmLocations.forEach(([px, pz]) => {
      const palmGroup = new THREE.Group();
      palmGroup.position.set(px, 0.3, pz);

      // Curved trunk
      const trunkGeo = new THREE.CylinderGeometry(0.08, 0.14, 1.8, 6);
      const trunk = new THREE.Mesh(trunkGeo, palmTrunkMat);
      trunk.position.y = 0.9;
      trunk.rotation.z = (Math.random() - 0.5) * 0.15;
      palmGroup.add(trunk);

      // Radiating fronds
      for (let f = 0; f < 7; f++) {
        const frondAngle = (f / 7) * Math.PI * 2;
        const frondGeo = new THREE.ConeGeometry(0.35, 1.2, 4);
        const frond = new THREE.Mesh(frondGeo, palmFrondMat);
        frond.position.set(
          Math.cos(frondAngle) * 0.45,
          1.75,
          Math.sin(frondAngle) * 0.45
        );
        frond.rotation.x = Math.PI / 2.3;
        frond.rotation.y = frondAngle;
        palmGroup.add(frond);
      }

      scene.add(palmGroup);
    });

    // 8. Connecting Golden Pilgrimage Road
    const curvePoints = LOCATIONS_DATA.map(loc => 
      new THREE.Vector3(loc.coordinates.x, 0.28, loc.coordinates.z)
    );
    curvePoints.push(new THREE.Vector3(LOCATIONS_DATA[0].coordinates.x, 0.28, LOCATIONS_DATA[0].coordinates.z));

    const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.25);
    const pathGeo = new THREE.TubeGeometry(pathCurve, 110, 0.18, 8, false);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xE8A838,
      roughness: 0.35,
      metalness: 0.3,
      emissive: 0xE8A838,
      emissiveIntensity: 0.2
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    scene.add(pathMesh);

    // Animated glowing beads representing pilgrims along the path
    const beads: THREE.Mesh[] = [];
    const beadCount = 8;
    const beadGeo = new THREE.SphereGeometry(0.24, 12, 12);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xFFFBEA,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.9
    });

    for (let b = 0; b < beadCount; b++) {
      const bead = new THREE.Mesh(beadGeo, beadMat);
      scene.add(bead);
      beads.push(bead);
    }
    trailBeadsRef.current = beads;

    // 9. 3D Landmark Models & Markers
    const markersGroup = new THREE.Group();
    markersGroupRef.current = markersGroup;
    scene.add(markersGroup);

    const pulseRings: THREE.Mesh[] = [];

    LOCATIONS_DATA.forEach((loc) => {
      const locGroup = new THREE.Group();
      locGroup.position.set(loc.coordinates.x, 0, loc.coordinates.z);
      locGroup.userData = { location: loc };

      // Subtle marble/sand pedestal base naturally embedded into terrain
      const baseGeo = new THREE.CylinderGeometry(1.7, 1.9, 0.2, 24);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xECE2D0,
        roughness: 0.5,
        metalness: 0.05
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.1;
      baseMesh.receiveShadow = true;
      locGroup.add(baseMesh);

      // Pulsing Ground Ring
      const ringGeo = new THREE.RingGeometry(1.8, 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.06;
      locGroup.add(ringMesh);
      pulseRings.push(ringMesh);

      // Model Landmark sesuai Lokasi
      if (loc.id === 'makkah') {
        // --- 1. KA'BAH & MASJIDIL HARAM ---
        const matafGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.1, 32);
        const matafMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.2 });
        const mataf = new THREE.Mesh(matafGeo, matafMat);
        mataf.position.y = 0.25;
        locGroup.add(mataf);

        // Ka'bah Cube
        const kaabaGeo = new THREE.BoxGeometry(0.85, 1.05, 0.85);
        const kaabaMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.6 });
        const kaaba = new THREE.Mesh(kaabaGeo, kaabaMat);
        kaaba.position.y = 0.82;
        kaaba.castShadow = true;
        locGroup.add(kaaba);

        // Gold Kiswah Band
        const bandGeo = new THREE.BoxGeometry(0.87, 0.12, 0.87);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, roughness: 0.2, metalness: 0.8 });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.y = 1.15;
        locGroup.add(band);

        // 4 Minarets with golden spires
        const minaretPositions = [
          [-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]
        ];
        minaretPositions.forEach(([mx, mz]) => {
          const towerGeo = new THREE.CylinderGeometry(0.09, 0.12, 2.2, 8);
          const towerMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
          const tower = new THREE.Mesh(towerGeo, towerMat);
          tower.position.set(mx, 1.35, mz);
          tower.castShadow = true;
          locGroup.add(tower);

          const spireGeo = new THREE.ConeGeometry(0.09, 0.35, 8);
          const spireMat = new THREE.MeshStandardMaterial({ color: 0xF4B942, metalness: 0.9, roughness: 0.1 });
          const spire = new THREE.Mesh(spireGeo, spireMat);
          spire.position.set(mx, 2.6, mz);
          locGroup.add(spire);
        });

      } else if (loc.id === 'safa-marwah') {
        // --- 2. SAFA & MARWAH (Dua Bukit & Lorong Mas'a) ---
        const hillMat = new THREE.MeshStandardMaterial({ color: 0x8C5E3D, roughness: 0.9, flatShading: true });
        
        // Bukit Shafa
        const shafaGeo = new THREE.ConeGeometry(0.8, 1.1, 7);
        const shafa = new THREE.Mesh(shafaGeo, hillMat);
        shafa.position.set(-0.9, 0.75, 0);
        shafa.castShadow = true;
        locGroup.add(shafa);

        // Bukit Marwah
        const marwahGeo = new THREE.ConeGeometry(0.75, 1.0, 7);
        const marwah = new THREE.Mesh(marwahGeo, hillMat);
        marwah.position.set(0.9, 0.7, 0);
        marwah.castShadow = true;
        locGroup.add(marwah);

        // Mas'a Covered Gallery
        const masaGeo = new THREE.BoxGeometry(1.6, 0.38, 0.45);
        const masaMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.4 });
        const masa = new THREE.Mesh(masaGeo, masaMat);
        masa.position.set(0, 0.39, 0);
        masa.castShadow = true;
        locGroup.add(masa);

      } else if (loc.id === 'arafah') {
        // --- 3. PADANG ARAFAH & JABAL RAHMAH ---
        const hillGeo = new THREE.ConeGeometry(1.2, 1.3, 8);
        const hillMat = new THREE.MeshStandardMaterial({ color: 0x936345, roughness: 0.9, flatShading: true });
        const hill = new THREE.Mesh(hillGeo, hillMat);
        hill.position.y = 0.85;
        hill.castShadow = true;
        locGroup.add(hill);

        // Tugu Putih Jabal Rahmah (Al-Shakhis)
        const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 8);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.y = 1.95;
        pillar.castShadow = true;
        locGroup.add(pillar);

      } else if (loc.id === 'muzdalifah') {
        // --- 4. MUZDALIFAH (Masjid Masy'aril Haram) ---
        const mosqueGeo = new THREE.BoxGeometry(1.3, 0.4, 0.9);
        const mosqueMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.4 });
        const mosque = new THREE.Mesh(mosqueGeo, mosqueMat);
        mosque.position.y = 0.4;
        mosque.castShadow = true;
        locGroup.add(mosque);

        // Dome & Minaret
        const domeGeo = new THREE.SphereGeometry(0.24, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.3 });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.set(0, 0.6, 0);
        locGroup.add(dome);

        const minaretGeo = new THREE.CylinderGeometry(0.07, 0.09, 1.2, 8);
        const minaretMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC });
        const minaret = new THREE.Mesh(minaretGeo, minaretMat);
        minaret.position.set(0.5, 0.8, 0.3);
        locGroup.add(minaret);

      } else if (loc.id === 'mina') {
        // --- 5. LEMBAH MINA (Kota Sejuta Tenda Putih) ---
        const tentMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.3, flatShading: true });
        const tentRows = [
          [-0.6, -0.6], [0, -0.6], [0.6, -0.6],
          [-0.6, 0], [0, 0], [0.6, 0],
          [-0.6, 0.6], [0, 0.6], [0.6, 0.6]
        ];

        tentRows.forEach(([tx, tz]) => {
          const tentGeo = new THREE.ConeGeometry(0.24, 0.45, 4);
          const tent = new THREE.Mesh(tentGeo, tentMat);
          tent.position.set(tx, 0.42, tz);
          tent.rotation.y = Math.PI / 4;
          tent.castShadow = true;
          locGroup.add(tent);
        });

      } else if (loc.id === 'jamarat') {
        // --- 6. KOMPLEKS JAMARAT (Jembatan 3 Lantai & 3 Pilar) ---
        const bridgeGeo = new THREE.BoxGeometry(1.8, 0.28, 0.7);
        const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.3 });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.y = 0.45;
        bridge.castShadow = true;
        locGroup.add(bridge);

        // 3 Pilar Jumrah
        [-0.55, 0, 0.55].forEach((px) => {
          const pillarGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.65, 8);
          const pillarMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.6 });
          const pillar = new THREE.Mesh(pillarGeo, pillarMat);
          pillar.position.set(px, 0.85, 0);
          pillar.castShadow = true;
          locGroup.add(pillar);
        });
      }

      markersGroup.add(locGroup);
    });

    pulseRingsRef.current = pulseRings;

    // 10. Animation Loop
    let time = 0;
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      time += 0.02;

      // Pulse rings animation
      const scale = 1.0 + Math.sin(time * 2.5) * 0.12;
      const opacity = 0.4 + Math.sin(time * 2.5) * 0.25;
      pulseRings.forEach(ring => {
        ring.scale.set(scale, scale, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = opacity;
      });

      // Animated pilgrimage flow beads
      const curveLen = pathCurve.getLength();
      beads.forEach((bead, index) => {
        const offset = (time * 0.08 + index / beads.length) % 1;
        const pt = pathCurve.getPointAt(offset);
        bead.position.copy(pt);
      });

      // Smooth Auto-Rotate when user is not dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        cameraAngleRef.current.theta += 0.0018;
        updateCameraPosition();
      }

      // Smooth camera interpolation towards target lookAt
      currentLookAt.current.lerp(targetLookAt.current, 0.06);
      if (cameraRef.current) {
        cameraRef.current.lookAt(currentLookAt.current);
      }

      renderer.render(scene, camera);
      updateScreenCoordinates();
    };

    animate();

    // 11. Mouse & Touch Drag Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.theta -= deltaX * 0.007;
      cameraAngleRef.current.phi = Math.max(0.22, Math.min(Math.PI / 2.3, cameraAngleRef.current.phi - deltaY * 0.007));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      updateCameraPosition();
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Mobile Touch Orbit
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.theta -= deltaX * 0.007;
      cameraAngleRef.current.phi = Math.max(0.22, Math.min(Math.PI / 2.3, cameraAngleRef.current.phi - deltaY * 0.007));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      updateCameraPosition();
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 580;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      domElem.removeEventListener('mousedown', onMouseDown);
      domElem.removeEventListener('touchstart', onTouchStart);
      renderer.dispose();
    };
  }, [viewMode, isFullscreen]);

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(currentLookAt.current);
  };

  const updateScreenCoordinates = () => {
    if (!containerRef.current || !cameraRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = cameraRef.current;

    const coords: { [key: string]: { x: number; y: number } } = {};

    LOCATIONS_DATA.forEach(loc => {
      const pos = new THREE.Vector3(loc.coordinates.x, 2.5, loc.coordinates.z);
      pos.project(camera);

      // Only show if in front of camera
      if (pos.z < 1) {
        const x = (pos.x * 0.5 + 0.5) * width;
        const y = (-pos.y * 0.5 + 0.5) * height;
        coords[loc.id] = { x, y };
      }
    });

    setScreenCoords(coords);
  };

  const handleZoom = (delta: number) => {
    cameraAngleRef.current.radius = Math.max(14, Math.min(46, cameraAngleRef.current.radius + delta));
    updateCameraPosition();
  };

  const handleResetView = () => {
    cameraAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 3.3, radius: 28 };
    targetLookAt.current.set(0, 0.5, 0);
    updateCameraPosition();
  };

  const handleFocusLocation = (loc: LocationData) => {
    targetLookAt.current.set(loc.coordinates.x, 0.8, loc.coordinates.z);
    cameraAngleRef.current.radius = 18;
    updateCameraPosition();
    setSelectedLocation(loc);
  };

  return (
    <div 
      ref={wrapperRef}
      className={isFullscreen 
        ? "fixed inset-0 z-50 w-screen h-screen bg-[#0C1D2A] flex flex-col select-none"
        : "relative w-full rounded-3xl overflow-hidden bg-[#DEBD92] border border-hajj-border shadow-card select-none"
      }
    >
      {/* 3D Map Canvas */}
      {viewMode === '3d' && webglSupported ? (
        <div className={`relative w-full overflow-hidden ${isFullscreen ? 'flex-1 h-full' : 'h-[520px] sm:h-[640px]'}`}>
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Screen Labels pinned to 3D positions */}
          {LOCATIONS_DATA.map(loc => {
            const coord = screenCoords[loc.id];
            if (!coord) return null;

            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleFocusLocation(loc)}
                style={{
                  transform: `translate(${coord.x}px, ${coord.y}px) translate(-50%, -100%)`,
                }}
                className="absolute top-0 left-0 z-20 group transition-transform duration-150 focus:outline-none cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  {/* Floating Pill Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123B56]/90 backdrop-blur-md shadow-xl border border-white/20 text-xs font-bold text-white group-hover:scale-110 group-hover:bg-hajj-primary transition-all whitespace-nowrap">
                    <span 
                      className="w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-black"
                      style={{ backgroundColor: loc.badgeColor }}
                    >
                      {loc.order}
                    </span>
                    <span>{loc.name.split(' (')[0]}</span>
                    <Sparkles className="w-3 h-3 text-hajj-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Indicator arrow */}
                  <div className="w-2 h-2 bg-[#123B56] rotate-45 -mt-1 shadow-sm border-r border-b border-white/20 group-hover:bg-hajj-primary" />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* 2D Fallback / Diagram View */
        <div className="p-6 sm:p-8 bg-gradient-to-b from-sky-50 to-white min-h-[500px] flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-hajj-navy">
                Diagram 6 Lokasi Perjalanan Haji
              </h3>
              <p className="text-xs text-slate-500">
                Pilih stasiun perjalanan di bawah ini untuk mempelajari amalan ibadah
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOCATIONS_DATA.map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                  className="p-3.5 rounded-2xl bg-white border border-hajj-border hover:border-hajj-primary shadow-sm hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer"
                >
                  <span 
                    className="w-8 h-8 rounded-xl text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: loc.badgeColor }}
                  >
                    {loc.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-hajj-navy group-hover:text-hajj-primary transition-colors">
                      {loc.name}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {loc.shortDesc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Controls Overlay */}
      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-2">
        
        {/* Fullscreen Toggle Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`px-3 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
            isFullscreen
              ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 border-amber-300'
              : 'bg-white/95 text-hajj-navy hover:bg-white border-slate-200'
          }`}
          title={isFullscreen ? "Keluar Fullscreen" : "Layar Penuh (Fullscreen)"}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4 text-slate-950" />
              <span>Keluar Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 text-hajj-primary" />
              <span>Layar Penuh</span>
            </>
          )}
        </button>

        {webglSupported && (
          <button
            type="button"
            onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/95 text-hajj-navy shadow-md border border-slate-200 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Ganti Mode Tampilan"
          >
            <Layers className="w-4 h-4 text-hajj-primary" />
            <span className="hidden sm:inline">{viewMode === '3d' ? 'Mode 2D' : 'Mode 3D'}</span>
          </button>
        )}

        {/* 3D Navigation Controls */}
        {viewMode === '3d' && webglSupported && (
          <div className="flex flex-col rounded-xl bg-white/95 shadow-md border border-slate-200 overflow-hidden divide-y divide-slate-100">
            <button
              type="button"
              onClick={() => handleZoom(-3.5)}
              className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(3.5)}
              className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2.5 transition-colors cursor-pointer ${autoRotate ? 'text-amber-600 bg-amber-50' : 'text-slate-700 hover:bg-slate-50'}`}
              title={autoRotate ? "Jeda Rotasi Otomatis" : "Putar Otomatis"}
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="Reset Sudut Pandang"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Top Left Title Badge */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-[#123B56]/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Lanskap Gurun Arab & Rute Haji</span>
        </div>
      </div>

      {/* Fullscreen Quick Station Selector Toolbar (at bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Map Interactive Hint */}
        <div className="pointer-events-auto max-w-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm text-[11px] text-white flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-hajj-gold shrink-0" />
          <span>Geser layar untuk memutar lanskap 3D. Ketuk pin untuk detail lokasi.</span>
        </div>

        {/* Quick Location Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto max-w-full p-1 bg-[#102B3F]/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
          {LOCATIONS_DATA.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleFocusLocation(loc)}
              className="px-2.5 py-1 rounded-xl text-white text-[11px] font-bold hover:bg-white/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span 
                className="w-3.5 h-3.5 rounded-full text-[9px] text-white flex items-center justify-center font-black"
                style={{ backgroundColor: loc.badgeColor }}
              >
                {loc.order}
              </span>
              <span>{loc.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Selected Location Details Modal / BottomSheet (Dominan Biru) */}
      <LocationBottomSheet
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />

    </div>
  );
};

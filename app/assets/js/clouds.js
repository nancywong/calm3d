var CLOUDS = {
  ms_container: null,
  ms_camera: null,
  ms_scene: null,
  ms_renderer: null,
  ms_mesh: null,
  ms_geometry: null, 
  ms_material: null,

  mouseX: 0, 
  mouseY: 0,
  start_time: Date.now(),

  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,

  init: function init() {

    CLOUDS.ms_container = document.createElement( 'div' );
    document.body.appendChild( CLOUDS.ms_container );

    // Bg gradient
    var canvas = document.createElement( 'canvas' );

    canvas.id = 'canvas-clouds';
    canvas.width = 32;
    canvas.height = window.innerHeight;

    var context = canvas.getContext( '2d' );

    var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
    gradient.addColorStop(0, "#1e4877");
    gradient.addColorStop(0.5, "#4584b4");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    CLOUDS.ms_container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
    CLOUDS.ms_container.style.backgroundSize = '32px 100%';

    CLOUDS.ms_camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
    CLOUDS.ms_camera.position.z = 6000;

    CLOUDS.ms_scene = new THREE.Scene();

    CLOUDS.ms_geometry = new THREE.Geometry();

    var texture = THREE.ImageUtils.loadTexture( 'assets/img/cloud.png', null, this.update );
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

    CLOUDS.ms_material = new THREE.ShaderMaterial( {

      uniforms: {

        "map": { type: "t", value: texture },
        "fogColor" : { type: "c", value: fog.color },
        "fogNear" : { type: "f", value: fog.near },
        "fogFar" : { type: "f", value: fog.far },

      },
      vertexShader: document.getElementById( 'vs' ).textContent,
      fragmentShader: document.getElementById( 'fs' ).textContent,
      depthWrite: false,
      depthTest: false,
      transparent: true

    } );

    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

    for ( var i = 0; i < 8000; i++ ) {

      plane.position.x = Math.random() * 1000 - 500;
      plane.position.y = - Math.random() * Math.random() * 200 - 15;
      plane.position.z = i;
      plane.rotation.z = Math.random() * Math.PI;
      plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

      THREE.GeometryUtils.merge( CLOUDS.ms_geometry, plane );

    }

    CLOUDS.ms_mesh = new THREE.Mesh( CLOUDS.ms_geometry, CLOUDS.ms_material );
    CLOUDS.ms_scene.add( CLOUDS.ms_mesh );

    CLOUDS.ms_mesh = new THREE.Mesh( CLOUDS.ms_geometry, CLOUDS.ms_material );
    CLOUDS.ms_mesh.position.z = - 8000;
    CLOUDS.ms_scene.add( CLOUDS.ms_mesh );

    CLOUDS.ms_renderer = new THREE.WebGLRenderer( { antialias: false } );
    CLOUDS.ms_renderer.setSize( window.innerWidth, window.innerHeight );
    CLOUDS.ms_container.appendChild( CLOUDS.ms_renderer.domElement );

    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );

  },

  onDocumentMouseMove: function onDocumentMouseMove( event ) {

    this.mouseX = ( event.clientX - this.windowHalfX ) * 0.25;
    this.mouseY = ( event.clientY - this.windowHalfY ) * 0.15;

  },

  onWindowResize: function onWindowResize( event ) {

    CLOUDS.ms_camera.aspect = window.innerWidth / window.innerHeight;
    CLOUDS.ms_camera.updateProjectionMatrix();

    CLOUDS.ms_renderer.setSize( window.innerWidth, window.innerHeight );

  },

  update: function update() {
    position = ( ( Date.now() - CLOUDS.start_time ) * 0.03 ) % 8000;

    CLOUDS.ms_camera.position.x += ( this.mouseX - CLOUDS.ms_camera.position.x ) * 0.01;
    CLOUDS.ms_camera.position.y += ( - this.mouseY - CLOUDS.ms_camera.position.y ) * 0.01;
    CLOUDS.ms_camera.position.z = - position + 8000;

    CLOUDS.ms_renderer.render( CLOUDS.ms_scene, CLOUDS.ms_camera );
  }
}
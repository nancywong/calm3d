var cloudsContainer;
var cloudsCamera, cloudsScene, cloudsRenderer;
var cloudsMesh, cloudsGeometry, cloudsMaterial;

var cloudsMouseX = 0, cloudsMouseY = 0;
var startTime = Date.now();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var cloudsInit = function cloudsInit() {

  cloudsContainer = document.createElement( 'div' );
  cloudsContainer.id = 'clouds-container';
  document.body.appendChild( cloudsContainer );

  // Bg gradient
  var canvas = document.createElement( 'canvas' );
  canvas.width = 32;
  canvas.height = window.innerHeight;

  var context = canvas.getContext( '2d' );

  var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
  gradient.addColorStop(0, '#1e4877');
  gradient.addColorStop(0.5, '#4584b4');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  cloudsContainer.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
  cloudsContainer.style.backgroundSize = '32px 100%';

  cloudsCamera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
  cloudsCamera.position.z = 6000;

  cloudsScene = new THREE.Scene();

  cloudsGeometry = new THREE.Geometry();

  var texture = THREE.ImageUtils.loadTexture( 'assets/img/cloud.png', null, clouds_animate );
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );

  cloudsMaterial = new THREE.ShaderMaterial( {

    uniforms: {

      "map": { type: "t", value: texture },
      "fogColor" : { type: "c", value: fog.color },
      "fogNear" : { type: "f", value: fog.near },
      "fogFar" : { type: "f", value: fog.far }
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

    THREE.GeometryUtils.merge( cloudsGeometry, plane );
  }

  cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
  cloudsScene.add( cloudsMesh );

  cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
  cloudsMesh.position.z = - 8000;
  cloudsScene.add( cloudsMesh );

  cloudsRenderer = new THREE.WebGLRenderer( { antialias: false } );
  cloudsRenderer.setSize( window.innerWidth, window.innerHeight );
  cloudsContainer.appendChild( cloudsRenderer.domElement );

  document.addEventListener( 'mousemove', clouds_onDocumentMouseMove, false );
  window.addEventListener( 'resize', clouds_onWindowResize, false );

}

function clouds_onDocumentMouseMove( event ) {
  cloudsMouseX = ( event.clientX - windowHalfX ) * 0.25;
  cloudsMouseY = ( event.clientY - windowHalfY ) * 0.15;
}

function clouds_onWindowResize( event ) {
  cloudsCamera.aspect = window.innerWidth / window.innerHeight;
  cloudsCamera.updateProjectionMatrix();

  cloudsRenderer.setSize( window.innerWidth, window.innerHeight );
}

function clouds_animate() {

  position = ( ( Date.now() - startTime ) * 0.03 ) % 8000;

  cloudsCamera.position.x += ( cloudsMouseX - cloudsCamera.position.x ) * 0.01;
  cloudsCamera.position.y += ( - cloudsMouseY - cloudsCamera.position.y ) * 0.01;
  cloudsCamera.position.z = - position + 8000;

  cloudsRenderer.render( cloudsScene, cloudsCamera );

}

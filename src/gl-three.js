export default {
  start() {
    //create scenc
    var scene = new THREE.Scene();
    //create Camera
    var camera = new THREE.PerspectiveCamera(45 , window.innerWidth/window.innerHeight, 1, 1000);
    //create renderer
    var renderer = new THREE.WebGLRenderer();
    //clean renderer color
    renderer.setClearColor('#FFFFFF');
    //set renderer size
    renderer.setSize(window.innerWidth,window.innerHeight);
    //put rendererDom into body
    document.body.appendChild(renderer.domElement);
    //create geometry
    var geometry = new THREE.CubeGeometry(2,2,2);
    //create naterial
    var material = new THREE.MeshBasicMaterial({color:0xff0000});
    //create cube
    var cube = new THREE.Mesh(geometry,material);
    //put cube into scene
    scene.add(cube);
 
    //Point of view see the cube
    camera.position.z = 10;
 
    function render(){
        //add animation
        requestAnimationFrame(render);
        //rotating
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        //renderer cube
        renderer.render(scene,camera);
    }
    render();
  }
}
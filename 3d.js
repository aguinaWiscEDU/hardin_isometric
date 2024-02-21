/* TO DO FOR THE ASSIGNMENT */
// 1. Must have a MOVEABLE CAMERA (Use Slider)
// 2. 3D world must include a HIERARCHICAL MODEL or PARAMETRIC CURVE (or both)
// 3. The drawing must make it apparent that it is a 3D world (either the camera moves or make the objects 3d!)
// 4. Must use a PROJECTION TRANSFORM (either orthographic or perspective)

/* 
    Process of creation
    1. Get the drawing on canvas first (either 2d objects or 3d objects)
        => Shapes **DONE
        => Movement (Slider) **DONE
        => Draw Axis? (when camera is done)
    2. Build Camera
        => Create easy projection
        => maybe build a second scene showing camera?
    3. Finishing Touches
        => adjust colors
        => second view?


*/

/* Global Declarations */
//main view of scene
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');

//camera view of scene (add later)
var viewAngle;
var cam;
var target;
var upCam;
var vFocus;

function draw() {
    canvas.width = canvas.width;

    /* 2d mat functions */
    function matMove(x, y, shape) {
        var res = vec3.create();

        vec3.transformMat4(res, [x, y], shape);

        context.moveTo(res[0], res[1]);
    }

    function matLine(x, y, shape) {
        var res = vec3.create();

        vec3.transformMat4(res, [x, y], shape);

        context.lineTo(res[0], res[1]);
    }


    function tri(color, shape) {
        context.beginPath();
        context.fillStyle = color;
        matMove(0, 0, shape);
        matLine(0, 50, shape);
        matLine(50, 25, shape);
        matLine(0, 0, shape);
        context.closePath();

        context.fill();
    }
/*
///////////////////////////////////////////////////////////
    /* CAMERA PROJ 
    //setup camangle
    viewAngle = slider2.value * 0.25 * Math.PI;

    /* 3d mat functions (specifically for camera) 
    function mat3dMove(x, y, shape) {
        var res = vec3.create();
        
        vec3.transformMat4(res, [x, y], shape);

        context.moveTo(res[0], res[1]);
    }

    function mat3dLine(x, y, shape) {
        var res = vec3.create();
        
        vec3.transformMat4(res, [x, y], shape);

        context.lineTo(res[0], res[1]);
    }

    var camAng = function(angle) {
        var distance = 150.0;
        var viewPort = vec3.create();

        viewPort[0] = distance * Math.sin(angle);
        viewPort[1] = 100;
        viewPort[2] = distance * Math.cos(angle);
    }

    cam = camAng(viewAngle);
    target = vec3.fromValues(0, 0, 0);
    upCam = vec3.fromValues(0, 175, 0);
    vFocus = mat4.create();
    mat4.lookAt(vFocus, cam, target, upCam);

    //projection
    var vPort = mat4.create();
    mat4.fromTranslation(vPort, [200, 300, 0]);

    mat4.scale(vPort, vPort, [100, -100, 1]);

    var projection = mat4.create();
    mat4.ortho(projection, -120, 120, -120, 120, -1, 1);

    //utilizing demo example of projection
    var viewCam = mat4.create();
    mat4.multiply(viewCam, )
 
 
//////////////////////////////////////////////////*/

    //declare vars to use for triangles
    var tri1;
    var tri2;
    var tri3;
    var tri4;
    var tri5;
    var tri6;


    //links
    var link1;
    var link2;
    var link3;
    var link4;
    var link5;

    var transPos = [0, -50];
    var angle = slider1.value * 0.25;
    angle += (1 * Math.PI / 180);

    tri1 = mat3.create();
    mat3.fromTranslation(tri1, [350, 350]);
    tri("black", tri1);
    mat3.rotate(tri1, tri1, angle);

    link1 = mat3.create();
    mat3.fromTranslation(link1, transPos);

    tri2 = mat3.create();
    mat3.multiply(tri2, tri1, link1);
    tri("black", tri2);
    mat3.rotate(tri2, tri2, angle);


    link2 = mat3.create();
    mat3.fromTranslation(link2, transPos);

    tri3 = mat3.create();
    mat3.multiply(tri3, tri2, link2);
    tri("black", tri3);
    mat3.rotate(tri3, tri3, angle);

    link3 = mat3.create();
    mat3.fromTranslation(link3, transPos);

    tri4 = mat3.create();
    mat3.multiply(tri4, tri3, link3);
    tri("black", tri4);
    mat3.rotate(tri4, tri4, angle);

    link4 = mat3.create();
    mat3.fromTranslation(link4, transPos);

    tri5 = mat3.create();
    mat3.multiply(tri5, tri4, link4);
    tri("black", tri5);
    mat3.rotate(tri5, tri5, angle);

    link5 = mat3.create();
    mat3.fromTranslation(link5, transPos);

    tri6 = mat3.create();
    mat3.multiply(tri6, tri5, link5);
    tri("black", tri6);


    

}


function main() {
    slider1.addEventListener("input", draw);
    draw();
}

main();

window.onload = main;
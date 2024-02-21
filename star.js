/* TO DO FOR THE ASSIGNMENT */
// 1. Must have a MOVEABLE CAMERA (Use Slider) -> DONE
// 2. 3D world must include a HIERARCHICAL MODEL or PARAMETRIC CURVE (or both) -> DONE: HIERARCHICAL MODEL USING MAT4 TRANSLATES
// 3. The drawing must make it apparent that it is a 3D world (either the camera moves or make the objects 3d!) -> DONE: Utilized Axis, and camera rotation
// 4. Must use a PROJECTION TRANSFORM (either orthographic or perspective) -> DONE: Camera uses ortho transform

/* 
    Process of creation
    1. Get the drawing on canvas first (either 2d objects or 3d objects)
        => Shapes **DONE
        => Movement (Slider) **DONE
        => Draw Axis? (when camera is done) **DONE
    2. Build Camera
        => Create easy projection **DONE
    3. Finishing Touches
        => adjust colors **DONE 


*/

/* Global Declarations */
//main view of scene
var canvas = document.getElementById('myCanvas');
var mainContext = canvas.getContext('2d');
var slider1 = document.getElementById('slider1');
var slider2 = document.getElementById('slider2');
var btn = document.getElementById('btn');

//default context
var context = mainContext;

slider1.value = 0;
slider2.value = 0;

/* colors for button */
var color1;
var color2;
var color3;
var color4;
var color5;

var cVal = 0;

//camera view of scene (MAIN)
var viewAngle;
var cam;
var target;
var upCam;
var vFocus;

//camera view of projection (2nd)
var ang2;
var cam2;
var target2;
var upCam2;
var vFocus2;

function draw() {
    canvas.width = canvas.width;

    /* 2d mat functions */
    function matMove(vals, shape) {
        var res = vec3.create();
        
        vec3.transformMat4(res, vals, shape);

        context.moveTo(res[0], res[1]);

    }

    function matLine(vals, shape) {
        var res = vec3.create();

        vec3.transformMat4(res, vals, shape);

        context.lineTo(res[0], res[1]);
    }

    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    matMove([1.2,0,0],Tx);matLine([0,0,0],Tx);matLine([0,1.2,0],Tx);
        matMove([0,0,0],Tx);matLine([0,0,1.2],Tx);
	    // Arrowheads
	    matMove([1.1,.05,0],Tx);matLine([1.2,0,0],Tx);matLine([1.1,-.05,0],Tx);
	    matMove([.05,1.1,0],Tx);matLine([0,1.2,0],Tx);matLine([-.05,1.1,0],Tx);
        matMove([.05,0,1.1],Tx);matLine([0,0,1.2],Tx);matLine([-.05,0,1.1],Tx);
	    // X-label
	    matMove([1.3,-.05,0],Tx);matLine([1.4,.05,0],Tx);
	    matMove([1.3,.05,0],Tx);matLine([1.4,-.05,0],Tx);
        // Y-label
        matMove([-.05,1.4,0],Tx);matLine([0,1.35,0],Tx);matLine([.05,1.4,0],Tx);
        matMove([0,1.35,0],Tx);matLine([0,1.28,0],Tx);
	    // Z-label
	    matMove([-.05,0,1.3],Tx);
	    matLine([.05,0,1.3],Tx);
	    matLine([-.05,0,1.4],Tx);
	    matLine([.05,0,1.4],Tx);

	    context.stroke();
	}


    var camAng = function(angle) {
        var distance = 120.0;
        var viewPort = vec3.create();

        viewPort[0] = 135; //distance * Math.sin(angle);
        viewPort[1] = distance * Math.tan(angle);
        viewPort[2] = distance * Math.cos(angle);

        return [viewPort[0], viewPort[1], viewPort[2]];
    }

    var camTrans = function (angle) {
        var distance = 120.0;
        var viewPort = vec3.create();

        viewPort[0] = distance * Math.sin(angle);
        viewPort[1] = 100;
        viewPort[2] = distance * Math.cos(angle);

        return [viewPort[0], viewPort[1], viewPort[2]];
    }

    function tri(color, shape, scale) {
        var cloneMat = mat4.clone(shape);
        mat4.scale(cloneMat, cloneMat, [scale, scale, scale]);

        context.beginPath();
        context.fillStyle = color;
        matMove([0, 0, 0], cloneMat);
        matLine([0, 50, 0], cloneMat);
        matLine([50, 25, 0], cloneMat);
        matLine([0, 0, 0], cloneMat);
        context.closePath();

        context.fill();
    }

 ///////////////////////////////////////////////////////////
    /* CAMERA PROJ */
    //setup camangle
    viewAngle = slider2.value * 0.025 * Math.PI;

    cam = camAng(viewAngle);
    target = vec3.fromValues(0, 0, 0);
    upCam = vec3.fromValues(0, 120, 0);
    vFocus = mat4.create();
    mat4.lookAt(vFocus, cam, target, upCam);

    //projection
    var vPort = mat4.create();
    mat4.fromTranslation(vPort, [250, 200, 0]);
    mat4.scale(vPort, vPort, [100, -100, 1]);

    var projection = mat4.create();
    mat4.ortho(projection, -100, 100, -100, 100, -1, 1);

    //utilizing demo example of projection
    var viewCam = mat4.create();
    mat4.multiply(viewCam, vPort, projection);
    mat4.multiply(viewCam, viewCam, vFocus);
 
 
 //////////////////////////////////////////////////
    /* Declare Shapes */
    //first set 
    var tri1;
    var tri2;
    var tri3;
    var tri4;
    var tri5;

    //first links
    var link1;
    var link2;
    var link3;
    var link4;

    //using demo 3d axis draw for better visual
    draw3DAxes("white", viewCam, 100.0);

    var transPos = [0, -50, 0];
    var angle = slider1.value * 0.25;
    angle += (1 * Math.PI / 180);

    tri1 = mat4.create();
    mat4.multiply(tri1, tri1, viewCam);
    tri(color1, tri1, 1.0);
    mat4.rotateZ(tri1, tri1, angle);

    link1 = mat4.create();
    mat4.fromTranslation(link1, transPos);

    tri2 = mat4.create();
    mat4.multiply(tri2, tri1, link1);
    tri(color2, tri2, 1.0);
    mat4.rotateZ(tri2, tri2, angle);

    link2 = mat4.create();
    mat4.fromTranslation(link2, transPos);

    tri3 = mat4.create();
    mat4.multiply(tri3, tri2, link2);
    tri(color3, tri3, 1.0);
    mat4.rotateZ(tri3,tri3, angle);

    link3 = mat4.create();
    mat4.fromTranslation(link3, transPos);

    tri4 = mat4.create();
    mat4.multiply(tri4, tri3, link3);
    tri(color4, tri4, 1.0);
    mat4.rotateZ(tri4, tri4, angle);

    link4 = mat4.create();
    mat4.fromTranslation(link4, transPos);

    tri5 = mat4.create();
    mat4.multiply(tri5, tri4, link4);
    tri(color5, tri5, 1.0);

}

function main() {
    color1 = "#b3b300";
    color2 = "#b3b300";
    color3 = "#b3b300";
    color4 = "#b3b300";
    color5 = "#b3b300";
    
    btn.addEventListener("click", function onClick(){
        if(cVal == 0){
            color1 = "#ff0000";
            color2 = "#00ff00";
            color3 = "#0000ff";
            color4 = "#ffff00";
            color5 = "#00ffff";
            
            cVal = 1;

            draw();
        }
        else if (cVal == 1) {
            color1 = "#b3b300";
            color2 = "#b3b300";
            color3 = "#b3b300";
            color4 = "#b3b300";
            color5 = "#b3b300";

            cVal = 0;

            draw();
        }
    });

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    draw();
}

window.onload = main();
console.log(new Date);
var oe = document.querySelector('textarea');

var speed_move = 5000;

var speed_extrude_first_layer = 1200;
var speed_extrude_other_layer = 2400;

var speed_extrude = speed_extrude_first_layer;

var layerheight = 0.25;

var extr_start = 0.3;
var extr_end = -0.2;
var extr_speed = 400;

var retract_length = 1;
var retract_speed = 1000;

var extrusion = 0.05; // filament per extrusion distance

var cx = cy = cz = 0;

var path_move = path_extrude = gcode = '';
var last_command = '';


var gcode_start = `
G21 ; set units to millimeters
G90 ; absolute coordinates
M82 ; absolute extrudes

M107 ; FAN off
M104 S150 ; Hotend temp (no wait)
M140 S70 ; Bed temp (no wait)
G28 ; home all axes
G1 Z0.5
M190 S70 ; Bed wait temp
M109 S230 ; Hotend temp (wait)
M140 S85 ; Bed temp (no wait)

; Beep
M42 P37 S255
G4 P500
M42 P37 S0

G91 ; relative coordinates
M83 ; relative extrudes

; Purge nozzle
G1 E20 F60
G1 X25 Y10 F10000
`;

var gcode_end = `
G1 Z5 E-2
G28 X Y
G1 E3 F60

G0 Y150

M104 S0 ; hotend off
M140 S0 ; bed off
M107 ; FAN off
M84 ; disable motors

; Beep
M42 P37 S255
G4 P500
M42 P37 S0
`;


function start() {
    cx, cy, cz = 0;
    last_command = '';
    path_move = path_extrude = gcode = '';
    path_move = path_extrude = 'M 0 200';
    gcode += gcode_start + '\n';

    gcode += `
G90 ; absolute coordinates
G1 Z${layerheight}
G91 ; relative coordinates
M83 ; relative extrudes
`;

}

function end() {
    gcode += gcode_end;
}

function move(x,y) {
    if(last_command == 'E') {
        gcode += `G1 F${extr_speed} ; extra\n`;
        gcode += `G1 E${extr_end} F${extr_speed}\n`;
    }    
    if(last_command != 'M') {
        gcode += `G0 F${speed_move} ; move\n`;
    }    
    path_move += `l ${x} ${-y}`;
    path_extrude += `m ${x} ${-y}`;
    gcode += `G0 X${x} Y${y}\n`
    last_command = 'M';
}

function extrude(x,y) {
    if(last_command != 'E') {
        gcode += `G1 F${extr_speed} ; extra\n`;
        gcode += `G1 E${extr_start} F${extr_speed}\n`;
        gcode += `G1 F${speed_extrude} ; extrude\n`;
    }    
    path_move += `m ${x} ${-y}`;
    path_extrude += `l ${x} ${-y}`;
    var ext = Math.sqrt(x*x + y*y) * extrusion;
    gcode += `G1 X${x} Y${y} E${ext}\n`;
    last_command = 'E';
}

function moveZ(z) {
    move(0,0);
    gcode += `G0 Z${z}\n`;
}

function retract_start() {
    gcode += `G1 F${retract_speed} ; retract\n`;
    gcode += `G1 E${-retract_length} F${retract_speed}\n`;
    last_command = 'R';
}

function retract_end() {
    gcode += `G1 F${retract_speed} ; retract\n`;
    gcode += `G1 E${retract_length} F${retract_speed}\n`;
    last_command = 'R';
}


function draw() {
    document.querySelector('#move').setAttribute('d',path_move);
    document.querySelector('#extrude').setAttribute('d',path_extrude);
    document.querySelector('textarea').value = gcode;
    blob = new Blob([gcode], {type: "octet/stream"}),
    url = window.URL.createObjectURL(blob);
    document.querySelector('#download').href = url;
}




start();
move(10,10);


for(var l=0; l<4*8; l++) {
    speed_extrude = (l==0) ? speed_extrude_first_layer : speed_extrude_other_layer;

    extrude(5,5);

    extrude(15*9+1,0);
    extrude(0,15*9+1);
    extrude(-15*9-1,0);
    extrude(0,-15*9-1);
    extrude(1,1);
    extrude(15*9-1,0);
    extrude(0,15*9-1);
    extrude(-15*9+1,0);
    extrude(0,-15*9+1);
    move(0,-1);


    for(var x=0; x<8; x++) {
        move(14,0);
        extrude(0,15*9+1);
        move(1,0);
        extrude(0,-15*9-1);
    }

    move(15,1);
    for(var x=0; x<8; x++) {
        move(0,14);
        extrude(-15*9-1,0);
        move(0,1);
        extrude(15*9+1,0);
    }

    retract_start();
    move(3,0);
    move(0,-126);
    move(-144,0);
    retract_end();
    moveZ(layerheight);

}

end();

draw();

$d = 144;
$di = $d - 2;
$c = 1;

difference() {
    hull() {
        for(i=[-1,1])for(j=[-1,1])translate([$d/2*i,$d/2*j,0]) {
            cylinder(r=6,h=1,$fn=32);
            translate([0,0,2]) cylinder(r=8,h=23,$fn=32);
        }
    }
    
    hull() {
        for(i=[-1,1])for(j=[-1,1])translate([$di/2*i,$di/2*j,0]) {
            cylinder(r1=4,r2=2,h=2,$fn=32);
        }
    }
    hull() for(i=[-1,1])for(j=[-1,1])translate([$di/2*i,$di/2*j,2]) {
            cylinder(r=2,h=50,$fn=32);
    }
    translate([0,0,25+2.5]) cube([150.4,150.4,50],center=true);
    translate([-150/6,0,1+2.5+15]) cube([30,154,2],center=true);
    translate([+150/6,0,1+2.5+15]) cube([30,154,2],center=true);
    rotate([0,0,90]) {
        translate([-150/6,0,1+2.5+15]) cube([30,154,2],center=true);
        translate([+150/6,0,1+2.5+15]) cube([30,154,2],center=true);
    }
}

%cube([150,150,1],center=true);
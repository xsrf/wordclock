$d_pcb = 150.1;
$d_spacer = 137;
$w = 2;
$h = 10;
$h_sp = 8;
$gap = 0.5; // gap between jigs


// pcb jig
difference() {
    cube([$d_pcb+$w*4,$d_pcb+$w*4,$h],center=true);
    cube([$d_pcb,$d_pcb,$h+1],center=true);
    cube([$d_pcb+$w*2,$d_pcb/2,$h+1],center=true);
    cube([$d_pcb/2,$d_pcb+$w*2,$h+1],center=true);
    for(i=[-1,1])for(j=[-1,1])translate([$d_pcb/2*i,$d_pcb/2*j])cube([$w,$w,$h+1],center=true);
}


// spacer jig
difference() {
    cube([$d_pcb-$gap*2,$d_pcb-$gap*2,$h_sp],center=true);
    hull() {
        cube([$d_spacer,$d_spacer,$h_sp/2],center=true);
        translate([0,0,-$h_sp/2]) cube([$d_spacer+2*$w,$d_spacer+2*$w,1],center=true);
    }
    cube([$d_spacer,$d_spacer,$h+1],center=true);
    cube([$d_spacer+$w*2,$d_spacer/2,$h+1],center=true);
    cube([$d_spacer/2,$d_spacer+$w*2,$h+1],center=true);
    for(i=[-1,1])for(j=[-1,1])translate([$d_spacer/2*i,$d_spacer/2*j])cube([$w,$w,$h+1],center=true);
}

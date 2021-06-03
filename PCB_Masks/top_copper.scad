include <_vars_.scad>;

difference() {
    square([($nx+1)*$dx-1,($ny+1)*$dy-1],center=true);
    translate([$dx/2 - $dx*$nx/2,$dy*$ny/2 - $dy/2 - $s/2]) 
    for(y=[0:$ny-1]) for(x=[0:$nx-1]) {
        offset(r=$offs, $fn=12) translate([x*$dx,-y*$dy]) {
            $c = $chars[y*$nx+x];
            if($c == "Ü" || $c == "Ö" || $c == "Ä") {
                scale([1,0.815]) text(text=$c,size=$s,font=$f,halign="center",valign="baseline");
            } else {
                text(text=$c,size=$s,font=$f,halign="center",valign="baseline");
            }
        }
    }
}
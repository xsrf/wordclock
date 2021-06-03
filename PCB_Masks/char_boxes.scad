include <_vars_.scad>;

translate([$dx/2 - $dx*$nx/2,$dy*$ny/2 - $dy/2]) 
for(y=[0:$ny-1]) for(x=[0:$nx-1]) {
    translate([x*$dx,-y*$dy]) difference() {
        square([$mdx,$mdy],center=true);
        square([$mdx-0.2,$mdy-0.2],center=true);
    }
}


include <_vars_.scad>;

translate([$dx/2 - $dx*$nx/2,$dy*$ny/2 - $dy/2]) 
for(y=[0:$ny-1]) for(x=[0:$nx-1]) {
    translate([x*$dx,-y*$dy]) {
        square([$mdx,$mdy],center=true);
    }
}

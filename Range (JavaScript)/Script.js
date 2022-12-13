// This is an algorithm for calculating the range between two coordinates of a map.



// Declares an Alphabet variable to solve for coordinates involve letters.
const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Allows the aplication to keep running or not depending on user input. Is true by default.
let Run = true;
while (Run) {

    // Gets user inputs - the current and the target's coordinates, as well as the grid scale.
    const Input_Message = "Respectively type in your and your target's coordinates, then the grid scale: ";
    let Grid_Info = prompt(Input_Message);

    // Subdivides inputs into three refined lists.
    Grid_Info = Grid_Info.toUpperCase().split(" ").filter(Element => Element != "");
    let Self_Coordinate = Grid_Info[0];
    let Target_Coordinate = Grid_Info[1];
    let Grid_Scale = Grid_Info[2];

    // Swaps each letter for it's corresponding alphabetic position as in a Cartesian Plane.
    function Translate_Coordinate(Coordinate) {
        for (Index in Coordinate) {
            Current_Element = Coordinate[Index];
            if (Alphabet.includes(Current_Element)) {
                Coordinate = Coordinate.replace(Current_Element, "," + (Alphabet.indexOf(Current_Element) + 1));
            }
        }
        return Coordinate;
    }
    Self_Coordinate = Translate_Coordinate(Self_Coordinate);
    Target_Coordinate = Translate_Coordinate(Target_Coordinate);

    // Separates X from Y of each coordinate.
    Self_Coordinate_X = Self_Coordinate.slice(0, Self_Coordinate.indexOf(","));
    Self_Coordinate_Y = Self_Coordinate.slice(Self_Coordinate.indexOf(",") + 1);
    Target_Coordinate_X = Target_Coordinate.slice(0, Target_Coordinate.indexOf(","));
    Target_Coordinate_Y = Target_Coordinate.slice(Target_Coordinate.indexOf(",") + 1);

    // Finds out which coordinate has the biggest X axis.
    let Biggest_X;
    let Smallest_X;
    if (Self_Coordinate_X > Target_Coordinate_X) {
        Biggest_X = Self_Coordinate_X;
        Smallest_X = Target_Coordinate_X;
    } else {
        Biggest_X = Target_Coordinate_X;
        Smallest_X = Self_Coordinate_X;
    }

    // Finds out which coordinate has the biggest Y axis.
    let Biggest_Y;
    let Smallest_Y;
    if (Self_Coordinate_Y > Target_Coordinate_Y) {
        Biggest_Y = Self_Coordinate_Y;
        Smallest_Y = Target_Coordinate_Y;
    } else {
        Biggest_Y = Target_Coordinate_Y;
        Smallest_Y = Self_Coordinate_Y;
    }

    // At this point, the program now has enough information to trace a triangle. As both coordinates
    // intersect at (Biggest_X, Smallest_Y) at 90°, it can use the Pythagorean Theorem to find
    // the distance of the direct route from Self_Coordinates to Target_Coordinates.

    let Horizontal_Distance = Biggest_X - Smallest_X;
    let Vertical_Distance = Biggest_Y - Smallest_Y;

    // Calculates the distance between two grid points through the Pythagorean Theorem.
    function Diagonal_Distance(Horizontal_Distance, Vertical_Distance) {
        return (Horizontal_Distance ** 2 + Vertical_Distance ** 2) ** (1 / 2);
    }
    
    // Plugs in the triangle's sides to find out the length of the hypotenuse - the shortest distance between
    // two coordinates in a Cartesian Plane.
    let Distance = Diagonal_Distance(Horizontal_Distance, Vertical_Distance);

    // Adjusts the shortest distance to fit the actual scale of the grid and rounds up the results
    Distance = Math.round((Distance * Grid_Scale * 100)) / 100;
    
    // Displays the results to the user and asks whether to continue or leave the aplication
    const Display_Message = "The distance between " + Grid_Info[0] + " and " + Grid_Info[1] + " is " + Distance + ". If you wish to leave the aplication, type exit. If not, press OK.";
    let User_Action = prompt(Display_Message).trim().toLowerCase();
    if (User_Action != "exit") {
        Run = True;
    }

}
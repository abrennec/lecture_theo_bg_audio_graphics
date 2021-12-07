
class Point {
  int x;
  int y;

  Point (int X, int Y) {
    x = X;
    y = Y;
  }

  int getX() {
    return x;
  }
  int getY() {
    return y;
  }
}

class Rectangle {
  int x;
  int y;
  int height;
  int width;

  Rectangle (int X, int Y, int Width, int Height) {
    x = X;
    y = Y;
    width = Width;
    height = Height;
  }
}


class Quadtree {
  
  
  Rectangle boundary;
  
  // how many points max per boundary
  int capacity; 
  
  ArrayList <Point> points ;
  boolean divide = false;
  
  color mondrianColor = palette[int(random(0, palette.length))];
  
  Quadtree northeast; 
  Quadtree northwest;
  Quadtree southeast;
  Quadtree southwest;

  Quadtree (Rectangle rect, int cap) {
    boundary = rect;
    capacity = cap;
    points = new ArrayList<Point>();
  }


  // is point within the boundary?
  boolean contains (Point point) {
    return  point.x <= boundary.x + boundary.width &&
      point.x >= boundary.x - boundary.width &&
      point.y <= boundary.y + boundary.height &&
      point.y >= boundary.y - boundary.height ;
  }

  // inserts point if within boundary, then subdivides if more points than capacity
  boolean insert (Point point) {
    
    // check if within boundaries
    if (!contains(point)) return false; //<>//
    
    // check if more points than capacity -> if not add point to list
    if (points.size() < capacity ) {
      points.add(point);
      return true;
    } else { // if more than capacity and not yet subdevided -> subdivide
    if (!divide) {
        subDivide();
      }
      if (northeast.insert(point)) {
        return true;
      } else if (northwest.insert(point)) {
        return true;
      } else if (southeast.insert(point)) {
        return true;
      } else if (southwest.insert(point)) {
        return true;
      } else return false; //<>//
    }
  }
  
  // recursively subdevide then quadtree and pass the capacity through
  void  subDivide () {
    int x = boundary.x;
    int y = boundary.y;
    int w = boundary.width;
    int h = boundary.height;

    northeast = new Quadtree(new Rectangle (x + w/2, y - h/2, w/2, h/2), capacity);
    northwest = new Quadtree(new Rectangle (x - w/2, y - h/2, w/2, h/2), capacity);
    southeast = new Quadtree(new Rectangle (x + w/2, y + h/2, w/2, h/2), capacity);
    southwest = new Quadtree(new Rectangle (x - w/2, y + h/2, w/2, h/2), capacity);
    divide = true;
  }
  
  void show () {
    stroke(0);
    strokeWeight(3);
    fill(mondrianColor);
    rectMode(CENTER);
    rect (float(boundary.x),float(boundary.y), float(boundary.width *2), float(boundary.height*2));
    if (divide) {
      northeast.show();
      northwest.show();
      southeast.show();
      southwest.show();
    }   
  }
}

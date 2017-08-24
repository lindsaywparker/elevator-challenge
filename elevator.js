export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = 'tbd';
    this.riders = [];
    this.stopCount = 0;
    this.floorsTraversed = 0;
  }
  
  reset() {
    this.floor = 0;
    this.currentFloor = 0;
    this.requests = 'tbd';
    this.riders = [];
    this.stopCount = 0;
    this.floorsTraversed = 0;
  }
  
  goToFloor(user) {
    this.floorsTraversed = this.floorsTraversed + Math.abs(user.currentFloor - this.currentFloor);
    this.currentFloor = user.currentFloor;
    this.stopCount++;
    console.log('Pick up:', this.currentFloor);
    
    this.riders.push(user);
    console.log('Riders:', this.riders);
    
    this.floorsTraversed = this.floorsTraversed + Math.abs(user.dropOffFloor - this.currentFloor);
    this.currentFloor = user.dropOffFloor;
    this.stopCount++;
    console.log('Drop off:', this.currentFloor);
  }
}



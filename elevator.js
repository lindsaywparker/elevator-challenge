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
  
  request(user) {
    this.riders.push(user);
  }
  
  goToFloor(hour = (new Date()).getHours()) {
    while (this.riders.length) {
      this.floorsTraversed += Math.abs(this.riders[0].currentFloor - this.currentFloor);
      this.currentFloor = this.riders[0].currentFloor;
      this.stopCount++;
      console.log('Pick up  :', this.currentFloor, this.riders[0].name);
      
      this.floorsTraversed = this.floorsTraversed + Math.abs(this.riders[0].dropOffFloor - this.currentFloor);
      this.currentFloor = this.riders[0].dropOffFloor;
      this.stopCount++;
      console.log('Drop off :', this.currentFloor, this.riders[0].name);
      this.riders.shift();
    }
    
    if (hour < 12) {
      this.floorsTraversed += this.currentFloor;
      this.currentFloor = 0;
      this.stopCount++;
      console.log('Return   :', this.currentFloor);
    }
  }
}



require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Person', function() {
  let person = new Person({ name: "Brittany", currentFloor: 2, dropOffFloor: 5 });
  
  it('should have initial properties', () => {
    assert.equal(person.name, 'Brittany');
    assert.equal(person.currentFloor, 2);
    assert.equal(person.dropOffFloor, 5);
  });
});

describe('Elevator', function() {
  let elevator = new Elevator();
  let mockUser = new Person({ name: "Brittany", currentFloor: 2, dropOffFloor: 5 });
  let hour = 17;

  beforeEach(function() {
    elevator.reset();
  });

  it('should have initial properties', () => {
    elevator.currentFloor = 0;
    elevator.requests = 'tbd';
    elevator.riders = [];
    elevator.stopCount = 0;
    elevator.floorsTraversed = 0;
  });

  it('should reset the elevator', () => {
    elevator.currentFloor = 10;
    elevator.requests = 'hi';
    elevator.riders = ['bob'];
    elevator.stopCount = 10;
    elevator.floorsTraversed = 10;
    
    assert.equal(elevator.currentFloor, 10);
    assert.equal(elevator.requests, 'hi');
    assert.deepEqual(elevator.riders, ['bob']);
    assert.equal(elevator.stopCount, 10);
    assert.equal(elevator.floorsTraversed, 10);

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.requests, 'tbd');
    assert.deepEqual(elevator.riders, []);
    assert.equal(elevator.stopCount, 0);
    assert.equal(elevator.floorsTraversed, 0);
  });
  
  it('should allow people to make a request', () => {
    elevator.request(mockUser);
    
    assert.equal(elevator.riders.length, 1);
    assert.equal(elevator.riders[0].name, 'Brittany');
    assert.equal(elevator.riders[0].currentFloor, 2);
    assert.equal(elevator.riders[0].dropOffFloor, 5);
  })

  it('should bring a rider to a floor above their current floor', () => {
    elevator.request(mockUser);
    elevator.goToFloor(hour);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.floorsTraversed, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    mockUser = new Person({ name: "Brittany", currentFloor: 8, dropOffFloor: 3 });
    elevator.request(mockUser);
    elevator.goToFloor(hour);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.floorsTraversed, 13);
  });
  
  it('should pick up and drop off riders when Person A goes up, Person B goes up', () => {
    let mockUser1 = new Person({ name: "Bob", currentFloor: 3, dropOffFloor: 9 });
    let mockUser2 = new Person({ name: "Sue", currentFloor: 1, dropOffFloor: 2 });
    
    assert.equal(elevator.riders.length, 0);
    
    elevator.request(mockUser1);
    assert.equal(elevator.riders.length, 1);
    
    elevator.request(mockUser2);
    assert.equal(elevator.riders.length, 2);

    elevator.goToFloor(hour);

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.floorsTraversed, 18);
  });
  
  it('should pick up and drop off riders when Person A goes up, Person B goes down', () => {
    mockUser1 = new Person({ name: "Bob", currentFloor: 3, dropOffFloor: 9 });
    mockUser2 = new Person({ name: "Sue", currentFloor: 6, dropOffFloor: 2 });
    
    assert.equal(elevator.riders.length, 0);
    
    elevator.request(mockUser1);
    assert.equal(elevator.riders.length, 1);
    
    elevator.request(mockUser2);
    assert.equal(elevator.riders.length, 2);

    elevator.goToFloor(hour);

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.floorsTraversed, 16);
  });
  
  it('should pick up and drop off riders when Person A goes down, Person B goes up', () => {
    mockUser1 = new Person({ name: "Bob", currentFloor: 6, dropOffFloor: 2 });
    mockUser2 = new Person({ name: "Sue", currentFloor: 1, dropOffFloor: 9 });
    
    assert.equal(elevator.riders.length, 0);
    
    elevator.request(mockUser1);
    assert.equal(elevator.riders.length, 1);
    
    elevator.request(mockUser2);
    assert.equal(elevator.riders.length, 2);

    elevator.goToFloor(hour);

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 9);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.floorsTraversed, 19);
  });
  
  it('should pick up and drop off riders when Person A goes down, Person B goes down', () => {
    mockUser1 = new Person({ name: "Bob", currentFloor: 6, dropOffFloor: 2 });
    mockUser2 = new Person({ name: "Sue", currentFloor: 9, dropOffFloor: 1 });
    
    assert.equal(elevator.riders.length, 0);
    
    elevator.request(mockUser1);
    assert.equal(elevator.riders.length, 1);
    
    elevator.request(mockUser2);
    assert.equal(elevator.riders.length, 2);

    elevator.goToFloor(hour);

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 1);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.floorsTraversed, 25);
  });
  
  it('should return to floor 0 when empty if it\'s before 12pm', () => {
    mockUser1 = new Person({ name: "Bob", currentFloor: 6, dropOffFloor: 2 });
    hour = 9;
    
    elevator.request(mockUser1);
    elevator.goToFloor(hour);

    assert.equal(elevator.riders.length, 0);
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.stopCount, 3);
    assert.equal(elevator.floorsTraversed, 12);
  })
});

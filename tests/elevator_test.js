require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

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

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.request(mockUser);
    elevator.goToFloor();

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.floorsTraversed, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.request(mockUser);
    elevator.goToFloor();

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.stopCount, 2);
    assert.equal(elevator.floorsTraversed, 13);
  });
  
  it('should pick up and drop off riders in the order of the requests', () => {
    let mockUser1 = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Sue", currentFloor: 6, dropOffFloor: 2 };
    
    elevator.request(mockUser1);
    elevator.request(mockUser2);

    elevator.goToFloor();

    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.stopCount, 4);
    assert.equal(elevator.floorsTraversed, 16);
  });
});

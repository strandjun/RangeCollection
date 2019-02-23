// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {
  constructor() {
    this.ranges = [];
  }

  /**
   * Parameter verification
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  paramVerify(range) {
    if (!Array.isArray(range)) {
      console.error("I'm sorry! Input is wrong, it should be an Array!");
      return false;
    }
    if (range.length != 2) {
      console.error("I'm sorry! Input is wrong, it should have 2 items!");
      return false;
    }
    const start = range[0],
      end = range[1];
    if (start === end) {
      console.error("I'm sorry! Input is invalid!");
      return false;
    }
    return true;
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    // TODO: implement this

    // verify
    if (!this.paramVerify(range)) {
      return;
    }

    // blank Array
    if (this.ranges.length === 0) {
      this.ranges.push(range);
      return;
    }

    // add action
    let counter = 0;
    let i = 0;
    while (i < this.ranges.length) {
      const rangeCur = this.ranges[i];

      if (rangeCur[1] >= range[1]) {
        // left
        if (rangeCur[0] > range[1]) {
          this.ranges.splice(i - counter, counter, range);
        } else if (
          (range[0] < rangeCur[0] && rangeCur[0] <= range[1]) ||
          rangeCur[1] === range[1]
        ) {
          counter++;
          range[1] = rangeCur[1];
          this.ranges.splice(i - counter + 1, counter, range);
        }
        return false;
      } else {
        // right or right cross
        if (rangeCur[1] >= range[0]) {
          range[0] = range[0] < rangeCur[0] ? range[0] : rangeCur[0];
          counter++;
        }
        i++;
      }
    }
    this.ranges.splice(this.ranges.length - counter, counter, range);
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // TODO: implement this

    // verify
    if (!this.paramVerify(range) || !this.ranges.length) {
      return;
    }

    // remove action
    let i = 0;
    while (i < this.ranges.length) {
      const curRange = this.ranges[i];

      if (curRange[0] >= range[1]) {
        // left
        return;
      }

      if (curRange[1] < range[0]) {
        // right
        i++;
        continue;
      }

      if (curRange[1] < range[1]) {
        // right cross
        if (curRange[0] < range[0]) {
          this.ranges.splice(i, 1, [curRange[0], range[0]]);
          i++;
        } else {
          this.ranges.splice(i, 1);
        }
        range[0] = curRange[1];
        continue;
      }

      if (curRange[1] >= range[1]) {
        if (curRange[0] >= range[0]) {
          // left cross
          if (curRange[1] === range[1]) {
            this.ranges.splice(i, 1);
            return;
          }
          this.ranges.splice(i, 1, [range[1], curRange[1]]);
          return;
        } else if (curRange[0] < range[0]) {
          //contain
          let newRanges = [];
          if (range[0] > curRange[0]) {
            newRanges.push([curRange[0], range[0]]);
          }
          if (curRange[1] > range[1]) {
            newRanges.push([range[1], curRange[1]]);
          }
          this.ranges.splice(i, 1, ...newRanges);
          return;
        }
      }
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    // TODO: implement this
    let printStr = "";
    let num = 0;
    while (num < this.ranges.length) {
      printStr += `[${this.ranges[num][0]}, ${this.ranges[num][1]}) `;
      num++;
    }
    console.log("print:", printStr);
    // return printStr;
  }
}

// Example run
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.add([50, 100]);
rc.print();
// Should display: [1, 8) [10, 21) [50, 100)

rc.add([40, 51]);
rc.print();
// Should display: [1, 8) [10, 21) [40, 100)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21) [40, 100)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21) [40, 100)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21) [40, 100)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21) [40, 100)

rc.remove([20, 45]);
rc.print();
// Should display: [1, 3) [19, 20) [45, 100)

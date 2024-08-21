class MersenneTwister {
  constructor(seed) {
    this.mt = new Array(624);
    this.mti = 624;
    this.init_genRand(seed);
  }

  init_genRand(seed) {
    this.mt[0] = seed >>> 0;
    for (this.mti = 1; this.mti < 624; this.mti++) {
      this.mt[this.mti] =
        (1812433253 * (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)) +
          this.mti) >>>
        0;
    }
  }

  genRand_int32() {
    let y;
    const mag01 = [0x0, 0x9908b0df];
    if (this.mti >= 624) {
      let kk;
      for (kk = 0; kk < 624 - 397; kk++) {
        y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
        this.mt[kk] = this.mt[kk + 397] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < 624 - 1; kk++) {
        y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
        this.mt[kk] = this.mt[kk + (397 - 624)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[623] & 0x80000000) | (this.mt[0] & 0x7fffffff);
      this.mt[623] = this.mt[397 - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
      this.mti = 0;
    }
    y = this.mt[this.mti++];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;
    return y >>> 0;
  }

  random() {
    return this.genRand_int32() * (1.0 / 4294967296.0);
  }
}

function getRandomValueInRange(
  min,
  max,
  numberOfSegments,
  probabilities,
  seedValue
) {
  const rng = new MersenneTwister(seedValue);
  const randomValue = rng.random(); // Random float between 0 and 1

  // Ensure probabilities sum to 1 (or close to 1) if not normalized
  let totalProbability = probabilities.reduce((a, b) => a + b, 0);
  if (totalProbability !== 1) {
    probabilities = probabilities.map((p) => p / totalProbability);
  }

  // Calculate cumulative probabilities
  let cumulativeProbabilities = [];
  totalProbability = 0;
  for (let i = 0; i < probabilities.length; i++) {
    totalProbability += probabilities[i];
    cumulativeProbabilities.push(totalProbability);
  }

  let segments = [];
  let segmentSize = (max - min) / numberOfSegments;
  for (let i = 0; i < numberOfSegments; i++) {
    let segmentMin = min + i * segmentSize;
    let segmentMax = min + (i + 1) * segmentSize;
    segments.push([segmentMin, segmentMax]);
  }

  // Determine the segment based on the random value
  let segmentIndex = 0;
  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    if (randomValue <= cumulativeProbabilities[i]) {
      segmentIndex = i;
      break;
    }
  }

  // Get the segment range
  const segmentRange = segments[segmentIndex];
  const segmentMin = segmentRange[0];
  const segmentMax = segmentRange[1];

  // Generate a random value within the selected segment
  return Math.round(
    Math.floor(rng.random() * (segmentMax - segmentMin + 1)) + segmentMin
  );
}

const characterAttributeWeight = {
  Bronze: {
    power: {
      range: [1, 40],
      numOfSegments: 3,
      probabilities: [0.5, 0.3, 0.2],
    },
    defend: {
      range: [1, 40],
      numOfSegments: 3,
      probabilities: [0.5, 0.3, 0.2],
    },
    agility: {
      range: [1, 40],
      numOfSegments: 3,
      probabilities: [0.5, 0.3, 0.2],
    },
    intelligence: {
      range: [1, 40],
      numOfSegments: 3,
      probabilities: [0.5, 0.3, 0.2],
    },
    luck: {
      range: [1, 40],
      numOfSegments: 3,
      probabilities: [0.5, 0.3, 0.2],
    },
  },
  Silver: {
    power: {
      range: [1, 60],
      numOfSegments: 4,
      probabilities: [0.2, 0.4, 0.3, 0.1],
    },
    defend: {
      range: [1, 60],
      numOfSegments: 4,
      probabilities: [0.2, 0.4, 0.3, 0.1],
    },
    agility: {
      range: [1, 60],
      numOfSegments: 4,
      probabilities: [0.2, 0.4, 0.3, 0.1],
    },
    intelligence: {
      range: [1, 60],
      numOfSegments: 4,
      probabilities: [0.2, 0.4, 0.3, 0.1],
    },
    luck: {
      range: [1, 60],
      numOfSegments: 4,
      probabilities: [0.2, 0.4, 0.3, 0.1],
    },
  },
  Gold: {
    power: {
      range: [1, 70],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    defend: {
      range: [1, 70],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    agility: {
      range: [1, 70],
      numOfSegments: 4,
      probabilities: [0.1, 0.4, 0.4, 0.1],
    },
    intelligence: {
      range: [1, 70],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    luck: {
      range: [1, 70],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
  },
  Platinum: {
    power: {
      range: [1, 80],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    defend: {
      range: [1, 80],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    agility: {
      range: [1, 80],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    intelligence: {
      range: [1, 80],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
    luck: {
      range: [1, 80],
      numOfSegments: 4,
      probabilities: [0.1, 0.3, 0.4, 0.2],
    },
  },
  Diamond: {
    power: {
      range: [1, 100],
      numOfSegments: 4,
      probabilities: [0.1, 0.2, 0.5, 0.2],
    },
    defend: {
      range: [1, 100],
      numOfSegments: 4,
      probabilities: [0.1, 0.2, 0.5, 0.2],
    },
    agility: {
      range: [1, 100],
      numOfSegments: 4,
      probabilities: [0.1, 0.2, 0.5, 0.2],
    },
    intelligence: {
      range: [1, 100],
      numOfSegments: 4,
      probabilities: [0.1, 0.2, 0.5, 0.2],
    },
    luck: {
      range: [1, 100],
      numOfSegments: 4,
      probabilities: [0.1, 0.2, 0.5, 0.2],
    },
  },
};

const itemAttributeWeight = {
  Bronze: {
    percentage: {
      range: [1, 10],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
    value: {
      range: [1, 10],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
  },
  Silver: {
    percentage: {
      range: [5, 15],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
    value: {
      range: [5, 15],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
  },
  Gold: {
    percentage: {
      range: [5, 18],
      numOfSegments: 3,
      probabilities: [0.45, 0.5, 0.05],
    },
    value: {
      range: [5, 18],
      numOfSegments: 3,
      probabilities: [0.45, 0.5, 0.05],
    },
  },
  Platinum: {
    percentage: {
      range: [10, 25],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
    value: {
      range: [10, 25],
      numOfSegments: 3,
      probabilities: [0.5, 0.45, 0.05],
    },
  },
  Diamond: {
    percentage: {
      range: [15, 30],
      numOfSegments: 3,
      probabilities: [0.45, 0.5, 0.05],
    },
    value: {
      range: [15, 30],
      numOfSegments: 3,
      probabilities: [0.3, 0.6, 0.05],
    },
  },
};

export { getRandomValueInRange, characterAttributeWeight, itemAttributeWeight };

export const lifecycleThresholds = {
  egg: {
    temperature: { min: 20, max: 35, optimal: [25, 30] },
    humidity: { min: 50, max: 90, optimal: [60, 80] },
    moisture: { min: 40, max: 80, optimal: [50, 70] },
    light: { min: 0, max: 2000, optimal: [100, 500] },
    ammonia: { min: 0, max: 30, optimal: [0, 10] },
  },
  larva: {
    temperature: { min: 22, max: 38, optimal: [27, 32] },
    humidity: { min: 55, max: 95, optimal: [65, 85] },
    moisture: { min: 50, max: 85, optimal: [60, 75] },
    light: { min: 0, max: 3000, optimal: [200, 800] },
    ammonia: { min: 0, max: 30, optimal: [0, 10] },
  },
  pupa: {
    temperature: { min: 20, max: 35, optimal: [24, 28] },
    humidity: { min: 40, max: 80, optimal: [50, 70] },
    moisture: { min: 30, max: 70, optimal: [40, 60] },
    light: { min: 0, max: 1500, optimal: [100, 400] },
    ammonia: { min: 0, max: 30, optimal: [0, 10] },
  },
  adult: {
    temperature: { min: 20, max: 35, optimal: [25, 30] },
    humidity: { min: 45, max: 85, optimal: [55, 75] },
    moisture: { min: 30, max: 70, optimal: [40, 60] },
    light: { min: 100, max: 5000, optimal: [500, 1500] },
    ammonia: { min: 0, max: 30, optimal: [0, 10] },
  },
};

export const getStatus = (value, thresholds) => {
  if (value < thresholds.min || value > thresholds.max) {
    return "danger";
  }
  if (value >= thresholds.optimal[0] && value <= thresholds.optimal[1]) {
    return "success";
  }
  return "warning";
};

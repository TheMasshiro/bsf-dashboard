export const getHourlyAnalytics = async (req, res) => {
  const { model, id, startDate, endDate } = req.query;
  const Model = {
    adult: AdultReading,
    egg: EggReading,
    larva: LarvaReading,
    pupa: PupaReading,
  }[model];

  const hourlyData = await ReadingModel.aggregate([
    {
      $match: {
        [`${model}Id`]: id,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    { $unwind: "$readings" },
    {
      $match: {
        "readings.timestamp": {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          hour: {
            $dateToString: {
              format: "%H",
              date: "$readings.timestamp",
            },
          },
        },
        avgTemperature: { $avg: "$readings.temperature" },
        avgHumidity: { $avg: "$readings.humidity" },
        avgMoisture: { $avg: "$readings.moisture" },
        avgLight: { $avg: "$readings.light" },
        avgAmmonia: { $avg: "$readings.ammonia" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.hour": 1 } },
  ]);

  res.json(hourlyData);
};

export default getHourlyAnalytics;

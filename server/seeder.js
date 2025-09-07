const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cars = [
  { name: 'Toyota Camry', model: 'Camry XLE', year: 2022, pricePerDay: 50 },
  { name: 'Honda Civic', model: 'Civic EX', year: 2023, pricePerDay: 45 },
  { name: 'Tesla Model 3', model: 'Standard Range', year: 2021, pricePerDay: 70 },
];

const seedDB = async () => {
  await Car.deleteMany();
  await Car.insertMany(cars);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch((err) => console.log(err));
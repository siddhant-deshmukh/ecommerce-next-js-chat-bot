// scripts/seedFakeJewellery.ts

import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '@/models/Product';
import ProductSpecification from '@/models/ProductSpecification';
import Review from '@/models/Review';
import Discount from '@/models/Discount';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jewellery-e-commerce';

const images = [
  '/hero/earing-1-MD.jpg',
  '/hero/earing-2-HD.jpg',
  '/hero/gem-1-SD.jpg',
  '/hero/necklace-1-HD.jpg',
  '/hero/necklace-2-MD.jpg',
  '/hero/necklace-4-MD.jpg',
  '/hero/necklage-3-MD.jpg',
  '/hero/ring-2-HD.jpg',
  '/hero/ring-3-HD.jpg',
  '/hero/ring-dark-bg-1-SD.jpg',
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  await Product.deleteMany({});
  await ProductSpecification.deleteMany({});
  await Review.deleteMany({});

  const fakeProducts = [];

  for (let i = 0; i < 10; i++) {
    const shuffled = faker.helpers.shuffle(images);
    const main_image = shuffled[0];
    const other_images = shuffled.slice(1, faker.number.int({ min: 0, max: 3 }));

    const numberOfReviews = faker.number.int({ min: 3, max: 8 });
    const ratings = Array.from({ length: numberOfReviews }, () => faker.number.int({ min: 4, max: 5 }));
    const avg_rating = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);

    const product = await Product.create({
      title: faker.commerce.productName() + ' Jewellery',
      tagline: faker.commerce.productAdjective(),
      description: faker.commerce.productDescription(),
      available_size: [5, 6, 7, 8, 9],
      price: faker.number.int({ min: 3000, max: 20000 }),
      main_image: images[i],
      other_images,
      avg_rating,
      total_number_reviews: numberOfReviews,
      is_featured: Math.random() < 0.3,
      is_best_seller: Math.random() < 0.1,
      is_new_arrival: Math.random() < 0.1,
    });

    // Add fake specs
    const specs = [
      { type: 'Metal', key: 'Metal Type', value: '18K White Gold' },
      { type: 'Diamond', key: 'Carat', value: '1.5 ct' },
      { type: 'Diamond', key: 'Cut', value: 'Round Brilliant' },
      { type: 'Diamond', key: 'Color', value: 'F (Colorless)' },
      { type: 'Diamond', key: 'Clarity', value: 'VS1' },
      { type: 'Ring', key: 'Setting Type', value: 'Prong Setting' },
      { type: 'Ring', key: 'Band Width', value: '2.3mm' },
      { type: 'Certificate', key: 'Certificate', value: 'GIA Certified' },
    ];

    const discount = await Discount.create({
      product_id: product._id,
      percentage: Math.floor(Math.random()*30), 
    });

    for (const spec of specs) {
      await ProductSpecification.create({
        product_id: product._id,
        ...spec,
      });
    }

    // Add fake reviews
    for (const rating of ratings) {
      await Review.create({
        product_id: product._id,
        user_id: new mongoose.Types.ObjectId(), // Replace with real user_id if needed
        rating,
        comment: faker.lorem.sentence(),
      });
    }

    fakeProducts.push(product);
  }

  console.log(`✅ Seeded ${fakeProducts.length} fake products with reviews & specs`);
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

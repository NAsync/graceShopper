'use strict'

const db = require('../server/db')
const fs = require('fs')
const path = require('path')

const {
  User,
  Department,
  Brand,
  Product,
  Review,
  CreditCard,
  Merchant,
  Image
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [fourM, wholeFoods, bahamaRepublic] = await Promise.all([
    Brand.create({name: '4M'}),
    Brand.create({name: 'Whole Foods'}),
    Brand.create({name: 'BahamaRepublic'})
  ])
  const [health, grocery, attire] = await Promise.all([
    Department.create({name: 'health'}),
    Department.create({name: 'grocery'}),
    Department.create({name: 'attire'})
  ])
  const [
    pd1,
    pd2,
    pd3,
    pd4,
    pd5,
    pd6,
    pd7,
    pd8,
    pd9,
    pd10,
    pd11,
    pd12
  ] = await Promise.all([
    //pd1
    // TODO: DRY this out. Make an array of products, then we can do a foreach on the array to create multiple products
    Product.create({
      name: 'N95 Mask',
      unit: '2 PC',
      description:
        'Medical Grade; Comfortable and Excellent Against Harmful Air Particle.',
      price: 15,
      imageURL: 'assets/n95_1_use.jpg',
      inventoryQTY: 100,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    //pd2
    Product.create({
      name: 'Organic Broccoli',
      unit: '1 LB',
      description:
        "Quality Guaranteed; It's nutritious, low in calories, available year-round and hearty.",
      price: 3,
      imageURL: 'assets/broccoli_use.jpg',
      inventoryQTY: 200,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    //pd3
    Product.create({
      name: 'Toilet Paper',
      unit: '5 Rolls',
      description:
        'Premium 3-Ply Toilet Paper, Soft, Strong and Highly Absorbent',
      price: 8,
      imageURL: 'assets/toiletpaper_1_use.jpg',
      inventoryQTY: 50,
      bestSeller: true,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    //pd4
    Product.create({
      name: 'Surgical Face Mask',
      unit: '50 PC',
      description: 'Medical Grade, Disposable',
      price: 25,
      imageURL: 'assets/facemask_3_use.jpg',
      inventoryQTY: 150,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    //pd5
    Product.create({
      name: 'Organic Milk',
      unit: '1/2 Gallon',
      description:
        'Our milk comes from cows not given growth hormones or antibiotics, raised on farms that follow sustainable organic practices.',
      price: 6,
      imageURL: 'assets/milk_use.jpg',
      inventoryQTY: 80,
      bestSeller: true,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    //pd6
    Product.create({
      name: 'Nose Cover Scarf',
      unit: '1 PC',
      description: '100% Cotton; Face Mask for Dust & Sun Protection',
      price: 15,
      imageURL: 'assets/scarf_use.jpg',
      inventoryQTY: 25,
      bestSeller: false,
      departmentId: attire.id,
      brandId: bahamaRepublic.id
    }),
    //pd7
    Product.create({
      name: 'Cotton Face Mask',
      unit: '3 PC',
      description:
        'Reusable, Washable, Protection from Dust, Pollen, Pet Dander and other Airborne Irritants',
      price: 30,
      imageURL: 'assets/cloth_facemask_use.jpg',
      inventoryQTY: 80,
      bestSeller: false,
      departmentId: health.id,
      brandId: fourM.id
    }),
    //pd8
    Product.create({
      name: 'Organic Chicken Breasts',
      unit: '1 LB',
      description:
        "These perfectly tender fillets are deboned and trimmed by hand so they're ready to cook however you like them.",
      price: 13,
      imageURL: 'assets/chickbreast_use.jpg',
      inventoryQTY: 120,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    //pd9
    Product.create({
      name: 'Hand Sanitizer',
      unit: '2 fl oz',
      description: 'Kills 99.99 percent of most common illness-causing germs',
      price: 5,
      imageURL: 'assets/hand_sanitizer_2_use.jpg',
      inventoryQTY: 50,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    //pd10
    Product.create({
      name: 'Rapid Read Thermometer',
      unit: '1 PC',
      description:
        'Accurate reading in 8 seconds; 3 modes of use: oral, rectal, or underarm',
      price: 10,
      imageURL: 'assets/thermo_use.jpg',
      inventoryQTY: 30,
      bestSeller: false,
      departmentId: health.id,
      brandId: fourM.id
    }),
    //pd11
    Product.create({
      name: 'Organic Salmon Fillet',
      unit: '2 LB',
      description:
        'Fresh Guaranteed; The beautiful orange-red color is closer to wild salmon than other farmed fish.',
      price: 30,
      imageURL: 'assets/salmon_use.jpg',
      inventoryQTY: 40,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    //pd12
    Product.create({
      name: 'Coveralls Suit',
      unit: '1 PC',
      description:
        'Washable Isolation Gown with Hood, Waterproof Anti-Static Protective Overalls Yellow',
      price: 20,
      imageURL: 'assets/protect_cloth_use.jpg',
      inventoryQTY: 30,
      bestSeller: false,
      departmentId: attire.id,
      brandId: bahamaRepublic.id
    })
  ])

  const [img1, img2] = await Promise.all([
    Image.create({
      name: 'pic1',
      picture: fs.readFileSync(
        path.resolve(__dirname, '../public/assets/facemask_1.jpg')
      ),
      productId: pd1.id
    }),
    Image.create({name: 'pic2', picture: '/assets/n95_1_use.jpg'})
  ])

  const [user1, user2, user3, user4, user5] = await Promise.all([
    User.create({
      email: 'Andres@fullstack.com',
      password: 'ANDRES',
      isAdmin: true
    }),
    User.create({
      email: 'Josh@fullstack.com',
      password: 'JOSH',
      isAdmin: true
    }),
    User.create({
      email: 'Robert@fullstack.com',
      password: 'ROBERT',
      isAdmin: true
    }),
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const reviews = await Promise.all([
    //rw1
    // TODO: DRY this out. Make an array of reviews, then we can do a foreach on the array to create multiple reviews.
    Review.create({
      rating: 5,
      description: 'I feel so good.',
      userId: user1.id,
      productId: pd3.id
    }),
    //rw2
    Review.create({
      rating: 4,
      description: 'Nice! I can still breath.',
      userId: user2.id,
      productId: pd1.id
    }),
    //rw3
    Review.create({
      rating: 3,
      description: 'Fine! I can still eat.',
      userId: user3.id,
      productId: pd2.id
    }),
    //rw4
    Review.create({
      rating: 4,
      description: 'Not Bad.',
      userId: user2.id,
      productId: pd4.id
    }),
    //rw5
    Review.create({
      rating: 5,
      description: 'No complaints here.',
      userId: user1.id,
      productId: pd5.id
    }),
    //rw6
    Review.create({
      rating: 3,
      description: "Can't breath.",
      userId: user3.id,
      productId: pd1.id
    }),
    //rw7
    Review.create({
      rating: 4,
      description: 'Comfortable.',
      userId: user1.id,
      productId: pd7.id
    }),
    //rw8
    Review.create({
      rating: 5,
      description: 'Yummy!',
      userId: user2.id,
      productId: pd8.id
    }),
    //rw9
    Review.create({
      rating: 4,
      description: 'Kill them all!!',
      userId: user3.id,
      productId: pd9.id
    }),
    //rw10
    Review.create({
      rating: 4,
      description: 'Does the job',
      userId: user1.id,
      productId: pd10.id
    }),
    //rw11
    Review.create({
      rating: 5,
      description: 'Very fresh.',
      userId: user3.id,
      productId: pd11.id
    }),
    //rw12
    Review.create({
      rating: 5,
      description: 'Worry free now!',
      userId: user2.id,
      productId: pd12.id
    })
  ])

  const merchants = await Promise.all([
    Merchant.create({
      name: 'MasterCard',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
    }),
    Merchant.create({
      name: 'Visa',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014_logo_detail.svg'
    })
  ])

  const creditCards = await Promise.all([
    CreditCard.create({
      ccNumber: '5715121212151515',
      userId: user1.id,
      merchantId: merchants[0].id
    }),
    CreditCard.create({
      ccNumber: '5215818121211512',
      userId: user2.id,
      merchantId: merchants[1].id
    })
  ])

  console.log(`seeded users`)
  console.log(`seeded ${merchants.length} merchants`)
  console.log(`seeded ${creditCards.length} credit cards`)
  console.log(`seeded successfully`)
}

//npm run seed and ensure merchants, users, and credit cards
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

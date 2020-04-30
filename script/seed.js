'use strict'

const db = require('../server/db')
//Robert added in few more below:
const {
  User,
  Department,
  Brand,
  Product,
  Review
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Robert added below:
  const [fourM, HoleFoods, BahamaRepublic] = await Promise.all([
    Brand.create({name: '4M'}),
    Brand.create({name: 'HoleFoods'}),
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
    Product.create({
      name: 'N95 Mask',
      unit: '2 PC',
      description:
        'Medical Grade; Comfortable and Excellent Against Harmful Air Particle.',
      price: 15,
      imageURL: 'https://picsum.photos/250',
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
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 200,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: HoleFoods.id
    }),
    //pd3
    Product.create({
      name: 'Fisherman Hat',
      unit: '1 PC',
      description: 'Removable Protective Hat for Men and Women',
      price: 25,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 50,
      bestSeller: false,
      departmentId: attire.id,
      brandId: BahamaRepublic.id
    }),
    //pd4
    Product.create({
      name: 'Surgical Face Mask',
      unit: '50 PC',
      description: 'Medical Grade, Disposable',
      price: 25,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 150,
      bestSeller: false,
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
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 80,
      bestSeller: true,
      departmentId: grocery.id,
      brandId: HoleFoods.id
    }),
    //pd6
    Product.create({
      name: 'Nose Cover Scarf',
      unit: '1 PC',
      description: '100% Cotton; Face Mask for Dust & Sun Protection',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 25,
      bestSeller: false,
      departmentId: attire.id,
      brandId: BahamaRepublic.id
    }),
    //pd7
    Product.create({
      name: 'Cotton Face Mask',
      unit: '3 PC',
      description:
        'Reusable, Washable, Protection from Dust, Pollen, Pet Dander and other Airborne Irritants',
      price: 30,
      imageURL: 'https://picsum.photos/250',
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
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 120,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: HoleFoods.id
    }),
    //pd9
    Product.create({
      name: 'Tee Shirt',
      unit: '1 PC',
      description: 'COVID-19 Tops; Home is Where The Heart is',
      price: 20,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 50,
      bestSeller: false,
      departmentId: attire.id,
      brandId: BahamaRepublic.id
    }),
    //pd10
    Product.create({
      name: 'Digital Forehead Thermometer',
      unit: '1 PC',
      description: 'Non-Contact; For Baby Kids Child and Adults',
      price: 50,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 5,
      bestSeller: true,
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
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 40,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: HoleFoods.id
    }),
    //pd12
    Product.create({
      name: 'Safety Eyewear',
      unit: '2 PC',
      description:
        'KEEP YOUR EYES PERFECTLY PROTECTED; REMAIN COMFORTABLE AND STYLISH AT ALL TIMES',
      price: 20,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 30,
      bestSeller: false,
      departmentId: attire.id,
      brandId: BahamaRepublic.id
    })
  ])
  const [user1, user2, user3, user4, user5] = await Promise.all([
    User.create({
      email: 'Andres@fullstack.com',
      password: 'ANDRES',
      salt: '',
      googleId: ''
    }),
    User.create({
      email: 'Josh@fullstack.com',
      password: 'JOSH',
      salt: '',
      googleId: ''
    }),
    User.create({
      email: 'Robert@fullstack.com',
      password: 'ROBERT',
      salt: '',
      googleId: ''
    }),
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const [
    rw1,
    rw2,
    rw3,
    rw4,
    rw5,
    rw6,
    rw7,
    rw8,
    rw9,
    rw10,
    rw11,
    rw12
  ] = await Promise.all([
    //rw1
    Review.create({
      rating: 5,
      description: 'Awesome! I can still see.',
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
      rating: 3,
      description: 'Low Quality!!',
      userId: user3.id,
      productId: pd9.id
    }),
    //rw10
    Review.create({
      rating: 4,
      description: 'Too Expensive!',
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
      rating: 4,
      description: 'Cool!',
      userId: user2.id,
      productId: pd12.id
    })
  ])

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

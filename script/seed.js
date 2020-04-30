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
  const [pd1, pd2, pd3] = await Promise.all([
    Product.create({
      name: 'N95 Mask',
      unit: '2 PC',
      description: 'Medical Grade',
      price: 15,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 100,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Organic Broccoli',
      unit: '1 LB',
      description: 'Quality Guaranteed',
      price: 3,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 200,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: HoleFoods.id
    }),
    Product.create({
      name: 'Fisherman Hat',
      unit: '1 PACK',
      description: 'Removable Protective Hat for Men and Women',
      price: 25,
      imageURL: 'https://picsum.photos/250',
      inventoryQTY: 50,
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
  const [review1, review2, review3] = await Promise.all([
    Review.create({
      rating: 5,
      description: 'Awesome! I can still see.',
      userId: user1.id,
      productId: pd3.id
    }),
    Review.create({
      rating: 4,
      description: 'Nice! I can still breath.',
      userId: user2.id,
      productId: pd1.id
    }),
    Review.create({
      rating: 3,
      description: 'Fine! I can still eat.',
      userId: user3.id,
      productId: pd2.id
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

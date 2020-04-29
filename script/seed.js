'use strict'

const db = require('../server/db')
const {User, CreditCard, Merchant} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
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
      userId: users[0].id,
      merchantId: merchants[0].id
    }),
    CreditCard.create({
      ccNumber: '5215818121211512',
      userId: users[1].id,
      merchantId: merchants[1].id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${merchants.length} merchants`)
  console.log(`seeded ${creditCards.length} credit cards`)
  console.log(`seeded successfully`)
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

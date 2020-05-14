'use strict'

const db = require('../server/db')

const S3_PATH = 'https://gs-jar.s3.us-east-2.amazonaws.com/'

const {
  Brand,
  Department,
  Image,
  UserOrder,
  OrderProduct,
  Product,
  Review,
  User
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
    n95Mask,
    broccoli,
    toiletPaper,
    faceMask,
    milk,
    scarf,
    clothFaceMask,
    chickenBreast,
    handSanitizer,
    thermo,
    salmon,
    protectCloth
  ] = await Promise.all([
    // TODO: DRY this out. Make an array of products, then we can do a foreach on the array to create multiple products
    Product.create({
      name: 'N95 Mask',
      unit: '2 PC',
      description:
        'Particulate Respirators;Medical Grade;Comfortable and Excellent Against Harmful Air Particle;Disposable',
      price: 15,
      inventoryQTY: 100,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Organic Broccoli',
      unit: '1 LB',
      description:
        "Quality Guaranteed;It's nutritious, low in calories;Available year-round and hearty.",
      price: 3,
      inventoryQTY: 200,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    Product.create({
      name: 'Toilet Paper',
      unit: '5 Rolls',
      description:
        'Premium 3-Ply Toilet Paper;Soft, Strong and Highly Absorbent',
      price: 8,
      inventoryQTY: 50,
      bestSeller: true,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    Product.create({
      name: 'Surgical Face Mask',
      unit: '50 PC',
      description: 'Medical Grade;Disposable',
      price: 25,
      inventoryQTY: 150,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Organic Milk',
      unit: '1/2 Gallon',
      description:
        'Our milk comes from cows not given growth hormones or antibiotics;Raised on farms that follow sustainable organic practices.',
      price: 6,
      inventoryQTY: 80,
      bestSeller: true,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    Product.create({
      name: 'Nose Cover Scarf',
      unit: '1 PC',
      description: '100% Cotton;Face Cover for Dust & Sun Protection',
      price: 15,
      inventoryQTY: 25,
      bestSeller: false,
      departmentId: attire.id,
      brandId: bahamaRepublic.id
    }),
    Product.create({
      name: 'Cotton Face Mask',
      unit: '3 PC',
      description:
        'Protection from Dust, Pollen, Pet Dander and other Airborne Irritants;Reusable;Washable',
      price: 30,
      inventoryQTY: 80,
      bestSeller: false,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Organic Chicken Breasts',
      unit: '1 LB',
      description:
        'These perfectly tender fillets are deboned and trimmed by hand;Ready to cook however you like them',
      price: 13,
      inventoryQTY: 120,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    Product.create({
      name: 'Hand Sanitizer',
      unit: '2 fl oz',
      description: 'Kills 99.99 percent of most common illness-causing germs',
      price: 5,
      inventoryQTY: 50,
      bestSeller: true,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Rapid Read Thermometer',
      unit: '1 PC',
      description:
        'Accurate reading in 8 seconds;3 modes of use: oral, rectal, or underarm',
      price: 10,
      inventoryQTY: 30,
      bestSeller: false,
      departmentId: health.id,
      brandId: fourM.id
    }),
    Product.create({
      name: 'Organic Salmon Fillet',
      unit: '2 LB',
      description:
        'Fresh Guaranteed;The beautiful orange-red color;Closer to wild salmon than other farmed fish.',
      price: 30,
      inventoryQTY: 40,
      bestSeller: false,
      departmentId: grocery.id,
      brandId: wholeFoods.id
    }),
    Product.create({
      name: 'Coveralls Suit',
      unit: '1 PC',
      description:
        'Washable Isolation Gown;With Hood;Waterproof;Protective Overalls;Yellow',
      price: 20,
      inventoryQTY: 30,
      bestSeller: false,
      departmentId: attire.id,
      brandId: bahamaRepublic.id
    })
  ])

  const broccoliImages = ['broccoli1.jpg', 'broccoli2.jpg']
  await Promise.all(
    broccoliImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: broccoli.id
      })
    })
  )
  const chickenBreastImages = ['chickbreast1.jpg', 'chickbreast2.jpg']
  await Promise.all(
    chickenBreastImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: chickenBreast.id
      })
    })
  )
  const clothfacemaskImages = ['clothfacemask1.jpg', 'clothfacemask2.jpg']
  await Promise.all(
    clothfacemaskImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: clothFaceMask.id
      })
    })
  )
  const facemaskImages = [
    'facemask1.jpg',
    'facemask2.jpg',
    'facemask3.jpg',
    'facemask4.jpg'
  ]
  await Promise.all(
    facemaskImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: faceMask.id
      })
    })
  )
  // const glovesImages = ['gloves1.jpg', 'gloves2.jpg']
  // await Promise.all(glovesImages.map( image => {
  //   return Image.create({
  //     url: `${S3_PATH}${image}`,
  //     productId: n95Mask.id
  //   })
  // }))
  const handSanitizerImages = [
    'handSanitizer1.jpg',
    'handSanitizer2.jpg',
    'handSanitizer3.jpg',
    'handSanitizer4.jpg'
  ]
  await Promise.all(
    handSanitizerImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: handSanitizer.id
      })
    })
  )
  // const handSoapImages = ['handSoap1.jpg', 'handSoap2.jpg']
  // await Promise.all(handSoapImages.map( image => {
  //   return Image.create({
  //     url: `${S3_PATH}${image}`,
  //     productId: soap.id
  //   })
  // }))
  const milkImages = ['milk1.jpg', 'milk2.jpg']
  await Promise.all(
    milkImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: milk.id
      })
    })
  )
  const n95Images = ['n951.jpg', 'n952.jpg', 'n953.jpg', 'n954.jpg']
  await Promise.all(
    n95Images.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: n95Mask.id
      })
    })
  )
  const protectClothImages = ['protectcloth1.jpg', 'protectcloth2.jpg']
  await Promise.all(
    protectClothImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: protectCloth.id
      })
    })
  )
  // const protectHatImages = ['protecthat1.jpg']
  // await Promise.all(protectHatImages.map( image => {
  //   return Image.create({
  //     url: `${S3_PATH}${image}`,
  //     productId: protectHat.id
  //   })
  // }))
  const salmonImages = ['salmon1.jpg', 'salmon2.jpg']
  await Promise.all(
    salmonImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: salmon.id
      })
    })
  )
  const scarfImages = ['scarf1.jpg', 'scarf2.jpg']
  await Promise.all(
    scarfImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: scarf.id
      })
    })
  )
  const thermoImages = ['thermo1.jpg', 'thermo2.jpg']
  await Promise.all(
    thermoImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: thermo.id
      })
    })
  )
  const toiletpaperImages = [
    'toiletpaper1.jpg',
    'toiletpaper2.jpg',
    'toiletpaper3.jpg'
  ]
  await Promise.all(
    toiletpaperImages.map(image => {
      return Image.create({
        url: `${S3_PATH}${image}`,
        productId: toiletPaper.id
      })
    })
  )

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
      productId: toiletPaper.id
    }),
    //rw2
    Review.create({
      rating: 5,
      description: 'Nice! I can still breath.',
      userId: user2.id,
      productId: n95Mask.id
    }),
    //rw3
    Review.create({
      rating: 3,
      description: 'Fine! I can still eat.',
      userId: user3.id,
      productId: broccoli.id
    }),
    //rw4
    Review.create({
      rating: 4,
      description: 'Not Bad.',
      userId: user2.id,
      productId: faceMask.id
    }),
    //rw5
    Review.create({
      rating: 5,
      description: 'No complaints here.',
      userId: user1.id,
      productId: milk.id
    }),
    //rw6
    Review.create({
      rating: 3,
      description: "Can't breath.",
      userId: user3.id,
      productId: n95Mask.id
    }),
    //rw7
    Review.create({
      rating: 4,
      description: 'Comfortable.',
      userId: user1.id,
      productId: clothFaceMask.id
    }),
    //rw8
    Review.create({
      rating: 5,
      description: 'Yummy!',
      userId: user2.id,
      productId: chickenBreast.id
    }),
    //rw9
    Review.create({
      rating: 4,
      description: 'Kill them all!!',
      userId: user3.id,
      productId: handSanitizer.id
    }),
    //rw10
    Review.create({
      rating: 4,
      description: 'Does the job',
      userId: user1.id,
      productId: thermo.id
    }),
    //rw11
    Review.create({
      rating: 5,
      description: 'Very fresh.',
      userId: user3.id,
      productId: salmon.id
    }),
    //rw12
    Review.create({
      rating: 5,
      description: 'Worry free now!',
      userId: user2.id,
      productId: protectCloth.id
    }),
    //rw13
    Review.create({
      rating: 4,
      description: 'Does the job.',
      userId: user1.id,
      productId: n95Mask.id
    }),
    //rw14
    Review.create({
      rating: 5,
      description: 'Save my life!!',
      userId: user4.id,
      productId: n95Mask.id
    })
  ])

  const userOrders = await Promise.all([
    UserOrder.create({
      userId: user4.id
    }),
    UserOrder.create({
      userId: user4.id,
      isCheckedOut: true
    })
  ])

  const currentOrder = await Promise.all([
    OrderProduct.create({
      productId: n95Mask.id,
      userOrderId: userOrders[0].id
    }),
    OrderProduct.create({
      productId: salmon.id,
      userOrderId: userOrders[0].id
    })
  ])

  console.log(`seeded users`)
  console.log(`seeded successfully`)
}

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

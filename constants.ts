
import { BusinessInfo, MenuItem, ProductCategory, Review } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "MYST Lounge",
  address: "188 Sunnyholt Rd, Kings Park NSW 2148",
  phone: "0493 028 109",
  links: {
    instagram: "https://www.instagram.com/mystloungesyd",
    facebook: "https://www.facebook.com/myshishatimesyd",
    tiktok: "https://www.tiktok.com/@mystcafe188",
    maps: "https://www.google.com/maps/search/?api=1&query=MYST+Lounge+188+Sunnyholt+Rd+Kings+Park+NSW+2148"
  },
  hours: {
    "Monday": "7pm – 1am",
    "Tuesday": "7pm – 1am",
    "Wednesday": "7pm – 1am",
    "Thursday": "7pm – 1am",
    "Friday": "7pm – 2am",
    "Saturday": "7pm – 2am",
    "Sunday": "7pm – 1am"
  }
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Deepak George',
    role: 'Local Guide',
    rating: 5,
    content: 'An amazing range of flavours — you can mix anything you want. Smooth shisha, affordable drinks, and the owner is super attentive. Staff change coals constantly without asking. Highly recommend.'
  },
  {
    id: '2',
    author: 'Smoke Mongol',
    rating: 5,
    content: 'One of the best lounges I’ve ever been to. Relaxed yet lively vibe, top-quality shisha, great food and drinks, and even a PS5 and board games. Perfect place to chill with friends. Highly recommended.'
  },
  {
    id: '3',
    author: 'Farida Khilawala',
    rating: 5,
    content: 'Loved our experience here! Warm welcome, amazing shisha, and the complimentary BBQ was delicious. Beautiful ambience and super relaxing. Definitely coming back.'
  },
  {
    id: '4',
    author: 'Ruby Changezi',
    rating: 5,
    content: 'Great atmosphere and excellent service. The Mongol guy serving us was incredibly friendly and made the night even better. Highly recommend for good vibes and great shisha!'
  },
  {
    id: '5',
    author: 'Muhammad Awais Azam Khan',
    role: 'Local Guide',
    rating: 5,
    content: 'Best place for shisha and hanging out with friends. Huge range of flavours, awesome vibe, and very friendly staff. Perfect weekend spot.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- DRINKS ---
  {
    id: 'drink-1',
    name: 'Soft Drinks',
    category: ProductCategory.DRINKS,
    description: 'Pepsi, Pepsi Max, Sunkist, Solo Zero, Creaming Soda.',
    price: '$4',
    image: 'https://picsum.photos/seed/soft/800/800',
    features: ['Chilled', 'Refreshing'],
    ingredients: []
  },
  {
    id: 'drink-2',
    name: 'Bundaberg Soft Drink',
    category: ProductCategory.DRINKS,
    description: 'Peach, Lemon Lime Bitters, Guava, Tropical Mango, Passion Fruit, Blood Orange.',
    price: '$5',
    image: 'https://picsum.photos/seed/bunda/800/800',
    features: ['Premium Brewed', 'Fruit Flavours'],
    ingredients: []
  },
  {
    id: 'drink-3',
    name: 'Tea Pot',
    category: ProductCategory.DRINKS,
    description: 'Green, Peppermint, English Breakfast, Chamomile. (Lemon, mint and honey available upon request).',
    price: '$4',
    image: 'https://picsum.photos/seed/tea/800/800',
    features: ['Served Hot', 'Relaxing', 'Shareable'],
    ingredients: []
  },
  {
    id: 'drink-4',
    name: 'Bottled Water',
    category: ProductCategory.DRINKS,
    description: 'Pure refreshing spring water.',
    price: '$3',
    image: 'https://picsum.photos/seed/water/800/800',
    features: ['Hydrating', 'Essential'],
    ingredients: []
  },
  {
    id: 'drink-5',
    name: 'Sparkling Water',
    category: ProductCategory.DRINKS,
    description: 'Carbonated mineral water.',
    price: '$3.50',
    image: 'https://picsum.photos/seed/sparkling/800/800',
    features: ['Bubbly', 'Refreshing'],
    ingredients: []
  },

  // --- CLASSICS ($50) ---
  {
    id: 'classic-1',
    name: 'Grapefruit & Mint',
    category: ProductCategory.CLASSICS,
    description: 'A mature palate cleanser, when everything begins to taste the same give this a try.',
    price: '$50',
    image: 'https://picsum.photos/seed/grapefruit/800/800',
    heaviness: 2,
    features: ['Palate Cleanser', 'Citrusy', 'Fresh'],
    ingredients: ['Grapefruit', 'Mint']
  },
  {
    id: 'classic-2',
    name: 'Orange',
    category: ProductCategory.CLASSICS,
    description: 'Fresh juicy orange.',
    price: '$50',
    image: 'https://picsum.photos/seed/orange/800/800',
    heaviness: 2,
    features: ['Juicy', 'Citrus', 'Sweet'],
    ingredients: ['Orange']
  },
  {
    id: 'classic-3',
    name: 'Grape',
    category: ProductCategory.CLASSICS,
    description: 'Super sweet grape.',
    price: '$50',
    image: 'https://picsum.photos/seed/grape/800/800',
    heaviness: 3,
    features: ['Sweet', 'Classic', 'Smooth'],
    ingredients: ['Grape']
  },
  {
    id: 'classic-4',
    name: 'Double Apple',
    category: ProductCategory.CLASSICS,
    description: 'The familiar taste of aniseed and apples.',
    price: '$50',
    image: 'https://picsum.photos/seed/dapple/800/800',
    heaviness: 5,
    features: ['Aniseed', 'Traditional', 'Strong'],
    ingredients: ['Red Apple', 'Green Apple', 'Anise']
  },
  {
    id: 'classic-5',
    name: 'Love 66',
    category: ProductCategory.CLASSICS,
    description: 'Melons, menthol and passionfruit. This flavour changed the game.',
    price: '$50',
    image: 'https://picsum.photos/seed/love66/800/800',
    heaviness: 3,
    features: ['Game Changer', 'Fruity', 'Cooling'],
    ingredients: ['Melon', 'Passionfruit', 'Menthol']
  },
  {
    id: 'classic-6',
    name: 'Lady Killer',
    category: ProductCategory.CLASSICS,
    description: 'Melons and mango for a mellow and relaxing blend.',
    price: '$50',
    image: 'https://picsum.photos/seed/ladyk/800/800',
    heaviness: 2,
    features: ['Mellow', 'Tropical', 'Relaxing'],
    ingredients: ['Melon', 'Mango', 'Mint']
  },
  {
    id: 'classic-7',
    name: 'Watermelon',
    category: ProductCategory.CLASSICS,
    description: 'Watermelon for a classic taste.',
    price: '$50',
    image: 'https://picsum.photos/seed/wmelon/800/800',
    heaviness: 2,
    features: ['Classic', 'Sweet', 'Light'],
    ingredients: ['Watermelon']
  },
  {
    id: 'classic-8',
    name: 'Mint',
    category: ProductCategory.CLASSICS,
    description: 'Surely requires no explanation.',
    price: '$50',
    image: 'https://picsum.photos/seed/mint/800/800',
    heaviness: 3,
    features: ['Fresh', 'Cooling', 'Essential'],
    ingredients: ['Mint']
  },
  {
    id: 'classic-9',
    name: 'Gum with Mint',
    category: ProductCategory.CLASSICS,
    description: 'A sweet and tangy mint similar to chewing gum.',
    price: '$50',
    image: 'https://picsum.photos/seed/gum/800/800',
    heaviness: 3,
    features: ['Sweet Mint', 'Tangy', 'Refreshing'],
    ingredients: ['Gum', 'Mint']
  },
  {
    id: 'classic-10',
    name: 'Blueberry',
    category: ProductCategory.CLASSICS,
    description: 'The only flavour popular enough to dethrone double apple as the king.',
    price: '$50',
    image: 'https://picsum.photos/seed/blueb/800/800',
    heaviness: 3,
    features: ['King of Flavours', 'Berry', 'Smooth'],
    ingredients: ['Blueberry']
  },
  {
    id: 'classic-11',
    name: 'Peach',
    category: ProductCategory.CLASSICS,
    description: 'I got my peaches out in Blacktown (yeah, yeah, yeah).',
    price: '$50',
    image: 'https://picsum.photos/seed/peach/800/800',
    heaviness: 2,
    features: ['Sweet', 'Aromatic', 'Smooth'],
    ingredients: ['Peach']
  },
  {
    id: 'classic-12',
    name: 'Lemon & Mint',
    category: ProductCategory.CLASSICS,
    description: 'The true original favourite.',
    price: '$50',
    image: 'https://picsum.photos/seed/lemonm/800/800',
    heaviness: 3,
    features: ['Zesty', 'Cooling', 'Original'],
    ingredients: ['Lemon', 'Mint']
  },

  // --- HOUSE SPECIALS ($50) ---
  {
    id: 'special-1',
    name: 'The Yanick',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'A delicious blend of candied watermelon and blueberry.',
    price: '$50',
    image: 'https://picsum.photos/seed/yanick/800/800',
    heaviness: 3,
    features: ['Candied', 'Sweet', 'House Blend'],
    ingredients: ['Watermelon Candy', 'Blueberry']
  },
  {
    id: 'special-2',
    name: 'The Genie',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Blueberry, fairy floss and mint? Your wish is my command.',
    price: '$50',
    image: 'https://picsum.photos/seed/genie/800/800',
    heaviness: 3,
    features: ['Magical', 'Sweet', 'Unique'],
    ingredients: ['Blueberry', 'Fairy Floss', 'Mint']
  },
  {
    id: 'special-3',
    name: 'Pulp Friction',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'A pulpy mix of passionfruit and watermelon.',
    price: '$50',
    image: 'https://picsum.photos/seed/pulp/800/800',
    heaviness: 3,
    features: ['Pulpy', 'Tropical', 'Juicy'],
    ingredients: ['Passionfruit', 'Watermelon']
  },
  {
    id: 'special-4',
    name: 'Berry Blast',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Sweet and juicy mix of blueberry, pomegranate and strawberry.',
    price: '$50',
    image: 'https://picsum.photos/seed/blast/800/800',
    heaviness: 3,
    features: ['Berry Explosion', 'Juicy', 'Sweet'],
    ingredients: ['Blueberry', 'Pomegranate', 'Strawberry']
  },
  {
    id: 'special-5',
    name: 'Magic Melon',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Honeydew melon with a kiss of passionfruit and a cooling menthol finish.',
    price: '$50',
    image: 'https://picsum.photos/seed/magicm/800/800',
    heaviness: 3,
    features: ['Cooling', 'Melon Mix', 'Smooth'],
    ingredients: ['Honeydew', 'Passionfruit', 'Menthol']
  },
  {
    id: 'special-6',
    name: 'Bahama Mama',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Dragonfruit, pineapple and a juicy hit of mango.',
    price: '$50',
    image: 'https://picsum.photos/seed/bahama/800/800',
    heaviness: 3,
    features: ['Tropical', 'Exotic', 'Summery'],
    ingredients: ['Dragonfruit', 'Pineapple', 'Mango']
  },
  {
    id: 'special-7',
    name: 'Jiddo',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Nothing to say except double apple for you!',
    price: '$50',
    image: 'https://picsum.photos/seed/jiddo/800/800',
    heaviness: 5,
    features: ['Strong', 'Traditional', 'No Nonsense'],
    ingredients: ['Double Apple Mix']
  },
  {
    id: 'special-8',
    name: 'Lychee Sunrise',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'Lychee, orange and strawberry to make you forget your worries.',
    price: '$50',
    image: 'https://picsum.photos/seed/lychee/800/800',
    heaviness: 2,
    features: ['Uplifting', 'Fruity', 'Sweet'],
    ingredients: ['Lychee', 'Orange', 'Strawberry']
  },
  {
    id: 'special-9',
    name: 'Strawberry Sheikh',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'A minty, strawberry milkshake … that’s right, a smokeable milkshake.',
    price: '$50',
    image: 'https://picsum.photos/seed/shake/800/800',
    heaviness: 3,
    features: ['Creamy', 'Unique', 'Dessert-like'],
    ingredients: ['Strawberry', 'Cream', 'Mint']
  },
  {
    id: 'special-10',
    name: 'Pan Raas',
    category: ProductCategory.HOUSE_SPECIALS,
    description: 'A fragrant, spicy flavour with a minty punch.',
    price: '$50',
    image: 'https://picsum.photos/seed/pan/800/800',
    heaviness: 5,
    features: ['Spicy', 'Fragrant', 'Intense'],
    ingredients: ['Pan', 'Spices', 'Mint']
  },

  // --- MOST WANTED ($60) ---
  {
    id: 'wanted-1',
    name: 'Tangiers Cane Mint',
    category: ProductCategory.MOST_WANTED,
    description: 'The strongest mint with a heavy smoke, this will have you reaching for a pillow (not for first timers).',
    price: '$60',
    image: 'https://picsum.photos/seed/cane/800/800',
    heaviness: 5,
    features: ['Extremely Strong', 'Heavy Smoke', 'Dark Leaf'],
    ingredients: ['Cane Mint']
  },
  {
    id: 'wanted-2',
    name: 'Darkside Supernova',
    category: ProductCategory.MOST_WANTED,
    description: 'Pure, icy menthol. Not for the faint hearted. You’ve been warned!',
    price: '$60',
    image: 'https://picsum.photos/seed/super/800/800',
    heaviness: 5,
    features: ['Ice Cold', 'Intense', 'Menthol Overload'],
    ingredients: ['Supernova Menthol']
  },
  {
    id: 'wanted-3',
    name: 'Darkside Ice Granny',
    category: ProductCategory.MOST_WANTED,
    description: 'Fresh green apple with just the right amount of menthol.',
    price: '$60',
    image: 'https://picsum.photos/seed/granny/800/800',
    heaviness: 4,
    features: ['Crisp', 'Sour-Sweet', 'Cooling'],
    ingredients: ['Green Apple', 'Menthol']
  },
  {
    id: 'wanted-4',
    name: 'Darkside Bergamonstr',
    category: ProductCategory.MOST_WANTED,
    description: 'A floral bergamot tea infusion for a more sophisticated palate.',
    price: '$60',
    image: 'https://picsum.photos/seed/berg/800/800',
    heaviness: 4,
    features: ['Floral', 'Sophisticated', 'Tea-like'],
    ingredients: ['Bergamot', 'Tea']
  },
  {
    id: 'wanted-5',
    name: 'Trifecta Peppermint Shake',
    category: ProductCategory.MOST_WANTED,
    description: 'The most coveted dessert flavour available. A beautiful, creamy peppermint punch.',
    price: '$60',
    image: 'https://picsum.photos/seed/trifecta/800/800',
    heaviness: 4,
    features: ['Creamy', 'Dessert', 'Minty'],
    ingredients: ['Peppermint', 'Cream']
  },
  {
    id: 'wanted-6',
    name: 'Musthave Milky Rice',
    category: ProductCategory.MOST_WANTED,
    description: 'Rice pudding to remind you of those nights at home with family.',
    price: '$60',
    image: 'https://picsum.photos/seed/rice/800/800',
    heaviness: 4,
    features: ['Comforting', 'Creamy', 'Sweet'],
    ingredients: ['Rice Pudding']
  },
  {
    id: 'wanted-7',
    name: 'Darkside Cola',
    category: ProductCategory.MOST_WANTED,
    description: 'That ever familiar taste of cold refreshing cola never felt so good.',
    price: '$60',
    image: 'https://picsum.photos/seed/cola/800/800',
    heaviness: 4,
    features: ['Classic Cola', 'Refreshing', 'Dark Leaf'],
    ingredients: ['Cola']
  },
  {
    id: 'wanted-8',
    name: 'Musthave Pinkman',
    category: ProductCategory.MOST_WANTED,
    description: 'Fresh pink grapefruit with a tangy grapefruit twist.',
    price: '$60',
    image: 'https://picsum.photos/seed/pink/800/800',
    heaviness: 4,
    features: ['Tangy', 'Citrus', 'Sweet'],
    ingredients: ['Pink Grapefruit', 'Berries']
  }
];

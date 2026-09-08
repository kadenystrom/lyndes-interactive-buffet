// data.js

// Voice options
const allVoiceNames = [
  "Microsoft David - English (United States)",
  "Microsoft Mark - English (United States)",
  "Microsoft Zira - English (United States)",
  "Microsoft Natasha Online (Natural) - English (Australia)",
  "Microsoft William Online (Natural) - English (Australia)",
  "Microsoft Clara Online (Natural) - English (Canada)",
  "Microsoft Liam Online (Natural) - English (Canada)",
  "Microsoft Connor Online (Natural) - English (Ireland)",
  "Microsoft Emily Online (Natural) - English (Ireland)",
  "Microsoft Mitchell Online (Natural) - English (New Zealand)",
  "Microsoft Molly Online (Natural) - English (New Zealand)",
  "Microsoft Ava Online (Natural) - English (United States)",
  "Microsoft Andrew Online (Natural) - English (United States)",
  "Microsoft Emma Online (Natural) - English (United States)",
  "Microsoft Brian Online (Natural) - English (United States)",
  "Microsoft Libby Online (Natural) - English (United Kingdom)",
  "Microsoft Maisie Online (Natural) - English (United Kingdom)",
  "Microsoft Ryan Online (Natural) - English (United Kingdom)",
  "Microsoft Sonia Online (Natural) - English (United Kingdom)",
  "Microsoft Thomas Online (Natural) - English (United Kingdom)",
  "Microsoft Ana Online (Natural) - English (United States)",
  "Microsoft AndrewMultilingual Online (Natural) - English (United States)",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft AvaMultilingual Online (Natural) - English (United States)",
  "Microsoft BrianMultilingual Online (Natural) - English (United States)",
  "Microsoft Christopher Online (Natural) - English (United States)",
  "Microsoft EmmaMultilingual Online (Natural) - English (United States)",
  "Microsoft Eric Online (Natural) - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Microsoft Michelle Online (Natural) - English (United States)",
  "Microsoft Roger Online (Natural) - English (United States)",
  "Microsoft Steffan Online (Natural) - English (United States)"
];

// All possible items
const allItems = [
  // Plates & Service
  'plates', 'napkins', 'rolled-silverware',

  // Bread
  'dinner-rolls', 'breadsticks', 'cornbread-muffins', 'butter',
  'taco-shells', 'flour-tortillas', 'tortilla-chips',

  // Salad
  'caesar-salad', 'house-salad', 'coleslaw', 'potato-salad', 'salad-dressing', 'croutons',

  // Sides
  'mashed-potatoes', 'steamed-veggies', 'wild-rice-pilaf', 'green-beans',
  'cilantro-lime-rice', 'calypso-black-beans',

  // Main Courses
  'broaster-chicken', 'chicken-alfredo', 'homemade-lasagna', 'bbq-ribs',
  'wild-rice-stuffed-chicken', 'chicken-cordon-bleu', 'baked-salmon', 'homemade-meatloaf',
  'taco-seasoned-chicken', 'seasoned-ground-beef',

  // Toppings & Sauces
  'gravy', 'shredded-lettuce', 'pico-de-gallo', 'salsa',
  'taco-sour-cream', 'shredded-cheese', 'guacamole',

  // Desserts
  'assorted-cookies', 'petite-bars', 'chocolate-dipped-strawberries',

  // Beverages
  'coffee', 'bottled-water', 'canned-soda', 'assorted-juice'
];

// Human-readable item names
const itemNames = Object.fromEntries(
  allItems.map(id => [id, id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())])
);

// Thought-provoking hints that guide without naming the target zone
const hints = {
  'plates': 'What must every guest have in hand before approaching any food?',
  'napkins': 'Guests want these handy right from the get-go in case of early spills.',
  'rolled-silverware': 'Guests grab their dining utensils at the very beginning so hands are free later.',

  'dinner-rolls': 'Warm baked goods are usually the very first edible item guests pick up.',
  'breadsticks': 'Think of bakery starches meant to accompany pasta or soup.',
  'cornbread-muffins': 'This southern-style baked treat belongs right alongside the rolls.',
  'butter': 'What do guests spread on freshly picked baked rolls?',
  'taco-shells': 'Before adding fillings, what edible vessel holds a crunchy taco together?',
  'flour-tortillas': 'Think about the edible base needed before layering taco fillings.',
  'tortilla-chips': 'These serve as the dipping foundation alongside other handheld starches.',

  'caesar-salad': 'Lighter, leafy courses come early before guests reach the heavy hot chafers.',
  'house-salad': 'Cool leafy greens are typically sampled right after picking up bread.',
  'coleslaw': 'This chilled, creamy cabbage side belongs with the other cold starter bowls.',
  'potato-salad': 'Even though it is hearty, this is a chilled item kept near the fresh greens.',
  'salad-dressing': 'Where would you pour a vinaigrette or creamy ranch?',
  'croutons': 'These crunchy toasted bites garnish leafy greens, not the bakery basket.',

  'mashed-potatoes': 'This hearty starch supports the meal just before guests reach the proteins.',
  'steamed-veggies': 'Hot vegetable accompaniments belong right beside the warm grains and starches.',
  'wild-rice-pilaf': 'This warm grain dish accompanies the meal alongside potatoes and veggies.',
  'green-beans': 'Warm vegetable side dishes sit in the hot chafers right before the meats.',
  'cilantro-lime-rice': 'This warm grain serves as the bed for burrito bowls and taco platters.',
  'calypso-black-beans': 'Warm seasoned legumes pair alongside rice before moving to the proteins.',

  'broaster-chicken': 'This signature crispy bird is the hearty centerpiece of the plate.',
  'chicken-alfredo': 'Rich, creamy pasta dishes act as the substantial focal point of a dinner.',
  'homemade-lasagna': 'This layered pasta bake is the star protein/entrée of the line.',
  'bbq-ribs': 'Guests look for this smoky, tender meat as their primary meal centerpiece.',
  'wild-rice-stuffed-chicken': 'This elegant stuffed poultry serves as a primary dinner attraction.',
  'chicken-cordon-bleu': 'This breaded, savory classic is the featured entrée of the feast.',
  'baked-salmon': 'This delicate fish fillet acts as the main protein selection.',
  'homemade-meatloaf': 'A classic comfort food centerpiece sliced thick for hearty appetites.',
  'taco-seasoned-chicken': 'What hot shredded meat fills the center of a taco or burrito?',
  'seasoned-ground-beef': 'The primary hot beef filling that goes inside tacos after you pick them up.',

  'gravy': 'This savory pour-over finishes off meats and potatoes just after you take them.',
  'shredded-lettuce': 'A cool, crisp green sprinkle used to crown tacos and burgers at the end.',
  'pico-de-gallo': 'A fresh spoonful of diced tomato and onion to garnish completed dishes.',
  'salsa': 'This zesty condiment is ladled over food right after assembling the main ingredients.',
  'taco-sour-cream': 'A dollop of this cool cream adds the finishing touch to hot savory dishes.',
  'shredded-cheese': 'This shredded dairy accent is sprinkled on top to finish off warm entrées.',
  'guacamole': 'A rich avocado spoonful added as an accent over already-plated dishes.',

  'assorted-cookies': 'Guests save this sweet handheld treat for after the entire meal is over.',
  'petite-bars': 'Rich sweet squares are picked up at the very conclusion of the line.',
  'chocolate-dipped-strawberries': 'Indulgent confections are reserved as the grand finale of the buffet.',

  'coffee': 'Hot cups are placed at the end of the line so guests avoid sloshing liquids down the buffet.',
  'bottled-water': 'Thirst quenchers are grabbed last so hands remain free while serving food.',
  'canned-soda': 'Chilled drinks wait at the end station alongside dessert.',
  'assorted-juice': 'Drink selections are arranged together at their own refreshment station.'
};

// Correct placements
const correctPlacement = {
  plates: [
    'plates',
    'napkins',
    'rolled-silverware'
  ],
  bread: [
    'dinner-rolls',
    'breadsticks',
    'cornbread-muffins',
    'butter',
    'taco-shells',
    'flour-tortillas',
    'tortilla-chips'
  ],
  salad: [
    'caesar-salad',
    'house-salad',
    'coleslaw',
    'potato-salad',
    'salad-dressing',
    'croutons'
  ],
  sides: [
    'mashed-potatoes',
    'steamed-veggies',
    'wild-rice-pilaf',
    'green-beans',
    'cilantro-lime-rice',
    'calypso-black-beans'
  ],
  main: [
    'broaster-chicken',
    'chicken-alfredo',
    'homemade-lasagna',
    'bbq-ribs',
    'wild-rice-stuffed-chicken',
    'chicken-cordon-bleu',
    'baked-salmon',
    'homemade-meatloaf',
    'taco-seasoned-chicken',
    'seasoned-ground-beef'
  ],
  toppings: [
    'gravy',
    'shredded-lettuce',
    'pico-de-gallo',
    'salsa',
    'taco-sour-cream',
    'shredded-cheese',
    'guacamole'
  ],
  desserts: [
    'assorted-cookies',
    'petite-bars',
    'chocolate-dipped-strawberries'
  ],
  beverages: [
    'coffee',
    'bottled-water',
    'canned-soda',
    'assorted-juice'
  ]
};

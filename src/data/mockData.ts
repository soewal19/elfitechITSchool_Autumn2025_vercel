import { Flower, Shop, Coupon } from '../types';

export const shops: Shop[] = [
  { id: '1', name: 'Flowery Fragrant', category: 'Premium' },
  { id: '2', name: 'Bloomwell', category: 'Budget' },
  { id: '3', name: 'Garden Paradise', category: 'Luxury' },
  { id: '4', name: 'Spring Blossoms', category: 'Seasonal' },
];

export const flowers: Flower[] = [
  {
    id: '1',
    name: 'Red Rose Bouquet',
    price: 45,
    image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Beautiful red roses perfect for romantic occasions. Hand-picked premium quality roses arranged in an elegant bouquet.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'White Tulips',
    price: 32,
    image: 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Elegant white tulips for special celebrations. Fresh spring tulips that symbolize new beginnings.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Pink Lily Arrangement',
    price: 38,
    image: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Delicate pink lilies in a beautiful arrangement. Perfect for expressing grace and admiration.',
    shopId: '2',
    isFavorite: false,
    dateAdded: new Date('2024-01-12')
  },
  {
    id: '4',
    name: 'Sunflower Bouquet',
    price: 28,
    image: 'https://images.pexels.com/photos/1428449/pexels-photo-1428449.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Bright sunflowers to bring joy and warmth. These cheerful flowers are perfect for brightening any day.',
    shopId: '2',
    isFavorite: false,
    dateAdded: new Date('2024-01-08')
  },
  {
    id: '5',
    name: 'Purple Orchids',
    price: 65,
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Exotic purple orchids for sophisticated taste. These rare beauties represent luxury and strength.',
    shopId: '3',
    isFavorite: false,
    dateAdded: new Date('2024-01-20')
  },
  {
    id: '6',
    name: 'Mixed Spring Flowers',
    price: 42,
    image: 'https://images.pexels.com/photos/1438227/pexels-photo-1438227.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Colorful mix of seasonal spring flowers. A vibrant arrangement celebrating the beauty of spring.',
    shopId: '4',
    isFavorite: false,
    dateAdded: new Date('2024-01-18')
  },
  {
    id: '7',
    name: 'White Roses',
    price: 48,
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Pure white roses symbolizing peace and elegance. Perfect for weddings and special ceremonies.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-01-14')
  },
  {
    id: '8',
    name: 'Lavender Bouquet',
    price: 35,
    image: 'https://images.pexels.com/photos/1421919/pexels-photo-1421919.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Aromatic lavender flowers for relaxation. Known for their calming properties and beautiful fragrance.',
    shopId: '4',
    isFavorite: false,
    dateAdded: new Date('2024-01-16')
  },
  {
    id: '9',
    name: 'Yellow Daisies',
    price: 25,
    image: 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Cheerful yellow daisies that bring sunshine to any room. Simple yet beautiful flowers for everyday joy.',
    shopId: '2',
    isFavorite: false,
    dateAdded: new Date('2024-01-22')
  },
  {
    id: '10',
    name: 'Pink Peonies',
    price: 55,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Luxurious pink peonies with full, ruffled blooms. These flowers represent honor and wealth.',
    shopId: '3',
    isFavorite: false,
    dateAdded: new Date('2024-01-25')
  },
  {
    id: '11',
    name: 'Blue Hydrangeas',
    price: 40,
    image: 'https://images.pexels.com/photos/1408978/pexels-photo-1408978.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Beautiful blue hydrangeas with full, round blooms. Perfect for expressing gratitude and understanding.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-01-28')
  },
  {
    id: '12',
    name: 'Orange Marigolds',
    price: 22,
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Vibrant orange marigolds that symbolize passion and creativity. Perfect for autumn celebrations.',
    shopId: '4',
    isFavorite: false,
    dateAdded: new Date('2024-01-30')
  },
  {
    id: '13',
    name: 'White Carnations',
    price: 30,
    image: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Classic white carnations representing pure love and good luck. Long-lasting and fragrant flowers.',
    shopId: '2',
    isFavorite: false,
    dateAdded: new Date('2024-02-02')
  },
  {
    id: '14',
    name: 'Red Gerberas',
    price: 33,
    image: 'https://images.pexels.com/photos/1407346/pexels-photo-1407346.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Bold red gerbera daisies that radiate happiness and positive energy. Perfect for celebrations.',
    shopId: '3',
    isFavorite: false,
    dateAdded: new Date('2024-02-05')
  },
  {
    id: '15',
    name: 'Purple Irises',
    price: 37,
    image: 'https://images.pexels.com/photos/1407331/pexels-photo-1407331.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Elegant purple irises symbolizing wisdom and valor. These striking flowers make a bold statement.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-02-08')
  },
  {
    id: '16',
    name: 'Pink Roses',
    price: 43,
    image: 'https://images.pexels.com/photos/1407349/pexels-photo-1407349.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Soft pink roses expressing gratitude and appreciation. Perfect for showing someone you care.',
    shopId: '4',
    isFavorite: false,
    dateAdded: new Date('2024-02-10')
  },
  {
    id: '17',
    name: 'Yellow Chrysanthemums',
    price: 29,
    image: 'https://images.pexels.com/photos/1407340/pexels-photo-1407340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Bright yellow chrysanthemums representing joy and optimism. These flowers bring warmth to any space.',
    shopId: '2',
    isFavorite: false,
    dateAdded: new Date('2024-02-12')
  },
  {
    id: '18',
    name: 'White Lilies',
    price: 50,
    image: 'https://images.pexels.com/photos/1407358/pexels-photo-1407358.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Pure white lilies symbolizing rebirth and purity. These elegant flowers are perfect for special occasions.',
    shopId: '3',
    isFavorite: false,
    dateAdded: new Date('2024-02-15')
  },
  {
    id: '19',
    name: 'Mixed Wildflowers',
    price: 26,
    image: 'https://images.pexels.com/photos/1407364/pexels-photo-1407364.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'A natural mix of wildflowers bringing the beauty of meadows indoors. Perfect for rustic arrangements.',
    shopId: '4',
    isFavorite: false,
    dateAdded: new Date('2024-02-18')
  },
  {
    id: '20',
    name: 'Red Carnations',
    price: 31,
    image: 'https://images.pexels.com/photos/1407367/pexels-photo-1407367.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    description: 'Classic red carnations expressing deep love and admiration. These long-lasting flowers are perfect for any occasion.',
    shopId: '1',
    isFavorite: false,
    dateAdded: new Date('2024-02-20')
  }
];
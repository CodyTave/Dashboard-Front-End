import { trash, categories, products, user } from '../assets';

export const Sidebar = [
  [
    {
      id: 'prods',
      title: 'Products',
      icon: products,
    },
    {
      id: 'cats',
      title: 'Categories',
      icon: categories,
    },
    {
      id: 'trash',
      title: 'Trash Bin',
      icon: trash,
    },
  ],
  [
    {
      id: 'user',
      title: 'Logout',
      icon: user,
    },
  ],
];

export const categoriesNav = [
  { id: 'category', title: 'Category' },
  { id: 'slug', title: 'Slug', hidee: true },
  { id: 'created', title: 'Created', hide: true },
  { id: 'edited', title: 'Edited', hide: true },
];

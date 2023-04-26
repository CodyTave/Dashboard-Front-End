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
      title: 'Trash',
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
  { id: 'slug', title: 'Slug', hideSm: true },
  { id: 'created', title: 'Created', hideMid: true },
  { id: 'edited', title: 'Edited', hideMid: true },
];
export const TrashNav = [
  { id: 'entity', title: 'Entity' },
  { id: 'slug', title: 'Slug', hideSm: true },
  { id: 'created', title: 'Created', hideMid: true },
  { id: 'deleted', title: 'Deleted', hideMid: true },
];

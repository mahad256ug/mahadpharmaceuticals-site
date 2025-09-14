export type productType = {
  id?: string;
  title: string;
  slug: string;
  price: string;
  thumbnail?: string | undefined;
  description?: string | undefined;
  is_publish: boolean;
  is_featured: boolean;
  view_price: boolean;
};

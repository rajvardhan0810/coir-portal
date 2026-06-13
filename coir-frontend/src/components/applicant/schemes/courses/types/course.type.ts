export type Course = {
  id: string;
  schemeId: string;

  title: string;
  category: string;

  duration: string;
  benefit: string;

  tags: string[];

  level?: string;

  image?: string;
};
export type Program = {
  id: number;
  schemeId: number;

  title: string;
  category: string | null;

  duration: string | null;
  benefit: string | null;

  tags?: string[];

  level?: string | null;

  image?: string | null;
};

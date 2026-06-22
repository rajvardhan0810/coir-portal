export type Scheme = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  duration?: string | null;
  stipend?: string | null;
  isActive?: boolean;
};

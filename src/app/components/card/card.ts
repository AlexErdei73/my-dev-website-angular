export enum Variant {
  normal = '',
  danger = 'danger',
}

export interface Card {
  variant: Variant;
  headerTextLeft: string;
  headerTextRight: string;
  footerTextLeft: string;
  footerTextRight: string;
}

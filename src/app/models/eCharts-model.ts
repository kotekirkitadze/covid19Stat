export interface LineBarData {
  legend?: string[];
  category?: string[];
  structureData?: any[];
}

export interface BarChartData {
  title?: string;
  categories: string[];
  structureData: {
    name: string,
    type: string;
    data: number[]
  }[]
}

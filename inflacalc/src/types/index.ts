// Inflation data types
export interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
}

// CPI data by year
export interface YearlyInflationData {
  [year: string]: number;
}

// Inflation data by country
export interface InflationData {
  [countryCode: string]: YearlyInflationData;
}

// Calculator result type
export interface CalculationResult {
  originalAmount: number;
  adjustedAmount: number;
  startYear: number;
  endYear: number;
  percentageChange: number;
  countryCode: string;
  inflationRate: number;
}

// Chart data for visualization
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
    tension?: number;
  }[];
}

// Savings calculation result
export interface SavingsResult extends CalculationResult {
  realValueLoss: number;
  shouldHaveAmount: number;
}

// Salary adjustment result
export interface SalaryResult extends CalculationResult {
  purchasingPowerChange: string;
}
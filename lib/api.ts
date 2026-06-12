import { Country } from '../types';

const API_BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api';

export async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/all`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch all countries');
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Expected array but got: ' + JSON.stringify(data).substring(0, 500));
  }
  return data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
}

export async function getCountryByCode(code: string): Promise<Country> {
  const allCountries = await getAllCountries();
  const country = allCountries.find(c => c.cca3 === code);
  if (!country) {
    throw new Error(`Failed to fetch country with code: ${code}`);
  }
  return country;
}

export async function searchCountries(name: string): Promise<Country[]> {
  const allCountries = await getAllCountries();
  const query = name.toLowerCase();
  return allCountries.filter(c => 
    c.name.common.toLowerCase().includes(query) || 
    c.name.official.toLowerCase().includes(query)
  );
}

import type { Profile } from '../domain/Profile';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSBfSHaivrVk2Xii13KjsfpYb5dMKviN9r3TeLHStjjLmaS0Ezsfh-wJQ57d8ZjO6hc_CCSf-JusKHc/pub?output=csv';

export const fetchAllProfiles = async (): Promise<Profile[]> => {
    try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

const parseCSV = (csvText: string): Profile[] => {
    const rows = csvText.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    if (rows.length === 0) return [];

    const headers = rows[0].split(',').map(h => h.trim());

    return rows.slice(1).map(row => {
        const values = row.split(',');
        const profileData: any = {};

        headers.forEach((header, index) => {
            let value = values[index] ? values[index].trim() : '';
            // Eliminar comillas si existen
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            profileData[header] = value;
        });
        return profileData as Profile;
    });
};


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const API_KEY = '97151bdc-175f-402a-a56d-cf8e1f80047e';
const BASE_URL = 'https://projectmapit.com/api/v1';

export interface ProjectFile {
  _id: string;
  path: {
    small: string;
    large: string;
  };
  original_filename?: string;
}

export interface Project {
  _id: string;
  city: string;
  state: string;
  street: string;
  description: string;
  createdDate: string;
  latitude?: number;
  longitude?: number;
  files?: ProjectFile[];
}

interface ProjectsResponse {
  results: Project[];
  page: number;
  pages: number;
}

export const getProjectsByCity = async (city: string): Promise<Project[]> => {
  try {
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    };

    // We search for the city name to filter projects
    // photosOnly=true ensures we only get projects with images to display
    const response = await fetch(
      `${BASE_URL}/projects?s=${encodeURIComponent(city)}&limit=5&photosOnly=true`, 
      { headers }
    );

    if (!response.ok) {
      console.warn(`Project Map It API returned ${response.status}`);
      return [];
    }

    const data: ProjectsResponse = await response.json();
    return data.results || [];
  } catch (e) {
    console.error("Failed to fetch projects from Project Map It", e);
    return [];
  }
};

import fs from 'fs';
import { promisify } from 'util';

export type Profile = {
  name: string;
  host: string;
  port: number;
  username: string;
  database: string;
  password: string;
}

const defaultProfile = {
  name: '',
  host: '',
  port: 5432,
  username: '',
  database: '',
  password: '',
}

export type ProfileList = [number, string][];

const readFile = promisify(fs.readFile);
const defaultProfilesPath: string = `${process.env.HOME}/.config/sqlcommander/profiles.json`;
let profiles: Profile[] = [];

export async function loadProfiles(profilesPath?: string): Promise<void> {
  try {
    const profileStoreText = await readFile(profilesPath || defaultProfilesPath, 'utf8');
    const profileStore = JSON.parse(profileStoreText);
    profiles = profileStore.profiles;

  } catch (err) {
    if (err.code === 'ENOENT') {
      profiles = [];
    } else {
      throw err;
    }
  }
}

export function getProfile(name?: string): Profile {
  let profile: Profile | undefined;
  if (name) {
    profile = profiles.find(p => p.name === name);

  }
  return profile || defaultProfile;
}

export function listProfiles(): ProfileList {
  return profiles.map((p, i) => [i, p.name]);
}

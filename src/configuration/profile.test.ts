import { getProfile, loadProfiles, listProfiles, Profile } from './profile'

test('when no name is passed, return default profile', async () => {
  const profile: Profile = getProfile()
  const {
    name,
    host,
    port,
    user,
    database,
    password
  } = profile

  expect(name).toBe('')
  expect(host).toBe('')
  expect(port).toBe(5432)
  expect(user).toBe('')
  expect(database).toBe('')
  expect(password).toBe('')
})

test('when \'test1\' is passed, the correct profile is returned', async () => {
  await loadProfiles('data/tests/test-profiles.json')
  const profile: Profile = getProfile('test1')
  const {
    name,
    host,
    port,
    user,
    database,
    password
  } = profile

  expect(name).toBe('test1')
  expect(host).toBe('test1.mydbhost.com')
  expect(port).toBe(54321)
  expect(user).toBe('test1user')
  expect(database).toBe('test1db')
  expect(password).toBe('test1pass')
})

test('listProfiles returns correct results', async () => {
  await loadProfiles('data/tests/test-profiles.json')
  const profileList: [number, string][] = listProfiles()

  expect(profileList.length).toBe(2)
  expect(profileList[1][1]).toBe('test2')
  expect(profileList[0][0]).toBe(0)
})

test('loadProfiles with non-existant file does not throw', async () => {
  await loadProfiles('data/test/asdfghjkl.json')
  const profileList: [number, string][] = listProfiles()

  expect(profileList.length).toBe(0)
})

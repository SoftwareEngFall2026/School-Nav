export interface SchoolBuilding {
  /** Stable kebab-case ID for search and routing references. */
  id: string
  displayName: string
  type: 'main' | 'separate'
}

export const schoolBuildings = [
  { id: 'main-school', displayName: 'Main School Building', type: 'main' },
  { id: 'art-building', displayName: 'Art Building', type: 'separate' },
] as const satisfies readonly SchoolBuilding[]

export type BuildingId = (typeof schoolBuildings)[number]['id']

export type SchoolLocationType =
  | 'library'
  | 'learning-commons'
  | 'cafeteria'
  | 'school-center'
  | 'gym'
  | 'building'
  | 'room'

export interface SchoolLocation {
  /** Keep IDs stable even if a display name changes. Use kebab-case. */
  id: string
  displayName: string
  type: SchoolLocationType
  buildingId: BuildingId
  /** Omit when unknown or when the location represents an entire building. */
  floor?: number
  /** Add only confirmed room numbers, e.g. W-302; omit when unknown. */
  roomNumber?: string
}

// Room numbers have not been supplied for these landmarks, so none are assigned.
// Future rooms can reference the same building IDs and add floor/room details.
export const schoolLocations: readonly SchoolLocation[] = [
  {
    id: 'library',
    displayName: 'Library',
    type: 'library',
    buildingId: 'main-school',
    floor: 2,
  },
  {
    id: 'learning-commons',
    displayName: 'Learning Commons',
    type: 'learning-commons',
    buildingId: 'main-school',
    floor: 2,
  },
  {
    id: 'cafeteria',
    displayName: 'Cafeteria',
    type: 'cafeteria',
    buildingId: 'main-school',
    floor: 1,
  },
  {
    id: 'school-center',
    displayName: 'School Center',
    type: 'school-center',
    buildingId: 'main-school',
    floor: 1,
  },
  {
    id: 'farmer-gym',
    displayName: 'Farmer Gym',
    type: 'gym',
    buildingId: 'main-school',
    floor: 1,
  },
  {
    id: 'art-building',
    displayName: 'Art Building',
    type: 'building',
    buildingId: 'art-building',
    // This is a separate building; internal floors will be added later.
  },
]

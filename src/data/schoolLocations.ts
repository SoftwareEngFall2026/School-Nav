import graphData from './schoolGraph.json'

// Placeholder walk times (seconds) used for any edge that has not been timed yet.
// Tune these freely; measured times from schoolGraph.json always take priority.
export const DOORWAY_SECONDS = 5
export const HALLWAY_SECONDS = 15
export const STAIRS_SECONDS = 20
export const OUTDOOR_SECONDS = 45
// TODO: no ramp default was specified; no edges are currently tagged as ramps.
export const RAMP_SECONDS = STAIRS_SECONDS

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
  | 'hallway'
  | 'classroom'
  | 'science-lab'
  | 'office'
  | 'entrance'
  | 'gym'
  | 'pool'
  | 'changing-room'
  | 'library'
  | 'playground'
  | 'outdoor'
  | 'theatre'
  | 'art-room'
  | 'cafeteria'
  | 'learning-commons'
  | 'room'

export interface SchoolLocation {
  /** Keep IDs stable even if a display name changes. Use kebab-case. */
  id: string
  /** Node number from the node sheet / schoolGraph.json. */
  nodeNumber: number
  displayName: string
  type: SchoolLocationType
  buildingId: BuildingId
  /** Connector nodes used for routing but hidden from search results. */
  isWaypoint?: boolean
  /** Omit when unknown or when the location represents an entire building. */
  floor?: number
  /** Add only confirmed room numbers, e.g. W-302; omit when unknown. */
  roomNumber?: string
}

// TODO: floors are unknown for every node without a `floor` field. Only the
// W-3xx rooms (floor 3 from their numbering) and the floors carried over from
// the earlier version of this file are filled in.
export const schoolLocations: readonly SchoolLocation[] = [
  // Hallway connectors
  { id: 'red-hall-top', nodeNumber: 1, displayName: 'Top Red Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'red-hall-middle', nodeNumber: 2, displayName: 'Middle Red Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'red-hall-bottom', nodeNumber: 3, displayName: 'Bottom Red Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'yellow-hall-top', nodeNumber: 4, displayName: 'Top Yellow Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'yellow-hall-middle', nodeNumber: 5, displayName: 'Middle Yellow Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'yellow-hall-bottom', nodeNumber: 6, displayName: 'Bottom Yellow Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'blue-hall-top', nodeNumber: 7, displayName: 'Top Blue Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'blue-hall-middle', nodeNumber: 8, displayName: 'Middle Blue Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'blue-hall-bottom', nodeNumber: 9, displayName: 'Bottom Blue Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'green-hall-top', nodeNumber: 10, displayName: 'Top Green Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'green-hall-middle', nodeNumber: 11, displayName: 'Middle Green Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'green-hall-bottom', nodeNumber: 12, displayName: 'Bottom Green Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'o-hall-bottom', nodeNumber: 14, displayName: 'Bottom O Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'o-hall-top', nodeNumber: 15, displayName: 'Top O Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  // TODO: also MS Reception, which is hidden from search while it is a waypoint.
  { id: 'teal-hall-middle', nodeNumber: 22, displayName: 'MS Reception / Middle Teal', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  { id: 'teal-hall-top', nodeNumber: 75, displayName: 'Top Teal Hallway', type: 'hallway', buildingId: 'main-school', isWaypoint: true },
  // Named hallways that are not in the waypoint list, so they stay searchable
  { id: 'high-street', nodeNumber: 77, displayName: 'High Street', type: 'hallway', buildingId: 'main-school' },
  { id: 'hs-locker-hallway', nodeNumber: 82, displayName: 'Main HS Locker Hallway', type: 'hallway', buildingId: 'main-school' },

  // Entrances
  { id: 'main-entrance', nodeNumber: 25, displayName: 'Main Entrance', type: 'entrance', buildingId: 'main-school' },
  { id: 'loudon-entrance', nodeNumber: 26, displayName: 'Loudon Entrance', type: 'entrance', buildingId: 'main-school' },

  // W-3xx classrooms
  { id: 'w-301', nodeNumber: 47, displayName: 'W-301', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-301' },
  { id: 'w-302', nodeNumber: 48, displayName: 'Computer Science Room', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-302' },
  { id: 'w-303', nodeNumber: 49, displayName: 'W-303', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-303' },
  { id: 'w-304', nodeNumber: 50, displayName: 'W-304', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-304' },
  { id: 'w-306', nodeNumber: 51, displayName: 'W-306', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-306' },
  { id: 'w-307', nodeNumber: 52, displayName: 'W-307', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-307' },
  { id: 'w-308', nodeNumber: 53, displayName: 'W-308', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-308' },
  { id: 'w-309', nodeNumber: 54, displayName: 'W-309', type: 'classroom', buildingId: 'main-school', floor: 3, roomNumber: 'W-309' },

  // Other classrooms and labs
  { id: 'grade-1', nodeNumber: 67, displayName: 'Grade 1', type: 'classroom', buildingId: 'main-school' },
  { id: 'grade-2', nodeNumber: 68, displayName: 'Grade 2', type: 'classroom', buildingId: 'main-school' },
  { id: 'k1-k2', nodeNumber: 69, displayName: 'K1 and K2', type: 'classroom', buildingId: 'main-school' },
  { id: 'grade-5-6-science', nodeNumber: 56, displayName: 'Grade 5 & 6 Science', type: 'science-lab', buildingId: 'main-school' },
  { id: 'grade-7-8-science', nodeNumber: 57, displayName: 'Grade 7 & 8 Science', type: 'science-lab', buildingId: 'main-school' },
  { id: 'robotics-room', nodeNumber: 58, displayName: 'Robotics Room', type: 'room', buildingId: 'main-school' },
  // TODO: confirm what the Mill is; typed as a generic room.
  { id: 'mill', nodeNumber: 55, displayName: 'Mill', type: 'room', buildingId: 'main-school' },

  // Department corners and common spaces
  // Learning Commons keeps floor 2 from the earlier version of this file.
  { id: 'learning-commons', nodeNumber: 13, displayName: 'Learning Commons', type: 'learning-commons', buildingId: 'main-school', floor: 2 },
  { id: 'hs-print-room', nodeNumber: 16, displayName: 'HS Print Room', type: 'room', buildingId: 'main-school' },
  { id: 'osa-corner', nodeNumber: 17, displayName: 'OSA Corner', type: 'room', buildingId: 'main-school' },
  { id: 'english-corner', nodeNumber: 18, displayName: 'English Corner', type: 'room', buildingId: 'main-school' },
  { id: 'social-studies-corner', nodeNumber: 19, displayName: 'Social Studies Corner', type: 'room', buildingId: 'main-school' },
  { id: 'languages-corner', nodeNumber: 20, displayName: 'Languages Corner', type: 'room', buildingId: 'main-school' },
  { id: 'sld-pod', nodeNumber: 80, displayName: 'SLD Pod', type: 'room', buildingId: 'main-school' },
  { id: 'senior-snack-basket', nodeNumber: 76, displayName: 'Senior Snack Basket', type: 'room', buildingId: 'main-school' },
  { id: 'bookstore', nodeNumber: 79, displayName: 'Bookstore', type: 'room', buildingId: 'main-school' },
  { id: 'cafeteria', nodeNumber: 28, displayName: 'Commons / Cafeteria', type: 'cafeteria', buildingId: 'main-school', floor: 1 },
  { id: 'theatre-annex', nodeNumber: 23, displayName: 'Theatre Annex', type: 'theatre', buildingId: 'main-school' },
  { id: 'theatre-foyer', nodeNumber: 24, displayName: 'Theatre Foyer (Black Chairs)', type: 'theatre', buildingId: 'main-school' },
  // TODO: unclear whether this is a room or a stretch of the red hallway.
  { id: 'boardroom-red', nodeNumber: 64, displayName: 'Boardroom Red', type: 'room', buildingId: 'main-school' },

  // Libraries
  { id: 'mellon-library', nodeNumber: 73, displayName: "Mellon Library (Mr. Reed's Desk)", type: 'library', buildingId: 'main-school' },
  { id: 'ls-library', nodeNumber: 59, displayName: 'LS Library', type: 'library', buildingId: 'main-school' },
  { id: 'boardroom-library', nodeNumber: 63, displayName: 'Boardroom Library', type: 'library', buildingId: 'main-school' },

  // Offices
  { id: 'nurses-office', nodeNumber: 21, displayName: "Nurse's Office", type: 'office', buildingId: 'main-school' },
  { id: 'ls-reception', nodeNumber: 27, displayName: 'LS Reception', type: 'office', buildingId: 'main-school' },
  { id: 'joe-harris-office', nodeNumber: 60, displayName: "Joe Harris's Office", type: 'office', buildingId: 'main-school' },
  { id: 'athletics-office', nodeNumber: 61, displayName: 'Athletics Office (Pranay & Erickson)', type: 'office', buildingId: 'main-school' },
  { id: 'admissions-office', nodeNumber: 65, displayName: 'Admissions Office', type: 'office', buildingId: 'main-school' },
  { id: 'transport-office', nodeNumber: 66, displayName: 'Transport Office', type: 'office', buildingId: 'main-school' },
  { id: 'hr-office', nodeNumber: 70, displayName: 'HR', type: 'office', buildingId: 'main-school' },
  { id: 'advancement-office', nodeNumber: 71, displayName: 'Advancement', type: 'office', buildingId: 'main-school' },
  { id: 'dr-moore-office', nodeNumber: 72, displayName: "Dr. Moore's Office", type: 'office', buildingId: 'main-school' },
  { id: 'aquatics-office', nodeNumber: 74, displayName: 'Aquatics Office', type: 'office', buildingId: 'main-school' },
  { id: 'test-office', nodeNumber: 81, displayName: 'Test Office', type: 'office', buildingId: 'main-school' },

  // Gyms, pool and changing rooms
  { id: 'farmer-gym', nodeNumber: 30, displayName: 'Farmer Gym', type: 'gym', buildingId: 'main-school', floor: 1 },
  { id: 'blue-gym', nodeNumber: 31, displayName: 'Blue Gym', type: 'gym', buildingId: 'main-school' },
  { id: 'main-gym', nodeNumber: 33, displayName: 'Main Gym', type: 'gym', buildingId: 'main-school' },
  { id: 'ls-gym', nodeNumber: 36, displayName: 'LS Gym (MPR1)', type: 'gym', buildingId: 'main-school' },
  { id: 'choir-room', nodeNumber: 34, displayName: 'MPR2 Choir Room', type: 'room', buildingId: 'main-school' },
  { id: 'dance-room', nodeNumber: 32, displayName: 'Dance Room (MPR3)', type: 'room', buildingId: 'main-school' },
  { id: 'gym-foyer', nodeNumber: 35, displayName: 'Gym Foyer', type: 'room', buildingId: 'main-school' },
  { id: 'swimming-pool', nodeNumber: 29, displayName: 'Swimming Pool', type: 'pool', buildingId: 'main-school' },
  { id: 'changing-rooms-basketball', nodeNumber: 45, displayName: 'Changing Rooms (Basketball)', type: 'changing-room', buildingId: 'main-school' },
  { id: 'changing-rooms-swim', nodeNumber: 46, displayName: 'Changing Rooms (Swim)', type: 'changing-room', buildingId: 'main-school' },
  // TODO: confirm what "Jenny" refers to; typed as a generic room.
  { id: 'jenny', nodeNumber: 62, displayName: 'Jenny', type: 'room', buildingId: 'main-school' },

  // Art building (TODO: confirm whether Art 0-3 are floor numbers)
  { id: 'art-0', nodeNumber: 37, displayName: 'Art 0', type: 'art-room', buildingId: 'art-building' },
  { id: 'art-1', nodeNumber: 38, displayName: 'Art 1', type: 'art-room', buildingId: 'art-building' },
  { id: 'art-2', nodeNumber: 39, displayName: 'Art 2', type: 'art-room', buildingId: 'art-building' },
  { id: 'art-3', nodeNumber: 40, displayName: 'Art 3', type: 'art-room', buildingId: 'art-building' },

  // Outdoor spaces
  // TODO: confirm building for all outdoor spaces below.
  { id: 'correen-hester-courtyard', nodeNumber: 41, displayName: 'Correen Hester Courtyard', type: 'outdoor', buildingId: 'main-school' },
  { id: 'matt-horvats-house', nodeNumber: 42, displayName: "Matt Horvat's House", type: 'outdoor', buildingId: 'main-school' },
  { id: 'ls-playground', nodeNumber: 43, displayName: 'LS Playground', type: 'playground', buildingId: 'main-school' },
  { id: 'waverly-playground', nodeNumber: 44, displayName: 'Waverly Playground (Eagle)', type: 'playground', buildingId: 'main-school' },
  { id: 'ls-mini-playground', nodeNumber: 78, displayName: 'LS Mini Playground (Marlborough)', type: 'playground', buildingId: 'main-school' },
]

// TODO: the old `library` and `school-center` entries could map to Mellon, LS
// or Boardroom Library, so they are kept out of the graph until confirmed.
export const unresolvedLocations = [
  { id: 'library', displayName: 'Library', floor: 2 },
  { id: 'school-center', displayName: 'School Center', floor: 1 },
] as const

// ---------------------------------------------------------------------------
// Edges
// ---------------------------------------------------------------------------

export type SchoolEdgeKind = 'hallway' | 'doorway' | 'stairs' | 'outdoor' | 'ramp'

export interface SchoolEdge {
  from: string
  to: string
  /** Routing weight: measured time when available, otherwise a placeholder. */
  walkSeconds: number
  /** false = placeholder estimate */
  measured: boolean
  kind: SchoolEdgeKind
  floorChange?: number
  /** false if stairs-only */
  accessible: boolean
  assignedTo?: string
  /** false = timed edge that is missing from the node sheet's connection lists. */
  inConnectionList: boolean
  notes?: string[]
}

interface RawSchoolGraph {
  nodes: { id: number; name: string; connections: number[] }[]
  edges: {
    from: number
    to: number
    timeSeconds: number | null
    measured: boolean
    inConnectionList: boolean
    notes?: string[]
  }[]
  timingAssignments: { person: string; area: string; nodes: number[]; note?: string }[]
}

const rawGraph: RawSchoolGraph = graphData

export const placeholderSeconds: Record<SchoolEdgeKind, number> = {
  doorway: DOORWAY_SECONDS,
  hallway: HALLWAY_SECONDS,
  stairs: STAIRS_SECONDS,
  outdoor: OUTDOOR_SECONDS,
  ramp: RAMP_SECONDS,
}

const locationsByNumber = new Map(schoolLocations.map((location) => [location.nodeNumber, location]))
const locationsById = new Map(schoolLocations.map((location) => [location.id, location]))

function locationIdFor(nodeNumber: number) {
  return locationsByNumber.get(nodeNumber)?.id ?? `unknown-node-${nodeNumber}`
}

// No stairs or ramps are known yet, so every edge is a hallway, doorway or
// outdoor edge. Change individual edges once stairs are identified.
function edgeKindFor(fromNumber: number, toNumber: number): SchoolEdgeKind {
  const a = locationsByNumber.get(fromNumber)
  const b = locationsByNumber.get(toNumber)
  if (!a || !b) return 'doorway'
  const isOutside = (location: SchoolLocation) =>
    location.type === 'outdoor' || location.type === 'playground'
  if (a.buildingId !== b.buildingId || isOutside(a) || isOutside(b)) return 'outdoor'
  if (a.type === 'hallway' && b.type === 'hallway') return 'hallway'
  return 'doorway'
}

/** Returns the one person whose list has both endpoints; undefined for nobody or several people. */
function assigneeFor(fromNumber: number, toNumber: number) {
  const people = rawGraph.timingAssignments.filter(
    ({ nodes }) => nodes.includes(fromNumber) && nodes.includes(toNumber),
  )
  return people.length === 1 ? people[0].person : undefined
}

export const schoolEdges: readonly SchoolEdge[] = rawGraph.edges.map((edge) => {
  const kind = edgeKindFor(edge.from, edge.to)
  const measured = edge.measured && edge.timeSeconds !== null
  return {
    from: locationIdFor(edge.from),
    to: locationIdFor(edge.to),
    walkSeconds: measured ? edge.timeSeconds! : placeholderSeconds[kind],
    measured,
    kind,
    accessible: kind !== 'stairs',
    assignedTo: assigneeFor(edge.from, edge.to),
    inConnectionList: edge.inConnectionList,
    ...(edge.notes ? { notes: edge.notes } : {}),
  }
})

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

export interface RouteOptions {
  accessibleOnly?: boolean
  /** Ignore timed edges that are not in the node sheet's connection lists. */
  listedEdgesOnly?: boolean
}

export interface Route {
  path: string[]
  edges: SchoolEdge[]
  totalSeconds: number
  usesUnmeasuredEdge: boolean
}

function buildAdjacency(options: RouteOptions = {}) {
  const adjacency = new Map<string, { to: string; edge: SchoolEdge }[]>()
  for (const edge of schoolEdges) {
    if (options.accessibleOnly && !edge.accessible) continue
    if (options.listedEdgesOnly && !edge.inConnectionList) continue
    if (!adjacency.has(edge.from)) adjacency.set(edge.from, [])
    if (!adjacency.has(edge.to)) adjacency.set(edge.to, [])
    adjacency.get(edge.from)!.push({ to: edge.to, edge })
    adjacency.get(edge.to)!.push({ to: edge.from, edge })
  }
  return adjacency
}

/** Dijkstra on walkSeconds. Returns null when no route exists. */
export function findRoute(fromId: string, toId: string, options: RouteOptions = {}): Route | null {
  const adjacency = buildAdjacency(options)
  const distance = new Map<string, number>([[fromId, 0]])
  const previous = new Map<string, { from: string; edge: SchoolEdge }>()
  const visited = new Set<string>()

  while (true) {
    let current: string | undefined
    for (const [id, seconds] of distance) {
      if (!visited.has(id) && (current === undefined || seconds < distance.get(current)!)) current = id
    }
    if (current === undefined) return null
    if (current === toId) break
    visited.add(current)

    for (const { to, edge } of adjacency.get(current) ?? []) {
      const seconds = distance.get(current)! + edge.walkSeconds
      if (seconds < (distance.get(to) ?? Infinity)) {
        distance.set(to, seconds)
        previous.set(to, { from: current, edge })
      }
    }
  }

  const path = [toId]
  const edges: SchoolEdge[] = []
  for (let step = previous.get(toId); step; step = previous.get(step.from)) {
    path.unshift(step.from)
    edges.unshift(step.edge)
  }
  return {
    path,
    edges,
    totalSeconds: distance.get(toId)!,
    usesUnmeasuredEdge: edges.some((edge) => !edge.measured),
  }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface GraphValidationReport {
  unknownNodeReferences: string[]
  selfLoops: string[]
  nodesWithoutConnections: string[]
  unreachableFromMainEntrance: string[]
  /** Same check, ignoring timed edges missing from the connection lists. */
  unreachableUsingListedEdgesOnly: string[]
}

const MAIN_ENTRANCE_ID = 'main-entrance'

function unreachableFrom(startId: string, options: RouteOptions) {
  const adjacency = buildAdjacency(options)
  const seen = new Set([startId])
  const stack = [startId]
  while (stack.length) {
    for (const { to } of adjacency.get(stack.pop()!) ?? []) {
      if (!seen.has(to)) {
        seen.add(to)
        stack.push(to)
      }
    }
  }
  return schoolLocations.filter(({ id }) => !seen.has(id)).map(({ id }) => id)
}

export function validateGraph(): GraphValidationReport {
  const unknownNodeReferences = [
    ...rawGraph.nodes
      .filter(({ id }) => !locationsByNumber.has(id))
      .map(({ id, name }) => `JSON node ${id} (${name}) has no SchoolLocation`),
    ...schoolEdges
      .flatMap((edge) => [edge.from, edge.to].filter((id) => !locationsById.has(id)).map((id) => `${edge.from} <-> ${edge.to}: ${id}`)),
  ]
  const selfLoops = schoolEdges.filter((edge) => edge.from === edge.to).map((edge) => edge.from)
  const connected = new Set(schoolEdges.flatMap((edge) => [edge.from, edge.to]))

  return {
    unknownNodeReferences,
    selfLoops,
    nodesWithoutConnections: schoolLocations.filter(({ id }) => !connected.has(id)).map(({ id }) => id),
    unreachableFromMainEntrance: unreachableFrom(MAIN_ENTRANCE_ID, {}),
    unreachableUsingListedEdgesOnly: unreachableFrom(MAIN_ENTRANCE_ID, { listedEdgesOnly: true }),
  }
}

if (import.meta.env?.DEV) {
  console.info('School graph validation', validateGraph())
}

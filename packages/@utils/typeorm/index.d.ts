export declare class BaseEntity {
  id: string
  createdAt: Date | string
  updatedAt: Date | string
}

export function makeRouteOperationId(routes: RoutesOptions): RoutesOptions

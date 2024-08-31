export enum ScopeType {
  PRIVATE,
  PUBLIC,
}

export enum RoutePath {
  Landing = '/',

  Deeds = '/deeds',
  Profile = '/profile',
  Friends = '/friends',
  MyDeeds = '/deeds/my',
  AddDeed = '/deeds/my/create',
}

export type RoutesConfig = {
  [routePath in RoutePath]: ScopeType;
};

export const routesConfig: RoutesConfig = {
  [RoutePath.Landing]: ScopeType.PUBLIC,
  [RoutePath.Deeds]: ScopeType.PRIVATE,
  [RoutePath.Profile]: ScopeType.PRIVATE,
  [RoutePath.Friends]: ScopeType.PRIVATE,
  [RoutePath.MyDeeds]: ScopeType.PRIVATE,
  [RoutePath.AddDeed]: ScopeType.PRIVATE,
};

import { PageRoute } from '../../app.routes';

export interface NavigableRoute {
  label: string;
  route: string | PageRoute;
  active?: boolean;
}

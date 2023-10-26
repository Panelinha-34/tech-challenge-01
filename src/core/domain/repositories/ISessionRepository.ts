import { Session } from "../entities/Session";

export interface ISessionRepository {
  create(Session: Session): Promise<Session>;
}

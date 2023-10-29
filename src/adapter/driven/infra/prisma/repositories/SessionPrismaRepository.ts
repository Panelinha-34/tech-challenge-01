import { Session } from "@/core/domain/entities/Session";
import { ISessionRepository } from "@/core/domain/repositories/ISessionRepository";

import { prisma } from "../config/prisma";

export class SessionPrismaRepository implements ISessionRepository {
  async create(session: Session): Promise<Session> {
    const createdSession = await prisma.session.create({
      data: {
        client_id: session.client.id.toString(),
      },
    });

    return new Session(
      { client: session.client, createdAt: createdSession.created_at },
      session.id
    );
  }
}

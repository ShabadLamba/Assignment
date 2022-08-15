import { Injectable } from '@nestjs/common';
import { AuthRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

export interface AuthRequestDB extends AuthRequest {
  id: string;
}

export interface AuthRequestData {
  users: AuthRequestDB[];
}

const adapter = new FileSync<AuthRequestDB>('./db/users.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

@Injectable()
export class AuthDao {
  private get collection(): any {
    return db.get('users');
  }

  constructor() {
    //
  }

  async getUser(email: string): Promise<AuthRequestDB> {
    const value = await this.collection.find({ email }).value();
    if (value) return value;
    throw new Error('User not found');
  }
}

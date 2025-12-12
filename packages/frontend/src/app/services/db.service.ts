import { Injectable } from '@angular/core';

export type QueryResult = {
  rows: any[]
  fields: {
    name: string
    dataTypeID: number
  }[]
  affectedRows: number
}

@Injectable({
  providedIn: 'root'
})
export class DBService {

  get db() {
    return (window as any).db as {
      exec: (str: string) => Promise<any>,
      query: (str: string) => Promise<QueryResult>
    };
  }

  async exec(str: string) {
    return await this.db.exec(str);
  }

  async query(str: string) {
    return await this.db.query(str);
  }
}

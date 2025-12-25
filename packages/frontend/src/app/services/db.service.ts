import { Injectable } from '@angular/core';
import { getUid } from '../shared/utils';

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

  private _prepareScript(str: string) {
    // Remove comments
    str = str.replaceAll(/--.*/g, "");
    const matches = [...str.matchAll(/CREATE\s+OR\s+REPLACE\s+FUNCTION\s+([^\(\)]+)()/ig)];
    if (matches.length) {
      for (const [full, captured] of matches) {
        // Mangling function names
        str = str.replaceAll(captured, `${captured}_${getUid()}`);
      }
    }
    return str;
  }

  async exec(userScript: string) {
    const prepared = this._prepareScript(userScript);
    console.log({ prepared });
    return await this.db.exec(prepared);
  }

  async query(query: string) {
    return await this.db.query(query);
  }
}

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

  private _functionMangling(str: string) {
    const matches = [...str.matchAll(/CREATE\s+OR\s+REPLACE\s+FUNCTION\s+([^\(\)]+)()/ig)];
    if (matches.length) {
      for (const [full, captured] of matches) {
        str = str.replaceAll(captured, `${captured}_${getUid()}`);
      }
    }
    return str;
  }

  async exec(str: string) {
    const mangled = this._functionMangling(str);
    console.log({ mangled });
    return await this.db.exec(mangled);
  }

  async query(str: string) {
    return await this.db.query(str);
  }
}

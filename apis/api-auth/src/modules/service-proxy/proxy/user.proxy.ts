/** Generate by swagger-axios-codegen */

import axiosStatic, { AxiosPromise, AxiosInstance } from 'axios';
export interface IRequestOptions {
  headers?: any;
}

interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
function axios(configs: IRequestConfig): AxiosPromise {
  return serviceOptions.axios ? serviceOptions.axios.request(configs) : axiosStatic(configs);
}

export class UserServiceProxy {
  /**
   * passwordHash
   */
  passwordHash(
    params: {
      /**  */
      getPasswordHashDto: GetPasswordHashDto;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/password-hash';

      configs.url = url;

      let data = { ...params['getPasswordHashDto'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * generateSalt
   */
  generateSalt(
    params: {
      /**  */
      generateSaltDto: GenerateSaltDto;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/generate-salt';

      configs.url = url;

      let data = { ...params['generateSaltDto'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * generateNickName
   */
  generateNickName(
    params: {
      /**  */
      generateNickNameDto: GenerateNickNameDto;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/generate-nick-name';

      configs.url = url;

      let data = { ...params['generateNickNameDto'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Retrieve many User
   */
  getMany(
    params: {
      /**  */
      id: string;
      /** <h4>Selects fields that should be returned in the reponse body.</h4><i>Syntax:</i> <strong>?fields=field1,field2,...</strong> <br/><i>Example:</i> <strong>?fields=email,name</strong> */
      fields?: string;
      /** <h4>Adds fields request condition (multiple conditions) to the request.</h4><i>Syntax:</i> <strong>?filter=field||condition||value</strong><br/><i>Examples:</i> <ul><li><strong>?filter=name||eq||batman</strong></li><li><strong>?filter=isVillain||eq||false&filter=city||eq||Arkham</strong> (multiple filters are treated as a combination of AND type of conditions)</li><li><strong>?filter=shots||in||12,26</strong> (some conditions accept multiple values separated by commas)</li><li><strong>?filter=power||isnull</strong> (some conditions don't accept value)</li></ul><br/>Filter Conditions:<ul><li><strong><code>eq</code></strong> (<code>=</code>, equal)</li><li><strong><code>ne</code></strong> (<code>!=</code>, not equal)</li><li><strong><code>gt</code></strong> (<code>&gt;</code>, greater than)</li><li><strong><code>lt</code></strong> (<code>&lt;</code>, lower that)</li><li><strong><code>gte</code></strong> (<code>&gt;=</code>, greater than or equal)</li><li><strong><code>lte</code></strong> (<code>&lt;=</code>, lower than or equal)</li><li><strong><code>starts</code></strong> (<code>LIKE val%</code>, starts with)</li><li><strong><code>ends</code></strong> (<code>LIKE %val</code>, ends with)</li><li><strong><code>cont</code></strong> (<code>LIKE %val%</code>, contains)</li><li><strong><code>excl</code></strong> (<code>NOT LIKE %val%</code>, not contains)</li><li><strong><code>in</code></strong> (<code>IN</code>, in range, <strong><em>accepts multiple values</em></strong>)</li><li><strong><code>notin</code></strong> (<code>NOT IN</code>, not in range, <strong><em>accepts multiple values</em></strong>)</li><li><strong><code>isnull</code></strong> (<code>IS NULL</code>, is NULL, <strong><em>doesn't accept value</em></strong>)</li><li><strong><code>notnull</code></strong> (<code>IS NOT NULL</code>, not NULL, <strong><em>doesn't accept value</em></strong>)</li><li><strong><code>between</code></strong> (<code>BETWEEN</code>, between, <strong><em>accepts two values</em></strong>)</li></ul> */
      filter?: string;
      /** <h4>Adds <code>OR</code> conditions to the request.</h4><i>Syntax:</i> <strong>?or=field||condition||value</strong><br/>It uses the same conditions as the filter parameter<br/><i>Rules and <i>Examples:</i></i><ul><li>If there is only <strong>one</strong> <code>or</code> present (without <code>filter</code>) then it will be interpreted as simple filter:</li><ul><li><strong>?or=name||eq||batman</strong></li></ul></ul><ul><li>If there are <strong>multiple</strong> <code>or</code> present (without <code>filter</code>) then it will be interpreted as a compination of <code>OR</code> conditions, as follows:<br><code>WHERE {or} OR {or} OR ...</code></li><ul><li><strong>?or=name||eq||batman&or=name||eq||joker</strong></li></ul></ul><ul><li>If there are <strong>one</strong> <code>or</code> and <strong>one</strong> <code>filter</code> then it will be interpreted as <code>OR</code> condition, as follows:<br><code>WHERE {filter} OR {or}</code></li><ul><li><strong>?filter=name||eq||batman&or=name||eq||joker</strong></li></ul></ul><ul><li>If present <strong>both</strong> <code>or</code> and <code>filter</code> in any amount (<strong>one</strong> or <strong>miltiple</strong> each) then both interpreted as a combitation of <code>AND</code> conditions and compared with each other by <code>OR</code> condition, as follows:<br><code>WHERE ({filter} AND {filter} AND ...) OR ({or} AND {or} AND ...)</code></li><ul><li><strong>?filter=type||eq||hero&filter=status||eq||alive&or=type||eq||villain&or=status||eq||dead</strong></li></ul></ul> */
      or?: string;
      /** <h4>Adds sort by field (by multiple fields) and order to query result.</h4><i>Syntax:</i> <strong>?sort=field,ASC|DESC</strong><br/><i>Examples:</i></i><ul><li><strong>?sort=name,ASC</strong></li><li><strong>?sort=name,ASC&sort=id,DESC</strong></li></ul> */
      sort?: string;
      /** <h4>Receive joined relational objects in GET result (with all or selected fields).</h4><i>Syntax:</i><ul><li><strong>?join=relation</strong></li><li><strong>?join=relation||field1,field2,...</strong></li><li><strong>?join=relation1||field11,field12,...&join=relation1.nested||field21,field22,...&join=...</strong></li></ul><br/><i>Examples:</i></i><ul><li><strong>?join=profile</strong></li><li><strong>?join=profile||firstName,email</strong></li><li><strong>?join=profile||firstName,email&join=notifications||content&join=tasks</strong></li><li><strong>?join=relation1&join=relation1.nested&join=relation1.nested.deepnested</strong></li></ul><strong><i>Notice:</i></strong> <code>id</code> field always persists in relational objects. To use nested relations, the parent level MUST be set before the child level like example above. */
      join?: string;
      /** <h4>Receive <code>N</code> amount of entities.</h4><i>Syntax:</i> <strong>?limit=number</strong><br/><i>Example:</i> <strong>?limit=10</strong> */
      limit?: number;
      /** <h4>Offset <code>N</code> amount of entities.</h4><i>Syntax:</i> <strong>?offset=number</strong><br/><i>Example:</i> <strong>?offset=10</strong> */
      offset?: number;
      /** <h4>Receive a portion of <code>limit</code> (per_page) entities (alternative to <code>offset</code>). Will be applied if <code>limit</code> is set up.</h4><i>Syntax:</i> <strong>?page=number</strong><br/><i>Example:</i> <strong>?page=2</strong> */
      page?: number;
      /** <h4>Alias for <code>limit</code></h4> */
      perPage?: number;
      /** <h4>Reset cache (if was enabled) and receive entities from the DB.</h4><i>Usage:</i> <strong>?cache=0</strong> */
      cache?: number;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'get' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;
      configs.params = {
        fields: params['fields'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        perPage: params['perPage'],
        cache: params['cache']
      };
      let data = null;

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Create one User
   */
  createOne(
    params: {
      /**  */
      user: User;
      /**  */
      id: string;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;

      let data = { ...params['user'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Retrieve one User
   */
  getOne(
    params: {
      /**  */
      id: string;
      /** <h4>Selects fields that should be returned in the reponse body.</h4><i>Syntax:</i> <strong>?fields=field1,field2,...</strong> <br/><i>Example:</i> <strong>?fields=email,name</strong> */
      fields?: string;
      /** <h4>Receive joined relational objects in GET result (with all or selected fields).</h4><i>Syntax:</i><ul><li><strong>?join=relation</strong></li><li><strong>?join=relation||field1,field2,...</strong></li><li><strong>?join=relation1||field11,field12,...&join=relation1.nested||field21,field22,...&join=...</strong></li></ul><br/><i>Examples:</i></i><ul><li><strong>?join=profile</strong></li><li><strong>?join=profile||firstName,email</strong></li><li><strong>?join=profile||firstName,email&join=notifications||content&join=tasks</strong></li><li><strong>?join=relation1&join=relation1.nested&join=relation1.nested.deepnested</strong></li></ul><strong><i>Notice:</i></strong> <code>id</code> field always persists in relational objects. To use nested relations, the parent level MUST be set before the child level like example above. */
      join?: string;
      /** <h4>Reset cache (if was enabled) and receive entities from the DB.</h4><i>Usage:</i> <strong>?cache=0</strong> */
      cache?: number;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'get' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };
      let data = null;

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Update one User
   */
  updateOne(
    params: {
      /**  */
      user: User;
      /**  */
      id: string;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'patch' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;

      let data = { ...params['user'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Delete one User
   */
  deleteOne(
    params: {
      /**  */
      id: string;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'delete' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;

      let data = null;

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Create many User
   */
  createMany(
    params: {
      /**  */
      bulkDto: BulkDto;
      /**  */
      id: string;
    } = <any>{},
    options: IRequestOptions = {}
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      const configs: IRequestConfig = { ...options, method: 'post' };
      configs.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      let url = '/users/bulk';
      url = url.replace('{id}', params['id'] + '');

      configs.url = url;

      let data = { ...params['bulkDto'] };

      configs.data = data;
      axios(configs)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export class GetPasswordHashDto {
  /**  */
  password: string;

  /**  */
  salt: string;

  constructor(data?: any) {
    if (data) {
      this['password'] = data['password'];
      this['salt'] = data['salt'];
    }
  }
}

export class GenerateSaltDto {
  constructor(data?: any) {
    if (data) {
    }
  }
}

export class GenerateNickNameDto {
  constructor(data?: any) {
    if (data) {
    }
  }
}

export class User {
  /** ID */
  id: string;

  /** 创建时间 */
  createdAt: string;

  /** 修改时间 */
  updatedAt: string;

  /** 用户名 */
  userName: string;

  /** 密码 */
  password: string;

  /** SALT */
  salt: string;

  /** 昵称 */
  nickName: string;

  constructor(data?: any) {
    if (data) {
      this['id'] = data['id'];
      this['createdAt'] = data['createdAt'];
      this['updatedAt'] = data['updatedAt'];
      this['userName'] = data['userName'];
      this['password'] = data['password'];
      this['salt'] = data['salt'];
      this['nickName'] = data['nickName'];
    }
  }
}

export class BulkDto {
  constructor(data?: any) {
    if (data) {
    }
  }
}

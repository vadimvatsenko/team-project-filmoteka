let list = new Array();
class localStorageAPI {
  constructor() {}
  static get KEYS() {
    return {
      WATCHED: 'watched',
      QUEUE: 'queue',
      THEME: 'theme',
    };
  }
  static get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static set(key, Obj) {
    if (!localStorageAPI.get(key)) {
      list.push(Obj);
      localStorage.setItem(key, JSON.stringify(list));
      list = [];
      return;
    }

    list = localStorageAPI.get(key);
    if (list.find(item => item.id === Obj.id) !== undefined) {
      return;
    }
    list.push(Obj);
    localStorage.setItem(key, JSON.stringify(list));
  }
  static delete(key, Obj) {
    if (!localStorageAPI.get(key)) {
      return;
    }
    let list = localStorageAPI.get(key);
    const searchIndex = list.findIndex(item => item.id === Obj.id);
    if (searchIndex !== -1) {
      list.splice(searchIndex, 1);
      localStorage.setItem(key, JSON.stringify(list));
    }
  }

  static check(key, Obj) {
    if (!localStorageAPI.get(key)) return false;

    list = localStorageAPI.get(key);
    if (list.find(item => item.id === Obj.id)) return true;

    return false;
  }
  static getDataPerPage(key, page = 1, perPage = 18) {
    const data = localStorageAPI.get(key);
    if (!data || data.length === 0) {
      return;
    }
    let forRender;
    forRender = data.slice(0 + perPage * (page - 1), perPage * page);

    if (page === 1) {
      forRender = data.slice(0, perPage);
    }
    return forRender;
  }
}
export { localStorageAPI };

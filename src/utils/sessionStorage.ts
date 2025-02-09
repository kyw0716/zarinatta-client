export class SessionStorage {
  constructor() {}

  static get = <T>(key: string) => {
    const data = sessionStorage.getItem(key);
    const parsedData = JSON.parse(data ?? "null");

    return parsedData as T | null;
  };

  static set = (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
}

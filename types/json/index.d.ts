declare module '*/data.json' {
  interface IJsonData {
    id: number
    title: string
    artist: string,
    synopsis: string,
    text: string
    thumbnail?: string
  }[]

  const value: IJsonData;
  export = value;
}
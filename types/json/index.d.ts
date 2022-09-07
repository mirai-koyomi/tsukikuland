interface IJsonDataTemp {
  id: number
  type: 'novel' | 'comic'
  creator_id: number
  title: string
  synopsis: string
  thumbnail?: string
}

interface IJsonDataNovel extends IJsonDataTemp {
  type: 'novel'
  text: string
}

interface IJsonDataComic extends IJsonDataTemp {
  type: 'comic'
  pages: string[]
}

type IJsonData = IJsonDataNovel | IJsonDataComic

interface IJsonCreator {
  id: number
  name: string
  icon: string
  twitter?: string
  pixiv?: string
  bio: string
}

declare module '*/data.json' {

  const value: IJsonData[];
  export = value;
}

declare module '*/creator.json' {

  const value: IJsonCreator[];
  export = value;
}

declare module "*.jpg"
declare module "*.png"
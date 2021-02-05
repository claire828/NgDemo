
export enum Page{
    ALL = 0,
    ACTIVE = 1,
    COMPLETE =2
  }

  export interface ITaskStruct{
    name:string,
    complete:boolean,
    id:string
  }

export interface IItemStruct extends ITaskStruct {
    isFocus:boolean,
    isRemove:boolean,
}




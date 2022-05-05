export interface IStatement {

  id: string;

  name: string;
}

export interface ICopyPrimitive extends IStatement{

  redefines: ICopyBook[];

  value: ArrayBuffer;
}


export interface ICopyBook extends IStatement{

  statements: IStatement[];
}


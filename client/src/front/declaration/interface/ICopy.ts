export interface IStatement {

  id: string;

  name: string;

  level: number;

  lineNumber: number;

  details: (ICopyBook | ICopyPrimitive)[];

  isRedefined: boolean;

  occurs: number;

  isFiller: boolean;
}

export interface ICopyPrimitive extends IStatement{

  dataType: IDataType;

  binaryProperties: IBinaryProperties;

  value: number[];
}

export interface ICopyBook extends IStatement{

  statements: (ICopyBook | ICopyPrimitive)[];
}


export interface ICopyAstStatement {

  name: string;
  
  level: number;

  lineNumber: number;

  redefines: string;

  isRedefined: boolean;

  occurs: number;

  isFiller: boolean;

}
export interface ICopyAstPrimitive extends ICopyAstStatement {
  dataType: IDataType;

  binaryProperties: IBinaryProperties;
}
export interface ICopyAstGroup extends ICopyAstStatement {
  statements: (ICopyAstGroup | ICopyAstPrimitive)[]
}

interface IDataType {
  pic: string;

  originalPic: string;
}

interface IBinaryProperties {
  offset: number;
  
  dataSize: number;

  actualSize: number;
}


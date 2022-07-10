type ServerJavaOptions = {
  javaArgs: string;
  adoptium?: Adoptium;
}

type Adoptium = {
  featureVersion: number;
  releaseVersion: string;
  imageType: string;
}
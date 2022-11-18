type SourceType = "github" | "npm"


interface Metadata {
  cover_url?: string;
  project_url: string;
}

interface Credit {
  name: string;
  source_type: string;
  metadata: Metadata,
  isSingle?: boolean,
}


export {
  Metadata,
  Credit,
  SourceType
}
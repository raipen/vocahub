/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly KAKAO_CLIENT_ID: string
    readonly KAKAO_REDIRECT_URI: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

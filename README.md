[![logo](./src/front/assets/Title.png)](https://vocahub.net)
# 토익 영단어 암기 웹 어플리케이션
[https://vocahub.net](https://vocahub.net)
## 서비스 소개
- ["토익독학 길잡이"님의 영단어 암기법 영상](https://www.youtube.com/watch?v=HD79q6aXjPA)을 보고 영감을 받아 제작한 토익 영단어 암기 웹 어플리케이션입니다.
- 소셜 로그인을 통해 쉽게 가입하고, 단어장을 만들어 단어를 암기할 수 있습니다.
- 자세한 사용법은 [여기](https://vocahub.net)를 참고해주세요.

## 기술 스택
- Backend: Fastify, MariaDB, Prisma
- Frontend: React, Styled-components, vite
- Deploy: AWS Lightsail, Docker, Nginx, Github Actions

## 개발 환경 설정
1. 환경 변수 설정
```env
NODE_ENV=development
DEV_FRONT_PORT=3000
JWT_ACCESS_KEY=
JWT_REFRESH_KEY=
KAKAO_CLIENT_ID=
REDIRECT_URI=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
```
2. 데이터베이스 설정
    1. MariaDB or MySQL 설치
    2. 데이터베이스 생성
    ```sql
    CREATE DATABASE <database>;
    ```
    3. Prisma 설정
    ```bash
    npm run prisma:migrate #npx prisma migrate dev
    ```
    만약 shadow database를 사용할 수 없다면, 아래 명령어를 사용해주세요.
    ```bash
    npm run prisma:push #npx prisma db push
    ```

3. 라이브러리 설치 및 실행
```bash
npm install
npm run dev
#localhost:8080에 백엔드가 실행되고, localhost:3000에 프론트엔드가 CSR로 실행됩니다.
#프론트엔드에서 /api prefix로 요청 시 백엔드로 요청됩니다.
#localhost:3000에 프론트엔드를 SSR로 실행하려면, 프론트엔드에서 npm run dev:ssr을 실행해주세요. 하지만 fastify와 vite의 설정 충돌로 인해 여러 오류가 발생할 수 있습니다.
#npm run preview를 실행하여 실제 배포 상황처럼 localhost:8080에 백엔드와 SSR프론트엔드를 실행할 수 있습니다.
```

## 배포 방법
0. github action을 통해 docker image를 생성하고 docker hub에 push 되며, main branch에 push 되면 자동으로 4번이 실행됩니다.
아래 내용은 github action을 사용한 자동 배포를 위한 초기 설정입니다.
1. 배포 서버에 환경 변수 설정
```env
NODE_ENV=production
이하 동일
```

2. 배포 서버에 Docker 설치
[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) 에서 OS에 맞는 Docker 및 Docker Compose 설치

3. 배포 서버에 Docker Compose 파일 생성
```yml
version: '3'

services:
  server:
    image: 이미지 이름 및 태그
    container_name: word-memo
    env_file:
      - .env
    ports:
      - 8080:8080
```

4. 배포 서버에 Docker Compose 실행
```bash
docker-compose up -d
```

5. 배포 서버에 Nginx 설치 및 설정
더 쉽고 간편하게 SSL 인증서를 적용하기 위해 Nginx 사용
```bash
sudo apt-get update
sudo apt-get install nginx
```

6. Nginx 설정 파일 수정
```bash
sudo vim /etc/nginx/sites-available/default
```
```conf
server {
    listen 80;
    server_name vocahub.net www.vocahub.net;

    location / {
        proxy_pass http://localhost:8080;
    }
}
```

8. SSL 인증서 적용
[https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) 에서 OS와 Nginx 버전에 맞는 가이드를 참고해 SSL 인증서 적용

7. Nginx 재시작
```bash
sudo systemctl restart nginx
```



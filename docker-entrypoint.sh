echo "wait db server"
./wait-for-it.sh  $DB_HOST:$DB_PORT

echo "start node server"
if [ "$NODE_ENV" = "production" ]; then
    echo "production mode"
    npm run deploy
else
    npm run prisma:generate
    npm run prisma:migrate:dev
    npm run preview
fi

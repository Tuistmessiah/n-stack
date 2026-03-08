FROM mongo:7
COPY init-mongo.js /docker-entrypoint-initdb.d/
COPY migration-mongo.js /migrations/
USER mongodb
EXPOSE 27017

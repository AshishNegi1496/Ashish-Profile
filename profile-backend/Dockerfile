# Stage 1
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn dependency:go-offline
RUN mvn clean package -DskipTests

# Stage 2
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy app and wait script
COPY --from=build /app/target/*.jar app.jar
COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh

EXPOSE 8080
ENTRYPOINT ["./wait-for-it.sh", "mysql", "3306", "--", "java", "-jar", "app.jar"]

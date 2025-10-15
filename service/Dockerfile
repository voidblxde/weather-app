FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml pom.xml
COPY service/pom.xml service/pom.xml

RUN mvn -q -f service/pom.xml dependency:go-offline

COPY service/src service/src
RUN mvn -q -f service/pom.xml clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/service/target/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]


FROM java:8
VOLUME /tmp
ADD ./todo-list-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9191
RUN bash -c 'touch /app.jar'

ENTRYPOINT ["java","-Dspring.datasource.url=jdbc:mysql://mysql-service:3306/todolistdb?useSSL=false&allowPublicKeyRetrieval=true","-Dspring.datasource.username=root","-Dspring.datasource.password=password","-jar","/app.jar"]
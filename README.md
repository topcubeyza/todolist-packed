# TODO LIST APPLICATION

## English:

This repository contains the frontend and backend applications of TodoList website.

In order to run the applications:

### With docker-compose

1. Navigate to the folder containing 'docker-compose.yml' in a commandline window.

2. Run the following command to create a network:

```
docker network create todo-network
```

3. Run the following command to start the docker containers and run the applications:

```
docker-compose up
```

4. You can visit the website with the following address: http://localhost:3000

5. You can stop the containers and applications any time with the following command:

```
docker-compose down
```

NOTE: You can access the APIs of the backend application via http://localhost:9191


### Manually

1. Start MySql Server. Set the 'root' user password as 'password'.

2. Create a database with name 'todolistdb'.

3. Navigate to the 'todo-list' folder in a commandline window.

4. Run the backend application with the following command: 

```
java -jar todo-list-0.0.1-SNAPSHOT.jar
```

5. Navigate to the 'todo-list-web' folder in a commandline window.

6. Run the frontend application with the following command:

```
npm start
```

7. You can visit the website with the following address: http://localhost:3000

NOTE: You can access the APIs of the backend application via http://localhost:9191




## Türkçe:

Bu repository'de TodoList web sitesinin frontend ve backend uygulamaları yer almaktadır.

Uygulamaları çalıştırmak için:

### docker-compose ile:

1. Komut satırında 'docker-compose.yml' dosyasının bulunuğu klasöre gidin.

2. Aşağıdaki komut ile docker network oluşturun:

```
docker network create todo-network
```

3. Docker container'ları ayağa kaldırmak ve uygulamaları başlatmak için aşağıdaki komutu çalıştırın (birkaç dakika sürebilir):

```
docker-compose up
```

4. Tarayıcınızdan aşağıdaki adrese giderek siteyi ziyaret edebilirsiniz: http://localhost:3000

5. Dilediğiniz zaman aşağıdaki komut ile container'ları ve uygulamaları durdurabilirsiniz:

```
docker-compose-down
```

NOT: Backend uygulamasının API'lerine 'http://localhost:9191' üzerinden erişebilirsiniz.


### Manuel

1. MySql Server'ı başlatın. 'root' kullanıcısı şifresini 'password' olarak ayarlayın.

2. 'todolistdb' adında bir veritabanı oluşturun.

3. Komut penceresinde 'todo-list' klasörünün içine gidin.

4. Aşağıdaki komut ile backend uygulamasını başlatın:

```
java -jar todo-list-0.0.1-SNAPSHOT.jar
```

5. Komut penceresinde 'todo-list-web' klasörüne gidin.

6. Aşağıdaki komut ile frontend uygulamasını başlatın:

```
npm start
```

7. Tarayıcınızdan aşağıdaki adrese giderek siteyi ziyaret edebilirsiniz: http://localhost:3000

NOT: Backend uygulamasının API'lerine http://localhost:9191 üzerinden erişebilirsiniz.


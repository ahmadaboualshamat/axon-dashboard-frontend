pipeline {
    agent any
    // environment {
    //     // MAVEN_REPO_PATH = '/Users/user.LAPTOP-KG5QIEPS/jenkins/.m2/repository' // Adjust the path to your custom Maven repository location
    //     MAVEN_REPO_PATH = '/Users/user.LAPTOP-KG5QIEPS/.m2/repository'
    //     MAVEN_OPTS = "-Dmaven.repo.local=${MAVEN_REPO_PATH}"
    // }
    tools {
        nodejs 'node'
    }
    stages {
        stage('GIT Checkout') {
            steps {
                // Checkout Project B from version control
                checkout scmGit(branches: [[name: '*/release/qa']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/ahmadaboualshamat/dashboard-frontend']])
            }
        }
//         stage('Build Node') { // Then step putted inside docker file as another implementation
//             steps{
//                 // bat 'mvn clean install'
//                 // bat 'mvn help:evaluate -Dexpression=settings.localRepository'
//                 // bat 'mvn --debug clean install'
//                 bat 'mvn install'
//             }
//         }
        stage('Build Image') {
            steps{ 
                script{
                    bat 'docker build -t ahmadaboualshamat/dashboard-frontend .'
                }
            }
        }
        stage('Push Image') {
            steps{
                script{
                    bat 'docker push ahmadaboualshamat/dashboard-frontend'
                }
            }
        }
//         stage('Push Image to Docker Hup') {
//             steps{
//                 script{
//                     // withCredentials([string(credentialsId: 'dockerhub_pwd_new', variable: 'docker_hub_var_new')]) {
//                     // //withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'dockerhubpwd')]) {
//                     //     bat 'docker login -u ahmadaboualshamat -p ${docker_hub_var_new}'
//                     // }
//                     bat 'docker login -u ahmadaboualshamat -p Celine@Doc@123'
//                     bat 'docker push ahmadaboualshamat/user-management'
//                 }
//             }
//         }
        stage('Deploy') {
            steps{ 
                script{
                    // withCredentials([string(credentialsId: 'dockerhub_pwd_new', variable: 'docker_hub_var_new')]) {
                    // //withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'dockerhubpwd')]) {
                    //     bat 'docker login -u ahmadaboualshamat -p ${docker_hub_var_new}'
                    // }
//                     bat 'docker run -e "SPRING_PROFILES_ACTIVE=qa" -e "DATABASE_HOST=db" -p 8000:8080 ahmadaboualshamat/user-management:latest '
                    bat 'docker-compose up -d'
                }
            }
        }
//         stage('Push Image to Docker Hup') {
//                     steps{
//                         script{
//                             // withCredentials([string(credentialsId: 'dockerhub_pwd_new', variable: 'docker_hub_var_new')]) {
//                             // //withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'dockerhubpwd')]) {
//                             //     bat 'docker login -u ahmadaboualshamat -p ${docker_hub_var_new}'
//                             // }
//         //                     bat 'docker run -e "SPRING_PROFILES_ACTIVE=qa" -e "DATABASE_HOST=db" -p 8000:8080 ahmadaboualshamat/user-management:latest '
//                             bat 'docker-compose push'
//                         }
//                     }
//                 }
    }
}
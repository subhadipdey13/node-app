pipeline {
    agent any
    environment {
        REGISTRY = "3.229.134.81:8081"
        IMAGE = "node-app"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t $REGISTRY/$IMAGE:$TAG .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Nexus_Creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login $REGISTRY -u $USERNAME -p $PASSWORD'
                    sh 'docker push $REGISTRY/$IMAGE:$TAG'
                }            
            }
        }
    }
}

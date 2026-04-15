pipeline {
    agent any
    environment {
        REGISTRY = "3.236.148.82:8081"
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
                sh 'docker login $REGISTRY -u admin -p admin123'
                sh 'docker push $REGISTRY/$IMAGE:$TAG'
            }
        }
    }
}
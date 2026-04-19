pipeline {
    agent any
    environment {
        REGISTRY = "3.229.134.81:5000"
        IMAGE = "node-app"
        TAG = "${BUILD_NUMBER}"
        REGION = "us-east-1"
        CLUSTER = "lab-eks"
    }

    stages {

        stage('Build the Image') {
            steps {
                sh 'docker build -t $REGISTRY/$IMAGE:$TAG .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Nexus_Creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login $REGISTRY -u $USERNAME -p $PASSWORD'
                    sh 'docker push $REGISTRY/$IMAGE:$TAG'
                }            
            }
        }

        stage('Configure EKS') {
            steps {
                sh """
                aws eks update-kubeconfig \
                  --region $REGION \
                  --name $CLUSTER
                """            
            }
        }

        stage('Get Cluster Info') {
            steps {
                sh 'kubectl get nodes'                
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                    aws eks update-kubeconfig --region $REGION --name $CLUSTER                    
                    kubectl set image deployment/node-app \
                    node-app=$REGISTRY/$IMAGE:$TAG
                """            
            }
        }
        stage('Verify Deployment') {
            steps {
                sh 'kubectl rollout status deployment/node-app'
                sh '''
                    kubectl get pods
                    kubectl get svc
                '''            
            }
        }
    }
}

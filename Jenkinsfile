pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 9898:9898' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
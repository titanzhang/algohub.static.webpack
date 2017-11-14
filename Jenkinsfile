node('NodeRaw') {

  try {
    stage ('Clone Source') {
        checkout scm
    }

    stage('Compile') {
      def NODE_VERSION = '7.8'
      docker.image("node:${NODE_VERSION}").inside {
        sh 'npm install && npm run build'
      }
    }

    stage('Build Docker image') {
      def newImage = docker.build("algohub-static")
      docker.withRegistry("https://239150759114.dkr.ecr.us-west-1.amazonaws.com", "ecr:us-west-1:aws-ecr-cred") {
        newImage.push("${env.BUILD_ID}")
        newImage.push("latest")
      }
    }

  } finally {
    stage('Cleanup') {
      cleanWs notFailBuild: true
    }
  }

}

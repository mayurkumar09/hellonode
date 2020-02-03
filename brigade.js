
const { events, Job } = require("brigadier");
events.on("push", () => {
 
     
    // var job = new Job("dockerbuild", "docker:dind");
    // job.privileged = true;
    // job.env = {
    // DOCKER_DRIVER: "overlay"
    // }
    // job.tasks = [
    //     "dockerd &",
    //     "sleep 10",
    //     "cd /src",
    //     "ls -l",
    //     "docker build -t mayursuccessive/image-processing:v1 .",
    //     "docker images"
    //     ];
    
    helm = new Job("helm", "linkyard/docker-helm");
    helm.task = [
       // "helm repo add https://github.com/mayurkumar09/helm.git"
        "git version",
        "echo sdasdwd",
        "kubectl version",
        "echo kubectl is there",
        "helm version",
        "echo helm is there"
    ];



    //job.run();
    helm.run();
});


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
    
    helm = new Job("helm", "dtzar/helm-kubectl");
    helm.privileged = true;
    helm.task = [
       // "helm repo add https://github.com/mayurkumar09/helm.git"
//        "git show",
        "echo sdasdwd",
        "kubectl cluster-info",
        "echo kubectl is there",
        "helm ls",
        "echo helm",
        //"git clone https://github.com/mayurkumar09/pipeline.git",
        "ls -l",
	"git show"
    ];



    //job.run();
    helm.run();
});

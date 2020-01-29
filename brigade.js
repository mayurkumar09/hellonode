
const { events, Job } = require("brigadier");

events.on("push", (e, project) => {
    var commit = e.revision.commit.substring(0, 7);
    var dest = "/mnt/brigade/share/abc.text";
    
    var greeting = new Job("job1", "alpine:latest");
    greeting.storage.enabled = true;
    greeting.tasks = [
    "echo Hello Pipeline",
    `echo commit id is ${commit} >` + dest 
    ];

    var print = new Job("job3", "devth/helm:latest");
    print.storage.enabled = true;
    print.tasks = [
    "helm version",
    "echo helm it is",
    "gcloud version",
    "kubectl get pods"
    
    ];

    // var docker = new Job("job2", "docker:dind");
    // docker.privileged = true;
    // docker.storage.enabled = true;
    // docker.env = {
    // "DOCKER_DRIVER": "overlay",
    
    // }
    // docker.tasks = [
    //     "dockerd-entrypoint.sh &",
    //     "sleep 20", 
    //     "cd /src",
    //     `docker build -t mayursuccessive/hellonode:${commit} .`,
    //     "docker images",
    //     `docker login -u ${project.secrets.uid} -p ${project.secrets.passwd}`,
	//     "echo docker login success", 
	//     `docker push mayursuccessive/hellonode:${commit}`,
    //     "docker images"
    //     ];

 
    // greeting.run();
    // docker.run();
    // print.run();

    greeting.run().then(() => {
    print.run()
    })

});

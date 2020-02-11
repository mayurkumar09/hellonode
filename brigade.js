
const { events, Job } = require("brigadier");

events.on("push", (e, project) => {
    var commit = e.revision.commit.substring(0, 7);
    var greeting = new Job("job1", "roffe/kubectl");
    //greeting.storage.enabled = true;
    greeting.tasks = [
    "echo Hello Pipeline",
    "cd /src",
    "ls -l",
    "touch cronfile",
    "echo * * * * * ./demo.sh >> cronfile",
    "crontab cronfile",
    "sleep 10",
    "kubectl get pods"
    //`echo commit id is ${commit}`
    ];

    // var docker = new Job("job2", "docker:dind");
    // docker.privileged = true;
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

 
    greeting.run();
    //docker.run();

});

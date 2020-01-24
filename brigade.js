const { events, Job } = require("brigadier");

events.on("push", (e, project) => {
    var commit = e.revision.commit.substring(0, 7);
    var greeting = new Job("job1", "alpine:latest");
    //greeting.storage.enabled = true;
    greeting.tasks = [
    "echo Hello Pipeline",
    `echo commit id is ${commit}`
    ]

    var docker = new Job("job2", "docker:dind");
    docker.privileged = true;
    docker.env = {
    "DOCKER_DRIVER": "overlay",
    
    }

    docker.tasks = [
        "dockerd-entrypoint.sh &",
        "sleep 10",
        "echo docker daemon is up",
        `docker build -t mayursuccessive/hellonode:${commit} .`,
        "docker images",
        `echo ${project.secrets.uid} ${project.secrets.passwd}`,
        `docker login -u ${project.secrets.uid} -p ${project.secrets.passwd}`,
	    "echo docker login success", 
	    `docker push mayursuccessive/hellonode:${commit}`,
        "docker images"
        ];

 
    greeting.run();
    docker.run();

});

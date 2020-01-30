const { events, Job } = require("brigadier");

events.on("push", (e, project) => {
    var commit = e.revision.commit.substring(0, 7);
   // var dest = "/mnt/brigade/share/abc.text";
    
    var greeting = new Job("job1", "alpine:latest");
   // greeting.storage.enabled = true;
    greeting.tasks = [
    "echo Hello Pipeline",
   // `echo commit id is ${commit} >` + dest 
    ];

 

    var docker = new Job("job2", "docker:dind");
    docker.privileged = true;
    docker.storage.enabled = true;
    docker.env = {
    "DOCKER_DRIVER": "overlay",
    
    }
    docker.tasks = [
        "dockerd-entrypoint.sh &",
        "sleep 20", 
        "cd /src",
       // `docker build -t mayursuccessive/hellonode:${commit} .`,
        "docker images",
       // `docker login -u ${project.secrets.uid} -p ${project.secrets.passwd}`,
	    "echo docker login success", 
	    //`docker push mayursuccessive/hellonode:${commit}`,
        //"docker images"
        ];
    
    // var deploy = new Job("job3", "devth/helm:latest");
    // deploy.storage.enabled = true;
    // deploy.tasks = [
    // "cd /src",
    // "ls -l",
    // "kubectl create -f "
    
    // ];
 
    greeting.run();
    docker.run();
   // deploy.run();

    // greeting.run().then(() => {
    // deploy.run()
    // })

});

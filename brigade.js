
const { events, Job } = require("brigadier");

events.on("push", (e, project) => {
    var commit = e.revision.commit.substring(0, 7);
    var greeting = new Job("job1", "mayursuccessive/kubectl");
    //greeting.storage.enabled = true;
    let command = `./demo.sh`;
//     let jobYaml = `apiVersion: batch/v1beta1
//     kind: Job
// metadata:
//   name: brigcronjob
// spec:
//   template:
//     spec:
//       containers:
//       - name: brigcronjobpod
//         image: mayursuccessive/kubectl
//         imagePullPolicy: IfNotPresent
//         command: ["/bin/sh"]
//         args: ["-c", "${command}"]
//         env:
//       restartPolicy: Never
//   backoffLimit: 1`;

let jobYaml = `apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "* * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cronpod
            image: mayursuccessive/kubectl
            args: ["-c", ${command} ]
          restartPolicy: OnFailure`

    greeting.tasks = [
    "ls -lrt",
    "kubectl get pods",
    // "./demo.sh",
    "cat >Job.yaml <<'EOT'",
    jobYaml,
    "EOT",
    // `${jobYaml} > job.yaml`,
    `kubectl create -f ./job.yaml`,
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

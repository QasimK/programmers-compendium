# Kubernetes

## Commands

### Running as a different user

Work around for K8S not supporting --user flag: [https://github.com/kubernetes/kubernetes/issues/30656](https://github.com/kubernetes/kubernetes/issues/30656)

```console
kubectl get pods
kubectl describe pod <POD-NAME> | grep Node
gcloud compute ssh "<NODE-NAME>"
sudo su - root
docker ps | grep <POD-NAME>
docker exec -it -uroot <ID> /bin/bash
```

## API Deployment

Use k8syaml.com

```yaml
spec:
    replicas: 2
    # How long before deployment of a new pod is considered failed  (default: 600)
    progressDeadlineSeconds: 180

    # Rolling updates
    strategy:
        type: RollingUpdate
        rollingUpdate:
            # (Surge is rounded up)
            maxSurge: 25%
            maxUnavailable: 0

    # Container(s)
    template:
        spec:
            # List of containers
            containers:
              - image: <url>
                imagePullPolicy: IfNotPresent

                # Health checks: startupProbe, readinessProbe, livenessProbe
                # startupProbe = when static initialDelaySeconds is bad fit

                # readinessProbe = should kubelet direct traffic?
                readinessProbe:
                    httpGet:
                        path: /healthz
                        port: 5000
                        scheme: HTTP
                    initialDelaySeconds: 10
                    periodSeconds: 10
                    successThreshold: 1
                    failureThreshold: 3
                    timeoutSeconds: 5

                # livenessProbe = should kubelet restart pod?
                livenessProbe:
                    httpGet:
                        path: /healthz
                        port: 5000
                        scheme: HTTP
                    initialDelaySeconds: 10
                    periodSeconds: 10
                    successThreshold: 1
                    failureThreshold: 3
                    timeoutSeconds: 10

                resources:
                    requests:
                        memory: "192Mi"
                        cpu: 0.1
                    limits:
                        memory: "256Mi"
                        cpu: 1

                command: []

            restartPolicy: Always (default)

            # How long between SIGTERM and SIGKILL (default: 30)
            terminationGracePeriodSeconds: 10
---
# Protect against voluntary disruptions (node stuff)
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
spec:
    maxUnavailable: 1
---
# Horizontal Auto-scaler
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
spec:
    minReplicas: 1
    maxReplicas: 4
    scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <name>
    targetCPUUtilizationPercentage: 50
---
# Load balancer / Service

```


Tips:

* livenessProbe - do not check dependencies
    * be wary of temp. long responses causing one restart => cascading restarts
    * use timeout of client timeout and forgiving failureThreshold
    * set initialDelaySeconds so that containers always have enough time
* readinessProbe - check dependencies [or not, see below]
    * if shared dependency (database) try not to fail probe because all pods will fail!
        * especially have a large timeout for these checks
    * if truly independent, you're okay
    * probably don't need one anyway for upstream servies
        * let application return error immediately (503)
        * better than timeout/404/etc.
    * note: still need readinessProbe to fail deployment of new ReplicaSet!
* pod can be ready:0/1 with status:RUNNING but not accepting traffic!

How to handle ready checking dependencies that not all endpoints use?
    * probably better not to check dependencies in readinessProbe at all
    * for shared dependencies, how likely is it that _just_ this pod has a problem

Using readiness probe to check for misconfiguration?
    * Better to use startupProbe, but what happens if dependency itself is down?
    * You don't want to block new deployments due to dependency!

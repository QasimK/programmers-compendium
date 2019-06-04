# Kubernetes

## Commands

### Running as a different user

Work around for K8S not supporting --user flag: [https://github.com/kubernetes/kubernetes/issues/30656](https://github.com/kubernetes/kubernetes/issues/30656)

```
kubectl get pods
kubectl describe pod <POD-NAME> | grep Node
gcloud compute ssh "<NODE-NAME>"
sudo su - root
docker ps | grep <POD-NAME>
docker exec -it -uroot <ID> /bin/bash
```



